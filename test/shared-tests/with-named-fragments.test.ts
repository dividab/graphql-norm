import gql from "graphql-tag";
import { OneTest } from "./one-test";
import { standardEntities } from "./standard-entities";
import { standardResponse } from "./standard-response";

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
  response: standardResponse,
  entities: standardEntities
};
