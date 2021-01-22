---
title: gram_ast.hexadecimalliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / HexadecimalLiteral

# Interface: HexadecimalLiteral

Represents an integer expressed in hexadecimal, like 0xc0d3.

The prefix `0x` signifies a hexadecimal value to follow.

## Hierarchy

* TextLiteral

  ↳ **HexadecimalLiteral**

## Indexable

▪ [key: string]: unknown

Represents an integer expressed in hexadecimal, like 0xc0d3.

The prefix `0x` signifies a hexadecimal value to follow.

## Index

### Properties

* [data](gram_ast.hexadecimalliteral.md#data)
* [position](gram_ast.hexadecimalliteral.md#position)
* [type](gram_ast.hexadecimalliteral.md#type)
* [value](gram_ast.hexadecimalliteral.md#value)

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

•  **type**: \"hexadecimal\"

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:377](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram-ast/src/index.ts#L377)*

___

### value

•  **value**: string

*Inherited from [StringLiteral](gram_ast.stringliteral.md).[value](gram_ast.stringliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/fc61725/packages/gram-ast/src/index.ts#L277)*
