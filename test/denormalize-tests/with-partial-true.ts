import gql from "graphql-tag";
import { DenormalizeOneTest } from "../denormalize-test-def";

export const test: DenormalizeOneTest = {
  name: "with partial true",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        author {
          id
          __typename
          name
        }
        title
        comments {
          id
          __typename
          commenter {
            id
            __typename
            name
          }
        }
      }
    }
  `,
  partial: true,
  stale: false,
  staleEntities: {},
  response: undefined,
  entities: {
    ROOT_QUERY: {
      posts: ["Post;123"]
    },
    "Post;123": {
      id: "123",
      __typename: "Post",
      author: "Author;1",
      title: "My awesome blog post",
      comments: null
    }
  }
};
