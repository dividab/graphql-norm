import gql from "graphql-tag";
import { DenormalizeOneTest } from "./denormalize-one-test";

export const test: DenormalizeOneTest = {
  name: "with reserved keywords",
  only: true,
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        isProtoTypeOf {
          id
          __typename
          value
        }
        title
        hasOwnProperty {
          id
          __typename
          name
        }
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
          isProtoTypeOf: [
            {
              id: "1",
              __typename: "Value",
              value: 1
            },
            {
              id: "2",
              __typename: "Value",
              value: 2
            }
          ],
          title: "My awesome blog post",
          hasOwnProperty: {
            id: "1",
            __typename: "Commenter",
            name: "olle"
          }
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
      isProtoTypeOf: ["Value;1", "Value;2"],
      title: "My awesome blog post",
      hasOwnProperty: "Commenter;1"
    },
    "Author;1": { id: "1", __typename: "Author", name: "Paul" },
    "Author;2": { id: "2", __typename: "Author", name: "Paul2" },
    "Value;1": { id: "1", __typename: "Value", value: 1 },
    "Value;2": { id: "2", __typename: "Value", value: 2 },
    "Commenter;1": { id: "1", __typename: "Commenter", name: "olle" }
  }
};
