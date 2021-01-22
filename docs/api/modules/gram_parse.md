---
title: gram_parse
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-parse

# Package: gram-parse

From text literal `(a)-->(b)` to a gram AST. 

## How to gram-parse

### Install:

``` bash
npm install @gram-data/gram-parse
```

### Parse text into an AST:

``` TypeScript
import { toAST } from '@gram-data/gram-parse'; 

const src = '(a)-->(b)';
const parsed = toAST(src);
```

### Inspect AST using [unist-util-inspect](https://github.com/syntax-tree/unist-util-inspect):

``` TypeScript
const inspect = require('unist-util-inspect');

console.log(inspect(parsed));
```

## Next Steps

- Transform to js objects using [gram-value](gram_value.md)
- Write back to a string using [gram-stringify](gram_stringify.md)
- Introspect the AST using [gram-ast](gram_ast.md)

## Index

### Interfaces

* [GramParserSettings](../interfaces/gram_parse.gramparsersettings.md)

### Variables

* [INCOMPLETE\_PARSE](gram_parse.md#incomplete_parse)
* [SYNTAX\_ERROR](gram_parse.md#syntax_error)

### Functions

* [parse](gram_parse.md#parse)
* [toAST](gram_parse.md#toast)

## Variables

### INCOMPLETE\_PARSE

• `Const` **INCOMPLETE\_PARSE**: \"Incomplete parse.\" = "Incomplete parse."

*Defined in [packages/gram-parse/src/gram-errors.ts:1](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram-parse/src/gram-errors.ts#L1)*

___

### SYNTAX\_ERROR

• `Const` **SYNTAX\_ERROR**: \"Syntax error at\" = "Syntax error at"

*Defined in [packages/gram-parse/src/gram-errors.ts:2](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram-parse/src/gram-errors.ts#L2)*

## Functions

### parse

▸ `Const`**parse**(`text`: string, `file`: VFile): any

*Defined in [packages/gram-parse/src/gram-parser-plugin.ts:27](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram-parse/src/gram-parser-plugin.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`text` | string |
`file` | VFile |

**Returns:** any

___

### toAST

▸ `Const`**toAST**(`src`: string): [GramSeq](../interfaces/gram_ast.gramseq.md)

*Defined in [packages/gram-parse/src/index.ts:7](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram-parse/src/index.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`src` | string |

**Returns:** [GramSeq](../interfaces/gram_ast.gramseq.md)
