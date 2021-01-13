---
title: gram_ast.taggedtextliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / TaggedTextLiteral

# Interface: TaggedTextLiteral

Represents a string value with a format indicated by a "tag".

Some well-known tags:
- `md\`# Hello World\``
- `html\`<h1>Hello World</h1>\``
- `date\`2020-07-14```
- `time\`17:35:42\``
- `uri\`https://gram-data.github.io\`
- `wkt\`POINT(-83.123 42.123)\``

**`see`** [Wikipedia Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Hierarchy

* [TextLiteral](gram_ast.textliteral.md)

  ↳ **TaggedTextLiteral**

  ↳↳ [DateLiteral](gram_ast.dateliteral.md)

  ↳↳ [TimeLiteral](gram_ast.timeliteral.md)

  ↳↳ [DateTimeLiteral](gram_ast.datetimeliteral.md)

  ↳↳ [DurationLiteral](gram_ast.durationliteral.md)

  ↳↳ [TimeIntervalLiteral](gram_ast.timeintervalliteral.md)

  ↳↳ [WellKnownTextLiteral](gram_ast.wellknowntextliteral.md)

  ↳↳ [UriLiteral](gram_ast.uriliteral.md)

## Indexable

▪ [key: string]: unknown

Represents a string value with a format indicated by a "tag".

Some well-known tags:
- `md\`# Hello World\``
- `html\`<h1>Hello World</h1>\``
- `date\`2020-07-14```
- `time\`17:35:42\``
- `uri\`https://gram-data.github.io\`
- `wkt\`POINT(-83.123 42.123)\``

**`see`** [Wikipedia Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Index

### Properties

* [data](gram_ast.taggedtextliteral.md#data)
* [position](gram_ast.taggedtextliteral.md#position)
* [tag](gram_ast.taggedtextliteral.md#tag)
* [type](gram_ast.taggedtextliteral.md#type)
* [value](gram_ast.taggedtextliteral.md#value)

## Properties

### data

• `Optional` **data**: Data

*Inherited from [GramSeq](gram_ast.gramseq.md).[data](gram_ast.gramseq.md#data)*

*Defined in node_modules/@types/unist/index.d.ts:23*

Information from the ecosystem.

___

### position

• `Optional` **position**: Position

*Inherited from [GramSeq](gram_ast.gramseq.md).[position](gram_ast.gramseq.md#position)*

*Defined in node_modules/@types/unist/index.d.ts:29*

Location of a node in a source document.
Must not be present if a node is generated.

___

### tag

•  **tag**: string

*Defined in [packages/gram-ast/src/index.ts:456](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L456)*

The tag prefix of the string value.

___

### type

•  **type**: \"tagged\"

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L277)*
