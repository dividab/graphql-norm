import gql from "graphql-tag";
import { OneTest } from "./one-test";

export const test: OneTest = {
  name: "with skip variable true",
  query: gql`
    query TestQuery($noPosts: Boolean!) {
      posts @skip(if: $noPosts) {
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
          }
        }
      }
    }
  `,
  variables: { noPosts: true },
  response: {
    data: {}
  },
  entities: {
    ROOT_QUERY: {}
  },
  only: true
};
