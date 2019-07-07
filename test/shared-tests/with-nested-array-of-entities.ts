import gql from "graphql-tag";
import { OneTest } from "../shared-test-def";

export const test: OneTest = {
  name: "with nested arrays of entities",
  // only: true,
  // skip: true,
  query: gql`
    query TestQuery {
      table {
        id
        __typename
        rows {
          id
          __typename
          value
        }
      }
    }
  `,
  data: {
    table: {
      id: "T1",
      __typename: "Table",
      rows: [
        [
          { id: "1.1", __typename: "Cell", value: "value 1.1" },
          { id: "1.2", __typename: "Cell", value: "value 1.2" }
        ],
        [
          { id: "2.1", __typename: "Cell", value: "value 2.1" },
          { id: "2.2", __typename: "Cell", value: "value 2.2" }
        ],
        [
          { id: "3.1", __typename: "Cell", value: "value 3.1" },
          { id: "3.2", __typename: "Cell", value: "value 3.2" }
        ]
      ]
    }
  },
  entities: {
    ROOT_QUERY: {
      table: "Table;T1"
    },
    "Table;T1": {
      id: "T1",
      __typename: "Table",
      rows: [
        ["Cell;1.1", "Cell;1.2"],
        ["Cell;2.1", "Cell;2.2"],
        ["Cell;3.1", "Cell;3.2"]
      ]
    },
    "Cell;1.1": {
      id: "1.1",
      __typename: "Cell",
      value: "value 1.1"
    },
    "Cell;1.2": {
      id: "1.2",
      __typename: "Cell",
      value: "value 1.2"
    },
    "Cell;2.1": {
      id: "2.1",
      __typename: "Cell",
      value: "value 2.1"
    },
    "Cell;2.2": {
      id: "2.2",
      __typename: "Cell",
      value: "value 2.2"
    },
    "Cell;3.1": {
      id: "3.1",
      __typename: "Cell",
      value: "value 3.1"
    },
    "Cell;3.2": {
      id: "3.2",
      __typename: "Cell",
      value: "value 3.2"
    }
  }
};
