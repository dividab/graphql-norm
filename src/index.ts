// Exported functions
export { normalize } from "./normalize";
export { denormalize } from "./denormalize";
export { merge, getNormalizedEntity, updateStale } from "./entity-cache";
export { defaultGetObjectId } from "./functions";

// Exported types used in signature of exported functions
export {
  GetObjectId, // ref: normalize(), defaultGetObjectId()
  Variables, // ref: normalize(), denormalize()
  DenormalizationResult, // used in: denormalize()
  GraphQLResponse, // ref: normalize()
  RootFields // ref: GraphQLResponse
} from "./types";

export {
  EntityCache, // ref: normalize(), denormalize(), merge(), getNormalizedEntity(), updateStaleEntities()
  Entity, // ref: EntityCache
  EntityFieldValue, // ref: Entity
  EntityId, // ref: EntityFieldValue
  StaleEntities, // ref: denormalize(), updateStaleEntities()
  StaleEntity, // ref: StaleEntities
  NormalizedEntity, // ref: getNormalizedEntity()
  NormalizedEntityField // ref: NormalizedEntityField
} from "./entity-cache";
