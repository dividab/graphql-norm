# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.13.0] - 2019-07-18

### Changed

- Use colon as default ID separator. See issue [#42](https://github.com/dividab/graphql-norm/issues/42) and PR [#43](https://github.com/dividab/graphql-norm/pull/43).
- Genearate fallback IDs using the nearest parent as base. See issue [#27](https://github.com/dividab/graphql-norm/issues/27) and PR [#41](https://github.com/dividab/graphql-norm/pull/41).

### Removed

- Removed staleness checking from denormalize(). See issue [#38](https://github.com/dividab/graphql-norm/issues/38) and PR [#40](https://github.com/dividab/graphql-norm/pull/40). Staleness checking is now available in the external package [graphql-norm-stale](https://github.com/dividab/graphql-norm-stale).

## [0.12.2] - 2019-07-16

### Fixed

- Remove invalid dependency.

## [0.12.1] - 2019-07-16

### Fixed

- Add missing export for type `FieldsMap`.

## [0.12.0] - 2019-07-16

### Changes

- Return used fields per key of normalized object used during denormalization in `fields` props in denormalize() result. See [#30](https://github.com/dividab/graphql-norm/pull/30), PR [#36](https://github.com/dividab/graphql-norm/pull/36) and additional work in PR [#39](https://github.com/dividab/graphql-norm/pull/39)
- Rename `EntityCache` to `NormMap`, `Entity` to `NormObj`, `EntityFieldVlue` to `NormFieldVlue`, and associated renames. See [#16](https://github.com/dividab/graphql-norm/issues/16) and PR [#35](https://github.com/dividab/graphql-norm/pull/35).
- `normalize` directly take the `data` from a GraphQL response as argument instead of an object with a `data` property. See [#34](https://github.com/dividab/graphql-norm/pull/29).
- `denormalize` returns `data` directly instead of an object with a `data` property. See [#34](https://github.com/dividab/graphql-norm/pull/29).

## [0.11.0] - 2019-07-06

### Fixed

- Update peer dependencies.

## [0.10.1] - 2019-07-06

### Fixed

- Update readme with new package name.

## [0.10.0] - 2019-07-06

### Changed

- Renamed the package from `gql-cache` to `graphql-norm` to indicate that it focus is on normalization only, not providing a full caching solution.

- Renamed mergeEntityCache function to merge, see See [#29](https://github.com/dividab/graphql-norm/pull/29). Thanks to [@drejohnson](https://github.com/drejohnson) for this PR.

- Consolidated and cleaned up readme documentation.

## [0.9.2] - 2019-01-16

### Fixed

- Remove console.log.

## [0.9.1] - 2019-01-16

### Fixed

- Fix null in result arrays. See [#25](https://github.com/dividab/graphql-norm/pull/25)

## [0.9.0] - 2018-09-28

### Fixed

- Trees with array. See [#23](https://github.com/dividab/graphql-norm/pull/23)
- With reserved words See [#24](https://github.com/dividab/graphql-norm/pull/24)

## [0.8.0] - 2018-09-27

### Fixed

- Invalid response when a query contains multiple subtrees of same node

## [0.7.0] - 2018-09-14

### Fixed

- Fix partial bug when only scalar is missing in cache. #19

## [0.6.0] - 2018-08-26

### Changed

- Make the `graphql` package a peer dependency. See [#18](https://github.com/dividab/graphql-norm/pull/18).

## [0.5.0] - 2018-08-24

### Changed

- Rename `updateStaleEntities()` to `updateStale()`.
- Fix bug in `updateStaleEntities()` which caused the inputs to be mutated.

## [0.4.0] - 2018-08-23

### Added

- Support for `@skip` and `@include` directives. See [#14](https://github.com/dividab/graphql-norm/issues/14).

## [0.3.0] - 2018-08-17

### Added

- The `graphql` and `@types/graphql` packages are now a regular dependencies. See [#12](https://github.com/dividab/graphql-norm/issues/12).

## [0.2.0] - 2018-08-08

### Added

- Support for fallback id when `GetObjectToId` returns undefined. `GetObjectToId` can now return `string | undefined`

## [0.1.3] - 2018-06-28

### Fixed

- Add missing exports for types `Variables`, `GraphQLResponse`.

## [0.1.2] - 2018-06-27

### Added

- Export `DenormalizationResult`, see PR [#4](https://github.com/dividab/graphql-norm/pull/4).

### Fixed

- Remove redundant typing, see PR [#1](https://github.com/dividab/graphql-norm/pull/1). Thanks to [@Jontem](https://github.com/Jontem) for this fix!

## [0.1.1] - 2018-06-08

### Added

- Initial version.

[unreleased]: https://github.com/dividab/graphql-norm/compare/v0.13.0...master
[0.13.0]: https://github.com/dividab/graphql-norm/compare/v0.12.1...v0.13.0
[0.12.1]: https://github.com/dividab/graphql-norm/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/dividab/graphql-norm/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/dividab/graphql-norm/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/dividab/graphql-norm/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/dividab/graphql-norm/compare/v0.9.2...v0.10.0
[0.9.2]: https://github.com/dividab/graphql-norm/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/dividab/graphql-norm/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/dividab/graphql-norm/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/dividab/graphql-norm/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/dividab/graphql-norm/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/dividab/graphql-norm/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/dividab/graphql-norm/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/dividab/graphql-norm/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/dividab/graphql-norm/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/dividab/graphql-norm/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/dividab/graphql-norm/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/dividab/graphql-norm/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/dividab/graphql-norm/compare/v0.1.0...v0.1.1
