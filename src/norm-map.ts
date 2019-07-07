export interface NormMap {
  readonly [key: string]: NormObj;
}

export type NormKey = string;

export type NormFieldValue =
  | NormKey
  | string
  | boolean
  | number
  | null
  | NormFieldValueArray;

export interface NormFieldValueArray extends ReadonlyArray<NormFieldValue> {}

export interface NormObj {
  readonly [field: string]: null | NormFieldValue;
}

/**
 * An optimized function to merge two maps of normalized objects (as returned from normalize)
 * @param normMap The first cache
 * @param newNormMap The second cache
 */
export function merge(normMap: NormMap, newNormMap: NormMap): NormMap {
  const updatedNormMap = Object.keys(newNormMap).reduce(
    (stateSoFar, current) => {
      const newNormObj = {
        ...(normMap[current] || {}),
        ...newNormMap[current]
      };
      stateSoFar[current] = newNormObj;
      return stateSoFar;
    },
    {} as {
      // eslint-disable-next-line ts-immutable/readonly-keyword
      [key: string]: any;
    }
  );

  return {
    ...normMap,
    ...updatedNormMap
  };
}
