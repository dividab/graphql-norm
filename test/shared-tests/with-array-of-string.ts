import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";

export const test: OneTest = {
  name: "with array of String",
  query: gql`
    query TestQuery {
      tags
    }
  `,
  data: {
    tags: ["tag1", "tag2", "tag3"]
  },
  entities: {
    ROOT_QUERY: {
      tags: ["tag1", "tag2", "tag3"]
    }
  }
};
