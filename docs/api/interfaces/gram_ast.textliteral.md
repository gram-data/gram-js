---
title: gram_ast.textliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / TextLiteral

# Interface: TextLiteral

Base interface for literals, all of which
only provide textual value representations.

## Hierarchy

* Literal

  ↳ **TextLiteral**

  ↳↳ [BooleanLiteral](gram_ast.booleanliteral.md)

  ↳↳ [StringLiteral](gram_ast.stringliteral.md)

  ↳↳ [IntegerLiteral](gram_ast.integerliteral.md)

  ↳↳ [DecimalLiteral](gram_ast.decimalliteral.md)

  ↳↳ [HexadecimalLiteral](gram_ast.hexadecimalliteral.md)

  ↳↳ [OctalLiteral](gram_ast.octalliteral.md)

  ↳↳ [MeasurementLiteral](gram_ast.measurementliteral.md)

  ↳↳ [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

## Indexable

▪ [key: string]: unknown

Base interface for literals, all of which
only provide textual value representations.

## Index

### Properties

* [data](gram_ast.textliteral.md#data)
* [position](gram_ast.textliteral.md#position)
* [type](gram_ast.textliteral.md#type)
* [value](gram_ast.textliteral.md#value)

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

•  **type**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in node_modules/@types/unist/index.d.ts:18*

The variant of a node.

___

### value

•  **value**: string

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/6df7c85/packages/gram-ast/src/index.ts#L277)*
