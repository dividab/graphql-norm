import { denormalize } from "../src/denormalize";
// import * as SharedTests from "./shared-test-data";
import * as TestDataDenormalization from "./denormalize-test-data";
import { onlySkip } from "./test-data-utils";

// describe("denormalize() with shared test data", () => {
//   onlySkip(SharedTests.tests).forEach(item => {
//     test(item.name, done => {
//       const actual = denormalize(item.query, item.variables, item.entities, {});
//       const expected = item.response;
//       expect(actual.response).toEqual(expected);
//       done();
//     });
//   });
// });

describe("denormalize() with specialized test data", () => {
  onlySkip(TestDataDenormalization.tests).forEach(item => {
    test(item.name, done => {
      const actual = denormalize(
        item.query,
        item.variables,
        item.entities,
        item.staleEntities
      );
      const expected = item.response;
      expect(actual.response).toEqual(expected);
      expect(actual.partial).toBe(!!item.partial);
      expect(actual.stale).toBe(!!item.stale);
      done();
    });
  });
});
