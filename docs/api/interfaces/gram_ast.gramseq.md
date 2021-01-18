---
title: gram_ast.gramseq
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / GramSeq

# Interface: GramSeq

A GramSeq is a sequence of paths.

## Hierarchy

* Parent

  ↳ **GramSeq**

## Indexable

▪ [key: string]: unknown

A GramSeq is a sequence of paths.

## Index

### Properties

* [children](gram_ast.gramseq.md#children)
* [data](gram_ast.gramseq.md#data)
* [position](gram_ast.gramseq.md#position)
* [type](gram_ast.gramseq.md#type)

## Properties

### children

•  **children**: [GramPath](gram_ast.grampath.md)[]

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:30](https://github.com/gram-data/gram-js/blob/d80fb0e/packages/gram-ast/src/index.ts#L30)*

___

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

•  **type**: \"seq\"

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:28](https://github.com/gram-data/gram-js/blob/d80fb0e/packages/gram-ast/src/index.ts#L28)*

Type discriminator for this AST element, aways 'seq'.
