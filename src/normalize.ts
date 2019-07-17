// tslint:disable:no-arguments
import * as GraphQL from "graphql";
import {
  FieldNodeWithSelectionSet,
  GetObjectId,
  RootFields,
  Variables,
  ResponseObject
} from "./types";
import {
  defaultGetObjectId,
  expandFragments,
  getDocumentDefinitions,
  fieldNameWithArguments,
  shouldIncludeField
} from "./functions";
import { NormMap, NormObj, NormKey, NormFieldValue } from "./norm-map";

type MutableDeep<T> = { -readonly [P in keyof T]: MutableDeep<T[P]> }; // Remove readonly deep

type ParentNormObj = MutableDeep<NormObj>;
type MutableNormMap = MutableDeep<NormMap>;
type ResponseArray = ReadonlyArray<
  ResponseObject | ReadonlyArray<ResponseObject>
>;
type ResponseObjectOrArray = ResponseObject | ResponseArray;
type ParentNormObjOrArray = ParentNormObj | ParentArray;
type ParentArray = Array<NormFieldValue>;
type StackWorkItem = [
  FieldNodeWithSelectionSet,
  ParentNormObjOrArray | undefined /*parentNormObj*/,
  ResponseObjectOrArray,
  string // FallbackId
];

/**
 * Normalizes a graphql response.
 * @param query The graphql query document
 * @param variables The graphql query variables
 * @param response The graphql response
 * @param getObjectId Function to get normalized map key from an object
 */
export function normalize(
  query: GraphQL.DocumentNode,
  variables: Variables | undefined,
  data: RootFields,
  getObjectId: GetObjectId = defaultGetObjectId
): NormMap {
  const [fragmentMap, rootFieldNode] = getDocumentDefinitions(
    query.definitions
  );

  const stack: Array<StackWorkItem> = [];
  const normMap: MutableNormMap = Object.create(null);

  // Seed stack with undefined parent and "fake" getObjectId
  stack.push([rootFieldNode, Object.create(null), data, "ROOT_QUERY"]);
  let getObjectIdToUse: GetObjectId = _ => "ROOT_QUERY";

  // The stack has work items, depending on the work item we have four different cases to handle:
  // field + responseObject + parentNormObj = normalize(responseObject) => [ID, workitems] and parentNormObj[field] = ID
  // field + responseObject + parentArray  = normalize(responseObject) => [ID, workitems] and parentArray.push(ID)
  // field + responseArray  + parentNormObj = stack.push(workItemsFrom(responseArray)) and parentNormObj[field] = new Array()
  // field + responseArray  + parentArray  = stack.push(workItemsFrom(responseArray)) and parentArray.push(new Array())
  let firstIteration = true;
  while (stack.length > 0) {
    const [
      fieldNode,
      parentNormObjOrArray,
      responseObjectOrArray,
      fallbackId
    ] = stack.pop()!;

    const expandedSelections = expandFragments(
      fieldNode.selectionSet.selections,
      fragmentMap
    );

    let keyOrNewParentArray: NormKey | ParentArray | null = null;
    if (responseObjectOrArray === null) {
      keyOrNewParentArray = null;
    } else if (!Array.isArray(responseObjectOrArray)) {
      const responseObject = responseObjectOrArray as ResponseObject;
      // console.log("responseObject", responseObject);
      const objectToIdResult = getObjectIdToUse(responseObject);
      keyOrNewParentArray = objectToIdResult ? objectToIdResult : fallbackId;
      // Get or create normalized object
      let normObj = normMap[keyOrNewParentArray];
      if (!normObj) {
        normObj = Object.create(null);
        normMap[keyOrNewParentArray] = normObj;
      }
      // For each field in the selection-set that has a sub-selection-set we push a work item.
      // For primtivies fields we set them directly on the normalized object.
      for (const field of expandedSelections) {
        // Check if this field should be skipped according to @skip and @include directives
        const include = field.directives
          ? shouldIncludeField(field.directives, variables)
          : true;
        if (include) {
          const responseFieldValue =
            responseObject[
              (field.alias && field.alias.value) || field.name.value
            ];
          const normFieldName =
            field.arguments && field.arguments.length > 0
              ? fieldNameWithArguments(field, variables)
              : field.name.value;
          if (responseFieldValue !== null && field.selectionSet) {
            // Put a work-item on the stack to normalize this field and set it on the normalized object
            stack.push([
              field as FieldNodeWithSelectionSet,
              normObj,
              responseFieldValue,
              //path + "." + normFieldName
              // Use the current key plus fieldname as fallback id
              keyOrNewParentArray + "." + normFieldName
            ]);
          } else {
            // This field is a primitive (not a array of normalized objects or a single normalized object)
            normObj[normFieldName] = responseFieldValue;
          }
        }
      }
    } else {
      const responseArray = responseObjectOrArray as ResponseArray;
      keyOrNewParentArray = [];
      for (let i = 0; i < responseArray.length; i++) {
        stack.push([
          fieldNode,
          keyOrNewParentArray,
          responseArray[i],
          fallbackId + "." + i.toString()
        ]);
      }
    }

    // Add to the parent, either field or an array
    if (Array.isArray(parentNormObjOrArray)) {
      const parentArray = parentNormObjOrArray as ParentArray;
      parentArray.unshift(keyOrNewParentArray);
    } else {
      const key =
        fieldNode.arguments && fieldNode.arguments.length > 0
          ? fieldNameWithArguments(fieldNode, variables)
          : fieldNode.name.value;
      const parentNormObj = parentNormObjOrArray as ParentNormObj;
      parentNormObj[key] = keyOrNewParentArray;
    }

    // Use fake objectId function only for the first iteration, then switch to the real one
    if (firstIteration) {
      getObjectIdToUse = getObjectId;
      firstIteration = false;
    }
  }

  return normMap as NormMap;
}
