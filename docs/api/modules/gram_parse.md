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
* [Grammar](../interfaces/gram_parse.grammar.md)
* [NearleyLexer](../interfaces/gram_parse.nearleylexer.md)
* [NearleyRule](../interfaces/gram_parse.nearleyrule.md)
* [NearleyToken](../interfaces/gram_parse.nearleytoken.md)

### Type aliases

* [NearleySymbol](gram_parse.md#nearleysymbol)

### Variables

* [INCOMPLETE\_PARSE](gram_parse.md#incomplete_parse)
* [SYNTAX\_ERROR](gram_parse.md#syntax_error)
* [boolean](gram_parse.md#boolean)
* [decimal](gram_parse.md#decimal)
* [doubleQuotedString](gram_parse.md#doublequotedstring)
* [hexadecimal](gram_parse.md#hexadecimal)
* [identifier](gram_parse.md#identifier)
* [integer](gram_parse.md#integer)
* [lexer](gram_parse.md#lexer)
* [lineComment](gram_parse.md#linecomment)
* [measurement](gram_parse.md#measurement)
* [octal](gram_parse.md#octal)
* [singleQuotedString](gram_parse.md#singlequotedstring)
* [symbol](gram_parse.md#symbol)
* [taggedString](gram_parse.md#taggedstring)
* [tickedString](gram_parse.md#tickedstring)
* [whitespace](gram_parse.md#whitespace)

### Functions

* [empty](gram_parse.md#empty)
* [gramParserPlugin](gram_parse.md#gramparserplugin)
* [id](gram_parse.md#id)
* [lexerLocation](gram_parse.md#lexerlocation)
* [parse](gram_parse.md#parse)
* [separateNumberFromUnits](gram_parse.md#separatenumberfromunits)
* [separateTagFromString](gram_parse.md#separatetagfromstring)
* [text](gram_parse.md#text)
* [toAST](gram_parse.md#toast)
* [tokenLocation](gram_parse.md#tokenlocation)

### Object literals

* [grammar](gram_parse.md#grammar)

## Type aliases

### NearleySymbol

Ƭ  **NearleySymbol**: string \| { literal: any  } \| { test: (token: any) => boolean  }

*Defined in [packages/gram-parse/src/gram-grammar.ts:129](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L129)*

## Variables

### INCOMPLETE\_PARSE

• `Const` **INCOMPLETE\_PARSE**: \"Incomplete parse.\" = "Incomplete parse."

*Defined in [packages/gram-parse/src/gram-errors.ts:1](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-errors.ts#L1)*

___

### SYNTAX\_ERROR

• `Const` **SYNTAX\_ERROR**: \"Syntax error at\" = "Syntax error at"

*Defined in [packages/gram-parse/src/gram-errors.ts:2](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-errors.ts#L2)*

___

### boolean

•  **boolean**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:19](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L19)*

___

### decimal

•  **decimal**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:23](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L23)*

___

### doubleQuotedString

•  **doubleQuotedString**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:21](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L21)*

___

### hexadecimal

•  **hexadecimal**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:16](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L16)*

___

### identifier

•  **identifier**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:12](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L12)*

___

### integer

•  **integer**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:14](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L14)*

___

### lexer

• `Let` **lexer**: [NearleyLexer](../interfaces/gram_parse.nearleylexer.md) = (moo.compile({ whitespace: { match: /\s+/, lineBreaks: true }, lineComment: { match: /\/\/.*?\n?$/ }, hexadecimal: tokens.hexadecimal, octal: tokens.octal, measurement: tokens.measurement, decimal: tokens.decimal, integer: tokens.integer, taggedString: { match: tokens.taggedString }, boolean: ['true', 'TRUE', 'True', 'false', 'FALSE', 'False'], symbol: tokens.symbol, identifier: tokens.identifier, doubleQuotedString: { match: tokens.doubleQuotedString, value: (s: string) =\> s.slice(1, -1), }, singleQuotedString: { match: tokens.singleQuotedString, value: (s: string) =\> s.slice(1, -1), }, tickedString: { match: tokens.tickedString, value: (s: string) =\> s.slice(1, -1), }, '--\>': '--\>', '--': '--', '<--': '<--', '-[]-\>': '-[]-\>', '-[]-': '-[]-', '<-[]-': '<-[]-', '<-[': '<-[', ']-\>': ']-\>', '-[': '-[', ']-': ']-', '{': '{', '}': '}', '[': '[', ']': ']', '(': '(', ')': ')', ',': ',', ':': ':', '\`': '\`', "'": "'", ø: 'ø',}) as unknown) as NearleyLexer

*Defined in [packages/gram-parse/src/gram-grammar.ts:27](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L27)*

___

### lineComment

•  **lineComment**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:25](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L25)*

___

### measurement

•  **measurement**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:17](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L17)*

___

### octal

•  **octal**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:15](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L15)*

___

### singleQuotedString

•  **singleQuotedString**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:20](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L20)*

___

### symbol

•  **symbol**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:13](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L13)*

___

### taggedString

•  **taggedString**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:22](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L22)*

___

### tickedString

•  **tickedString**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:18](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L18)*

___

### whitespace

•  **whitespace**: any

*Defined in [packages/gram-parse/src/gram-grammar.ts:24](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L24)*

## Functions

### empty

▸ `Const`**empty**(): null

*Defined in [packages/gram-parse/src/gram-grammar.ts:74](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L74)*

**Returns:** null

___

### gramParserPlugin

▸ `Const`**gramParserPlugin**(): void

*Defined in [packages/gram-parse/src/gram-parser-plugin.ts:50](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-parser-plugin.ts#L50)*

**Returns:** void

___

### id

▸ **id**(`d`: any[]): any

*Defined in [packages/gram-parse/src/gram-grammar.ts:9](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`d` | any[] |

**Returns:** any

___

### lexerLocation

▸ `Const`**lexerLocation**(`state`: LexerState): Point

*Defined in [packages/gram-parse/src/gram-parser-plugin.ts:13](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-parser-plugin.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`state` | LexerState |

**Returns:** Point

___

### parse

▸ `Const`**parse**(`text`: string, `file`: VFile): any

*Defined in [packages/gram-parse/src/gram-parser-plugin.ts:27](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-parser-plugin.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`text` | string |
`file` | VFile |

**Returns:** any

___

### separateNumberFromUnits

▸ **separateNumberFromUnits**(`measurementValue`: string): object

*Defined in [packages/gram-parse/src/gram-grammar.ts:100](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L100)*

#### Parameters:

Name | Type |
------ | ------ |
`measurementValue` | string |

**Returns:** object

Name | Type |
------ | ------ |
`unit` | string |
`value` | string |

___

### separateTagFromString

▸ **separateTagFromString**(`taggedStringValue`: string): object

*Defined in [packages/gram-parse/src/gram-grammar.ts:90](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L90)*

#### Parameters:

Name | Type |
------ | ------ |
`taggedStringValue` | string |

**Returns:** object

Name | Type |
------ | ------ |
`tag` | string |
`value` | string |

___

### text

▸ `Const`**text**(`__namedParameters`: [any]): string

*Defined in [packages/gram-parse/src/gram-grammar.ts:76](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L76)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | [any] |

**Returns:** string

___

### toAST

▸ `Const`**toAST**(`src`: string): [GramSeq](../interfaces/gram_ast.gramseq.md)

*Defined in [packages/gram-parse/src/index.ts:7](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/index.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`src` | string |

**Returns:** [GramSeq](../interfaces/gram_ast.gramseq.md)

___

### tokenLocation

▸ `Const`**tokenLocation**(`token`: Token): object

*Defined in [packages/gram-parse/src/gram-parser-plugin.ts:20](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-parser-plugin.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`token` | Token |

**Returns:** object

Name | Type |
------ | ------ |
`column` | number |
`line` | number |

## Object literals

### grammar

▪ `Const` **grammar**: object

*Defined in [packages/gram-parse/src/gram-grammar.ts:140](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-parse/src/gram-grammar.ts#L140)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`Lexer` | [NearleyLexer](../interfaces/gram_parse.nearleylexer.md) | lexer |
`ParserRules` | ({ name: string = "GramSeq$ebnf$1"; symbols: string[] = ['GramSeq$ebnf$1$subexpression$1'] } \| { name: string = "Attributes"; symbols: string[] = ['Attributes$ebnf$1', 'Attributes$ebnf$2', 'Attributes$ebnf$3']; postprocess: (d: any[], \_: undefined \| number, reject: undefined \| {}) => undefined \| {}  } \| { name: string = "Identity"; symbols: any[] = [
        lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,
        '\_',
      ]; postprocess: (\_\_namedParameters: [any]) => any  })[] | [     {       name: 'GramSeq$ebnf$1$subexpression$1',       symbols: ['Path'],       postprocess: ([pp]) =\> pp,     },     { name: 'GramSeq$ebnf$1', symbols: ['GramSeq$ebnf$1$subexpression$1'] },     {       name: 'GramSeq$ebnf$1$subexpression$2',       symbols: ['Path'],       postprocess: ([pp]) =\> pp,     },     {       name: 'GramSeq$ebnf$1',       symbols: ['GramSeq$ebnf$1', 'GramSeq$ebnf$1$subexpression$2'],       postprocess: (d) =\> d[0].concat([d[1]]),     },     {       name: 'GramSeq',       symbols: ['\_', 'GramSeq$ebnf$1'],       postprocess: ([, pp]) =\> g.seq(g.flatten(pp)),     },     { name: 'Path', symbols: ['NodePattern'], postprocess: id },     { name: 'Path', symbols: ['PathComposition'], postprocess: id },     { name: 'Path', symbols: ['PathPair'], postprocess: id },     {       name: 'NodePattern',       symbols: ['Node', '\_', 'Edge', '\_', 'NodePattern'],       postprocess: ([n, , es, , np]) =\>         g.cons([n, np], {           kind: es.kind,           id: es.id,           labels: es.labels,           record: es.record,         }),     },     { name: 'NodePattern', symbols: ['Node'], postprocess: id },     { name: 'Node$ebnf$1', symbols: ['Attributes'], postprocess: id },     { name: 'Node$ebnf$1', symbols: [], postprocess: () =\> null },     {       name: 'Node',       symbols: [{ literal: '(' }, '\_', 'Node$ebnf$1', { literal: ')' }, '\_'],       postprocess: ([, , attrs]) =\>         attrs ? g.node(attrs.id, attrs.labels, attrs.record) : g.node(),     },     { name: 'Edge$ebnf$1', symbols: ['Attributes'], postprocess: id },     { name: 'Edge$ebnf$1', symbols: [], postprocess: () =\> null },     {       name: 'Edge',       symbols: [{ literal: '-[' }, '\_', 'Edge$ebnf$1', { literal: ']-\>' }, '\_'],       postprocess: ([, , attrs]) =\> ({ kind: 'right', ...attrs }),     },     { name: 'Edge$ebnf$2', symbols: ['Attributes'], postprocess: id },     { name: 'Edge$ebnf$2', symbols: [], postprocess: () =\> null },     {       name: 'Edge',       symbols: [{ literal: '-[' }, '\_', 'Edge$ebnf$2', { literal: ']-' }, '\_'],       postprocess: ([, , attrs]) =\> ({ kind: 'either', ...attrs }),     },     { name: 'Edge$ebnf$3', symbols: ['Attributes'], postprocess: id },     { name: 'Edge$ebnf$3', symbols: [], postprocess: () =\> null },     {       name: 'Edge',       symbols: [{ literal: '<-[' }, '\_', 'Edge$ebnf$3', { literal: ']-' }, '\_'],       postprocess: ([, , attrs]) =\> ({ kind: 'left', ...attrs }),     },     {       name: 'Edge',       symbols: [{ literal: '-[]-\>' }, '\_'],       postprocess: () =\> ({ kind: 'right' }),     },     {       name: 'Edge',       symbols: [{ literal: '-[]-' }, '\_'],       postprocess: () =\> ({ kind: 'either' }),     },     {       name: 'Edge',       symbols: [{ literal: '<-[]-' }, '\_'],       postprocess: () =\> ({ kind: 'left' }),     },     {       name: 'Edge',       symbols: [{ literal: '--\>' }, '\_'],       postprocess: () =\> ({ kind: 'right' }),     },     {       name: 'Edge',       symbols: [{ literal: '--' }, '\_'],       postprocess: () =\> ({ kind: 'either' }),     },     {       name: 'Edge',       symbols: [{ literal: '<--' }, '\_'],       postprocess: () =\> ({ kind: 'left' }),     },     { name: 'PathComposition', symbols: ['PathPoint'], postprocess: id },     { name: 'PathComposition', symbols: ['PathAnnotation'], postprocess: id },     { name: 'PathComposition', symbols: ['PathExpression'], postprocess: id },     { name: 'PathPoint$ebnf$1', symbols: ['Attributes'], postprocess: id },     { name: 'PathPoint$ebnf$1', symbols: [], postprocess: () =\> null },     {       name: 'PathPoint',       symbols: [         { literal: '[' },         '\_',         'PathPoint$ebnf$1',         { literal: ']' },         '\_',       ],       postprocess: ([, , attr]) =\> {         if (           attr &&           (attr.id \|\| attr.labels \|\| attr.record) &&           attr.id !== 'ø'         ) {           // console.log(attr);           return g.node(attr.id, attr.labels, attr.record);         } else {           return g.empty();         }       },     },     { name: 'PathAnnotation$ebnf$1', symbols: ['Attributes'], postprocess: id },     { name: 'PathAnnotation$ebnf$1', symbols: [], postprocess: () =\> null },     {       name: 'PathAnnotation',       symbols: [         { literal: '[' },         '\_',         'PathAnnotation$ebnf$1',         'Path',         { literal: ']' },         '\_',       ],       postprocess: ([, , attr, lhs]) =\> {         // console.log('annotate()', lhs)         return g.cons(           [lhs],           attr ? { id: attr.id, labels: attr.labels, record: attr.record } : {}         );       },     },     { name: 'PathExpression$ebnf$1', symbols: ['Attributes'], postprocess: id },     { name: 'PathExpression$ebnf$1', symbols: [], postprocess: () =\> null },     { name: 'PathExpression$ebnf$2', symbols: ['Kind'], postprocess: id },     { name: 'PathExpression$ebnf$2', symbols: [], postprocess: () =\> null },     {       name: 'PathExpression',       symbols: [         { literal: '[' },         '\_',         'PathExpression$ebnf$1',         'PathExpression$ebnf$2',         'Path',         'Path',         { literal: ']' },         '\_',       ],       postprocess: ([, , attrs, kind, lhs, rhs]) =\> {         return g.cons([lhs, rhs], {           kind,           id: attrs.id,           labels: attrs.labels,           record: attrs.record,         });       },     },     { name: 'PathPair$subexpression$1', symbols: ['NodePattern'] },     { name: 'PathPair$subexpression$1', symbols: ['PathComposition'] },     {       name: 'PathPair',       symbols: ['PathPair$subexpression$1', { literal: ',' }, '\_', 'Path'],       postprocess: ([lp, , , rp]) =\> g.pair([lp[0], rp]),     },     {       name: 'Kind',       symbols: [{ literal: ',' }, '\_'],       postprocess: () =\> 'pair',     },     {       name: 'Kind',       symbols: [{ literal: '--\>' }, '\_'],       postprocess: () =\> 'right',     },     {       name: 'Kind',       symbols: [{ literal: '--' }, '\_'],       postprocess: () =\> 'either',     },     {       name: 'Kind',       symbols: [{ literal: '<--' }, '\_'],       postprocess: () =\> 'left',     },     { name: 'Attributes$ebnf$1', symbols: ['Identity'], postprocess: id },     { name: 'Attributes$ebnf$1', symbols: [], postprocess: () =\> null },     { name: 'Attributes$ebnf$2', symbols: ['LabelList'], postprocess: id },     { name: 'Attributes$ebnf$2', symbols: [], postprocess: () =\> null },     { name: 'Attributes$ebnf$3', symbols: ['Record'], postprocess: id },     { name: 'Attributes$ebnf$3', symbols: [], postprocess: () =\> null },     {       name: 'Attributes',       symbols: ['Attributes$ebnf$1', 'Attributes$ebnf$2', 'Attributes$ebnf$3'],       postprocess: function (d, \_, reject) {         const [id, labels, record] = d;         if (id \|\| labels \|\| record) {           return { id, labels, record };         } else return reject;       },     },     { name: 'LabelList$ebnf$1', symbols: ['Label'] },     {       name: 'LabelList$ebnf$1',       symbols: ['LabelList$ebnf$1', 'Label'],       postprocess: (d) =\> d[0].concat([d[1]]),     },     {       name: 'LabelList',       symbols: ['LabelList$ebnf$1'],       postprocess: ([labels]) =\> labels,     },     {       name: 'Label',       symbols: [{ literal: ':' }, 'Symbol'],       postprocess: ([, label]) =\> label,     },     {       name: 'Identity',       symbols: [         lexer.has('identifier') ? { type: 'identifier' } : identifier,         '\_',       ],       postprocess: text,     },     { name: 'Identity', symbols: [{ literal: 'ø' }, '\_'], postprocess: text },     {       name: 'Identity',       symbols: [lexer.has('symbol') ? { type: 'symbol' } : symbol, '\_'],       postprocess: text,     },     {       name: 'Identity',       symbols: [lexer.has('integer') ? { type: 'integer' } : integer, '\_'],       postprocess: text,     },     {       name: 'Identity',       symbols: [lexer.has('octal') ? { type: 'octal' } : octal, '\_'],       postprocess: text,     },     {       name: 'Identity',       symbols: [         lexer.has('hexadecimal') ? { type: 'hexadecimal' } : hexadecimal,         '\_',       ],       postprocess: text,     },     {       name: 'Identity',       symbols: [         lexer.has('measurement') ? { type: 'measurement' } : measurement,         '\_',       ],       postprocess: text,     },     {       name: 'Identity',       symbols: [         lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,         '\_',       ],       postprocess: ([t]) =\> t.text.slice(1, -1),     },     {       name: 'Symbol',       symbols: [lexer.has('symbol') ? { type: 'symbol' } : symbol, '\_'],       postprocess: text,     },     {       name: 'Symbol',       symbols: [         lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,         '\_',       ],       postprocess: ([t]) =\> t.text.slice(1, -1),     },     {       name: 'Record',       symbols: [{ literal: '{' }, '\_', { literal: '}' }, '\_'],       postprocess: empty,     },     { name: 'Record$ebnf$1', symbols: [] },     {       name: 'Record$ebnf$1$subexpression$1',       symbols: [{ literal: ',' }, '\_', 'Property'],       postprocess: ([, , p]) =\> p,     },     {       name: 'Record$ebnf$1',       symbols: ['Record$ebnf$1', 'Record$ebnf$1$subexpression$1'],       postprocess: (d) =\> d[0].concat([d[1]]),     },     {       name: 'Record',       symbols: [         { literal: '{' },         '\_',         'Property',         'Record$ebnf$1',         { literal: '}' },         '\_',       ],       postprocess: ([, , p, ps]) =\> g.propertiesToRecord([p, ...ps]),     },     {       name: 'Property',       symbols: ['Symbol', { literal: ':' }, '\_', 'Value'],       postprocess: ([k, , , v]) =\> g.property(k, v),     },     { name: 'Value', symbols: ['StringLiteral', '\_'], postprocess: id },     { name: 'Value', symbols: ['NumericLiteral', '\_'], postprocess: id },     {       name: 'Value',       symbols: [lexer.has('boolean') ? { type: 'boolean' } : boolean, '\_'],       postprocess: (d) =\> g.boolean(JSON.parse(d[0].value.toLowerCase())),     },     { name: 'Value$ebnf$1', symbols: [] },     {       name: 'Value$ebnf$1$subexpression$1',       symbols: [{ literal: ',' }, '\_', 'Value'],       postprocess: ([, , v]) =\> v,     },     {       name: 'Value$ebnf$1',       symbols: ['Value$ebnf$1', 'Value$ebnf$1$subexpression$1'],       postprocess: (d) =\> d[0].concat([d[1]]),     },     {       name: 'Value',       symbols: [         { literal: '[' },         '\_',         'Value',         'Value$ebnf$1',         { literal: ']' },         '\_',       ],       postprocess: ([, , v, vs]) =\> [v, ...vs],     },     {       name: 'StringLiteral',       symbols: [         lexer.has('singleQuotedString')           ? { type: 'singleQuotedString' }           : singleQuotedString,       ],       postprocess: (d) =\> g.string(d[0].value),     },     {       name: 'StringLiteral',       symbols: [         lexer.has('doubleQuotedString')           ? { type: 'doubleQuotedString' }           : doubleQuotedString,       ],       postprocess: (d) =\> g.string(d[0].value),     },     {       name: 'StringLiteral',       symbols: [         lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,       ],       postprocess: (d) =\> g.string(d[0].value),     },     {       name: 'StringLiteral',       symbols: [         lexer.has('taggedString') ? { type: 'taggedString' } : taggedString,       ],       postprocess: (d) =\> {         const parts = separateTagFromString(d[0].value);         return g.tagged(parts.tag, parts.value);       },     },     {       name: 'NumericLiteral',       symbols: [lexer.has('integer') ? { type: 'integer' } : integer],       postprocess: (d) =\> g.integer(d[0].value),     },     {       name: 'NumericLiteral',       symbols: [lexer.has('decimal') ? { type: 'decimal' } : decimal],       postprocess: (d) =\> g.decimal(d[0].value),     },     {       name: 'NumericLiteral',       symbols: [         lexer.has('hexadecimal') ? { type: 'hexadecimal' } : hexadecimal,       ],       postprocess: (d) =\> g.hexadecimal(d[0].value),     },     {       name: 'NumericLiteral',       symbols: [lexer.has('octal') ? { type: 'octal' } : octal],       postprocess: (d) =\> g.octal(d[0].value),     },     {       name: 'NumericLiteral',       symbols: [         lexer.has('measurement') ? { type: 'measurement' } : measurement,       ],       postprocess: (d) =\> {         const parts = separateNumberFromUnits(d[0].value);         return g.measurement(parts.unit, parts.value);       },     },     {       name: '\_$ebnf$1',       symbols: [lexer.has('whitespace') ? { type: 'whitespace' } : whitespace],       postprocess: id,     },     { name: '\_$ebnf$1', symbols: [], postprocess: () =\> null },     { name: '\_', symbols: ['\_$ebnf$1'], postprocess: empty },     {       name: 'Comment',       symbols: [         lexer.has('lineComment') ? { type: 'lineComment' } : lineComment,       ],       postprocess: empty,     },     { name: 'EOL', symbols: [{ literal: '\n' }], postprocess: empty },   ] |
`ParserStart` | string | "GramSeq" |
