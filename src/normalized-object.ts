import { NormKey, NormMap } from "./norm-map";

/**
 * Fetches an object from the cache, taking as type parameter the object
 * has when denormalized, but returning the type it will have as a normalized object.
 * @param key The cache key
 * @param cache The cache
 */
export function getNormalizedObject<TDenormalized>(
  key: string,
  cache: NormMap
): NormalizedObject<TDenormalized> {
  return cache[key] as any;
}

export type NormalizedField<T> = T extends string
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
 * This type maps a denormalized object type to a normalized object type.
 * It does it by converting arrays of objects into arrays of cache keys.
 */
export type NormalizedObject<TDenormalized> = {
  readonly [P in keyof TDenormalized]: NormalizedField<TDenormalized[P]>;
};
