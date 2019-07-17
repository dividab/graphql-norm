import { SharedTestDef } from "../shared-test-def";
import gql from "graphql-tag";

export const test: SharedTestDef = {
  name: "with value object",
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
        header {
          title
          subtitle
        }
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
        header: {
          title: "My awesome blog post",
          subtitle: "This is the best post ever"
        },
        comments: [
          {
            id: "324",
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
  },
  normMap: {
    ROOT_QUERY: {
      posts: ["Post;123"]
    },
    "Post;123": {
      id: "123",
      __typename: "Post",
      author: "Author;1",
      header: "Post;123.header",
      comments: ["Comment;324"]
    },
    "Post;123.header": {
      title: "My awesome blog post",
      subtitle: "This is the best post ever"
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
