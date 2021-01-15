---
title: gram_ast.grampath
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / GramPath

# Interface: GramPath

GramPath is either empty, or the composition of two paths.

## Hierarchy

* Parent

  ↳ **GramPath**

  ↳↳ [GramEmptyPath](gram_ast.gramemptypath.md)

  ↳↳ [GramNode](gram_ast.gramnode.md)

  ↳↳ [GramEdge](gram_ast.gramedge.md)

## Indexable

▪ [key: string]: unknown

GramPath is either empty, or the composition of two paths.

## Index

### Properties

* [children](gram_ast.grampath.md#children)
* [data](gram_ast.grampath.md#data)
* [id](gram_ast.grampath.md#id)
* [kind](gram_ast.grampath.md#kind)
* [labels](gram_ast.grampath.md#labels)
* [position](gram_ast.grampath.md#position)
* [record](gram_ast.grampath.md#record)
* [type](gram_ast.grampath.md#type)

## Properties

### children

•  **children**: [] \| [[GramPath](gram_ast.grampath.md)] \| [[GramPath](gram_ast.grampath.md), [GramPath](gram_ast.grampath.md)]

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:86](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L86)*

The children are the path members which the path composed.

The 'children' field is compatible with generic AST.

Either:
- no children
- a single child with an implied RHS empty path
- two children which are composed into a path

___

### data

• `Optional` **data**: Data

*Inherited from [GramSeq](gram_ast.gramseq.md).[data](gram_ast.gramseq.md#data)*

*Defined in node_modules/@types/unist/index.d.ts:23*

Information from the ecosystem.

___

### id

• `Optional` **id**: undefined \| string

*Defined in [packages/gram-ast/src/index.ts:57](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L57)*

An identifier for the path.

For example, '1' in `()-[1]->()` or 'a' in `(a)`

___

### kind

• `Optional` **kind**: [PathKind](../modules/gram_ast.md#pathkind)

*Defined in [packages/gram-ast/src/index.ts:62](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L62)*

The kind of path composition.

___

### labels

• `Optional` **labels**: string[]

*Defined in [packages/gram-ast/src/index.ts:69](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L69)*

Labels are used to qualify a path.

For example, 'Aye' in `(:Aye)` or 'KNOWS' in `(a)-[:KNOWS]->(b)`

___

### position

• `Optional` **position**: Position

*Inherited from [GramSeq](gram_ast.gramseq.md).[position](gram_ast.gramseq.md#position)*

*Defined in node_modules/@types/unist/index.d.ts:29*

Location of a node in a source document.
Must not be present if a node is generated.

___

### record

• `Optional` **record**: [GramRecord](../modules/gram_ast.md#gramrecord)

*Defined in [packages/gram-ast/src/index.ts:74](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L74)*

The data content of the path.

___

### type

•  **type**: \"path\"

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:50](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L50)*

Type discriminator for this AST element, always 'path'.
