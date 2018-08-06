import * as fs from "fs";
import { OneTest } from "./shared-tests/one-test";

const testBasePath = __dirname + "/shared-tests/";
const importedTests = fs
  .readdirSync(testBasePath)
  .filter(f => f.match(/\.test\.ts$/i))
  .map(f => require(testBasePath + f))
  .map(importedModule => importedModule.test as OneTest);

export const tests = importedTests;
