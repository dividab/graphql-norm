import * as BenchMark from "benchmark";
import { normalize } from "../src/normalize";
import { denormalize } from "../src/denormalize";
import * as BigAmountOfData from "./test-with-big-amount-of-data";

const normalizeSuite = new BenchMark.Suite();

normalizeSuite
  .add("Normalize BigAmountOfData", function() {
    const { query, variables, data } = BigAmountOfData.test;
    normalize(query, variables, data);
  })
  .add("Denormalize BigAmountOfData", function() {
    const { query, variables, data } = BigAmountOfData.test;
    denormalize(query, variables, data);
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
