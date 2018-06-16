export interface UtilsTest {
  readonly only?: boolean;
  readonly skip?: boolean;
}

/**
 * Helper function to enable only one test to be run
 * in an array of test data
 */
export function onlySkip<T extends UtilsTest>(
  tests: ReadonlyArray<T>
): ReadonlyArray<T> {
  const skips = tests.filter(t => !!!t.skip);
  const onlys = skips.filter(t => t.only === true);
  if (onlys.length > 0) {
    return onlys;
  }
  return skips;
}
