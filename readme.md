The Javascript reference implementation of the [gram](https://gram-data.github.io) property 
graph model and exchange format.

## How to gram in javascript

There are 2 places to start:

1. Parse from text using [[gram-parse]]
2. Build an AST by hand using [[gram-builder]]

### All packages

- [[gram-ast]] definitions and tokenizing regular-expressions
- [[gram-builder]] composes a valid AST
- [[gram-identity]] adjusts element identities
- [[gram-parse]] from text literal gram into an AST
- [[gram-stringify]] to convert an AST back to text literal format
- [[gram-value]] to convert AST data values to JS primitive or object values

