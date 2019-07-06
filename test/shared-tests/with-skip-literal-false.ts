import gql from "graphql-tag";
import { OneTest } from "./one-test";
import { standardResponse } from "./data/standard-response";
import { standardEntities } from "./data/standard-entities";

export const test: OneTest = {
  name: "with skip literal false",
  query: gql`
    query TestQuery {
      posts @skip(if: false) {
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
  variables: { noPosts: false },
  response: standardResponse,
  entities: standardEntities
};
