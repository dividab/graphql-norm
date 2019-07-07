import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";

export const test: OneTest = {
  name: "with object and null in array",
  query: gql`
    query TestQuery($postIds: [ID!]!) {
      postsByIds(ids: $postIds) {
        id
        __typename
        title
      }
    }
  `,
  variables: { postIds: ["123", "non-existent-id"] },
  data: {
    postsByIds: [
      {
        id: "123",
        __typename: "Post",
        title: "My awesome blog post"
      },
      null
    ]
  },
  normMap: {
    ROOT_QUERY: {
      'postsByIds({"ids":["123","non-existent-id"]})': ["Post;123", null]
    },
    "Post;123": {
      id: "123",
      __typename: "Post",
      title: "My awesome blog post"
    }
  }
};
