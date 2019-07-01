export interface EntityCache {
  readonly [cacheKey: string]: Entity;
}

export type EntityId = string;

export type EntityFieldValue =
  | EntityId
  | string
  | boolean
  | number
  | EntityFieldValueArray;

export interface EntityFieldValueArray
  extends ReadonlyArray<EntityFieldValue> {}

export interface Entity {
  readonly [field: string]: null | EntityFieldValue;
}

export interface StaleEntities {
  readonly [cacheKey: string]: StaleEntity | undefined;
}

export interface StaleEntity {
  readonly [field: string]: true | undefined;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Remove readonly
export type MutableDeep<T> = { -readonly [P in keyof T]: MutableDeep<T[P]> }; // Remove readonly deep

/**
 * Fetches an entity from the cache, taking as type parameter the entity
 * has when denormalized, but returning the type it will have as a normalized entity.
 * @param key The cache key
 * @param cache The cache
 */
export function getNormalizedEntity<TDenormalized>(
  key: string,
  cache: EntityCache
): NormalizedEntity<TDenormalized> {
  return cache[key] as any;
}

/**
 * An optimized function to merge two cache objects (as returned from normalize)
 * @param entities The first cache
 * @param newEntities The second cache
 */
export function mergeEntityCache(
  entities: EntityCache,
  newEntities: EntityCache
): EntityCache {
  const updatedEntities = Object.keys(newEntities).reduce(
    (stateSoFar, current) => {
      const newEntity = {
        ...(entities[current] || {}),
        ...newEntities[current]
      };
      stateSoFar[current] = newEntity;
      return stateSoFar;
    },
    {} as {
      // eslint-disable-next-line ts-immutable/readonly-keyword
      [key: string]: any;
    }
  );

  return {
    ...entities,
    ...updatedEntities
  };
}

/**
 * Removes the stale flag for entitiy fields that are present in the normalized result
 */
export function updateStale(
  cache: EntityCache,
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

export type NormalizedEntityField<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends ReadonlyArray<string>
        ? ReadonlyArray<string>
        : T extends ReadonlyArray<boolean>
          ? ReadonlyArray<boolean>
          : T extends ReadonlyArray<number>
            ? ReadonlyArray<number>
            : T extends ReadonlyArray<object>
              ? ReadonlyArray<EntityId>
              : "undefined value";

/**
 * This type maps a denormalized entity type to a normalized entity type.
 * It does it by converting arrays of objects into arrays of EntityId.
 */
export type NormalizedEntity<TDenormalized> = {
  readonly [P in keyof TDenormalized]: NormalizedEntityField<TDenormalized[P]>
};
