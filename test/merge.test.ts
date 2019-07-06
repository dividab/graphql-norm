import { normalize } from "../src/normalize";
import gql from "graphql-tag";
import { merge } from "../src/entity-cache";
import { denormalize } from "../src/denormalize";

describe("merge()", () => {
  test("full value objects", done => {
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
        data: {
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
        data: {
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
      }
    };

    const entitiesA = normalize(itemA.query, {}, itemA.response);
    const entitiesB = normalize(itemB.query, {}, itemB.response);
    const mergedEntities = merge(entitiesA, entitiesB);
    const denormalizedResult = denormalize(itemA.query, {}, mergedEntities);

    expect(denormalizedResult.partial).toBe(false);
    done();
  });
  /*
  // When a value-object (an object with no ID, owned by it's parent) is
  // used, you would expect it to be merged like any other.
  t.test("partial value objects", st => {
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
        data: {
          user: {
            id: "123",
            __typename: "User",
            address: {
              __typename: "Address",
              city: "Los Leones"
            }
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
        data: {
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
      }
    };

    const entitiesA = normalize(itemA.query, {}, itemA.response);
    const entitiesB = normalize(itemB.query, {}, itemB.response);
    const mergedEntities = merge(entitiesA, entitiesB);
    const denormalizedResult = denormalize(itemA.query, {}, mergedEntities);

    st.equal(
      denormalizedResult.partial,
      false,
      "Denormalized result is correct."
    );
    st.end();
  });
  */
});
