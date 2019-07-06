import { OneTest } from "./one-test";

/**
 * When there is no fields left, the entity should be removed from stale
 */
export const test: OneTest = {
  name: "remove last field",
  cache: { myid: { id: "myid", name: "foo" } },
  staleBefore: { myid: { name: true } },
  staleAfter: {}
};
