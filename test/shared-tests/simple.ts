import { SharedTestDef } from "../shared-test-def";
import gql from "graphql-tag";
import { standardResponse } from "../shared-data/standard-response";
import { standardNormMap } from "../shared-data/standard-norm-map";

export const test: SharedTestDef = {
  name: "simple",
  query: gql`
    query TestQuery {
      posts {
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
  data: standardResponse,
  normMap: standardNormMap
};
