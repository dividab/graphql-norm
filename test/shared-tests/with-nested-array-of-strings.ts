import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";

export const test: OneTest = {
  name: "with nested array of String",
  query: gql`
    query TestQuery {
      tagsArray
    }
  `,
  response: {
    data: {
      tagsArray: [
        ["tag1.1", "tag1.2", "tag1.3"],
        ["tag2.1", "tag2.2", "tag2.3"],
        ["tag3.1", "tag3.2", "tag3.3"]
      ]
    }
  },
  entities: {
    ROOT_QUERY: {
      tagsArray: [
        ["tag1.1", "tag1.2", "tag1.3"],
        ["tag2.1", "tag2.2", "tag2.3"],
        ["tag3.1", "tag3.2", "tag3.3"]
      ]
    }
  }
};
