import { normalize } from "../src/normalize";
import gql from "graphql-tag";
import { merge } from "../src/norm-map";
import { denormalize } from "../src/denormalize";

describe("merge()", () => {
  test("full value objects", () => {
    const itemA = {
      name: "",
      query: gql`
        query TestQuery {
          user {
            id
            __typename
            address {
              __typename
              city
              region
            }
          }
        }
      `,
      response: {
        user: {
          id: "123",
          __typename: "User",
          address: {
            __typename: "Address",
            city: "Los Leones",
            region: "Miramar"
          }
        }
      }
    };

    const itemB = {
      name: "",
      query: gql`
        query TestQuery {
          users {
            id
            __typename
            address {
              __typename
              city
              region
            }
          }
        }
      `,
      response: {
        users: [
          {
            id: "123",
            __typename: "User",
            address: {
              __typename: "Address",
              city: "Los Leones",
              region: "Miramar"
            }
          }
        ]
      }
    };

    const normMapA = normalize(itemA.query, {}, itemA.response);
    const normMapB = normalize(itemB.query, {}, itemB.response);
    const mergedNormMap = merge(normMapA, normMapB);
    const denormalizedResult = denormalize(itemA.query, {}, mergedNormMap);
    expect(denormalizedResult.data).toBeTruthy();
  });

  // When a value-object (an object with no ID, owned by it's parent) is
  // used, you would expect it to be merged like any other.
  test("partial value objects", () => {
    const itemA = {
      name: "",
      query: gql`
        query TestQuery {
          user {
            id
            __typename
            address {
              __typename
              city
            }
          }
        }
      `,
      response: {
        user: {
          id: "123",
          __typename: "User",
          address: {
            __typename: "Address",
            city: "Los Leones"
          }
        }
      }
    };

    const itemB = {
      name: "",
      query: gql`
        query TestQuery {
          users {
            id
            __typename
            address {
              __typename
              region
            }
          }
        }
      `,
      response: {
        users: [
          {
            id: "123",
            __typename: "User",
            address: {
              __typename: "Address",
              region: "Miramar"
            }
          }
        ]
      }
    };

    const normMapA = normalize(itemA.query, {}, itemA.response);
    const normMapB = normalize(itemB.query, {}, itemB.response);
    const mergedNormMaps = merge(normMapA, normMapB);
    const denormalizedResult = denormalize(itemA.query, {}, mergedNormMaps);

    expect(denormalizedResult.data).toBeTruthy();
  });
});
