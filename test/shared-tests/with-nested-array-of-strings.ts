import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";

export const test: SharedTestDef = {
  name: "with nested array of String",
  query: gql`
    query TestQuery {
      tagsArray
    }
  `,
  data: {
    tagsArray: [
      ["tag1.1", "tag1.2", "tag1.3"],
      ["tag2.1", "tag2.2", "tag2.3"],
      ["tag3.1", "tag3.2", "tag3.3"]
    ]
  },
  normMap: {
    ROOT_QUERY: {
      tagsArray: [
        ["tag1.1", "tag1.2", "tag1.3"],
        ["tag2.1", "tag2.2", "tag2.3"],
        ["tag3.1", "tag3.2", "tag3.3"]
      ]
    }
  }
};
