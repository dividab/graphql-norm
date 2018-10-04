# gql-cache

[![npm version][version-image]][version-url]
[![travis build][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![code style: prettier][prettier-image]][prettier-url]
[![MIT license][license-image]][license-url]

A library for normalizing and denormalizing GraphQL responses

## Introduction

When working with GraphQL, caching on the client side can be very important in order to achieve good performance. One of the most popular approaches is to use a normalized cache. Frameworks such as [Relay](https://facebook.github.io/relay/) and [Apollo](https://www.apollographql.com/) do a good job of providing a normalized cache without exposing the client application to the details of normalization or denormalization. For some applications, abtracting away the cache like this is a good fit. For other applications you may want more control over the cache. Using the gql-cache library you will have full control over the cache and you can make the cache a first class citizen in your appliction. For more information also read the [motivation](#motivation) and [normalization and denormalization](#normalization-and-denormalization) sections.

## Features

* Cache as plain JS objects
* Store the cache anywhere (for example in redux or other state container)
* Serializable to plain JSON
* Optimized for run-time speed
* Full GraphQL syntax support (including alias, @skip, @include)
* Staleness flagging
* Can be used on client or server

## How to install

```
npm install gql-cache --save
```

## How to use

Here is a small example:

```js
import { normalize, denormalize, merge } from "gql-cache";
import { request } from "graphql-request";

// Our cache is a plain JS object
let cache = {};

// Make a request to fetch the data
const response = request("{ ...Your graphql query here... }");

// Normalize the response
const normalizedResponse = normalize(query, response);

// Merge the normalized response into the cache
cache = merge(cache, normalizedResponse);

// Later when we want to read a query from the cache
const cachedResponse = denormalize(query, cache);

// cachedResponse now has the response for the query and we can return it without a server request
```

## API

### normalize()

The normalize() function takes a GraphQL query with associated variables, and a GraphQL JSON response. From those inputs it produces a normalized cache which is returned as a plain JS object.

```ts
normalize(
  query: GraphQL.DocumentNode,
  variables: { [key: string]: any } | undefined,
  response: { data: any },
  getObjectId: (entity: any) => string
): { [key: string]: any }
```

### denormalize()

The denormalize() function takes a GraphQL query with associated variables, and a cache object (as returned by normalize()). From those inputs it produces a GraphQL JSON response.

```ts
export function denormalize(
  query: GraphQL.DocumentNode,
  variables: { [key: string]: any } | undefined,
  cache: { [key: string]: any },
  staleEntities: { [field: string]: true | undefined } | undefined
): {
  response: { data: any } | undefined;
  partial: boolean;
  stale: boolean;
};
```

### merge()

When you normalize the response of a query you probably want to merge the resulting cache object into a another, large cache object that is held by your application. Since a cache is just a JS object you can do this merge any way you want but the merge() function is provided an optimized convenience to do the merging of caches.

## Motivation

Since gql-cache is a library rather than a framework, it just provides functions for normalization and denormalization that your application can call when it so chooses. This enables some scenarios that are hard to do with the framework approaches that abstract away the cache. For example, your application has full control over the storage and upate of the cache (the cache is just a plain JS object). So you can store the cache in Redux and update it with Actions, or store it somehwere else and use a different update mechnaism. It is entirely up to your application. Also, for performance critical applications, your application is free to make optimizations based on assumptions that are specific to your application. Such optimization can be hard to achieve in frameworks that have to cater to many different kind of applications. So for some applications this library-based approach might be better than the aformentioned framework approaches, but of course it comes with the tradeoff that your application will have to know more about the cahce and do more work itself. You can of course write your own components to abstract the cache in any way you want in your application.

## Normalization and denormalization

In order to understand this library, it is important to understand the process of normalization and denormalization. A basic description of normalization (in the context of graphql-cache) is that it takes a tree and flattens it to a map where each object will be assigned an unique ID which is used as the key in the map. Any references that an object holds to other objects will be exhanged to an ID instead of an object reference. The process of denormalizaton goes the other way around, starting with a map and producing a tree. The popular [normalizr](https://www.npmjs.com/package/normalizr) library does a good job of explaining this. In fact, gql-cache is very similar to normalizr, but it was specifically designed to work with GraphQL so it does not require hand-coded normalization schemas. Instead it uses GraphQL queries to determine how to normalize and denormalize the data.

Here is an example with comments that show how the data gets normalized:

```js
import { normalize, denormalize, mergeCache } from "gql-cache";
import { request } from "graphql-request";

// Our cache is a simple JS object
let cache = {};

// Define our GraphQL query
const query = gql`
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
`;

// Make a request to fetch the data
const response = request(query);

/*
The response now looks like this:

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
  ];
}

*/

// Normalize the response
const normalizedResponse = normalize(query, resopnse);

/*
The normalized data now looks like this:

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

As we can see in the normalized response above, an ID was assigned to each object.
References between objects are now using these IDs.

*/

// Merge into the cache
cache = merge(cache, normalizedResponse);

// Later when we want to read a query from the cache
const cachedResponse = denormalize(query, cache);

// cachedResponse now has the response for the query and we can return it without a server request
```

[version-image]: https://img.shields.io/npm/v/gql-cache.svg?style=flat
[version-url]: https://www.npmjs.com/package/gql-cache
[travis-image]: https://travis-ci.org/dividab/gql-cache.svg?branch=master&style=flat
[travis-url]: https://travis-ci.org/dividab/gql-cache
[coveralls-image]: https://coveralls.io/repos/github/dividab/gql-cache/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dividab/gql-cache?branch=master
[license-image]: https://img.shields.io/github/license/dividab/gql-cache.svg?style=flat
[license-url]: https://opensource.org/licenses/MIT
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat
[prettier-url]: https://github.com/prettier/prettier
