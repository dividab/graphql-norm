import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";
import { standardNormMap } from "../shared-data/standard-norm-map";
import { standardResponse } from "../shared-data/standard-response";

export const test: SharedTestDef = {
  name: "with inline fragments",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        ... on Post {
          author {
            ... on Author {
              id
              __typename
              name
            }
          }
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
  data: standardResponse,
  normMap: standardNormMap
};
