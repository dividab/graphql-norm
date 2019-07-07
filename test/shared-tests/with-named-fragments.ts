import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";
import { standardEntities } from "../shared-data/standard-entities";
import { standardResponse } from "../shared-data/standard-response";

export const test: OneTest = {
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
  entities: standardEntities
};
