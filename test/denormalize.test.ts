import * as test from "tape";
import { denormalize } from "../src/denormalize";
import * as SharedTests from "./shared-test-data";
import * as TestDataDenormalization from "./denormalize-test-data";
import { onlySkip } from "./test-data-utils";

test.only("denormalize() with shared test data", t => {
  onlySkip(SharedTests.tests).forEach(item => {
    t.test(item.name, st => {
      const actual = denormalize(item.query, item.variables, item.entities, {});
      const expected = item.response;
      st.deepEqual(actual.response, expected, "Denormalized data valid");
      st.end();
    });
  });
});

test("denormalize() with specialized test data", t => {
  onlySkip(TestDataDenormalization.tests).forEach(item => {
    t.test(item.name, st => {
      const actual = denormalize(
        item.query,
        item.variables,
        item.entities,
        item.staleEntities
      );
      const expected = item.response;
      st.deepEqual(actual.response, expected, "Denormalized data valid");
      st.equal(
        actual.partial,
        !!item.partial,
        `Partial should be ${item.partial}`
      );
      st.equal(actual.stale, !!item.stale, `Stale should be ${item.stale}`);
      st.end();
    });
  });
});
