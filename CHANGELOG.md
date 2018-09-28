# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.9.0] - 2018-09-27

- Bugfix: Trees with array. See [#23](https://github.com/dividab/gql-cache/pull/23)
- Bugfix: With reserved words See [#24](https://github.com/dividab/gql-cache/pull/24)

## [0.8.0] - 2018-09-27

- Bugfix: Invalid response when a query contains multiple subtrees of same node

## [0.7.0] - 2018-09-14

- Fix partial bug when only scalar is missing in cache. #19

## [0.6.0] - 2018-08-26

- Add graphql dependencies as peer dependency

### Changed

- Make the `graphql` package a peer dependency. See [#18](https://github.com/dividab/gql-cache/pull/18).

## [0.5.0] - 2018-08-24

### Changed

- Rename `updateStaleEntities()` to `updateStale()`.
- Fix bug in `updateStaleEntities()` which caused the inputs to be mutated.

## [0.4.0] - 2018-08-23

### Added

- Support for `@skip` and `@include` directives. See [#14](https://github.com/dividab/gql-cache/issues/14).

## [0.3.0] - 2018-08-17

### Added

- The `graphql` and `@types/graphql` packages are now a regular dependencies. See [#12](https://github.com/dividab/gql-cache/issues/12).

## [0.2.0] - 2018-08-08

### Added

- Support for fallback id when `GetObjectToId` returns undefined. `GetObjectToId` can now return `string | undefined`

## [0.1.3] - 2018-06-28

### Fixed

- Add missing exports for types `Variables`, `GraphQLResponse`.

## [0.1.2] - 2018-06-27

### Added

- Export `DenormalizationResult`, see PR [#4](https://github.com/dividab/gql-cache/pull/4).

### Fixed

- Remove redundant typing, see PR [#1](https://github.com/dividab/gql-cache/pull/1). Thanks to [@Jontem](https://github.com/Jontem) for this fix!

## [0.1.1] - 2018-06-08

### Added

- Initial version.

[unreleased]: https://github.com/dividab/gql-cache/compare/v0.6.0...master
[0.6.0]: https://github.com/dividab/gql-cache/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/dividab/gql-cache/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/dividab/gql-cache/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/dividab/gql-cache/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/dividab/gql-cache/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/dividab/gql-cache/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/dividab/gql-cache/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/dividab/gql-cache/compare/v0.1.0...v0.1.1
