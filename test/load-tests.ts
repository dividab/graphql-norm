import * as fs from "fs";

export function loadTests<T>(path: string): ReadonlyArray<T> {
  const testBasePath = __dirname + "/" + path;
  const importedTests = fs
    .readdirSync(testBasePath)
    // .filter(f => f.match(/\.test\.ts$/i))
    .map(f => require(testBasePath + f))
    .map(importedModule => importedModule.test as T);

  return importedTests;
}
