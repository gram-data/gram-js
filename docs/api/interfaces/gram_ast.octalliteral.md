---
title: gram_ast.octalliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / OctalLiteral

# Interface: OctalLiteral

Represents an integer expressed in octal, like 01372.

The prefix `0` signifies octal notation value to follow.
Without the leading 0, the number would represent an integer.

## Hierarchy

* TextLiteral

  ↳ **OctalLiteral**

## Indexable

▪ [key: string]: unknown

Represents an integer expressed in octal, like 01372.

The prefix `0` signifies octal notation value to follow.
Without the leading 0, the number would represent an integer.

## Index

### Properties

* [data](gram_ast.octalliteral.md#data)
* [position](gram_ast.octalliteral.md#position)
* [type](gram_ast.octalliteral.md#type)
* [value](gram_ast.octalliteral.md#value)

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

•  **type**: \"octal\"

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:395](https://github.com/gram-data/gram-js/blob/d80fb0e/packages/gram-ast/src/index.ts#L395)*

___

### value

•  **value**: string

*Inherited from [StringLiteral](gram_ast.stringliteral.md).[value](gram_ast.stringliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/d80fb0e/packages/gram-ast/src/index.ts#L277)*
