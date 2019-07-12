import { loadTests } from "./test-data-utils";
import { SharedTestDef } from "./shared-test-def";

export const tests = loadTests<SharedTestDef>("shared-tests/");
