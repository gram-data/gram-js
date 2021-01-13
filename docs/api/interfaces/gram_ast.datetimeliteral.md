---
title: gram_ast.datetimeliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / DateTimeLiteral

# Interface: DateTimeLiteral

Represents an ISO8601 date-time, like `2007-04-05T14:30Z` which is
a date followed by a time, separated by a 'T'.

**`see`** [Wikipedia ISO8601 Date and time](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations)

## Hierarchy

* [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

  ↳ **DateTimeLiteral**

## Indexable

▪ [key: string]: unknown

Represents an ISO8601 date-time, like `2007-04-05T14:30Z` which is
a date followed by a time, separated by a 'T'.

**`see`** [Wikipedia ISO8601 Date and time](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations)

## Index

### Properties

* [data](gram_ast.datetimeliteral.md#data)
* [position](gram_ast.datetimeliteral.md#position)
* [tag](gram_ast.datetimeliteral.md#tag)
* [type](gram_ast.datetimeliteral.md#type)
* [value](gram_ast.datetimeliteral.md#value)

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

•  **tag**: \"datetime\"

*Overrides [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[tag](gram_ast.taggedtextliteral.md#tag)*

*Defined in [packages/gram-ast/src/index.ts:512](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L512)*

___

### type

•  **type**: \"tagged\"

*Inherited from [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[type](gram_ast.taggedtextliteral.md#type)*

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L277)*
