import { OneTest } from "../is-stale-test-def";

export const test: OneTest = {
  name: "with stale false",
  staleMap: {
    "Post;555": {
      author: true,
      title: true,
      comments: true
    }
  },
  fields: {
    ROOT_QUERY: ["posts"],
    "Post;123": ["id", "__typename", "author", "title", "comments"],
    "Author;1": ["id", "__typename", "name"]
  },
  isStale: false
};
