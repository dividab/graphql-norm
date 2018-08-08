import * as BenchMark from "benchmark";
import { normalize } from "../src/normalize";
import { denormalize } from "../src/denormalize";
/* import * as ArrayOfStringTest from "../test/shared-tests/query-with-array-of-string.test";
import * as NamedFragmentsTest from "../test/shared-tests/with-named-fragments.test";
import * as WithVariablesSimpleNestedList from "../test/shared-tests/with-variables-simple-nested-object.test"; */
import * as BigAmountOfData from "../test/shared-tests/test-with-big-amount-of-data.test";

const normalizeSuite = new BenchMark.Suite();

normalizeSuite
  /*   .add("Array of string test", function() {
    const { query, variables, response } = ArrayOfStringTest.test;
    normalize(query, variables, response);
  })
  .add("NamedFragmentsTest", function() {
    const { query, variables, response } = NamedFragmentsTest.test;
    normalize(query, variables, response);
  })
  .add("WithVariablesSimpleNestedList", function() {
    const { query, variables, response } = WithVariablesSimpleNestedList.test;
    normalize(query, variables, response);
  }) */
  .add("BigAmountOfData", function() {
    const { query, variables, response } = BigAmountOfData.test;
    normalize(query, variables, response);
  })
  .on("complete", function(this: any) {
    // tslint:disable-next-line:no-invalid-this
    console.log("normalization");
    for (const b of this) {
      const name: string = b.name;
      const stats: BenchMark.Stats = b.stats;
      console.log(name, stats.mean * 1000 + "ms");
    }

    console.log();
    console.log();
  })
  .run({ async: true });

const denormalizeSuit = new BenchMark.Suite();
denormalizeSuit
  /*   .add("Array of string test", function() {
    const { query, variables, entities } = ArrayOfStringTest.test;
    denormalize(query, variables, entities);
  })
  .add("NamedFragmentsTest", function() {
    const { query, variables, entities } = NamedFragmentsTest.test;
    denormalize(query, variables, entities);
  })
  .add("WithVariablesSimpleNestedList", function() {
    const { query, variables, entities } = WithVariablesSimpleNestedList.test;
    denormalize(query, variables, entities);
  }) */
  .add("BigAmountOfData", function() {
    const { query, variables, entities } = BigAmountOfData.test;
    denormalize(query, variables, entities);
  })
  .on("complete", function(this: any) {
    // tslint:disable-next-line:no-invalid-this
    console.log("denormalization");
    for (const b of this) {
      const name: string = b.name;
      const stats: BenchMark.Stats = b.stats;
      console.log(name, stats.mean * 1000 + "ms");
    }

    console.log();
    console.log();
  })
  .run({ async: true });
