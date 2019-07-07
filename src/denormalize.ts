// tslint:disable:no-arguments
import * as GraphQL from "graphql";
import {
  DenormalizationResult,
  FieldNodeWithSelectionSet,
  Variables,
  ResponseObject,
  ResponseObject2,
  ResponseObjectArray,
  RootFields
} from "./types";
import {
  expandFragments,
  getDocumentDefinitions,
  fieldNameWithArguments,
  shouldIncludeField
} from "./functions";
import { NormMap, NormKey } from "./norm-map";
import { StaleMap, Mutable } from "./stale";

type MutableResponseObject = Mutable<ResponseObject>;
type MutableResponseObjectArray = Array<MutableResponseObject>;
type ParentResponseObjectOrArray =
  | Mutable<ResponseObject2>
  | ResponseObjectArray;
type ParentResponseKey = string | number | undefined;
type StackWorkItem = [
  FieldNodeWithSelectionSet,
  NormKey | ReadonlyArray<NormKey>,
  ParentResponseObjectOrArray,
  ParentResponseKey
];

export function denormalize(
  query: GraphQL.DocumentNode,
  variables: Variables | undefined,
  normMap: NormMap,
  staleMap: StaleMap = {}
): DenormalizationResult {
  const [fragmentMap, rootFieldNode] = getDocumentDefinitions(
    query.definitions
  );

  const stack: Array<StackWorkItem> = [];
  const response = {};
  let partial = false;
  let stale = false;
  const keys: Array<string> = [];
  stack.push([rootFieldNode, "ROOT_QUERY", response, undefined]);
  while (stack.length > 0) {
    const [
      fieldNode,
      idOrIdArray,
      parentObjectOrArray,
      parentResponseKey
    ] = stack.pop()!;

    const expandedSelections = expandFragments(
      fieldNode.selectionSet.selections,
      fragmentMap
    );

    // The stack has work items, depending on the work item we have four different cases to handle:
    // field + id      + parentObject = denormalize(ID) => [responseObject, workitems] and parentObject[field] = responseObject
    // field + id      + parentArray  = denormalize(ID) => [responseObject, workitems] and parentArray.push(responseObject)
    // field + idArray + parentObject = stack.push(workItemsFrom(idArray)) and parentObject[field] = new Array()
    // field + idArray + parentArray  = stack.push(workItemsFrom(idArray)) and parentArray.push(new Array())

    let responseObjectOrNewParentArray:
      | MutableResponseObject
      | MutableResponseObjectArray
      | null;

    if (idOrIdArray === null) {
      responseObjectOrNewParentArray = null;
    } else if (!Array.isArray(idOrIdArray)) {
      const key: NormKey = idOrIdArray as NormKey;

      const normObj = normMap[key];

      // Does not exist in normalized map. We can't fully resolve query
      if (normObj === undefined) {
        partial = true;
        break;
      }

      keys.push(key);
      const staleFields = staleMap[key];

      // If we've been here before we need to use the previously created response object
      if (Array.isArray(parentObjectOrArray)) {
        responseObjectOrNewParentArray =
          (parentObjectOrArray as MutableResponseObjectArray)[
            parentResponseKey as number
          ] || Object.create(null);
      } else {
        responseObjectOrNewParentArray =
          (parentObjectOrArray as MutableResponseObject)[
            parentResponseKey as string
          ] || Object.create(null);
      }

      for (const field of expandedSelections) {
        // Check if this field should be skipped according to @skip and @include directives
        const include = field.directives
          ? shouldIncludeField(field.directives, variables)
          : true;
        if (include) {
          // Build key according to any arguments
          const key =
            field.arguments && field.arguments.length > 0
              ? fieldNameWithArguments(field, variables)
              : field.name.value;
          // Check if this field is stale
          if (staleFields) {
            const staleField = staleFields[key];
            if (staleField !== undefined) {
              stale = true;
            }
          }
          const normObjValue = normObj[key];
          if (normObjValue !== null && field.selectionSet) {
            // Put a work-item on the stack to build this field and set it on the response object
            stack.push([
              field as FieldNodeWithSelectionSet,
              normObjValue as any,
              responseObjectOrNewParentArray as
                | MutableResponseObject
                | MutableResponseObjectArray,
              (field.alias && field.alias.value) || field.name.value
            ]);
          } else {
            // This field is a primitive (not a array or object)
            if (normObjValue !== undefined) {
              (responseObjectOrNewParentArray as MutableResponseObject)[
                (field.alias && field.alias.value) || field.name.value
              ] = normObjValue;
            } else {
              partial = true;
            }
          }
        }
      }
    } else {
      const idArray: ReadonlyArray<NormKey> = idOrIdArray;
      responseObjectOrNewParentArray =
        (parentObjectOrArray as MutableResponseObject)[
          parentResponseKey as string
        ] || [];
      for (let i = 0; i < idArray.length; i++) {
        const idArrayItem = idArray[i];
        stack.push([
          fieldNode,
          idArrayItem,
          responseObjectOrNewParentArray as
            | MutableResponseObject
            | MutableResponseObjectArray,
          i
        ]);
      }
    }

    // Add to the parent, either field or an array
    if (Array.isArray(parentObjectOrArray)) {
      const parentArray: MutableResponseObjectArray = parentObjectOrArray;
      parentArray[
        parentResponseKey as number
      ] = responseObjectOrNewParentArray as
        | MutableResponseObject
        | MutableResponseObjectArray;
    } else {
      const parentObject: MutableResponseObject = parentObjectOrArray;
      parentObject[
        parentResponseKey ||
          (fieldNode.alias && fieldNode.alias.value) ||
          fieldNode.name.value
      ] = responseObjectOrNewParentArray;
    }
  }

  interface GraphQLResponse {
    readonly data: RootFields;
  }

  const data = (response as GraphQLResponse).data;

  return {
    partial,
    stale,
    data: !partial ? data : undefined,
    keys
  };
}
