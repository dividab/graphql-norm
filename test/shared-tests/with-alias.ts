import gql from "graphql-tag";
import { OneTest } from "./one-test";
import { standardEntities } from "./data/standard-entities";

export const test: OneTest = {
  name: "with alias",
  query: gql`
    query TestQuery {
      posts {
        id
        __typename
        olle: author {
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
  response: {
    data: {
      posts: [
        {
          id: "123",
          __typename: "Post",
          olle: {
            id: "1",
            __typename: "Author",
            name: "Paul"
          },
          title: "My awesome blog post",
          comments: [
            {
              id: "324",
              __typename: "Comment",
              commenter: {
                id: "2",
                __typename: "Author",
                name: "Nicole"
              }
            }
          ]
        }
      ]
    }
  },
  entities: standardEntities
};
