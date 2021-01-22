---
title: gram_ast.gramproperty
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / GramProperty

# Interface: GramProperty

A GramProperty is a name/value pair.

## Hierarchy

* Node

  ↳ **GramProperty**

## Indexable

▪ [key: string]: unknown

A GramProperty is a name/value pair.

## Index

### Properties

* [data](gram_ast.gramproperty.md#data)
* [name](gram_ast.gramproperty.md#name)
* [position](gram_ast.gramproperty.md#position)
* [type](gram_ast.gramproperty.md#type)
* [value](gram_ast.gramproperty.md#value)

## Properties

### data

• `Optional` **data**: Data

*Inherited from [GramSeq](gram_ast.gramseq.md).[data](gram_ast.gramseq.md#data)*

*Defined in packages/gram-ast/node_modules/@types/unist/index.d.ts:23*

Information from the ecosystem.

___

### name

•  **name**: string

*Defined in [packages/gram-ast/src/index.ts:255](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L255)*

The property name.

___

### position

• `Optional` **position**: Position

*Inherited from [GramSeq](gram_ast.gramseq.md).[position](gram_ast.gramseq.md#position)*

*Defined in packages/gram-ast/node_modules/@types/unist/index.d.ts:29*

Location of a node in a source document.
Must not be present if a node is generated.

___

### type

•  **type**: \"property\"

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:250](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L250)*

Type discriminator for this AST element, always 'property'.

___

### value

•  **value**: [GramRecordValue](../modules/gram_ast.md#gramrecordvalue)

*Defined in [packages/gram-ast/src/index.ts:260](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L260)*

The property value. Either a single literal, an array of literals, or a GramRecord.
