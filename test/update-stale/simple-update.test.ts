import { OneTest } from "./one-test";

export const test: OneTest = {
  name: "simple update",
  cache: { myid: { id: "myid", name: "foo" } },
  staleBefore: { myid: { name: true } },
  staleAfter: {}
};
