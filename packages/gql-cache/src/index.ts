// entity-cache
export { mergeEntityCache, getNormalizedEntity } from "./cache/entity-cache";
export {
  EntityCache,
  Entity,
  EntityFieldValue,
  EntityId,
  NormalizedEntity,
  NormalizedEntityField,
  StaleEntities,
  StaleEntity,
  updateStaleEntities
} from "./cache/entity-cache";

// normalization
export { denormalize } from "./normalization/denormalize";
export { normalize } from "./normalization/normalize";
export { defaultGetObjectId } from "./normalization/functions";
export { RootFields, GetObjectId } from "./normalization/types";
