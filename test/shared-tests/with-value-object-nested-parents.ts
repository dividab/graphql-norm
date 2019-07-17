import { SharedTestDef } from "../shared-test-def";
import gql from "graphql-tag";

export const test: SharedTestDef = {
  name: "with value object nested parents",
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
            address {
              street
              town
            }
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
        title: "My awesome blog post",
        comments: [
          {
            id: "324",
            __typename: "Comment",
            commenter: {
              id: "2",
              __typename: "Author",
              name: "Nicole",
              address: {
                street: "Nicolestreet",
                town: "Nicoletown"
              }
            }
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
      comments: ["Comment:324"]
    },
    "Author:1": { id: "1", __typename: "Author", name: "Paul" },
    "Comment:324": {
      id: "324",
      __typename: "Comment",
      commenter: "Author:2"
    },
    "Author:2": {
      id: "2",
      __typename: "Author",
      name: "Nicole",
      address: "Author:2.address"
    },
    "Author:2.address": { street: "Nicolestreet", town: "Nicoletown" }
  }
};
