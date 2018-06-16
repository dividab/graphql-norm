// tslint:disable:no-arguments
import * as GraphQL from "graphql";
import {
  FieldNodeWithSelectionSet,
  GetObjectId,
  GraphQLResponse,
  Variables,
  ResponseObject
} from "./types";
import {
  defaultGetObjectId,
  expandFragments,
  getDocumentDefinitions,
  fieldNameWithArguments
} from "./functions";
import {
  EntityCache,
  Entity,
  MutableDeep,
  EntityId,
  EntityFieldValue
} from "./entity-cache";

type ParentEntity = MutableDeep<Entity>;
type MutableEntityCache = MutableDeep<EntityCache>;
type ResponseArray = ReadonlyArray<
  ResponseObject | ReadonlyArray<ResponseObject>
>;
type ResponseObjectOrArray = ResponseObject | ResponseArray;
type ParentEntityOrArray = ParentEntity | ParentArray;
type ParentArray = Array<EntityFieldValue>;
type StackWorkItem = [
  FieldNodeWithSelectionSet,
  ParentEntityOrArray | undefined /*parentEntity*/,
  ResponseObjectOrArray
];

export function normalize(
  query: GraphQL.DocumentNode,
  variables: Variables | undefined,
  response: GraphQLResponse,
  getObjectId: GetObjectId = defaultGetObjectId
): EntityCache {
  const [fragmentMap, rootFieldNode] = getDocumentDefinitions(
    query.definitions
  );

  const stack: Array<StackWorkItem> = [];
  const entities: MutableEntityCache = {};

  // Seed stack with undefined parent and "fake" getObjectId
  stack.push([rootFieldNode, {}, response.data]);
  let getObjectIdToUse: GetObjectId = _ => "ROOT_QUERY";

  // The stack has work items, depending on the work item we have four different cases to handle:
  // field + responseObject + parentEntity = normalize(responseObject) => [ID, workitems] and parentEntity[field] = ID
  // field + responseObject + parentArray  = normalize(responseObject) => [ID, workitems] and parentArray.push(ID)
  // field + responseArray  + parentEntity = stack.push(workItemsFrom(responseArray)) and parentEntity[field] = new Array()
  // field + responseArray  + parentArray  = stack.push(workItemsFrom(responseArray)) and parentArray.push(new Array())
  let firstIteration = true;
  while (stack.length > 0) {
    const [
      fieldNode,
      parentEntityOrArray,
      responseObjectOrArray
    ] = stack.pop()!;

    const expandedSelections = expandFragments(
      fieldNode.selectionSet.selections,
      fragmentMap
    );

    let entityIdOrNewParentArray:
      | EntityId
      | ParentArray
      | undefined = undefined;
    if (!Array.isArray(responseObjectOrArray)) {
      const responseObject = responseObjectOrArray as ResponseObject;
      // console.log("responseObject", responseObject);
      entityIdOrNewParentArray = getObjectIdToUse(responseObject);
      // Get or create entity
      let entity = entities[entityIdOrNewParentArray];
      if (!entity) {
        entity = {};
        entities[entityIdOrNewParentArray] = entity;
      }
      // For each field in the selection-set that has a sub-selection-set we push a work item.
      // For primtivies fields we set them directly on the entity.
      for (const field of expandedSelections) {
        const responseFieldValue =
          responseObject[
            (field.alias && field.alias.value) || field.name.value
          ];
        if (responseFieldValue !== null && field.selectionSet) {
          // Put a work-item on the stack to normalize this field and set it on the entity
          stack.push([
            field as FieldNodeWithSelectionSet,
            entity,
            responseFieldValue
          ]);
        } else {
          // This field is a primitive (not a array of entities or a single entity)
          const entityFieldName =
            field.arguments && field.arguments.length > 0
              ? fieldNameWithArguments(field, variables)
              : field.name.value;
          entity[entityFieldName] = responseFieldValue;
        }
      }
    } else {
      const responseArray = responseObjectOrArray as ResponseArray;
      entityIdOrNewParentArray = [];
      for (const responseArrayItem of responseArray) {
        stack.push([fieldNode, entityIdOrNewParentArray, responseArrayItem]);
      }
    }

    // Add to the parent, either field or an array
    if (Array.isArray(parentEntityOrArray)) {
      const parentArray = parentEntityOrArray as ParentArray;
      parentArray.unshift(entityIdOrNewParentArray);
    } else {
      const cacheKey =
        fieldNode.arguments && fieldNode.arguments.length > 0
          ? fieldNameWithArguments(fieldNode, variables)
          : fieldNode.name.value;
      const parentEntity = parentEntityOrArray as ParentEntity;
      parentEntity[cacheKey] = entityIdOrNewParentArray;
    }

    // Use fake objectId function only for the first iteration, then switch to the real one
    if (firstIteration) {
      getObjectIdToUse = getObjectId;
      firstIteration = false;
    }
  }

  return entities as EntityCache;
}
