import { NormMap } from "./entity-cache";

export interface StaleEntities {
  readonly [cacheKey: string]: StaleEntity | undefined;
}

export interface StaleEntity {
  readonly [field: string]: true | undefined;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Remove readonly

/**
 * Removes the stale flag for entitiy fields that are present in the normalized result
 */
export function updateStale(
  cache: NormMap,
  stale: StaleEntities
): StaleEntities {
  type MutableStaleEntities = Mutable<StaleEntities>;

  // Make a shallow copy to enable shallow mutation
  const staleCopy: MutableStaleEntities = { ...stale };

  // Check all stale entities against the cache
  for (const staleKey of Object.keys(staleCopy)) {
    const entity = cache[staleKey];
    if (entity !== undefined) {
      const staleEntity = staleCopy[staleKey];
      const staleEntityFields = Object.keys(staleEntity || {});

      let staleEntityFieldCount = staleEntityFields.length;

      // Check all fields of the stale entity against the corresponding entity in cache
      // If a field exists in cache, then it should not be stale anymore
      let staleEntityCopy: Mutable<StaleEntity> | undefined = undefined;
      for (const staleEntityField of staleEntityFields) {
        for (const entityField of Object.keys(entity)) {
          if (entityField === staleEntityField) {
            if (!staleEntityCopy) {
              staleEntityCopy = { ...staleEntity };
              staleCopy[staleKey] = staleEntityCopy;
            }
            delete staleEntityCopy[staleEntityField];
            staleEntityFieldCount--;
          }
        }
      }

      // If the entity has no stale fields then remove it from stale
      if (staleEntityFieldCount === 0) {
        delete staleCopy[staleKey];
      }
    }
  }
  return staleCopy;
}
