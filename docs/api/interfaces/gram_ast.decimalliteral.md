---
title: gram_ast.decimalliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / DecimalLiteral

# Interface: DecimalLiteral

Represents an decimal number, like 3.1495.
Note: there is no explicit min or max value.

## Hierarchy

* [TextLiteral](gram_ast.textliteral.md)

  ↳ **DecimalLiteral**

## Indexable

▪ [key: string]: unknown

Represents an decimal number, like 3.1495.
Note: there is no explicit min or max value.

## Index

### Properties

* [data](gram_ast.decimalliteral.md#data)
* [position](gram_ast.decimalliteral.md#position)
* [type](gram_ast.decimalliteral.md#type)
* [value](gram_ast.decimalliteral.md#value)

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

•  **type**: \"decimal\"

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:360](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L360)*

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/33eec55/packages/gram-ast/src/index.ts#L277)*
