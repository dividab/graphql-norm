import { loadTests } from "./load-tests";
import { OneTest } from "./update-stale/one-test";

export const tests = loadTests<OneTest>("update-stale/");
