import * as test from "tape";
import { tests } from "./shared-test-data";
import { onlySkip } from "./test-data-utils";
import { updateStale } from "../src/entity-cache";

test("normalize() with shared test data", t => {
  onlySkip(tests).forEach(item => {
    t.test(item.name, st => {
      const actual = updateStale(item.cache, item.staleBefore);
      const expected = item.entities;
      st.deepEqual(actual, expected, "Update stale valid");
      st.end();
    });
  });
});
