// Exported functions
export { normalize } from "./normalize";
export { denormalize } from "./denormalize";
export { merge } from "./norm-map";
export { defaultGetObjectId } from "./functions";

// Exported types used in signature of exported functions
export {
  GetObjectId, // ref: normalize(), defaultGetObjectId()
  Variables, // ref: normalize(), denormalize()
  DenormalizationResult, // used in: denormalize()
  RootFields // ref: normalize(), DenormalizationResult
} from "./types";

// These should be moved out of this lib
export { getNormalizedEntity } from "./normalized-entity";
export { updateStale } from "./stale";

export {
  NormMap, // ref: normalize(), denormalize(), merge(), getNormalizedEntity(), updateStaleEntities()
  NormObj, // ref: NormMap
  NormFieldValue, // ref: NormObj
  NormKey // ref: NormFieldValue
} from "./norm-map";

export {
  NormalizedEntity, // ref: getNormalizedEntity()
  NormalizedEntityField // ref: NormalizedEntityField
} from "./normalized-entity";

export {
  StaleMap, // ref: denormalize(), updateStaleEntities()
  StaleFields // ref: StaleEntities
} from "./stale";
