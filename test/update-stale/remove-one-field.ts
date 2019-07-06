import { OneTest } from "./one-test";

export const test: OneTest = {
  name: "remove one field",
  cache: { myid: { id: "myid", name: "foo" } },
  staleBefore: { myid: { name: true, age: true } },
  staleAfter: { myid: { age: true } }
};
