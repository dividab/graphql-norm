import { tests } from "./is-stale-test-data";
import { onlySkip } from "./test-data-utils";
import { isStale } from "../src/stale";

describe("isStale() with special test data", () => {
  onlySkip(tests).forEach(item => {
    test(item.name, done => {
      const actual = isStale(
        item.staleMap,
        Object.fromEntries(
          Object.entries(item.fields).map(([key, value]) => [
            key,
            new Set(value)
          ])
        )
      );
      expect(actual).toBe(item.isStale);
      done();
    });
  });
});
