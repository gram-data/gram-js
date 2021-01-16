---
title: gram_ast.measurementliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / MeasurementLiteral

# Interface: MeasurementLiteral

Represents a decimal with units, like 12.4px or 42.0mm

## Hierarchy

* [TextLiteral](gram_ast.textliteral.md)

  ↳ **MeasurementLiteral**

## Indexable

▪ [key: string]: unknown

Represents a decimal with units, like 12.4px or 42.0mm

## Index

### Properties

* [data](gram_ast.measurementliteral.md#data)
* [position](gram_ast.measurementliteral.md#position)
* [type](gram_ast.measurementliteral.md#type)
* [unit](gram_ast.measurementliteral.md#unit)
* [value](gram_ast.measurementliteral.md#value)

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

•  **type**: \"measurement\"

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:410](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L410)*

___

### unit

•  **unit**: string

*Defined in [packages/gram-ast/src/index.ts:415](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L415)*

The unit suffix of the decimal value.

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-ast/src/index.ts#L277)*
