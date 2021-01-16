`(text)-->(ast)-->(text)`

`gram.js` is a collection of packages for working with the [gram](https://gram-data.github.io)
textual format for graph data.

You can parse `.gram` files into an AST. 

Or, you can produce `.gram` files from an existing AST. 

The AST is not a data model. But it does easily maps to a data model. For example see
[d3-gram](https://github.com/gram-data/d3-gram).

## How to gram in javascript

The 2 best places to start:

1. Parse from text using [[gram-parse]]
2. Build an AST by hand using [[gram-builder]]

### All packages

- [[gram]] for general use
- [[gram-ast]] defines abstract syntax tree types 
- [[gram-builder]] composes a valid AST
- [[gram-identity]] generates identity. (available as a [unified plugin](https://github.com/unifiedjs/unified#plugin) )
- [[gram-ops]] extracts features from the AST
- [[gram-parse]] processes text literal `.gram` into an AST. (available as a [unified plugin](https://github.com/unifiedjs/unified#plugin) )
- [gram-preset-basic](https://github.com/gram-data/gram-js/tree/main/packages/gram-preset-basic) a [unified preset](https://github.com/unifiedjs/unified#preset) for processing `.gram` files
- [[gram-stringify]] serializes AST back to text literal format (available as a [unified plugin](https://github.com/unifiedjs/unified#plugin) )
- [[gram-value]] enrich AST text literals with JS primitive or object values


## Credit

### Unified "Content as structured data"

Gram leverages the excellent [unified](https://unifiedjs.com) framework "for parsing, inspecting, transforming, and serializing content through syntax trees."


