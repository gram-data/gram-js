---
title: gram_builder
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-builder

# Package: gram-builder

`()-[build]->(ast)`

Build valid `gram` AST.

## How to gram-builder

### Install:

``` bash
npm install @gram-data/gram-builder
```

### Build an AST:

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');
```

## Next Steps

- Enrich record properties with js objects using [gram-value](gram_value.md)
- Serializes to a string using [gram-stringify](gram_stringify.md)
- Introspect the AST using [gram-ast](gram_ast.md)

## Index

### Interfaces

* [PathAttributes](../interfaces/gram_builder.pathattributes.md)

### Type aliases

* [Children](gram_builder.md#children)

### Functions

* [boolean](gram_builder.md#boolean)
* [cons](gram_builder.md#cons)
* [date](gram_builder.md#date)
* [dateToDayOfMonth](gram_builder.md#datetodayofmonth)
* [dateToYMD](gram_builder.md#datetoymd)
* [dayOfMonth](gram_builder.md#dayofmonth)
* [decimal](gram_builder.md#decimal)
* [duration](gram_builder.md#duration)
* [edge](gram_builder.md#edge)
* [empty](gram_builder.md#empty)
* [emptyRecord](gram_builder.md#emptyrecord)
* [flatten](gram_builder.md#flatten)
* [getDown](gram_builder.md#getdown)
* [getLiteral](gram_builder.md#getliteral)
* [getRecord](gram_builder.md#getrecord)
* [getValue](gram_builder.md#getvalue)
* [hexadecimal](gram_builder.md#hexadecimal)
* [integer](gram_builder.md#integer)
* [listToPath](gram_builder.md#listtopath)
* [measurement](gram_builder.md#measurement)
* [node](gram_builder.md#node)
* [normalizeChildren](gram_builder.md#normalizechildren)
* [objectToRecord](gram_builder.md#objecttorecord)
* [octal](gram_builder.md#octal)
* [pair](gram_builder.md#pair)
* [path](gram_builder.md#path)
* [propertiesToRecord](gram_builder.md#propertiestorecord)
* [property](gram_builder.md#property)
* [propertyValue](gram_builder.md#propertyvalue)
* [seq](gram_builder.md#seq)
* [string](gram_builder.md#string)
* [tagged](gram_builder.md#tagged)
* [time](gram_builder.md#time)
* [year](gram_builder.md#year)

### Object literals

* [EMPTY\_PATH](gram_builder.md#empty_path)

## Type aliases

### Children

Ƭ  **Children**<T\>: T \| T[] \| () => T \| T[]

*Defined in [packages/gram-builder/src/index.ts:37](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L37)*

#### Type parameters:

Name |
------ |
`T` |

## Functions

### boolean

▸ `Const`**boolean**(`value`: boolean): [BooleanLiteral](../interfaces/gram_ast.booleanliteral.md)

*Defined in [packages/gram-builder/src/index.ts:410](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L410)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** [BooleanLiteral](../interfaces/gram_ast.booleanliteral.md)

___

### cons

▸ `Const`**cons**(`members?`: [] \| [[GramPath](../interfaces/gram_ast.grampath.md)] \| [[GramPath](../interfaces/gram_ast.grampath.md), [GramPath](../interfaces/gram_ast.grampath.md)], `attributes?`: [PathAttributes](../interfaces/gram_builder.pathattributes.md)): [GramPath](../interfaces/gram_ast.grampath.md)

*Defined in [packages/gram-builder/src/index.ts:112](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L112)*

Build a path.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`members?` | [] \| [[GramPath](../interfaces/gram_ast.grampath.md)] \| [[GramPath](../interfaces/gram_ast.grampath.md), [GramPath](../interfaces/gram_ast.grampath.md)] | - | sub-paths to compose |
`attributes` | [PathAttributes](../interfaces/gram_builder.pathattributes.md) | {} | attributes  |

**Returns:** [GramPath](../interfaces/gram_ast.grampath.md)

___

### date

▸ `Const`**date**(`value`: string \| Date): [DateLiteral](../interfaces/gram_ast.dateliteral.md)

*Defined in [packages/gram-builder/src/index.ts:461](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L461)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| Date |

**Returns:** [DateLiteral](../interfaces/gram_ast.dateliteral.md)

___

### dateToDayOfMonth

▸ `Const`**dateToDayOfMonth**(`d`: Date): string

*Defined in [packages/gram-builder/src/index.ts:54](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L54)*

#### Parameters:

Name | Type |
------ | ------ |
`d` | Date |

**Returns:** string

___

### dateToYMD

▸ `Const`**dateToYMD**(`d`: Date): string

*Defined in [packages/gram-builder/src/index.ts:52](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L52)*

#### Parameters:

Name | Type |
------ | ------ |
`d` | Date |

**Returns:** string

___

### dayOfMonth

▸ `Const`**dayOfMonth**(`value`: string \| Date): [DateLiteral](../interfaces/gram_ast.dateliteral.md)

*Defined in [packages/gram-builder/src/index.ts:467](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L467)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| Date |

**Returns:** [DateLiteral](../interfaces/gram_ast.dateliteral.md)

___

### decimal

▸ `Const`**decimal**(`value`: string \| number): [DecimalLiteral](../interfaces/gram_ast.decimalliteral.md)

*Defined in [packages/gram-builder/src/index.ts:431](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L431)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| number |

**Returns:** [DecimalLiteral](../interfaces/gram_ast.decimalliteral.md)

___

### duration

▸ `Const`**duration**(`value`: string \| Date): [DurationLiteral](../interfaces/gram_ast.durationliteral.md)

*Defined in [packages/gram-builder/src/index.ts:479](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L479)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| Date |

**Returns:** [DurationLiteral](../interfaces/gram_ast.durationliteral.md)

___

### edge

▸ `Const`**edge**(`children`: [[GramNode](../interfaces/gram_ast.gramnode.md), [GramNode](../interfaces/gram_ast.gramnode.md)], `kind`: [RelationshipKind](gram_ast.md#relationshipkind), `id?`: undefined \| string, `labels?`: string[], `record?`: [GramRecord](gram_ast.md#gramrecord)): [GramEdge](../interfaces/gram_ast.gramedge.md)

*Defined in [packages/gram-builder/src/index.ts:212](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L212)*

Build an Edge.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`children` | [[GramNode](../interfaces/gram_ast.gramnode.md), [GramNode](../interfaces/gram_ast.gramnode.md)] |  |
`kind` | [RelationshipKind](gram_ast.md#relationshipkind) |  |
`id?` | undefined \| string |  |
`labels?` | string[] |  |
`record?` | [GramRecord](gram_ast.md#gramrecord) |   |

**Returns:** [GramEdge](../interfaces/gram_ast.gramedge.md)

___

### empty

▸ `Const`**empty**(): [GramEmptyPath](../interfaces/gram_ast.gramemptypath.md)

*Defined in [packages/gram-builder/src/index.ts:181](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L181)*

Convenience function for retrieving the singleton GramEmptyPath.

**Returns:** [GramEmptyPath](../interfaces/gram_ast.gramemptypath.md)

___

### emptyRecord

▸ `Const`**emptyRecord**(): Map<string, [GramRecordValue](gram_ast.md#gramrecordvalue)\>

*Defined in [packages/gram-builder/src/index.ts:269](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L269)*

Create a new, empty GramRecord.

**Returns:** Map<string, [GramRecordValue](gram_ast.md#gramrecordvalue)\>

___

### flatten

▸ `Const`**flatten**(`xs`: any[], `depth?`: number): any[]

*Defined in [packages/gram-builder/src/index.ts:489](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L489)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`xs` | any[] | - |
`depth` | number | 1 |

**Returns:** any[]

___

### getDown

▸ `Const`**getDown**(`hierarchy`: string[] \| string, `f?`: undefined \| (r: [GramRecordValue](gram_ast.md#gramrecordvalue)) => any): (Anonymous function)

*Defined in [packages/gram-builder/src/index.ts:354](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L354)*

Produces a Lens down into nested GramRecords.

### Examples:

Descend using either an array of names, or dot notation.

```
const o = g.objectToRecord({a:{b:{c:g.string("value")}}})

const getAbc1 = g.getDown(['a','b','c']);
const getAbc2 = g.getDown("a.b.c");

expect(getAbc1(o)).toStrictEqual(getAbc2(o));
```

Descend, then apply a function to extract the text value.

```
const o = objectToRecord({a:{b:{c:string("value")}}})
const getAbc = getDown("a.b.c", getValue);

expect(getAbc(o)).toBe("value");
```

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hierarchy` | string[] \| string | array or dot-notation path to descend  |
`f?` | undefined \| (r: [GramRecordValue](gram_ast.md#gramrecordvalue)) => any | - |

**Returns:** (Anonymous function)

___

### getLiteral

▸ `Const`**getLiteral**(`name`: string): (Anonymous function)

*Defined in [packages/gram-builder/src/index.ts:308](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L308)*

Produces a Lens into a literal value with a GramRecord.

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** (Anonymous function)

___

### getRecord

▸ `Const`**getRecord**(`name`: string): (Anonymous function)

*Defined in [packages/gram-builder/src/index.ts:320](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L320)*

Produces a Lens into a record value with a GramRecord.

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** (Anonymous function)

___

### getValue

▸ `Const`**getValue**(`l`: [GramRecordValue](gram_ast.md#gramrecordvalue) \| undefined): undefined \| string

*Defined in [packages/gram-builder/src/index.ts:300](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L300)*

Extracts the value from a GramLiteral, if available.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`l` | [GramRecordValue](gram_ast.md#gramrecordvalue) \| undefined |   |

**Returns:** undefined \| string

___

### hexadecimal

▸ `Const`**hexadecimal**(`value`: string \| number): [HexadecimalLiteral](../interfaces/gram_ast.hexadecimalliteral.md)

*Defined in [packages/gram-builder/src/index.ts:436](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L436)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| number |

**Returns:** [HexadecimalLiteral](../interfaces/gram_ast.hexadecimalliteral.md)

___

### integer

▸ `Const`**integer**(`value`: string \| number): [IntegerLiteral](../interfaces/gram_ast.integerliteral.md)

*Defined in [packages/gram-builder/src/index.ts:426](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L426)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| number |

**Returns:** [IntegerLiteral](../interfaces/gram_ast.integerliteral.md)

___

### listToPath

▸ `Const`**listToPath**(`kind?`: [PathKind](gram_ast.md#pathkind), `pathlist`: [GramPath](../interfaces/gram_ast.grampath.md)[]): [GramPath](../interfaces/gram_ast.grampath.md)

*Defined in [packages/gram-builder/src/index.ts:91](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L91)*

Reduce a list of paths into a single path composed using the given kind.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`kind` | [PathKind](gram_ast.md#pathkind) | "pair" | the kind to apply to all sub-paths |
`pathlist` | [GramPath](../interfaces/gram_ast.grampath.md)[] | - | sub-paths to be paired |

**Returns:** [GramPath](../interfaces/gram_ast.grampath.md)

___

### measurement

▸ `Const`**measurement**(`unit`: string, `value`: string \| number): [MeasurementLiteral](../interfaces/gram_ast.measurementliteral.md)

*Defined in [packages/gram-builder/src/index.ts:446](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L446)*

#### Parameters:

Name | Type |
------ | ------ |
`unit` | string |
`value` | string \| number |

**Returns:** [MeasurementLiteral](../interfaces/gram_ast.measurementliteral.md)

___

### node

▸ `Const`**node**(`id?`: undefined \| string, `labels?`: string[], `record?`: [GramRecord](gram_ast.md#gramrecord)): [GramNode](../interfaces/gram_ast.gramnode.md)

*Defined in [packages/gram-builder/src/index.ts:191](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L191)*

Build a GramNode.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id?` | undefined \| string | identifier |
`labels?` | string[] |  |
`record?` | [GramRecord](gram_ast.md#gramrecord) |  |

**Returns:** [GramNode](../interfaces/gram_ast.gramnode.md)

___

### normalizeChildren

▸ **normalizeChildren**<T\>(`children?`: [Children](gram_builder.md#children)<T\>): T[]

*Defined in [packages/gram-builder/src/index.ts:39](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L39)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | UnistNode |

#### Parameters:

Name | Type |
------ | ------ |
`children?` | [Children](gram_builder.md#children)<T\> |

**Returns:** T[]

___

### objectToRecord

▸ `Const`**objectToRecord**(`o`: any): [GramRecord](gram_ast.md#gramrecord)

*Defined in [packages/gram-builder/src/index.ts:288](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L288)*

Transforms a plain js object into a GramRecord.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`o` | any |   |

**Returns:** [GramRecord](gram_ast.md#gramrecord)

___

### octal

▸ `Const`**octal**(`value`: string \| number): [OctalLiteral](../interfaces/gram_ast.octalliteral.md)

*Defined in [packages/gram-builder/src/index.ts:441](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L441)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| number |

**Returns:** [OctalLiteral](../interfaces/gram_ast.octalliteral.md)

___

### pair

▸ `Const`**pair**(`members`: [[GramPath](../interfaces/gram_ast.grampath.md), [GramPath](../interfaces/gram_ast.grampath.md)], `id?`: undefined \| string, `labels?`: string[], `record?`: [GramRecord](gram_ast.md#gramrecord)): [GramPath](../interfaces/gram_ast.grampath.md)

*Defined in [packages/gram-builder/src/index.ts:258](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L258)*

Build a pair

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`members` | [[GramPath](../interfaces/gram_ast.grampath.md), [GramPath](../interfaces/gram_ast.grampath.md)] | - |
`id?` | undefined \| string |  |
`labels?` | string[] |  |
`record?` | [GramRecord](gram_ast.md#gramrecord) |   |

**Returns:** [GramPath](../interfaces/gram_ast.grampath.md)

___

### path

▸ `Const`**path**(`kind`: [PathKind](gram_ast.md#pathkind), `members`: [[GramPath](../interfaces/gram_ast.grampath.md), [GramPath](../interfaces/gram_ast.grampath.md)], `id?`: undefined \| string, `labels?`: string[], `record?`: [GramRecord](gram_ast.md#gramrecord)): [GramPath](../interfaces/gram_ast.grampath.md)

*Defined in [packages/gram-builder/src/index.ts:235](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L235)*

Build a pair

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`kind` | [PathKind](gram_ast.md#pathkind) | - |
`members` | [[GramPath](../interfaces/gram_ast.grampath.md), [GramPath](../interfaces/gram_ast.grampath.md)] | - |
`id?` | undefined \| string |  |
`labels?` | string[] |  |
`record?` | [GramRecord](gram_ast.md#gramrecord) |   |

**Returns:** [GramPath](../interfaces/gram_ast.grampath.md)

___

### propertiesToRecord

▸ `Const`**propertiesToRecord**(`properties`: [GramProperty](../interfaces/gram_ast.gramproperty.md)[]): [GramRecord](gram_ast.md#gramrecord)

*Defined in [packages/gram-builder/src/index.ts:276](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L276)*

Reduces an array of GramProperties into a GramRecord.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`properties` | [GramProperty](../interfaces/gram_ast.gramproperty.md)[] |   |

**Returns:** [GramRecord](gram_ast.md#gramrecord)

___

### property

▸ `Const`**property**(`name`: string, `value`: any): [GramProperty](../interfaces/gram_ast.gramproperty.md)

*Defined in [packages/gram-builder/src/index.ts:373](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L373)*

Builds a GramProperty from a name

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string |  |
`value` | any |   |

**Returns:** [GramProperty](../interfaces/gram_ast.gramproperty.md)

___

### propertyValue

▸ `Const`**propertyValue**(`value`: any): [GramRecordValue](gram_ast.md#gramrecordvalue)

*Defined in [packages/gram-builder/src/index.ts:382](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L382)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** [GramRecordValue](gram_ast.md#gramrecordvalue)

___

### seq

▸ `Const`**seq**(`paths`: [Children](gram_builder.md#children)<[GramPath](../interfaces/gram_ast.grampath.md)\>, `id?`: undefined \| string, `labels?`: string[], `record?`: [GramRecord](gram_ast.md#gramrecord)): [GramSeq](../interfaces/gram_ast.gramseq.md)

*Defined in [packages/gram-builder/src/index.ts:64](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L64)*

Build a path sequence that represents a graph.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`paths` | [Children](gram_builder.md#children)<[GramPath](../interfaces/gram_ast.grampath.md)\> | sequence of paths through history |
`id?` | undefined \| string | optional reference identifier. The "name" of this graph instance. |
`labels?` | string[] | optional labels |
`record?` | [GramRecord](gram_ast.md#gramrecord) | optional graph-level data  |

**Returns:** [GramSeq](../interfaces/gram_ast.gramseq.md)

___

### string

▸ `Const`**string**(`value`: string): [StringLiteral](../interfaces/gram_ast.stringliteral.md)

*Defined in [packages/gram-builder/src/index.ts:415](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L415)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** [StringLiteral](../interfaces/gram_ast.stringliteral.md)

___

### tagged

▸ `Const`**tagged**(`tag`: string, `value`: string): [TaggedTextLiteral](../interfaces/gram_ast.taggedtextliteral.md)

*Defined in [packages/gram-builder/src/index.ts:420](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L420)*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | string |
`value` | string |

**Returns:** [TaggedTextLiteral](../interfaces/gram_ast.taggedtextliteral.md)

___

### time

▸ `Const`**time**(`value`: string \| Date): [TimeLiteral](../interfaces/gram_ast.timeliteral.md)

*Defined in [packages/gram-builder/src/index.ts:473](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L473)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| Date |

**Returns:** [TimeLiteral](../interfaces/gram_ast.timeliteral.md)

___

### year

▸ `Const`**year**(`value`: string \| Date): [DateLiteral](../interfaces/gram_ast.dateliteral.md)

*Defined in [packages/gram-builder/src/index.ts:455](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L455)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| Date |

**Returns:** [DateLiteral](../interfaces/gram_ast.dateliteral.md)

## Object literals

### EMPTY\_PATH

▪ `Const` **EMPTY\_PATH**: object

*Defined in [packages/gram-builder/src/index.ts:170](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-builder/src/index.ts#L170)*

Singleton instance of GramEmptyPath

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`children` | [] | [] |
`id` | \"ø\" | EMPTY\_PATH\_ID |
`labels` | undefined | undefined |
`record` | undefined | undefined |
`type` | \"path\" | "path" |
