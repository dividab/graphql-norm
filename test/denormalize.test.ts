import { denormalize } from "../src/denormalize";
import * as SharedTests from "./shared-test-data";
import * as TestDataDenormalization from "./denormalize-test-data";
import { onlySkip } from "./test-data-utils";

describe("denormalize() with shared test data", () => {
  onlySkip(SharedTests.tests).forEach(item => {
    test(item.name, done => {
      const actual = denormalize(item.query, item.variables, item.normMap);
      expect(actual.data).toEqual(item.data);
      done();
    });
  });
});

describe("denormalize() with specialized test data", () => {
  onlySkip(TestDataDenormalization.tests).forEach(item => {
    test(item.name, done => {
      const actual = denormalize(item.query, item.variables, item.normMap);
      expect(actual.data).toEqual(item.data);
      expect(actual.fields).toEqual(
        Object.fromEntries(
          Object.entries(item.fields).map(([key, value]) => [
            key,
            new Set(value)
          ])
        )
      );
      done();
    });
  });
});
