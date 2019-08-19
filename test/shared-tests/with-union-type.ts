import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";

export const test: SharedTestDef = {
  // only: true,
  name: "with union type",
  query: gql`
    query TestQuery {
      booksAndAuthors {
        id
        __typename
        ... on Book {
          title
        }
        ... on Author {
          name
        }
      }
    }
  `,
  data: {
    booksAndAuthors: [
      {
        id: "123",
        __typename: "Book",
        title: "My awesome blog post"
      },
      {
        id: "324",
        __typename: "Author",
        name: "Nicole"
      }
    ]
  },
  normMap: {
    ROOT_QUERY: {
      booksAndAuthors: ["Book:123", "Author:324"]
    },
    "Book:123": {
      id: "123",
      __typename: "Book",
      title: "My awesome blog post"
    },
    "Author:324": {
      id: "324",
      __typename: "Author",
      name: "Nicole"
    }
  }
};
