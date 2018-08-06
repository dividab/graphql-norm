import { loadTests } from "./load-tests";
import { OneTest } from "./shared-tests/one-test";

export const tests = loadTests<OneTest>("shared-tests/");
