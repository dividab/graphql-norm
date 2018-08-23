import gql from "graphql-tag";
import { OneTest } from "./one-test";

export const test: OneTest = {
  name: "with skip literal true",
  query: gql`
    query TestQuery {
      posts @skip(if: true) {
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
  }
};
