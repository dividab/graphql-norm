import * as test from "tape";
import { tests } from "./update-stale-test-data";
import { onlySkip } from "./test-data-utils";
import { updateStale } from "../src/entity-cache";
import { deepFreeze } from "./deep-freeze";

test("normalize() with shared test data", t => {
  onlySkip(tests).forEach(item => {
    t.test(item.name, st => {
      // Freeze the test so we test that the function does not mutate the inputs on any level
      deepFreeze(item);
      const actual = updateStale(item.cache, item.staleBefore);
      const expected = item.staleAfter;
      st.deepEqual(actual, expected, "Update stale valid");
      st.end();
    });
  });
});
