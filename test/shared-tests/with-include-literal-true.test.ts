import gql from "graphql-tag";
import { OneTest } from "./one-test";
import { standardResponse } from "./standard-response";
import { standardEntities } from "./standard-entities";

export const test: OneTest = {
  name: "with skip literal false",
  query: gql`
    query TestQuery {
      posts @include(if: true) {
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
