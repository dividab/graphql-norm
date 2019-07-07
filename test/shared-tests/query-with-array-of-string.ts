import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";

export const test: OneTest = {
  name: "query with array of strings",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        tags
      }
    }
  `,
  data: {
    posts: [
      {
        id: "123",
        __typename: "Post",
        tags: ["olle", "kalle"]
      }
    ]
  },
  normMap: {
    ROOT_QUERY: {
      posts: ["Post;123"]
    },
    "Post;123": {
      id: "123",
      __typename: "Post",
      tags: ["olle", "kalle"]
    }
  }
};
