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

interface EntityFieldValueArray extends ReadonlyArray<EntityFieldValue> {}

export interface Entity {
  readonly [field: string]:
    | null
    | EntityFieldValue
    | ReadonlyArray<EntityFieldValue>;
}

export interface StaleEntities {
  readonly [cacheKey: string]: StaleEntity | undefined;
}

export interface StaleEntity {
  readonly [field: string]: true | undefined;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Remove readonly
export type MutableDeep<T> = { -readonly [P in keyof T]: MutableDeep<T[P]> }; // Remove readonly deep

export function getNormalizedEntity<TDenormalized>(
  key: string,
  cache: EntityCache
): NormalizedEntity<TDenormalized> {
  return cache[key] as any;
}

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
  // interface MutableStaleEntity {
  //   // tslint:disable-next-line:readonly-keyword
  //   [field: string]: StaleVariables | null | undefined;
  // }
  // interface MutableStaleEntities {
  //   // tslint:disable-next-line:readonly-keyword
  //   [key: string]: MutableStaleEntity | undefined;
  // }

  // type MutableStaleEntity = Mutable<StaleEntity>;
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
