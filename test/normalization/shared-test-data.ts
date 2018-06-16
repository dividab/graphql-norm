// tslint:disable:max-file-line-count
import {
  GraphQLResponse,
  // Entities,
  Variables
} from "../../src/normalization/types";
import gql from "graphql-tag";
import * as GraphQL from "graphql";
import { EntityCache } from "../../src/cache/entity-cache";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly query: GraphQL.DocumentNode;
  readonly variables?: Variables;
  readonly response: GraphQLResponse;
  readonly entities: EntityCache;
}

const standardResponse = {
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
};

const standardEntities = {
  ROOT_QUERY: {
    posts: ["Post;123"]
  },
  "Post;123": {
    id: "123",
    __typename: "Post",
    author: "Author;1",
    title: "My awesome blog post",
    comments: ["Comment;324"]
  },
  "Author;1": { id: "1", __typename: "Author", name: "Paul" },
  "Comment;324": {
    id: "324",
    __typename: "Comment",
    commenter: "Author;2"
  },
  "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
};

/*
export const tests2: ReadonlyArray<OneTest> = [
  {
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        title: "My awesome blog post",
        comments: ["Comment;324"],
        author: "Author;1"
      },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" }
    }
  } as OneTest
];
*/

export const tests: ReadonlyArray<OneTest> = [
  {
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
    response: standardResponse,
    entities: standardEntities
  } as OneTest,
  {
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
  } as OneTest,
  {
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
  } as OneTest,
  {
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
  } as OneTest,
  {
    name: "with variables simple int",
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
          comments(a: 1) {
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"a":"1"})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  } as OneTest,
  {
    name: "with variables simple boolean",
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
          comments(a: true) {
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"a":true})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  } as OneTest,
  {
    name: "with variables simple list",
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
          comments(a: [1, 2]) {
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"a":["1","2"]})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  } as OneTest,
  {
    name: "with variables simple object",
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
          comments(a: { b: 1, c: "asd" }) {
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"a":{"b":"1","c":"asd"}})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  },
  {
    name: "with variables simple nested object",
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
          comments(a: { b: 1, c: { d: 1, e: "asdf" } }) {
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"a":{"b":"1","c":{"d":"1","e":"asdf"}}})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  },
  {
    name: "with variables simple boolean",
    query: gql`
      query TestQuery($a: Boolean) {
        posts {
          id
          __typename
          author {
            id
            __typename
            name
          }
          title
          comments(b: $a) {
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
    variables: { a: true },
    response: standardResponse,
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"b":true})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  },
  {
    name: "with variables simple boolean",
    query: gql`
      query TestQuery($a: Boolean) {
        posts {
          id
          __typename
          author {
            id
            __typename
            name
          }
          title
          comments(b: $a) {
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
    variables: { a: true },
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: "Author;1",
        title: "My awesome blog post",
        'comments({"b":true})': ["Comment;324"]
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul" },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  },
  {
    name: "with null values",
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
    response: {
      data: {
        posts: [
          {
            id: "123",
            __typename: "Post",
            author: null,
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
    entities: {
      ROOT_QUERY: {
        posts: ["Post;123"]
      },
      "Post;123": {
        id: "123",
        __typename: "Post",
        author: null,
        title: "My awesome blog post",
        comments: ["Comment;324"]
      },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;2"
      },
      "Author;2": { id: "2", __typename: "Author", name: "Nicole" }
    }
  },
  {
    name: "with deep null values",
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
    name: "query with array of strings",
    query: gql`
      query TestQuery {
        posts {
          id
          __typename
          tags
        }
      }
    `,
    response: {
      data: {
        posts: [
          {
            id: "123",
            __typename: "Post",
            tags: ["olle", "kalle"]
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
        tags: ["olle", "kalle"]
      }
    }
  } as OneTest,
  {
    name: "same entity twice in response but with different fields",
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
              age
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
            author: {
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
                  id: "1",
                  __typename: "Author",
                  name: "Paul",
                  age: 33
                }
              }
            ]
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
        comments: ["Comment;324"]
      },
      "Comment;324": {
        id: "324",
        __typename: "Comment",
        commenter: "Author;1"
      },
      "Author;1": { id: "1", __typename: "Author", name: "Paul", age: 33 }
    }
  },
  {
    name: "with array of String",
    query: gql`
      query TestQuery {
        tags
      }
    `,
    response: {
      data: {
        tags: ["tag1", "tag2", "tag3"]
      }
    },
    entities: {
      ROOT_QUERY: {
        tags: ["tag1", "tag2", "tag3"]
      }
    }
  } as OneTest,
  {
    name: "with nested array of String",
    query: gql`
      query TestQuery {
        tagsArray
      }
    `,
    response: {
      data: {
        tagsArray: [
          ["tag1.1", "tag1.2", "tag1.3"],
          ["tag2.1", "tag2.2", "tag2.3"],
          ["tag3.1", "tag3.2", "tag3.3"]
        ]
      }
    },
    entities: {
      ROOT_QUERY: {
        tagsArray: [
          ["tag1.1", "tag1.2", "tag1.3"],
          ["tag2.1", "tag2.2", "tag2.3"],
          ["tag3.1", "tag3.2", "tag3.3"]
        ]
      }
    }
  } as OneTest,
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // type Table {
  //   rows: [ [ Cell ] ]
  // }
  // type Cell {
  //   value: Float
  // }
  {
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
    response: {
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
  } as OneTest
];
