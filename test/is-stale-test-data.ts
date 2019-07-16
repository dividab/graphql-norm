import { loadTests } from "./test-data-utils";
import { OneTest } from "./is-stale-test-def";

export const tests = loadTests<OneTest>("is-stale/");
