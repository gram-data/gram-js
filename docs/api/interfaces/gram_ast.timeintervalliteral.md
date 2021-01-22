---
title: gram_ast.timeintervalliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / TimeIntervalLiteral

# Interface: TimeIntervalLiteral

Represents an ISO8601 time interval, like `2007-03-01T13:00:00Z/2008-05-11T15:30:00Z`.

This can also represent a repeating interval.

**`see`** [Wikipedia ISO8601 Time_intervals](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals)

**`see`** [Wikipedia ISO8601 Repeating_intervals](https://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals)

## Hierarchy

* [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

  ↳ **TimeIntervalLiteral**

## Indexable

▪ [key: string]: unknown

Represents an ISO8601 time interval, like `2007-03-01T13:00:00Z/2008-05-11T15:30:00Z`.

This can also represent a repeating interval.

**`see`** [Wikipedia ISO8601 Time_intervals](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals)

**`see`** [Wikipedia ISO8601 Repeating_intervals](https://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals)

## Index

### Properties

* [data](gram_ast.timeintervalliteral.md#data)
* [position](gram_ast.timeintervalliteral.md#position)
* [tag](gram_ast.timeintervalliteral.md#tag)
* [type](gram_ast.timeintervalliteral.md#type)
* [value](gram_ast.timeintervalliteral.md#value)

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

•  **tag**: \"interval\"

*Overrides [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[tag](gram_ast.taggedtextliteral.md#tag)*

*Defined in [packages/gram-ast/src/index.ts:561](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L561)*

___

### type

•  **type**: \"tagged\"

*Inherited from [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[type](gram_ast.taggedtextliteral.md#type)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [StringLiteral](gram_ast.stringliteral.md).[value](gram_ast.stringliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ast/src/index.ts#L277)*
