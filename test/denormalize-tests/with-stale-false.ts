import gql from "graphql-tag";
import { DenormalizeOneTest } from "../denormalize-test-def";

export const test: DenormalizeOneTest = {
  name: "with stale false",
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
  partial: false,
  stale: false,
  staleMap: {
    "Post;555": {
      author: true,
      title: true,
      comments: true
    }
  },
  data: {
    posts: [
      {
        id: "123",
        __typename: "Post",
        author: {
          id: "1",
          __typename: "Author",
          name: "Paul"
        },
        title: "My awesome blog post",
        comments: null
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
      author: "Author;1",
      title: "My awesome blog post",
      comments: null
    },
    "Author;1": { id: "1", __typename: "Author", name: "Paul" }
  }
};
