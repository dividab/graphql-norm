import { loadTests } from "./load-tests";
import { OneTest } from "./update-stale-def";

export const tests = loadTests<OneTest>("update-stale/");
