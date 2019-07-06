import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";
import { standardResponse } from "../shared-data/standard-response";

export const test: OneTest = {
  name: "with variables simple boolean external",
  query: gql`
    query TestQuery($a: Boolean) {
      posts {
        id
        __typename
        author {
          id
          __typename
          name
        }
        title
        comments(b: $a) {
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
  variables: { a: true },
  response: standardResponse,
  entities: {
    ROOT_QUERY: {
      posts: ["Post;123"]
    },
    "Post;123": {
      id: "123",
      __typename: "Post",
      author: "Author;1",
      title: "My awesome blog post",
      'comments({"b":true})': ["Comment;324"]
    },
    "Author;1": { id: "1", __typename: "Author", name: "Paul" },
    "Comment;324": {
      id: "324",
      __typename: "Comment",
      commenter: "Author;2"
    },
    "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
  }
};
