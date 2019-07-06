import gql from "graphql-tag";
import { OneTest } from "./one-test";

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
  response: {
    data: {
      posts: [
        {
          id: "123",
          __typename: "Post",
          tags: ["olle", "kalle"]
        }
      ]
    }
  },
  entities: {
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
