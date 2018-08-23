import gql from "graphql-tag";
import { OneTest } from "./one-test";

export const test: OneTest = {
  name: "with skip",
  query: gql`
    query($noProducts: Boolean!) {
      products @skip(if: $noProducts) {
        __typename
        id
      }
    }
  `,
  variables: { noProducts: true },
  response: {
    data: {}
  },
  entities: {
    ROOT_QUERY: {}
  },
  only: true
};
