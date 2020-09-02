# gram-js

A data graph model and exchange format. 

This is the Javascript reference implementation.

## Library Components

- `gram-ast` Abstract Syntax Tree and tokenizing regular-expressions
- `gram-builder` to compose a valid AST
- `gram-graph` to materialize a data graph
- `gram-identity` AST plugin to adjust graph element identities
- `gram-lint` to process gram files on the command line
- `gram-parse` derived from `gram.ne` to parse text into an AST
- `gram-stringify` to convert an AST back to text literal format
- `gram-value` to convert AST data values to JS primitive or object values

