import { loadTests } from "./test-data-utils";
import { DenormalizeTestDef } from "./denormalize-test-def";

export const tests = loadTests<DenormalizeTestDef>("denormalize-tests/");
