Gram abstract syntax tree definitions and utilities like type guards. 

## How to gram-ast

### Install:

```
npm install @gram-data/gram-ast
```

### Use [[gram-parse]] to create an AST, then introspect with gram-ast:

```
import { toAST } from '@gram-data/gram-parse'; 

const src = '(a)-->(b)';
const parsed = toAST(src);

// the top-level of the AST is a sequence of paths
console.assert(isGramPathSequence(parsed));

// the first path should be an edge
const firstPath = parsed.children[0];
console.assert(isGramEdge(firstPath));

// the children of an edge are nodes
console.assert(isGramNode(firstPath.children[0]));
console.assert(isGramNode(firstPath.children[1]));
```

## Next Steps

- Transform to js objects using [[gram-value]]
- Write a [unist](https://github.com/syntax-tree/unist) plugin for processing the AST


