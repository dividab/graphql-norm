// Exported functions
export { normalize } from "./normalize";
export { denormalize } from "./denormalize";
export {
  mergeEntityCache,
  getNormalizedEntity,
  updateStaleEntities
} from "./entity-cache";
export { defaultGetObjectId } from "./functions";

// Exported types used in signature of exported functions
export {
  GetObjectId, // ref: normalize(), defaultGetObjectId()
  DenormalizationResult, // used in: denormalize()
  RootFields, // ref: GraphQLResponse
  Variables, // ref: normalize(), denormalize()
  GraphQLResponse // ref: normalize()
} from "./types";

export {
  EntityCache, // ref: normalize(), denormalize(), mergeEntityCache(), getNormalizedEntity(), updateStaleEntities()
  Entity, // ref: EntityCache
  EntityFieldValue, // ref: Entity
  EntityId, // ref: EntityFieldValue
  StaleEntities, // ref: denormalize(), updateStaleEntities()
  StaleEntity, // ref: StaleEntities
  NormalizedEntity, // ref: getNormalizedEntity()
  NormalizedEntityField // ref: NormalizedEntityField
} from "./entity-cache";
