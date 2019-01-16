import gql from "graphql-tag";
import { OneTest } from "./one-test";

export const test: OneTest = {
  name: "with null object",
  query: gql`
    query TestQuery($postIds: [ID!]!) {
      postsByIds(ids: $postIds) {
        id
        __typename
        title
      }
    }
  `,
  variables: { postIds: ["non-existent-id"] },
  response: {
    data: {
      postsByIds: [null]
    }
  },
  entities: {
    ROOT_QUERY: {
      postsByIds: [null]
    }
  }
};
