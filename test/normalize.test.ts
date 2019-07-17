import { normalize } from "../src/normalize";
import { tests } from "./shared-test-data";
import { onlySkip } from "./test-data-utils";

describe("normalize() with shared test data", () => {
  onlySkip(tests).forEach(item => {
    test(item.name, () => {
      const actual = normalize(item.query, item.variables, item.data);
      const expected = item.normMap;
      expect(actual).toEqual(expected);
    });
  });
});
