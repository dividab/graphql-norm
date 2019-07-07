export interface EntityCache {
  readonly [cacheKey: string]: Entity;
}

export type EntityId = string;

export type EntityFieldValue =
  | EntityId
  | string
  | boolean
  | number
  | null
  | EntityFieldValueArray;

export interface EntityFieldValueArray
  extends ReadonlyArray<EntityFieldValue> {}

export interface Entity {
  readonly [field: string]: null | EntityFieldValue;
}

/**
 * An optimized function to merge two cache objects (as returned from normalize)
 * @param entities The first cache
 * @param newEntities The second cache
 */
export function merge(
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
