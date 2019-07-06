import { tests } from "./update-stale-data";
import { onlySkip } from "./test-data-utils";
import { updateStale } from "../src/entity-cache";
import { deepFreeze } from "./deep-freeze";

describe("normalize() with shared test data", () => {
  onlySkip(tests).forEach(item => {
    test(item.name, done => {
      // Freeze the test so we test that the function does not mutate the inputs on any level
      deepFreeze(item);
      const actual = updateStale(item.cache, item.staleBefore);
      const expected = item.staleAfter;
      expect(actual).toEqual(expected);
      done();
    });
  });
});
