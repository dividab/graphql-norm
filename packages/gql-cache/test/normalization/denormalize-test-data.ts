// tslint:disable:max-file-line-count
import { GraphQLResponse, Variables } from "../../src/normalization/types";
import gql from "graphql-tag";
import * as GraphQL from "graphql";
import { EntityCache, StaleEntities } from "../../src/cache/entity-cache";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly query: GraphQL.DocumentNode;
  readonly variables?: Variables;
  readonly response: GraphQLResponse | undefined;
  readonly entities: EntityCache;
  readonly partial: boolean;
  readonly stale: boolean;
  readonly staleEntities: StaleEntities;
}

export const tests: ReadonlyArray<OneTest> = [
  {
    name: "with partial false",
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
    partial: false,
    stale: false,
    staleEntities: {},
    response: {
      data: {
        posts: [
          {
            id: "123",
            __typename: "Post",
            author: {
              id: "1",
              __typename: "Author",
              name: "Paul"
            },
            title: "My awesome blog post",
            comments: null
          }
        ]
      }
    },
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        comments: null
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" }
    }
  },
  {
    name: "with partial true",
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
    partial: true,
    stale: false,
    staleEntities: {},
    response: undefined,
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        comments: null
      }
    }
  },
  {
    name: "with stale false",
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
    partial: false,
    stale: false,
    staleEntities: {
      "Post;555": {
        author: true,
        title: true,
        comments: true
      }
    },
    response: {
      data: {
        posts: [
          {
            id: "123",
            __typename: "Post",
            author: {
              id: "1",
              __typename: "Author",
              name: "Paul"
            },
            title: "My awesome blog post",
            comments: null
          }
        ]
      }
    },
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        comments: null
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" }
    }
  } as OneTest,
  {
    name: "with stale true",
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
    partial: false,
    stale: true,
    staleEntities: {
      "Post;123": {
        author: true,
        title: true,
        comments: true
      }
    },
    response: {
      data: {
        posts: [
          {
            id: "123",
            __typename: "Post",
            author: {
              id: "1",
              __typename: "Author",
              name: "Paul"
            },
            title: "My awesome blog post",
            comments: null
          }
        ]
      }
    },
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        comments: null
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" }
    }
  } as OneTest
];
