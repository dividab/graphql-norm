import { OneTest } from "../test/shared-test-def";
import gql from "graphql-tag";
import { normalize } from "../src/normalize";

function generateTestData(): OneTest {
  const query = gql`
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
  `;
  const posts: Array<any> = [];
  for (let i = 0; i < 10000; i++) {
    const post = {
      id: `post-${i}`,
      __typename: "Post",
      author: {
        id: `author-${i}`,
        __typename: "Author",
        name: "Paul"
      },
      title: `My awesome blog post ${i}`,
      comments: [
        {
          id: `comment-${i}`,
          __typename: "Comment",
          commenter: {
            id: `commenter-${i}`,
            __typename: "Author",
            name: "Nicole"
          }
        }
      ]
    };

    posts.push(post);
  }

  const response = {
    data: {
      posts
    }
  };
  return {
    entities: normalize(query, undefined, response),
    name: "GeneratedTestData",
    query,
    response
  };
}

export const test: OneTest = generateTestData();
