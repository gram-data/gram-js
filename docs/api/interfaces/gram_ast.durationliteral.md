---
title: gram_ast.durationliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / DurationLiteral

# Interface: DurationLiteral

Represents an ISO8601 duration, like `P23DT23H`.

**`see`** [Wikipedia ISO8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations)

## Hierarchy

* [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

  ↳ **DurationLiteral**

## Indexable

▪ [key: string]: unknown

Represents an ISO8601 duration, like `P23DT23H`.

**`see`** [Wikipedia ISO8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations)

## Index

### Properties

* [data](gram_ast.durationliteral.md#data)
* [position](gram_ast.durationliteral.md#position)
* [tag](gram_ast.durationliteral.md#tag)
* [type](gram_ast.durationliteral.md#type)
* [value](gram_ast.durationliteral.md#value)

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

•  **tag**: \"duration\"

*Overrides [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[tag](gram_ast.taggedtextliteral.md#tag)*

*Defined in [packages/gram-ast/src/index.ts:535](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L535)*

___

### type

•  **type**: \"tagged\"

*Inherited from [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[type](gram_ast.taggedtextliteral.md#type)*

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L277)*
