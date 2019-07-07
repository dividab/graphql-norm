// Exported functions
export { normalize } from "./normalize";
export { denormalize } from "./denormalize";
export { merge } from "./entity-cache";
export { defaultGetObjectId } from "./functions";

// These should be moved out of this lib
export { getNormalizedEntity } from "./normalized-entity";
export { updateStale } from "./stale";

// Exported types used in signature of exported functions
export {
  GetObjectId, // ref: normalize(), defaultGetObjectId()
  Variables, // ref: normalize(), denormalize()
  DenormalizationResult, // used in: denormalize()
  RootFields // ref: normalize(), DenormalizationResult
} from "./types";

export {
  NormMap as EntityCache, // ref: normalize(), denormalize(), merge(), getNormalizedEntity(), updateStaleEntities()
  NormObj as Entity, // ref: EntityCache
  NormFieldValue as EntityFieldValue, // ref: Entity
  NormKey as EntityId // ref: EntityFieldValue
} from "./entity-cache";

export {
  NormalizedEntity, // ref: getNormalizedEntity()
  NormalizedEntityField // ref: NormalizedEntityField
} from "./normalized-entity";

export {
  StaleEntities, // ref: denormalize(), updateStaleEntities()
  StaleEntity // ref: StaleEntities
} from "./stale";
