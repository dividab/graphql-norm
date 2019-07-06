import { loadTests } from "./load-tests";
import { DenormalizeOneTest } from "./denormalize-test-def";

export const tests = loadTests<DenormalizeOneTest>("denormalize-tests/");
