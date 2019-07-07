import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";
import { standardResponse } from "../shared-data/standard-response";
import { standardNormMap } from "../shared-data/standard-norm-map";

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
  data: standardResponse,
  normMap: standardNormMap
};
