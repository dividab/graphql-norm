import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";
import { standardResponse } from "../shared-data/standard-response";
import { standardEntities } from "../shared-data/standard-entities";

export const test: OneTest = {
  name: "with skip variable false",
  query: gql`
    query TestQuery($noPosts: Boolean!) {
      posts @include(if: $noPosts) {
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
  data: standardResponse,
  entities: standardEntities
};
