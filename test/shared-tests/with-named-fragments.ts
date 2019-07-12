import gql from "graphql-tag";
import { SharedTestDef } from "../shared-test-def";
import { standardNormMap } from "../shared-data/standard-norm-map";
import { standardResponse } from "../shared-data/standard-response";

export const test: SharedTestDef = {
  name: "with named fragments",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        author {
          ...olle
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

    fragment olle on Author {
      id
      __typename
      name
    }
  `,
  data: standardResponse,
  normMap: standardNormMap
};
