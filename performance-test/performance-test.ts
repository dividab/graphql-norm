import * as BenchMark from "benchmark";
import { normalize } from "../src/normalize";
import { denormalize } from "../src/denormalize";
import * as BigAmountOfData from "../test/shared-tests/test-with-big-amount-of-data.test";

const normalizeSuite = new BenchMark.Suite();

normalizeSuite
  .add("Normalize BigAmountOfData", function() {
    const { query, variables, response } = BigAmountOfData.test;
    normalize(query, variables, response);
  })
  .add("Denormalize BigAmountOfData", function() {
    const { query, variables, entities } = BigAmountOfData.test;
    denormalize(query, variables, entities);
  })
  .on("complete", function(this: any) {
    // tslint:disable-next-line:no-invalid-this
    for (const b of this) {
      console.log(b.toString());
    }

    console.log();
    console.log();
  })
  .run(/* { async: true } */);
