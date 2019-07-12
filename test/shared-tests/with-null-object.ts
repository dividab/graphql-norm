import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";

export const test: SharedTestDef = {
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
  data: {
    postsByIds: [null]
  },
  normMap: {
    ROOT_QUERY: {
      'postsByIds({"ids":["non-existent-id"]})': [null]
    }
  }
};
