---
title: gram_ast.wellknowntextliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / WellKnownTextLiteral

# Interface: WellKnownTextLiteral

Represents a WKT 2 geospatial value, like `POINT(-83.123 42.123)`

**`see`** [Opengeospatial WKT](http://docs.opengeospatial.org/is/18-010r7/18-010r7.html)

**`see`** [Wikipedia Well-known text geometry](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)

## Hierarchy

* [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

  ↳ **WellKnownTextLiteral**

## Indexable

▪ [key: string]: unknown

Represents a WKT 2 geospatial value, like `POINT(-83.123 42.123)`

**`see`** [Opengeospatial WKT](http://docs.opengeospatial.org/is/18-010r7/18-010r7.html)

**`see`** [Wikipedia Well-known text geometry](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)

## Index

### Properties

* [data](gram_ast.wellknowntextliteral.md#data)
* [position](gram_ast.wellknowntextliteral.md#position)
* [tag](gram_ast.wellknowntextliteral.md#tag)
* [type](gram_ast.wellknowntextliteral.md#type)
* [value](gram_ast.wellknowntextliteral.md#value)

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

### tag

•  **tag**: \"wkt\"

*Overrides [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[tag](gram_ast.taggedtextliteral.md#tag)*

*Defined in [packages/gram-ast/src/index.ts:585](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-ast/src/index.ts#L585)*

___

### type

•  **type**: \"tagged\"

*Inherited from [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[type](gram_ast.taggedtextliteral.md#type)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [StringLiteral](gram_ast.stringliteral.md).[value](gram_ast.stringliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-ast/src/index.ts#L277)*
