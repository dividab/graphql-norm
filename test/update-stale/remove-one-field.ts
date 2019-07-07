import { OneTest } from "../update-stale-def";

export const test: OneTest = {
  name: "remove one field",
  normMap: { myid: { id: "myid", name: "foo" } },
  staleBefore: { myid: { name: true, age: true } },
  staleAfter: { myid: { age: true } }
};
