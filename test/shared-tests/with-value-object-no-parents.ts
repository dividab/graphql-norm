import { SharedTestDef } from "../shared-test-def";
import gql from "graphql-tag";

export const test: SharedTestDef = {
  name: "with value object no parents",
  query: gql`
    query TestQuery {
      address {
        street
      }
      posts {
        title
      }
    }
  `,
  data: {
    address: { street: "mainstreet" },
    posts: [
      {
        title: "My awesome blog post"
      },
      {
        title: "My awesome blog post2"
      }
    ]
  },
  normMap: {
    ROOT_QUERY: {
      address: "ROOT_QUERY.address",
      posts: ["ROOT_QUERY.posts.0", "ROOT_QUERY.posts.1"]
    },
    "ROOT_QUERY.address": { street: "mainstreet" },
    "ROOT_QUERY.posts.0": { title: "My awesome blog post" },
    "ROOT_QUERY.posts.1": { title: "My awesome blog post2" }
  }
};
