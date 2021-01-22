---
title: gram_stringify
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-stringify

# Package: gram-stringify

From gram AST to text literal `(a)-->(b)`.

## How to gram-stringify

### Install:

``` bash
npm install @gram-data/gram-stringify
```

### Build an AST using [gram-builder](gram_builder.md), then pretty print with gram-stringify:

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';
import { stringify } from '@gram-data/gram-stringify'; 

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');

console.log(stringify(ast));
```

### Parse to AST using [gram-parse](gram_parse.md), then pretty print with gram-stringify:

``` TypeScript
import { toAST } from '@gram-data/gram-parse'; 
import { stringify } from '@gram-data/gram-stringify'; 

const src = '(a)-->(b)';
const ast = toAST(src);

console.log(stringify(ast));
```

## Next Steps

- Save to a file to share a gram with a friend!

## Index

### Functions

* [stringify](gram_stringify.md#stringify)

## Functions

### stringify

▸ `Const`**stringify**(`ast`: any \| any[]): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:163](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-stringify/src/gram-stringify.ts#L163)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | any \| any[] |

**Returns:** string
