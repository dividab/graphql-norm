import { OneTest } from "../shared-test-def";
import gql from "graphql-tag";
import { standardResponse } from "../shared-data/standard-response";
import { standardEntities } from "../shared-data/standard-entities";

export const test: OneTest = {
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
  entities: standardEntities
};
