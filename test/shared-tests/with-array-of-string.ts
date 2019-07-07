import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";

export const test: SharedTestDef = {
  name: "with array of String",
  query: gql`
    query TestQuery {
      tags
    }
  `,
  data: {
    tags: ["tag1", "tag2", "tag3"]
  },
  normMap: {
    ROOT_QUERY: {
      tags: ["tag1", "tag2", "tag3"]
    }
  }
};
