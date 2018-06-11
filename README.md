# gql-cache

[![npm version][version-image]][version-url]
[![code style: prettier][prettier-image]][prettier-url]
[![MIT license][license-image]][license-url]

A library for creating and operating on a normalized GraphQL cache

## Introduction

When working with GraphQL, caching on the client side can be very important in order to achieve good performance. One of the most popular approaches is to use a normalized cache. Frameworks such as [Relay](https://facebook.github.io/relay/) and [Apollo](https://www.apollographql.com/) do a good job of providing a normalized cache without exposing the client application to the details of normalization or denormalization. For some applications, abtracting away the cache like this is a good fit. For other applications you may want more control over the cache. Using the gql-cache library you will have full control over the cache and you can make the cache a first class citizen in your appliction.

## Why use it?

Since gql-cache is a library rather than a framework, it just provides functions for normalization and denormalization that your application can call when it so chooses. This enables some scenarios that are hard to do with the framework approaches that abstract away the cache. For example, your application has full control over the storage and upate of the cache (the cache is just a plain JS object). So you can store the cache in Redux and update it with Actions, or store it somehwere else and use a different update mechnaism. It is entirely up to your application. Also, for performance critical applications, your application is free to make optimizations based on assumptions that are specific to your application. Such optimization can be hard to achieve in frameworks that have to cater to many different kind of applications. So for some applications this library-based approach might be better than the aformentioned framework approaches, but of course it comes with the tradeoff that your application will have to know more about the cahce and do more work itself. You can of course write your own components to abstract the cache in any way you want in your application.

## How to install

```
npm install gql-cache --save
```

## Normalization and denormalization

In order to understand this library, it is important to understand the process of normalization and denormalization. A basic description of normalization (in the context of graphql-cache) is that it takes a tree and flattens it to a map where each object will be assigned an unique ID which is used as the key in the map. Any references that an object holds to other objects will be exhanged to an ID instead of an object reference. The process of denormalizaton goes the other way around, starting with a map and producing a tree. The popular [normalizr](https://www.npmjs.com/package/normalizr) library does a good job of explaining this. In fact, gql-cache is very similar to normalizr, but it was specifically designed to work with GrqphQL so it does not require hand-coded normalization schemas. Instead it uses GraphQL queries to determine how to normalize and denormalize the data.

Here is a small example:

Example GraphQL query:

`````gql
query TestQuery {
  posts {
    id
    __typename
    title
    author {
      id
      __typename
      name
    }
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
``´

Response for the above query (as a denormalized tree):

```js
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
````

Normalized cache map for the above response tree:

```js
{
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
}
```

As we can see in the normalized cahce above, an ID was assigned to each object and they reference each other using these IDs.

### API

### normalize()

The normalize() function takes a GraphQL query with associated variables, and a GraphQL JSON response. From those inputs it produces a normalized cache which is returned as a plain JS object.

### denormalize()

The denormalize() function takes a GraphQL query with associated variables, and a cache object (as returned by normalize()). From those inputs it produces a GraphQL JSON response.

[version-image]: https://img.shields.io/npm/v/gql-cache.svg?style=flat
[version-url]: https://www.npmjs.com/package/gql-cache
[license-image]: https://img.shields.io/github/license/dividab/gql-cache.svg?style=flat
[license-url]: https://opensource.org/licenses/MIT
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat
[prettier-url]: https://github.com/prettier/prettier
`````
