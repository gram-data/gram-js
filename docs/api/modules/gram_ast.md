---
title: gram_ast
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-ast

# Package: gram-ast

`()-[define]->(ast)`

Gram abstract syntax tree definitions, tokenizing regexes, and utilities like type guards.

## How to gram-ast

### Install:

```bash
npm install @gram-data/gram-ast
```

### Use [gram-parse](gram_parse.md) to create an AST, then introspect with gram-ast:

```TypeScript
import { isGramSeq, isGramNode, isGramEdge } from '@gram-data/gram-ast';
import { toAST } from '@gram-data/gram-parse';  

const src = '(a)-->(b)';
const parsed = toAST(src);

// the top-level of the AST is a sequence of paths
console.assert(isGramSeq(parsed));

// the first path should be an edge
const firstPath = parsed.children[0];
console.assert(isGramEdge(firstPath));

// the children of an edge are nodes
console.assert(isGramNode(firstPath.children[0]));
console.assert(isGramNode(firstPath.children[1]));
```

## Syntax Tree

The `gram` AST is based on the [unist](https://github.com/syntax-tree/unist) specification
for syntax trees. Many of the tools and techniques of the [unified](https://unifiedjs.com)
ecosystem can be applied to working with `gram`.

Gram represents data using two basic elements: paths and sequences.

Paths provide structure. Sequences provide order.

### [`GramSeq`](../interfaces/gram_ast.gramseq.md)

A `gram` sequence is the root element of an AST.
It is exactly what it sounds like: a sequence of elements where
each element is a path.

The AST type is useful in returning a well-rooted tree that can be processed
by general-purpose AST tools like [unist-util-visit](https://github.com/syntax-tree/unist-util-visit).

In practice this is equivalent to a `GramPath[]`. Most `gram` functions will accept either.

### [`GramPath`](../interfaces/gram_ast.grampath.md)

A `gram` path is either an empty path, or the composition of two other paths.
The data structure of a path is like a list which remembers how it was assembled.
The list elements are other paths.

Each path has its own identity, labels and a data record.

### [record](../interfaces/gram_ast.gramrecord-1.html)

In the AST, records are a multimap presented as an _array_ of name/value
properties. That means a property name _may_ appear more than once, with
different or the same values.

When mapping to a data model, choose one of these strageies for handling the
multimapped properties:

- single-state: pick the first or last value (_recommended_)
- join: accumulate the values into an array
- reduce: aggregate the values into a single value

## Next Steps

- Learn more about parsing with [gram-ast](gram_ast.md)
- Transform to js objects using [gram-value](gram_value.md)
- Serialize back to text using [gram-stringify](gram_stringify.md)

## Index

### Interfaces

* [BooleanLiteral](../interfaces/gram_ast.booleanliteral.md)
* [DateLiteral](../interfaces/gram_ast.dateliteral.md)
* [DateTimeLiteral](../interfaces/gram_ast.datetimeliteral.md)
* [DecimalLiteral](../interfaces/gram_ast.decimalliteral.md)
* [DurationLiteral](../interfaces/gram_ast.durationliteral.md)
* [GramEdge](../interfaces/gram_ast.gramedge.md)
* [GramEmptyPath](../interfaces/gram_ast.gramemptypath.md)
* [GramNode](../interfaces/gram_ast.gramnode.md)
* [GramPath](../interfaces/gram_ast.grampath.md)
* [GramProperty](../interfaces/gram_ast.gramproperty.md)
* [GramSeq](../interfaces/gram_ast.gramseq.md)
* [HexadecimalLiteral](../interfaces/gram_ast.hexadecimalliteral.md)
* [IntegerLiteral](../interfaces/gram_ast.integerliteral.md)
* [MeasurementLiteral](../interfaces/gram_ast.measurementliteral.md)
* [OctalLiteral](../interfaces/gram_ast.octalliteral.md)
* [StringLiteral](../interfaces/gram_ast.stringliteral.md)
* [TaggedTextLiteral](../interfaces/gram_ast.taggedtextliteral.md)
* [TextLiteral](../interfaces/gram_ast.textliteral.md)
* [TimeIntervalLiteral](../interfaces/gram_ast.timeintervalliteral.md)
* [TimeLiteral](../interfaces/gram_ast.timeliteral.md)
* [UriLiteral](../interfaces/gram_ast.uriliteral.md)
* [WellKnownTextLiteral](../interfaces/gram_ast.wellknowntextliteral.md)

### Type aliases

* [CombinationKind](gram_ast.md#combinationkind)
* [GramLiteral](gram_ast.md#gramliteral)
* [GramPathlike](gram_ast.md#grampathlike)
* [GramRecord](gram_ast.md#gramrecord)
* [GramRecordValue](gram_ast.md#gramrecordvalue)
* [PathKind](gram_ast.md#pathkind)
* [RelationshipKind](gram_ast.md#relationshipkind)
* [TaggedLiteral](gram_ast.md#taggedliteral)

### Variables

* [EMPTY\_PATH\_ID](gram_ast.md#empty_path_id)
* [boolean](gram_ast.md#boolean)
* [checkIdentifierRegex](gram_ast.md#checkidentifierregex)
* [decimal](gram_ast.md#decimal)
* [doubleQuotedString](gram_ast.md#doublequotedstring)
* [hexadecimal](gram_ast.md#hexadecimal)
* [identifier](gram_ast.md#identifier)
* [integer](gram_ast.md#integer)
* [measurement](gram_ast.md#measurement)
* [octal](gram_ast.md#octal)
* [singleQuotedString](gram_ast.md#singlequotedstring)
* [symbol](gram_ast.md#symbol)
* [taggedString](gram_ast.md#taggedstring)
* [tickedString](gram_ast.md#tickedstring)

### Functions

* [isBooleanLiteral](gram_ast.md#isbooleanliteral)
* [isDateLiteral](gram_ast.md#isdateliteral)
* [isDateTimeLiteral](gram_ast.md#isdatetimeliteral)
* [isDecimalLiteral](gram_ast.md#isdecimalliteral)
* [isDuration](gram_ast.md#isduration)
* [isGramEdge](gram_ast.md#isgramedge)
* [isGramEmptyPath](gram_ast.md#isgramemptypath)
* [isGramLiteral](gram_ast.md#isgramliteral)
* [isGramLiteralArray](gram_ast.md#isgramliteralarray)
* [isGramNode](gram_ast.md#isgramnode)
* [isGramPath](gram_ast.md#isgrampath)
* [isGramProperty](gram_ast.md#isgramproperty)
* [isGramRecord](gram_ast.md#isgramrecord)
* [isGramSeq](gram_ast.md#isgramseq)
* [isHexadecimalLiteral](gram_ast.md#ishexadecimalliteral)
* [isIntegerLiteral](gram_ast.md#isintegerliteral)
* [isMeasurementLiteral](gram_ast.md#ismeasurementliteral)
* [isOctalLiteral](gram_ast.md#isoctalliteral)
* [isStringLiteral](gram_ast.md#isstringliteral)
* [isTaggedLiteral](gram_ast.md#istaggedliteral)
* [isTimeInterval](gram_ast.md#istimeinterval)
* [isTimeLiteral](gram_ast.md#istimeliteral)
* [isUriLiteral](gram_ast.md#isuriliteral)
* [isValidIdentifier](gram_ast.md#isvalididentifier)
* [isWellKnownTextLiteral](gram_ast.md#iswellknowntextliteral)

## Type aliases

### CombinationKind

Ƭ  **CombinationKind**: \"pair\"

*Defined in [packages/gram-ast/src/index.ts:196](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L196)*

Kind of path which combines two paths together
without implying any semantics.

One of:

- pair  `(a),(b)`

___

### GramLiteral

Ƭ  **GramLiteral**: [BooleanLiteral](../interfaces/gram_ast.booleanliteral.md) \| [StringLiteral](../interfaces/gram_ast.stringliteral.md) \| [TaggedTextLiteral](../interfaces/gram_ast.taggedtextliteral.md) \| [IntegerLiteral](../interfaces/gram_ast.integerliteral.md) \| [MeasurementLiteral](../interfaces/gram_ast.measurementliteral.md) \| [DecimalLiteral](../interfaces/gram_ast.decimalliteral.md) \| [HexadecimalLiteral](../interfaces/gram_ast.hexadecimalliteral.md) \| [OctalLiteral](../interfaces/gram_ast.octalliteral.md)

*Defined in [packages/gram-ast/src/index.ts:283](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L283)*

Discrimination union of all possible literals.

___

### GramPathlike

Ƭ  **GramPathlike**: [GramPath](../interfaces/gram_ast.grampath.md) \| [GramNode](../interfaces/gram_ast.gramnode.md) \| [GramEdge](../interfaces/gram_ast.gramedge.md)

*Defined in [packages/gram-ast/src/index.ts:213](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L213)*

GramPathlike is a discriminated union of GramPath with
its two primary specializations, GramNode and GramEdge.

___

### GramRecord

Ƭ  **GramRecord**: Map<string, [GramRecordValue](gram_ast.md#gramrecordvalue)\>

*Defined in [packages/gram-ast/src/index.ts:228](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L228)*

A GramRecord is a map of name/value pairs.

___

### GramRecordValue

Ƭ  **GramRecordValue**: [GramLiteral](gram_ast.md#gramliteral) \| [GramRecord](gram_ast.md#gramrecord) \| [GramRecordValue](gram_ast.md#gramrecordvalue)[]

*Defined in [packages/gram-ast/src/index.ts:222](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L222)*

GramRecordValue is a union of literals, literal arrays and nested records.
This forms a familiar OO-style structure.

___

### PathKind

Ƭ  **PathKind**: [RelationshipKind](gram_ast.md#relationshipkind) \| [CombinationKind](gram_ast.md#combinationkind)

*Defined in [packages/gram-ast/src/index.ts:207](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L207)*

PathKind describes the nature of the
path composition.

One of:

- RelationshipKind: 'left', 'right', 'either'
- CombinationKind:  `pair`

___

### RelationshipKind

Ƭ  **RelationshipKind**: \"left\" \| \"right\" \| \"either\"

*Defined in [packages/gram-ast/src/index.ts:185](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L185)*

Kind of path which forms a graph relationship.

One of:

- left   `(a)<--(b)`
- right  `(a)-->(b)`
- either `(a)--(b)`

___

### TaggedLiteral

Ƭ  **TaggedLiteral**: [DateLiteral](../interfaces/gram_ast.dateliteral.md) \| [TimeLiteral](../interfaces/gram_ast.timeliteral.md) \| [DateTimeLiteral](../interfaces/gram_ast.datetimeliteral.md) \| [TimeIntervalLiteral](../interfaces/gram_ast.timeintervalliteral.md) \| [DurationLiteral](../interfaces/gram_ast.durationliteral.md) \| [WellKnownTextLiteral](../interfaces/gram_ast.wellknowntextliteral.md) \| [UriLiteral](../interfaces/gram_ast.uriliteral.md)

*Defined in [packages/gram-ast/src/index.ts:429](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L429)*

## Variables

### EMPTY\_PATH\_ID

• `Const` **EMPTY\_PATH\_ID**: \"ø\" = "ø"

*Defined in [packages/gram-ast/src/index.ts:100](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L100)*

Constant identity for empty paths: `ø`.

___

### boolean

• `Const` **boolean**: RegExp = /true\|false\|TRUE\|FALSE\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:1](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L1)*

___

### checkIdentifierRegex

• `Const` **checkIdentifierRegex**: RegExp = new RegExp('^' + identifier.source + '$')

*Defined in [packages/gram-ast/src/gram-tokens.ts:14](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L14)*

___

### decimal

• `Const` **decimal**: RegExp = /-?(?:[0-9]\|[1-9][0-9]+)\.[0-9]+(?:[eE][-+]?[0-9]+)?\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:5](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L5)*

___

### doubleQuotedString

• `Const` **doubleQuotedString**: RegExp = /"(?:\\["bfnrt/\\]\|\\u[a-fA-F0-9]{4}\|[^"\\])*"/

*Defined in [packages/gram-ast/src/gram-tokens.ts:8](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L8)*

___

### hexadecimal

• `Const` **hexadecimal**: RegExp = /-?0x(?:[0-9a-fA-F]+)\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:2](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L2)*

___

### identifier

• `Const` **identifier**: RegExp = /[0-9a-zA-Z\_@]+\b@*/

*Defined in [packages/gram-ast/src/gram-tokens.ts:12](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L12)*

___

### integer

• `Const` **integer**: RegExp = /-?(?:[0-9]\|[1-9][0-9]+)(?:[eE][-+]?[0-9]+)?\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:6](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L6)*

___

### measurement

• `Const` **measurement**: RegExp = /-?(?:[0-9]\|[1-9][0-9]+)(?:\.[0-9]+)?[a-zA-Z]+\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:4](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L4)*

___

### octal

• `Const` **octal**: RegExp = /-?0(?:[0-7]+)\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:3](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L3)*

___

### singleQuotedString

• `Const` **singleQuotedString**: RegExp = /'(?:\\['bfnrt/\\]\|\\u[a-fA-F0-9]{4}\|[^'\\])*'/

*Defined in [packages/gram-ast/src/gram-tokens.ts:9](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L9)*

___

### symbol

• `Const` **symbol**: RegExp = /[a-zA-Z\_][0-9a-zA-Z\_]*\b(?!@)/

*Defined in [packages/gram-ast/src/gram-tokens.ts:11](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L11)*

___

### taggedString

• `Const` **taggedString**: RegExp = /[a-zA-Z][0-9a-zA-Z\_@]*\`(?:\\[\`bfnrt/\\]\|\\u[a-fA-F0-9]{4}\|[^\`\\])*\`/

*Defined in [packages/gram-ast/src/gram-tokens.ts:7](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L7)*

___

### tickedString

• `Const` **tickedString**: RegExp = /\`(?:\\[\`bfnrt/\\]\|\\u[a-fA-F0-9]{4}\|[^\`\\])*\`/

*Defined in [packages/gram-ast/src/gram-tokens.ts:10](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L10)*

## Functions

### isBooleanLiteral

▸ `Const`**isBooleanLiteral**(`o`: any): o is TextLiteral

*Defined in [packages/gram-ast/src/index.ts:318](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L318)*

Type guard for BooleanLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is TextLiteral

___

### isDateLiteral

▸ `Const`**isDateLiteral**(`o`: any): o is DateLiteral

*Defined in [packages/gram-ast/src/index.ts:483](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L483)*

Type guard for DateLiteral.

Note: this does not validate the text representation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is DateLiteral

___

### isDateTimeLiteral

▸ `Const`**isDateTimeLiteral**(`o`: any): o is DateTimeLiteral

*Defined in [packages/gram-ast/src/index.ts:522](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L522)*

Type guard for DateTimeLiteral.

Note: this does not validate the text representation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is DateTimeLiteral

___

### isDecimalLiteral

▸ `Const`**isDecimalLiteral**(`o`: any): o is DecimalLiteral

*Defined in [packages/gram-ast/src/index.ts:368](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L368)*

Type guard for DecimalLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is DecimalLiteral

___

### isDuration

▸ `Const`**isDuration**(`o`: any): o is DurationLiteral

*Defined in [packages/gram-ast/src/index.ts:545](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L545)*

Type guard for DurationLiteral.

Note: this does not validate the text representation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is DurationLiteral

___

### isGramEdge

▸ `Const`**isGramEdge**(`o`: any): o is GramEdge

*Defined in [packages/gram-ast/src/index.ts:168](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L168)*

Type guard for GramEdge.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramEdge

___

### isGramEmptyPath

▸ `Const`**isGramEmptyPath**(`o`: any): o is GramEmptyPath

*Defined in [packages/gram-ast/src/index.ts:122](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L122)*

Type guard for GramEmptyPath.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramEmptyPath

___

### isGramLiteral

▸ `Const`**isGramLiteral**(`o`: any): o is GramLiteral

*Defined in [packages/gram-ast/src/index.ts:298](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L298)*

Type guard for GramLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramLiteral

___

### isGramLiteralArray

▸ `Const`**isGramLiteralArray**(`v`: [GramRecordValue](gram_ast.md#gramrecordvalue)): v is GramLiteral[]

*Defined in [packages/gram-ast/src/index.ts:240](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L240)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [GramRecordValue](gram_ast.md#gramrecordvalue) |

**Returns:** v is GramLiteral[]

___

### isGramNode

▸ `Const`**isGramNode**(`o`: any): o is GramNode

*Defined in [packages/gram-ast/src/index.ts:142](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L142)*

Type guard for GramNode.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramNode

___

### isGramPath

▸ `Const`**isGramPath**(`o`: any): o is GramPath

*Defined in [packages/gram-ast/src/index.ts:94](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L94)*

Type guard for a Path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramPath

___

### isGramProperty

▸ `Const`**isGramProperty**(`o`: any): o is GramProperty

*Defined in [packages/gram-ast/src/index.ts:268](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L268)*

Type guard for GramProperty.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramProperty

___

### isGramRecord

▸ `Const`**isGramRecord**(`v`: any): v is GramRecord

*Defined in [packages/gram-ast/src/index.ts:237](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L237)*

A type guard to narrow a GramRecordValue to a GramRecord.

Warning: this is not a runtime guarantee

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | any | any GramRecordValue  |

**Returns:** v is GramRecord

___

### isGramSeq

▸ `Const`**isGramSeq**(`o`: any): o is GramSeq

*Defined in [packages/gram-ast/src/index.ts:38](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L38)*

Type guard for GramSeq.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is GramSeq

___

### isHexadecimalLiteral

▸ `Const`**isHexadecimalLiteral**(`o`: any): o is HexadecimalLiteral

*Defined in [packages/gram-ast/src/index.ts:385](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L385)*

Type guard for HexadecimalLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is HexadecimalLiteral

___

### isIntegerLiteral

▸ `Const`**isIntegerLiteral**(`o`: any): o is IntegerLiteral

*Defined in [packages/gram-ast/src/index.ts:352](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L352)*

Type guard for IntegerLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is IntegerLiteral

___

### isMeasurementLiteral

▸ `Const`**isMeasurementLiteral**(`o`: any): o is MeasurementLiteral

*Defined in [packages/gram-ast/src/index.ts:423](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L423)*

Type guard for MeasurementLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is MeasurementLiteral

___

### isOctalLiteral

▸ `Const`**isOctalLiteral**(`o`: any): o is OctalLiteral

*Defined in [packages/gram-ast/src/index.ts:403](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L403)*

Type guard for OctalLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is OctalLiteral

___

### isStringLiteral

▸ `Const`**isStringLiteral**(`o`: any): o is TextLiteral

*Defined in [packages/gram-ast/src/index.ts:336](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L336)*

Type guard for StringLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is TextLiteral

___

### isTaggedLiteral

▸ `Const`**isTaggedLiteral**(`o`: any): o is TaggedLiteral

*Defined in [packages/gram-ast/src/index.ts:464](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L464)*

Type guard for TaggedTextLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is TaggedLiteral

___

### isTimeInterval

▸ `Const`**isTimeInterval**(`o`: any): o is TimeIntervalLiteral

*Defined in [packages/gram-ast/src/index.ts:571](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L571)*

Type guard for TimeIntervalLiteral.

Note: this does not validate the text representation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is TimeIntervalLiteral

___

### isTimeLiteral

▸ `Const`**isTimeLiteral**(`o`: any): o is TaggedTextLiteral

*Defined in [packages/gram-ast/src/index.ts:502](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L502)*

Type guard for TimeLiteral.

Note: this does not validate the text representation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is TaggedTextLiteral

___

### isUriLiteral

▸ `Const`**isUriLiteral**(`o`: any): o is UriLiteral

*Defined in [packages/gram-ast/src/index.ts:651](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L651)*

Type guard for UriLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is UriLiteral

___

### isValidIdentifier

▸ `Const`**isValidIdentifier**(`s?`: undefined \| string): undefined \| false \| true \| ""

*Defined in [packages/gram-ast/src/gram-tokens.ts:20](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/gram-tokens.ts#L20)*

Checks whether the given string is a valid identifier.

#### Parameters:

Name | Type |
------ | ------ |
`s?` | undefined \| string |

**Returns:** undefined \| false \| true \| ""

___

### isWellKnownTextLiteral

▸ `Const`**isWellKnownTextLiteral**(`o`: any): o is WellKnownTextLiteral

*Defined in [packages/gram-ast/src/index.ts:593](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-ast/src/index.ts#L593)*

Type guard for WellKnownTextLiteral.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any | any object  |

**Returns:** o is WellKnownTextLiteral
