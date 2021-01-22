---
title: gram_ast.stringliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / StringLiteral

# Interface: StringLiteral

Represents a string literal, like "hello".

## Hierarchy

* TextLiteral

  ↳ **StringLiteral**

## Indexable

▪ [key: string]: unknown

Represents a string literal, like "hello".

## Index

### Properties

* [data](gram_ast.stringliteral.md#data)
* [position](gram_ast.stringliteral.md#position)
* [type](gram_ast.stringliteral.md#type)
* [value](gram_ast.stringliteral.md#value)

## Properties

### data

• `Optional` **data**: Data

*Inherited from [GramSeq](gram_ast.gramseq.md).[data](gram_ast.gramseq.md#data)*

*Defined in packages/gram-ast/node_modules/@types/unist/index.d.ts:23*

Information from the ecosystem.

___

### position

• `Optional` **position**: Position

*Inherited from [GramSeq](gram_ast.gramseq.md).[position](gram_ast.gramseq.md#position)*

*Defined in packages/gram-ast/node_modules/@types/unist/index.d.ts:29*

Location of a node in a source document.
Must not be present if a node is generated.

___

### type

•  **type**: \"string\"

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:328](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L328)*

Represents this variant of a Literal.

___

### value

•  **value**: string

*Inherited from [StringLiteral](gram_ast.stringliteral.md).[value](gram_ast.stringliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L277)*
