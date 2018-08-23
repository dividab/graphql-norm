import * as test from "tape";
import { normalize } from "../src/normalize";
import { tests } from "./shared-test-data";
import { onlySkip } from "./test-data-utils";

test.only("normalize() with shared test data", t => {
  onlySkip(tests).forEach(item => {
    t.test(item.name, st => {
      const actual = normalize(item.query, item.variables, item.response);
      const expected = item.entities;
      st.deepEqual(actual, expected, "Normalized data valid");
      st.end();
    });
  });
});
