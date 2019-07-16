import { NormMap } from "./norm-map";
import { FieldsMap } from "./types";

export interface StaleMap {
  readonly [key: string]: StaleFields | undefined;
}

export interface StaleFields {
  readonly [field: string]: true | undefined;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Remove readonly

/**
 * Removes the stale flag for fields that are present in the normalized result
 */
export function updateStale(normMap: NormMap, staleMap: StaleMap): StaleMap {
  type MutableStaleMap = Mutable<StaleMap>;

  // Make a shallow copy to enable shallow mutation
  const staleCopy: MutableStaleMap = { ...staleMap };

  // Check all stale fields against the normalized map
  for (const staleKey of Object.keys(staleCopy)) {
    const normObj = normMap[staleKey];
    if (normObj !== undefined) {
      const staleFields = staleCopy[staleKey];
      const staleFieldKeys = Object.keys(staleFields || {});

      let staleFieldKeyCount = staleFieldKeys.length;

      // Check all fields of the stale normalized object against the corresponding normalized object in normalized map
      // If a field exists in the normalized map, then it should not be stale anymore
      let staleFieldsCopy: Mutable<StaleFields> | undefined = undefined;
      for (const staleFieldKey of staleFieldKeys) {
        for (const normField of Object.keys(normObj)) {
          if (normField === staleFieldKey) {
            if (!staleFieldsCopy) {
              staleFieldsCopy = { ...staleFields };
              staleCopy[staleKey] = staleFieldsCopy;
            }
            delete staleFieldsCopy[staleFieldKey];
            staleFieldKeyCount--;
          }
        }
      }

      // If the normalized object has no stale fields then remove it from stale
      if (staleFieldKeyCount === 0) {
        delete staleCopy[staleKey];
      }
    }
  }
  return staleCopy;
}

/**
 * Checks if any of the provided fields are stale
 */
export function isStale(fields: FieldsMap, staleMap: StaleMap): boolean {
  for (const key in Object.keys(fields)) {
    for (const field in fields[key]) {
      const staleObj = staleMap[key];
      if (staleObj && staleObj[field]) {
        return true;
      }
    }
  }
  return false;
}
