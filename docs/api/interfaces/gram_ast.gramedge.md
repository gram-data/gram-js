---
title: gram_ast.gramedge
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / GramEdge

# Interface: GramEdge

A GramEdge is a special case of a path composed of
two GramNodes.

## Hierarchy

* [GramPath](gram_ast.grampath.md)

  ↳ **GramEdge**

## Indexable

▪ [key: string]: unknown

A GramEdge is a special case of a path composed of
two GramNodes.

## Index

### Properties

* [children](gram_ast.gramedge.md#children)
* [data](gram_ast.gramedge.md#data)
* [id](gram_ast.gramedge.md#id)
* [kind](gram_ast.gramedge.md#kind)
* [labels](gram_ast.gramedge.md#labels)
* [position](gram_ast.gramedge.md#position)
* [record](gram_ast.gramedge.md#record)
* [type](gram_ast.gramedge.md#type)

## Properties

### children

•  **children**: [[GramNode](gram_ast.gramnode.md), [GramNode](gram_ast.gramnode.md)]

*Overrides [GramPath](gram_ast.grampath.md).[children](gram_ast.grampath.md#children)*

*Defined in [packages/gram-ast/src/index.ts:160](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L160)*

The adjacent Nodes of the Edge, known as "children" in the AST.

children[0] is the 'left' Node
children[1] is the 'right' Node

___

### data

• `Optional` **data**: Data

*Inherited from [GramSeq](gram_ast.gramseq.md).[data](gram_ast.gramseq.md#data)*

*Defined in node_modules/@types/unist/index.d.ts:23*

Information from the ecosystem.

___

### id

• `Optional` **id**: undefined \| string

*Inherited from [GramPath](gram_ast.grampath.md).[id](gram_ast.grampath.md#id)*

*Defined in [packages/gram-ast/src/index.ts:57](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L57)*

An identifier for the path.

For example, '1' in `()-[1]->()` or 'a' in `(a)`

___

### kind

• `Optional` **kind**: [PathKind](../modules/gram_ast.md#pathkind)

*Inherited from [GramPath](gram_ast.grampath.md).[kind](gram_ast.grampath.md#kind)*

*Defined in [packages/gram-ast/src/index.ts:62](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L62)*

The kind of path composition.

___

### labels

• `Optional` **labels**: string[]

*Inherited from [GramPath](gram_ast.grampath.md).[labels](gram_ast.grampath.md#labels)*

*Defined in [packages/gram-ast/src/index.ts:69](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L69)*

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

*Inherited from [GramPath](gram_ast.grampath.md).[record](gram_ast.grampath.md#record)*

*Defined in [packages/gram-ast/src/index.ts:74](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L74)*

The data content of the path.

___

### type

•  **type**: \"path\"

*Inherited from [GramPath](gram_ast.grampath.md).[type](gram_ast.grampath.md#type)*

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:50](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L50)*

Type discriminator for this AST element, always 'path'.
