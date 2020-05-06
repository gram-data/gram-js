# gram-format

Reference implementation of the gram graph exchange format.

## Library Components

- `gram-tokens` with regular expressions to tokenize text
- `gram-ast` Abstract Syntax Tree type specifications
- `gram-builder` to compose a gram AST
- `gram-find` to traverse a gram AST
- `gram-transform` to process a gram AST
- `gram-stringify` to pretty print the AST
- `gram-parse` derived from `gram.ne` to parse text into an AST

## Demo

[![asciicast](https://asciinema.org/a/327270.svg)](https://asciinema.org/a/327270)

## Developer instructions

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

- `yarn build` to build the parser and assemble a distribution
- `yarn link` to get a locally linked `gram-lint` binary

# Credits

Thanks to these project for inspiration:

- The entire [unist family](https://unifiedjs.com)
- [mdast-builder](https://github.com/mike-north/mdast-builder) for how to make a builder