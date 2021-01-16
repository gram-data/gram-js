---
title: gram_ast.gramemptypath
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / GramEmptyPath

# Interface: GramEmptyPath

A GramEmptyPath is an empty path with no children,
no labels, and no record
but a unique singleton identity of [EMPTY_PATH_ID](../modules/gram_ast.md#empty_path_id).

## Hierarchy

* [GramPath](gram_ast.grampath.md)

  ↳ **GramEmptyPath**

## Indexable

▪ [key: string]: unknown

A GramEmptyPath is an empty path with no children,
no labels, and no record
but a unique singleton identity of [EMPTY_PATH_ID](../modules/gram_ast.md#empty_path_id).

## Index

### Properties

* [children](gram_ast.gramemptypath.md#children)
* [data](gram_ast.gramemptypath.md#data)
* [id](gram_ast.gramemptypath.md#id)
* [kind](gram_ast.gramemptypath.md#kind)
* [labels](gram_ast.gramemptypath.md#labels)
* [position](gram_ast.gramemptypath.md#position)
* [record](gram_ast.gramemptypath.md#record)
* [type](gram_ast.gramemptypath.md#type)

## Properties

### children

•  **children**: []

*Overrides [GramPath](gram_ast.grampath.md).[children](gram_ast.grampath.md#children)*

*Defined in [packages/gram-ast/src/index.ts:114](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L114)*

___

### data

• `Optional` **data**: Data

*Inherited from [GramSeq](gram_ast.gramseq.md).[data](gram_ast.gramseq.md#data)*

*Defined in node_modules/@types/unist/index.d.ts:23*

Information from the ecosystem.

___

### id

•  **id**: *typeof* [EMPTY\_PATH\_ID](../modules/gram_ast.md#empty_path_id)

*Overrides [GramPath](gram_ast.grampath.md).[id](gram_ast.grampath.md#id)*

*Defined in [packages/gram-ast/src/index.ts:108](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L108)*

___

### kind

• `Optional` **kind**: [PathKind](../modules/gram_ast.md#pathkind)

*Inherited from [GramPath](gram_ast.grampath.md).[kind](gram_ast.grampath.md#kind)*

*Defined in [packages/gram-ast/src/index.ts:62](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L62)*

The kind of path composition.

___

### labels

•  **labels**: undefined

*Overrides [GramPath](gram_ast.grampath.md).[labels](gram_ast.grampath.md#labels)*

*Defined in [packages/gram-ast/src/index.ts:110](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L110)*

___

### position

• `Optional` **position**: Position

*Inherited from [GramSeq](gram_ast.gramseq.md).[position](gram_ast.gramseq.md#position)*

*Defined in node_modules/@types/unist/index.d.ts:29*

Location of a node in a source document.
Must not be present if a node is generated.

___

### record

•  **record**: undefined

*Overrides [GramPath](gram_ast.grampath.md).[record](gram_ast.grampath.md#record)*

*Defined in [packages/gram-ast/src/index.ts:112](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L112)*

___

### type

•  **type**: \"path\"

*Inherited from [GramPath](gram_ast.grampath.md).[type](gram_ast.grampath.md#type)*

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:50](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L50)*

Type discriminator for this AST element, always 'path'.
