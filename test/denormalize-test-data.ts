import { loadTests } from "./load-tests";
import { DenormalizeOneTest } from "./denormalize-tests/denormalize-one-test";

export const tests = loadTests<DenormalizeOneTest>("denormalize-tests/");
