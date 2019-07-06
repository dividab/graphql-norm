import { loadTests } from "./test-data-utils";
import { DenormalizeOneTest } from "./denormalize-test-def";

export const tests = loadTests<DenormalizeOneTest>("denormalize-tests/");
