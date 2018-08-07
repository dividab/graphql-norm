import gql from "graphql-tag";
import { OneTest } from "./one-test";

const fallbackId1 = 'ROOT_QUERY.posts.0.comments({"a":{"b":"1","c":"asd"}}).0';
const fallbackId2 = 'ROOT_QUERY.posts.0.comments({"a":{"b":"1","c":"asd"}}).1';
export const test: OneTest = {
  // only: true,
  name: "with missing id",
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
        comments(a: { b: 1, c: "asd" }) {
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
  response: {
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
          comments: [
            {
              __typename: "Comment",
              commenter: {
                id: "2",
                __typename: "Author",
                name: "Nicole"
              }
            },
            {
              __typename: "Comment",
              commenter: {
                id: "2",
                __typename: "Author",
                name: "Nicole"
              }
            }
          ]
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
      author: "Author;1",
      title: "My awesome blog post",
      'comments({"a":{"b":"1","c":"asd"}})': [fallbackId1, fallbackId2]
    },
    "Author;1": { id: "1", __typename: "Author", name: "Paul" },
    [fallbackId1]: {
      __typename: "Comment",
      commenter: "Author;2"
    },
    [fallbackId2]: {
      __typename: "Comment",
      commenter: "Author;2"
    },
    "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
  }
};
