import gql from "graphql-tag";
import { OneTest } from "./one-test";
import { standardEntities } from "./data/standard-entities";
import { standardResponse } from "./data/standard-response";

export const test: OneTest = {
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
  response: standardResponse,
  entities: standardEntities
};
