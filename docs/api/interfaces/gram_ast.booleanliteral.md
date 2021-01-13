---
title: gram_ast.booleanliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / BooleanLiteral

# Interface: BooleanLiteral

Represents a boolean literal, like `true` or `false`.

## Hierarchy

* [TextLiteral](gram_ast.textliteral.md)

  ↳ **BooleanLiteral**

## Indexable

▪ [key: string]: unknown

Represents a boolean literal, like `true` or `false`.

## Index

### Properties

* [data](gram_ast.booleanliteral.md#data)
* [position](gram_ast.booleanliteral.md#position)
* [type](gram_ast.booleanliteral.md#type)
* [value](gram_ast.booleanliteral.md#value)

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

### type

•  **type**: \"boolean\"

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:308](https://github.com/gram-data/gram-js/blob/6df7c85/packages/gram-ast/src/index.ts#L308)*

Represents this variant of a Literal.

___

### value

•  **value**: \"true\" \| \"false\"

*Overrides [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Defined in [packages/gram-ast/src/index.ts:310](https://github.com/gram-data/gram-js/blob/6df7c85/packages/gram-ast/src/index.ts#L310)*
