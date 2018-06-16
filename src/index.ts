// entity-cache
export { mergeEntityCache, getNormalizedEntity } from "./entity-cache";
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
} from "./entity-cache";

// normalization
export { denormalize } from "./denormalize";
export { normalize } from "./normalize";
export { defaultGetObjectId } from "./functions";
export { RootFields, GetObjectId } from "./types";
