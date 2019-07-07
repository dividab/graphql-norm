import { tests } from "./update-stale-data";
import { onlySkip } from "./test-data-utils";
import { updateStale } from "../src/stale";

function deepFreeze(o: any): any {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function") &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}

describe("normalize() with shared test data", () => {
  onlySkip(tests).forEach(item => {
    test(item.name, done => {
      // Freeze the test so we test that the function does not mutate the inputs on any level
      deepFreeze(item);
      const actual = updateStale(item.normMap, item.staleBefore);
      const expected = item.staleAfter;
      expect(actual).toEqual(expected);
      done();
    });
  });
});
