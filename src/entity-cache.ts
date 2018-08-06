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
      // tslint:disable-next-line:readonly-keyword
      [key: string]: any;
    }
  );

  return {
    ...entities,
    ...updatedEntities
  };
}

export function updateStaleEntities(
  newEntities: EntityCache,
  staleEntities: StaleEntities
): StaleEntities {
  type MutableStaleEntities = MutableDeep<StaleEntities>;

  const newStaleEntities: MutableStaleEntities = { ...staleEntities };
  for (const staleEntityKey of Object.keys(newStaleEntities)) {
    const newEntity = newEntities[staleEntityKey];

    if (newEntity !== undefined) {
      const staleEntity = newStaleEntities[staleEntityKey];
      const staleEntityKeys = Object.keys(staleEntity || {});

      let staleEntityKeyCount = staleEntityKeys.length;

      for (const staleEntityFieldKey of staleEntityKeys) {
        for (const newEntityFieldKey of Object.keys(newEntity)) {
          if (newEntityFieldKey === staleEntityFieldKey) {
            delete staleEntity![staleEntityFieldKey];
            staleEntityKeyCount--;
          }
        }
      }

      if (staleEntityKeyCount === 0) {
        delete newStaleEntities[staleEntityKey];
      }
    }
  }
  return newStaleEntities;
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
            : T extends ReadonlyArray<Object>
              ? ReadonlyArray<EntityId>
              : "undefined value";

/**
 * This type maps a denormalized entity type to a normalized entity type.
 * It does it by converting arrays of objects into arrays of EntityId.
 */
export type NormalizedEntity<TDenormalized> = {
  readonly [P in keyof TDenormalized]: NormalizedEntityField<TDenormalized[P]>
};
