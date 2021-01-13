---
title: gram_ast.dateliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / DateLiteral

# Interface: DateLiteral

Represents an ISO8601 calendar date, like `2020-02-02`.

**`see`** [Wikipedia ISO8601 Caelndar dates](https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates)

## Hierarchy

* [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

  ↳ **DateLiteral**

## Indexable

▪ [key: string]: unknown

Represents an ISO8601 calendar date, like `2020-02-02`.

**`see`** [Wikipedia ISO8601 Caelndar dates](https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates)

## Index

### Properties

* [data](gram_ast.dateliteral.md#data)
* [position](gram_ast.dateliteral.md#position)
* [tag](gram_ast.dateliteral.md#tag)
* [type](gram_ast.dateliteral.md#type)
* [value](gram_ast.dateliteral.md#value)

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

•  **tag**: \"date\"

*Overrides [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[tag](gram_ast.taggedtextliteral.md#tag)*

*Defined in [packages/gram-ast/src/index.ts:473](https://github.com/gram-data/gram-js/blob/6df7c85/packages/gram-ast/src/index.ts#L473)*

___

### type

•  **type**: \"tagged\"

*Inherited from [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[type](gram_ast.taggedtextliteral.md#type)*

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/6df7c85/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/6df7c85/packages/gram-ast/src/index.ts#L277)*
