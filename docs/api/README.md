---
title: README
layout: api
---

**[gram.js API](README.md)**

> [Globals](globals.md)

`()-[define]->(ast)`

Gram abstract syntax tree definitions, tokenizing regexes, and utilities like type guards.

## How to gram-ast

### Install:

```bash
npm install @gram-data/gram-ast
```

### Use [gram-parse](modules/gram_parse.md) to create an AST, then introspect with gram-ast:

```TypeScript
import { isGramSeq, isGramNode, isGramEdge } from '@gram-data/gram-ast';
import { toAST } from '@gram-data/gram-parse';  

const src = '(a)-->(b)';
const parsed = toAST(src);

// the top-level of the AST is a sequence of paths
console.assert(isGramSeq(parsed));

// the first path should be an edge
const firstPath = parsed.children[0];
console.assert(isGramEdge(firstPath));

// the children of an edge are nodes
console.assert(isGramNode(firstPath.children[0]));
console.assert(isGramNode(firstPath.children[1]));
```

## Syntax Tree

The `gram` AST is based on the [unist](https://github.com/syntax-tree/unist) specification
for syntax trees. Many of the tools and techniques of the [unified](https://unifiedjs.com)
ecosystem can be applied to working with `gram`.

Gram represents data using two basic elements: paths and sequences.

Paths provide structure. Sequences provide order.

### [`GramSeq`](interfaces/gram_ast.gramseq.md)

A `gram` sequence is the root element of an AST.
It is exactly what it sounds like: a sequence of elements where
each element is a path.

The AST type is useful in returning a well-rooted tree that can be processed
by general-purpose AST tools like [unist-util-visit](https://github.com/syntax-tree/unist-util-visit).

In practice this is equivalent to a `GramPath[]`. Most `gram` functions will accept either.

### [`GramPath`](interfaces/gram_ast.grampath.md)

A `gram` path is either an empty path, or the composition of two other paths.
The data structure of a path is like a list which remembers how it was assembled.
The list elements are other paths.

Each path has its own identity, labels and a data record.

### [record](../interfaces/gram_ast.gramrecord-1.html)

In the AST, records are a multimap presented as an _array_ of name/value
properties. That means a property name _may_ appear more than once, with
different or the same values.

When mapping to a data model, choose one of these strageies for handling the
multimapped properties:

- single-state: pick the first or last value (_recommended_)
- join: accumulate the values into an array
- reduce: aggregate the values into a single value

## Next Steps

- Learn more about parsing with [gram-ast](modules/gram_ast.md)
- Transform to js objects using [gram-value](modules/gram_value.md)
- Serialize back to text using [gram-stringify](modules/gram_stringify.md)
