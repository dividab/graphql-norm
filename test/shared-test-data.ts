import { loadTests } from "./load-tests";
import { OneTest } from "./shared-test-def";

export const tests = loadTests<OneTest>("shared-tests/");
