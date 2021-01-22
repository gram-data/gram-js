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

Node.js:

```js
const gram = require('@gram-data/gram');

const src = "(a)-->(b)";
const p = gram.parse(src);
console.log(gram.toGram(p));

```

TypeScript:
```ts
import gram from '@gram-data/gram'

const src = "(a)-->(b)";
const p = gram.parse(src);
console.log(gram.toGram(p));
```

Vanilla javascript in browser:

- see [examples](https://github.com/gram-data/gram-js/tree/main/packages/gram/public)

## Index

### Functions

* [parse](gram.md#parse)

## Functions

### parse

▸ `Const`**parse**(`src`: VFileCompatible): [GramSeq](../interfaces/gram_ast.gramseq.md)

*Defined in [packages/gram/src/index.ts:24](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram/src/index.ts#L24)*

Parse text into an ast.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`src` | VFileCompatible | gram formatted text  |

**Returns:** [GramSeq](../interfaces/gram_ast.gramseq.md)
