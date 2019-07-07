// Exported functions
export { normalize } from "./normalize";
export { denormalize } from "./denormalize";
export { merge } from "./norm-map";
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
  NormMap, // ref: normalize(), denormalize(), merge(), getNormalizedEntity(), updateStaleEntities()
  NormObj, // ref: EntityCache
  NormFieldValue, // ref: Entity
  NormKey // ref: EntityFieldValue
} from "./norm-map";

export {
  NormalizedEntity, // ref: getNormalizedEntity()
  NormalizedEntityField // ref: NormalizedEntityField
} from "./normalized-entity";

export {
  StaleMap as StaleEntities, // ref: denormalize(), updateStaleEntities()
  StaleNormObj as StaleEntity // ref: StaleEntities
} from "./stale";
