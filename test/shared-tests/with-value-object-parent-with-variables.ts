import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";

export const test: SharedTestDef = {
  name: "with value object parent with variables",
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
        comments(a: 1) {
          body
        }
      }
    }
  `,
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
            body: "The comment"
          }
        ]
      }
    ]
  },
  normMap: {
    ROOT_QUERY: {
      posts: ["Post:123"]
    },
    "Post:123": {
      id: "123",
      __typename: "Post",
      author: "Author:1",
      title: "My awesome blog post",
      'comments({"a":"1"})': ['Post:123.comments({"a":"1"}).0']
    },
    "Author:1": { id: "1", __typename: "Author", name: "Paul" },
    'Post:123.comments({"a":"1"}).0': {
      body: "The comment"
    }
  }
};
