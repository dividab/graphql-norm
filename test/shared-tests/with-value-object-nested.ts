import { SharedTestDef } from "../shared-test-def";
import gql from "graphql-tag";

export const test: SharedTestDef = {
  name: "with value object nested",
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
        headers {
          title
          subheader {
            title
          }
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
        headers: [
          {
            title: "My awesome blog post",
            subheader: { title: "This is the best post ever" }
          },
          {
            title: "Alternate awesomeness",
            subheader: { title: "Never better" }
          },
          {
            title: "Also another alternative",
            subheader: { title: "Actually not that good" }
          }
        ],
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
      posts: ["Post:123"]
    },
    "Post:123": {
      id: "123",
      __typename: "Post",
      author: "Author:1",
      headers: [
        "Post:123.headers.0",
        "Post:123.headers.1",
        "Post:123.headers.2"
      ],
      comments: ["Comment:324"]
    },
    "Post:123.headers.0": {
      title: "My awesome blog post",
      subheader: "Post:123.headers.0.subheader"
    },
    "Post:123.headers.0.subheader": {
      title: "This is the best post ever"
    },
    "Post:123.headers.1": {
      title: "Alternate awesomeness",
      subheader: "Post:123.headers.1.subheader"
    },
    "Post:123.headers.1.subheader": {
      title: "Never better"
    },
    "Post:123.headers.2": {
      title: "Also another alternative",
      subheader: "Post:123.headers.2.subheader"
    },
    "Post:123.headers.2.subheader": {
      title: "Actually not that good"
    },
    "Author:1": { id: "1", __typename: "Author", name: "Paul" },
    "Comment:324": {
      id: "324",
      __typename: "Comment",
      commenter: "Author:2"
    },
    "Author:2": { id: "2", __typename: "Author", name: "Nicole" }
  }
};
