import gql from "graphql-tag";
import { DenormalizeOneTest } from "../denormalize-test-def";

export const test: DenormalizeOneTest = {
  name: "with partial scalar true",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        title
      }
    }
  `,
  partial: true,
  stale: false,
  staleMap: {},
  data: undefined,
  normMap: {
    ROOT_QUERY: {
      posts: ["Post;123"]
    },
    "Post;123": {
      id: "123",
      __typename: "Post"
    }
  }
};
