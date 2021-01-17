---
title: gram
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram

# Package: gram

# `gram`

Gram is a textual format for data graphs. 

## How to gram

```js
const {default:gram} = require('gram');

const n = gram.builder.node();
console.log(gram.stringify.toGram(n));

const src = "(a)-->(b)<--(c)";
const p = gram.parser.toAST(src);
console.log(gram.stringify.toGram(p));

```

```ts
import * as gram from '@gram-data/gram'

```

## Index

### References

* [toGram](gram.md#togram)

### Functions

* [parse](gram.md#parse)

## References

### toGram

Renames and re-exports: [stringify](gram_stringify.md#stringify)

## Functions

### parse

▸ `Const`**parse**(`src`: VFileCompatible): [GramSeq](../interfaces/gram_ast.gramseq.md)

*Defined in [packages/gram/src/index.ts:22](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram/src/index.ts#L22)*

Parse text into an ast.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`src` | VFileCompatible | gram formatted text  |

**Returns:** [GramSeq](../interfaces/gram_ast.gramseq.md)
