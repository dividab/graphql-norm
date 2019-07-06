import { loadTests } from "./test-data-utils";
import { OneTest } from "./shared-test-def";

export const tests = loadTests<OneTest>("shared-tests/");
