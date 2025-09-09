# next-navigation-utils

## 1.0.0

### Major Changes

- 378be80: Make `setLinkQueryValue` function support any input. Implement a universal parser for any type of the link input. It auto converts them to the right type.

### Minor Changes

- 171c185: Completely remove the 'querystring' usage. Greatefuly reduced bundle size.
- da1a4c8: Refactor parameres encode/decode function to the parameter type and add as a separate namespace for better tree shaking.
- 96973cc: This release has many breaking change.
  - Renamed hooks and utilites to match features they do better
  - Rethink and rewrite from scrach the way links are being built to simplify their usage.
  - Rewrite from scratch some function to have much better performence and reduce unnecessary calculations
  - Make the separation between the passed URL and "route pathname + query string" to avoid the consfuse while building the links in the web application. Prepare for the strictly typed next.js routes
  - Add memoization of the hooks and objects
- 774b094: Redesign utilities to avoid collisions of the globals, add more tests, redesign untility to be immutable where possible without perform ance drawback

### Patch Changes

- 171c185: Make `getLinkQueryValue` and `setLinkQueryValue` to support any input type.
- 774b094: Drop link updater because it useless in a new system
- da1a4c8: Add `makeParam` and other tiny utilities to improve the developer experience.
- f6902cf: Add hook to handle values reset
- 4b7b203: Separation of the shared and client only utilities

## 0.2.0

### Minor Changes

- 2c5b509: Add test cases for the external URL changes
- 2c5b509: Fix the state management when URL changed from outside of hook

### Patch Changes

- 9d7d838: Update README with the latest features

## 0.1.0

### Minor Changes

- c5e789a: Add test cases for the external URL changes
- c5e789a: Fix the state management when URL changed from outside of hook

## 0.0.8

### Patch Changes

- f1fe566: - Add devcontainer support
  - Add testing for different nextj version.
  - Replace grisaia-package-builder with tsup builder
  - Bump pnpm 10.12.1
  - Test the production build output
  - Vibe code README
  - Bump all packages to the latest version.
  - Fix errors according to new eslint rules

## 0.0.7

### Patch Changes

- 91a1a4f: Fix build did not emit all utils

## 0.0.6

### Patch Changes

- 08fe8a3: Fixes tests did not testing at all
- 08fe8a3: Add a query to search params converter

## 0.0.5

### Patch Changes

- bef9453: Add useSearchParam hook.

## 0.0.4

### Patch Changes

- 82393fd: Fix the rest of type exports.

## 0.0.3

### Patch Changes

- 92980b1: Fix rest of exports.

## 0.0.2

### Patch Changes

- ac45d5e: Inital release. Basic utilities to simplify nextjs navigation.
