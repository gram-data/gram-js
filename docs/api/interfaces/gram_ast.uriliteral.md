---
title: gram_ast.uriliteral
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-ast](../modules/gram_ast.md) / UriLiteral

# Interface: UriLiteral

Represents a well-formed URI.

## Some examples:

### `geo`

> A 'geo' URI identifies a physical location in a two- or three-dimensional
> coordinate reference system in a compact, simple, human-readable, and
> protocol-independent way.

```
uri`geo:39.282495,-76.594709`
```

**`see`** [IETF RFC5870](https://tools.ietf.org/html/rfc5870)

### `plus`

> A 'plus' URI identifies a physical location encoded as
> Open Location Code, a "plus code".

```
uri`plus:7CJ4+W4 Baltimore, MD`
```

**`see`** [Open Location Code](https://github.com/google/open-location-code)

### `h3`

> An 'h3' URI identifies a physical location encoded using
> the H3 geospatial indexing system, a multi-precision hexagonal
> tiling of the sphere indexed with hierarchical linear indexes.

```
uri`h3:8c2aa8c76b11bff`
```

**`see`** [H3](https://h3geo.org)

### `http(s)`

> Hopefully This Thing Presents Sensibly, a popular scheme used
>on the interwebs.

## Hierarchy

* [TaggedTextLiteral](gram_ast.taggedtextliteral.md)

  ↳ **UriLiteral**

## Indexable

▪ [key: string]: unknown

Represents a well-formed URI.

## Some examples:

### `geo`

> A 'geo' URI identifies a physical location in a two- or three-dimensional
> coordinate reference system in a compact, simple, human-readable, and
> protocol-independent way.

```
uri`geo:39.282495,-76.594709`
```

**`see`** [IETF RFC5870](https://tools.ietf.org/html/rfc5870)

### `plus`

> A 'plus' URI identifies a physical location encoded as
> Open Location Code, a "plus code".

```
uri`plus:7CJ4+W4 Baltimore, MD`
```

**`see`** [Open Location Code](https://github.com/google/open-location-code)

### `h3`

> An 'h3' URI identifies a physical location encoded using
> the H3 geospatial indexing system, a multi-precision hexagonal
> tiling of the sphere indexed with hierarchical linear indexes.

```
uri`h3:8c2aa8c76b11bff`
```

**`see`** [H3](https://h3geo.org)

### `http(s)`

> Hopefully This Thing Presents Sensibly, a popular scheme used
>on the interwebs.

## Index

### Properties

* [data](gram_ast.uriliteral.md#data)
* [position](gram_ast.uriliteral.md#position)
* [tag](gram_ast.uriliteral.md#tag)
* [type](gram_ast.uriliteral.md#type)
* [value](gram_ast.uriliteral.md#value)

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

### tag

•  **tag**: \"uri\"

*Overrides [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[tag](gram_ast.taggedtextliteral.md#tag)*

*Defined in [packages/gram-ast/src/index.ts:643](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L643)*

___

### type

•  **type**: \"tagged\"

*Inherited from [TaggedTextLiteral](gram_ast.taggedtextliteral.md).[type](gram_ast.taggedtextliteral.md#type)*

*Overrides [TextLiteral](gram_ast.textliteral.md).[type](gram_ast.textliteral.md#type)*

*Defined in [packages/gram-ast/src/index.ts:451](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L451)*

___

### value

•  **value**: string

*Inherited from [TextLiteral](gram_ast.textliteral.md).[value](gram_ast.textliteral.md#value)*

*Overrides void*

*Defined in [packages/gram-ast/src/index.ts:277](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L277)*
