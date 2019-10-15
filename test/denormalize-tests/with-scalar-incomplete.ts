import gql from "graphql-tag";
import { DenormalizeTestDef } from "../denormalize-test-def";

export const test: DenormalizeTestDef = {
  name: "with scalar query incomplete",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        title
      }
    }
  `,
  data: undefined,
  normMap: {
    ROOT_QUERY: {
      posts: ["Post:123"]
    },
    "Post:123": {
      id: "123",
      __typename: "Post"
    }
  },
  fields: { "Post:123": ["title"] }
};
