import gql from "graphql-tag";
import { DenormalizeOneTest } from "./denormalize-one-test";

export const test: DenormalizeOneTest = {
  name: "with multiple subtree on same query node",
  only: true,
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
        ...TestFragment
      }
    }

    fragment TestFragment on PostType {
      id
      title
      author {
        id
        __typename
        role
      }
    }
  `,
  partial: false,
  stale: false,
  staleEntities: {},
  response: {
    data: {
      posts: [
        {
          id: "123",
          __typename: "Post",
          author: {
            id: "1",
            __typename: "Author",
            name: "Paul",
            role: "admin"
          },
          title: "My awesome blog post",
          comments: [
            {
              id: 1,
              __typename: "Comment",
              commenter: {
                id: 1,
                __typename: "Commenter",
                name: "olle"
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
      comments: ["Comment;1"]
    },
    "Author;1": {
      id: "1",
      __typename: "Author",
      name: "Paul",
      role: "admin"
    },
    "Comment;1": {
      id: 1,
      __typename: "Comment",
      commenter: "Commenter;1"
    },
    "Commenter;1": {
      id: 1,
      __typename: "Commenter",
      name: "olle"
    }
  }
};
