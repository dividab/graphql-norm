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

export {
  NormMap, // ref: normalize(), denormalize(), merge()
  NormObj, // ref: NormMap
  NormFieldValue, // ref: NormObj
  NormKey // ref: NormFieldValue
} from "./norm-map";

// All below this line should be moved out of this lib

export { getNormalizedObject } from "./normalized-object";
export { updateStale } from "./stale";

export {
  NormalizedObject, // ref: getNormalizedObject()
  NormalizedField // ref: NormalizedField
} from "./normalized-object";

export {
  StaleMap, // ref: denormalize(), updateStaleEntities()
  StaleFields // ref: StaleEntities
} from "./stale";
