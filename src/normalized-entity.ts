import { NormKey, NormMap } from "entity-cache";

/**
 * Fetches an entity from the cache, taking as type parameter the entity
 * has when denormalized, but returning the type it will have as a normalized entity.
 * @param key The cache key
 * @param cache The cache
 */
export function getNormalizedEntity<TDenormalized>(
  key: string,
  cache: NormMap
): NormalizedEntity<TDenormalized> {
  return cache[key] as any;
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
  ? ReadonlyArray<NormKey>
  : "undefined value";

/**
 * This type maps a denormalized entity type to a normalized entity type.
 * It does it by converting arrays of objects into arrays of EntityId.
 */
export type NormalizedEntity<TDenormalized> = {
  readonly [P in keyof TDenormalized]: NormalizedEntityField<TDenormalized[P]>;
};
