import { normalize } from "../src/normalize";
import { tests } from "./shared-test-data";
import { onlySkip } from "./test-data-utils";

describe("normalize() with shared test data", () => {
  onlySkip(tests).forEach(item => {
    test(item.name, done => {
      const actual = normalize(item.query, item.variables, item.response);
      const expected = item.entities;
      expect(actual).toEqual(expected);
      done();
    });
  });
});
