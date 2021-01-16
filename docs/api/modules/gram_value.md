---
title: gram_value
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-value

# Package: gram-value

Evaluate data graph AST values, producing Javascript primitive or object values.

## How to gram-value

### Install:

``` bash
npm install @gram-data/gram-value
```

### Build an AST using [gram-builder](gram_builder.md):

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');
```

## Next Steps

- Write back to a string using [gram-stringify](gram_stringify.md)
- Introspect the AST using [gram-ast](gram_ast.md)
- Write your own [unified](https://github.com/unifiedjs/unified#plugin) plugin for processing the AST

## Index

### References

* [LiteralValueEvaluator](gram_value.md#literalvalueevaluator)
* [iso8601Duration](gram_value.md#iso8601duration)
* [iso8601LocalTime](gram_value.md#iso8601localtime)
* [iso8601OrdinalDate](gram_value.md#iso8601ordinaldate)
* [iso8601Repeat](gram_value.md#iso8601repeat)
* [iso8601Time](gram_value.md#iso8601time)
* [iso8601WeekDate](gram_value.md#iso8601weekdate)
* [iso8601WeekOfYear](gram_value.md#iso8601weekofyear)
* [iso8601Year](gram_value.md#iso8601year)
* [iso8601YearMonth](gram_value.md#iso8601yearmonth)
* [iso8601YearMonthDay](gram_value.md#iso8601yearmonthday)
* [valueOf](gram_value.md#valueof)
* [valueOfBoolean](gram_value.md#valueofboolean)
* [valueOfDate](gram_value.md#valueofdate)
* [valueOfDecimal](gram_value.md#valueofdecimal)
* [valueOfDuration](gram_value.md#valueofduration)
* [valueOfHexadecimal](gram_value.md#valueofhexadecimal)
* [valueOfInteger](gram_value.md#valueofinteger)
* [valueOfLiteral](gram_value.md#valueofliteral)
* [valueOfMeasurement](gram_value.md#valueofmeasurement)
* [valueOfOctal](gram_value.md#valueofoctal)
* [valueOfString](gram_value.md#valueofstring)
* [valueOfTaggedLiteral](gram_value.md#valueoftaggedliteral)
* [valueOfTime](gram_value.md#valueoftime)

### Classes

* [InvalidAstError](../classes/gram_value.invalidasterror.md)

### Interfaces

* [ValuePluginSettings](../interfaces/gram_value.valuepluginsettings.md)

### Type aliases

* [LiteralValueEvaluator](gram_value.md#literalvalueevaluator)

### Variables

* [MILLIS\_IN\_AN\_HOUR](gram_value.md#millis_in_an_hour)
* [MILLIS\_IN\_A\_DAY](gram_value.md#millis_in_a_day)
* [MILLIS\_IN\_A\_MINUTE](gram_value.md#millis_in_a_minute)
* [MILLIS\_IN\_A\_MONTH](gram_value.md#millis_in_a_month)
* [MILLIS\_IN\_A\_SECOND](gram_value.md#millis_in_a_second)
* [MILLIS\_IN\_A\_YEAR](gram_value.md#millis_in_a_year)
* [iso8601Duration](gram_value.md#iso8601duration)
* [iso8601LocalTime](gram_value.md#iso8601localtime)
* [iso8601OrdinalDate](gram_value.md#iso8601ordinaldate)
* [iso8601Repeat](gram_value.md#iso8601repeat)
* [iso8601Time](gram_value.md#iso8601time)
* [iso8601WeekDate](gram_value.md#iso8601weekdate)
* [iso8601WeekOfYear](gram_value.md#iso8601weekofyear)
* [iso8601Year](gram_value.md#iso8601year)
* [iso8601YearMonth](gram_value.md#iso8601yearmonth)
* [iso8601YearMonthDay](gram_value.md#iso8601yearmonthday)

### Functions

* [assertNever](gram_value.md#assertnever)
* [gramValuePlugin](gram_value.md#gramvalueplugin)
* [valueOf](gram_value.md#valueof)
* [valueOfBoolean](gram_value.md#valueofboolean)
* [valueOfDate](gram_value.md#valueofdate)
* [valueOfDecimal](gram_value.md#valueofdecimal)
* [valueOfDuration](gram_value.md#valueofduration)
* [valueOfHexadecimal](gram_value.md#valueofhexadecimal)
* [valueOfInteger](gram_value.md#valueofinteger)
* [valueOfLiteral](gram_value.md#valueofliteral)
* [valueOfMeasurement](gram_value.md#valueofmeasurement)
* [valueOfOctal](gram_value.md#valueofoctal)
* [valueOfString](gram_value.md#valueofstring)
* [valueOfTaggedLiteral](gram_value.md#valueoftaggedliteral)
* [valueOfTime](gram_value.md#valueoftime)

### Object literals

* [defaultSettings](gram_value.md#defaultsettings)

## References

### LiteralValueEvaluator

Re-exports: [LiteralValueEvaluator](gram_value.md#literalvalueevaluator)

___

### iso8601Duration

Re-exports: [iso8601Duration](gram_value.md#iso8601duration)

___

### iso8601LocalTime

Re-exports: [iso8601LocalTime](gram_value.md#iso8601localtime)

___

### iso8601OrdinalDate

Re-exports: [iso8601OrdinalDate](gram_value.md#iso8601ordinaldate)

___

### iso8601Repeat

Re-exports: [iso8601Repeat](gram_value.md#iso8601repeat)

___

### iso8601Time

Re-exports: [iso8601Time](gram_value.md#iso8601time)

___

### iso8601WeekDate

Re-exports: [iso8601WeekDate](gram_value.md#iso8601weekdate)

___

### iso8601WeekOfYear

Re-exports: [iso8601WeekOfYear](gram_value.md#iso8601weekofyear)

___

### iso8601Year

Re-exports: [iso8601Year](gram_value.md#iso8601year)

___

### iso8601YearMonth

Re-exports: [iso8601YearMonth](gram_value.md#iso8601yearmonth)

___

### iso8601YearMonthDay

Re-exports: [iso8601YearMonthDay](gram_value.md#iso8601yearmonthday)

___

### valueOf

Re-exports: [valueOf](gram_value.md#valueof)

___

### valueOfBoolean

Re-exports: [valueOfBoolean](gram_value.md#valueofboolean)

___

### valueOfDate

Re-exports: [valueOfDate](gram_value.md#valueofdate)

___

### valueOfDecimal

Re-exports: [valueOfDecimal](gram_value.md#valueofdecimal)

___

### valueOfDuration

Re-exports: [valueOfDuration](gram_value.md#valueofduration)

___

### valueOfHexadecimal

Re-exports: [valueOfHexadecimal](gram_value.md#valueofhexadecimal)

___

### valueOfInteger

Re-exports: [valueOfInteger](gram_value.md#valueofinteger)

___

### valueOfLiteral

Re-exports: [valueOfLiteral](gram_value.md#valueofliteral)

___

### valueOfMeasurement

Re-exports: [valueOfMeasurement](gram_value.md#valueofmeasurement)

___

### valueOfOctal

Re-exports: [valueOfOctal](gram_value.md#valueofoctal)

___

### valueOfString

Re-exports: [valueOfString](gram_value.md#valueofstring)

___

### valueOfTaggedLiteral

Re-exports: [valueOfTaggedLiteral](gram_value.md#valueoftaggedliteral)

___

### valueOfTime

Re-exports: [valueOfTime](gram_value.md#valueoftime)

## Type aliases

### LiteralValueEvaluator

Ƭ  **LiteralValueEvaluator**: (ast: [GramLiteral](gram_ast.md#gramliteral)) => any

*Defined in [packages/gram-value/src/gram-value.ts:52](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L52)*

Type of function used to evaluate text literal values.

## Variables

### MILLIS\_IN\_AN\_HOUR

• `Const` **MILLIS\_IN\_AN\_HOUR**: number = MILLIS\_IN\_A\_MINUTE * 60

*Defined in [packages/gram-value/src/gram-value.ts:173](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L173)*

___

### MILLIS\_IN\_A\_DAY

• `Const` **MILLIS\_IN\_A\_DAY**: number = MILLIS\_IN\_AN\_HOUR * 24

*Defined in [packages/gram-value/src/gram-value.ts:174](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L174)*

___

### MILLIS\_IN\_A\_MINUTE

• `Const` **MILLIS\_IN\_A\_MINUTE**: number = MILLIS\_IN\_A\_SECOND * 60

*Defined in [packages/gram-value/src/gram-value.ts:172](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L172)*

___

### MILLIS\_IN\_A\_MONTH

• `Const` **MILLIS\_IN\_A\_MONTH**: number = MILLIS\_IN\_A\_DAY * 30

*Defined in [packages/gram-value/src/gram-value.ts:175](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L175)*

___

### MILLIS\_IN\_A\_SECOND

• `Const` **MILLIS\_IN\_A\_SECOND**: 1000 = 1000

*Defined in [packages/gram-value/src/gram-value.ts:171](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L171)*

___

### MILLIS\_IN\_A\_YEAR

• `Const` **MILLIS\_IN\_A\_YEAR**: number = MILLIS\_IN\_A\_DAY * 365

*Defined in [packages/gram-value/src/gram-value.ts:176](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L176)*

___

### iso8601Duration

• `Const` **iso8601Duration**: RegExp = /^P((\d+)Y)?((\d+)M)?((\d+)D)?(T((\d+)H)?((\d+)M)?((\d+)S)?)?$/

*Defined in [packages/gram-value/src/gram-value.ts:36](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L36)*

___

### iso8601LocalTime

• `Const` **iso8601LocalTime**: RegExp = /^(2[0-3]\|[01][0-9]):?([0-5][0-9])(:?([0-5][0-9](\.[0-9]{3})?))?$/

*Defined in [packages/gram-value/src/gram-value.ts:33](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L33)*

___

### iso8601OrdinalDate

• `Const` **iso8601OrdinalDate**: RegExp = /^([0-9]{4})-?(36[0-6]\|3[0-5][0-9]\|[12][0-9]{2}\|0[1-9][0-9]\|00[1-9])$/

*Defined in [packages/gram-value/src/gram-value.ts:30](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L30)*

___

### iso8601Repeat

• `Const` **iso8601Repeat**: RegExp = /^R(\d*)$/

*Defined in [packages/gram-value/src/gram-value.ts:37](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L37)*

___

### iso8601Time

• `Const` **iso8601Time**: RegExp = /^(2[0-3]\|[01][0-9]):?([0-5][0-9]):?([0-5][0-9](\.[0-9]{3})?)?(Z\|([+-])((?:2[0-3]\|[01][0-9]))(?::?([0-5][0-9]))?)?$/

*Defined in [packages/gram-value/src/gram-value.ts:35](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L35)*

___

### iso8601WeekDate

• `Const` **iso8601WeekDate**: RegExp = /^([0-9]{4})-?W(5[0-3]\|[1-4][0-9]\|0[1-9])-?([1-7])$/

*Defined in [packages/gram-value/src/gram-value.ts:32](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L32)*

___

### iso8601WeekOfYear

• `Const` **iso8601WeekOfYear**: RegExp = /^([0-9]{4})-?W(5[0-3]\|[1-4][0-9]\|0[1-9])$/

*Defined in [packages/gram-value/src/gram-value.ts:31](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L31)*

___

### iso8601Year

• `Const` **iso8601Year**: RegExp = /^([+-]\d{4,}\b\|\d{4})$/

*Defined in [packages/gram-value/src/gram-value.ts:27](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L27)*

___

### iso8601YearMonth

• `Const` **iso8601YearMonth**: RegExp = /^([0-9]{4})-(1[0-2]\|0[1-9])$/

*Defined in [packages/gram-value/src/gram-value.ts:28](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L28)*

___

### iso8601YearMonthDay

• `Const` **iso8601YearMonthDay**: RegExp = /^([0-9]{4})(-?)(1[0-2]\|0[1-9])\2(3[01]\|0[1-9]\|[12][0-9])$/

*Defined in [packages/gram-value/src/gram-value.ts:29](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L29)*

## Functions

### assertNever

▸ **assertNever**(`x`: never): never

*Defined in [packages/gram-value/src/gram-value.ts:83](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L83)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | never |

**Returns:** never

___

### gramValuePlugin

▸ `Const`**gramValuePlugin**(`settings`: [ValuePluginSettings](../interfaces/gram_value.valuepluginsettings.md)): Transformer

*Defined in [packages/gram-value/src/gram-value-plugin.ts:17](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value-plugin.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`settings` | [ValuePluginSettings](../interfaces/gram_value.valuepluginsettings.md) |

**Returns:** Transformer

___

### valueOf

▸ `Const`**valueOf**(`recordValue`: [GramRecordValue](gram_ast.md#gramrecordvalue) \| [GramRecord](gram_ast.md#gramrecord), `literalValueEvaluator?`: valueOfLiteral): any

*Defined in [packages/gram-value/src/gram-value.ts:60](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L60)*

Evaluates data structures and text literal values, returning
native objects and primitive values.

**`see`** [`valueOfLiteral`](gram_value.md#valueofliteral) for default literal value evaluator

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`recordValue` | [GramRecordValue](gram_ast.md#gramrecordvalue) \| [GramRecord](gram_ast.md#gramrecord) | - |
`literalValueEvaluator` | valueOfLiteral | valueOfLiteral |

**Returns:** any

___

### valueOfBoolean

▸ `Const`**valueOfBoolean**(`ast`: [BooleanLiteral](../interfaces/gram_ast.booleanliteral.md)): boolean

*Defined in [packages/gram-value/src/gram-value.ts:127](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L127)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [BooleanLiteral](../interfaces/gram_ast.booleanliteral.md) |

**Returns:** boolean

___

### valueOfDate

▸ `Const`**valueOfDate**(`ast`: [DateLiteral](../interfaces/gram_ast.dateliteral.md)): Date

*Defined in [packages/gram-value/src/gram-value.ts:144](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L144)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [DateLiteral](../interfaces/gram_ast.dateliteral.md) |

**Returns:** Date

___

### valueOfDecimal

▸ `Const`**valueOfDecimal**(`ast`: [DecimalLiteral](../interfaces/gram_ast.decimalliteral.md)): number

*Defined in [packages/gram-value/src/gram-value.ts:263](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L263)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [DecimalLiteral](../interfaces/gram_ast.decimalliteral.md) |

**Returns:** number

___

### valueOfDuration

▸ `Const`**valueOfDuration**(`ast`: [DurationLiteral](../interfaces/gram_ast.durationliteral.md)): Date

*Defined in [packages/gram-value/src/gram-value.ts:223](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L223)*

Evaluates the duration as a total of milliseconds, unreliably estimating milliseconds
per year or month. Reliable duration values can only be calculated with precision
of days, hours, minutes or seconds.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ast` | [DurationLiteral](../interfaces/gram_ast.durationliteral.md) |   |

**Returns:** Date

___

### valueOfHexadecimal

▸ `Const`**valueOfHexadecimal**(`ast`: [HexadecimalLiteral](../interfaces/gram_ast.hexadecimalliteral.md)): number

*Defined in [packages/gram-value/src/gram-value.ts:269](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L269)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [HexadecimalLiteral](../interfaces/gram_ast.hexadecimalliteral.md) |

**Returns:** number

___

### valueOfInteger

▸ `Const`**valueOfInteger**(`ast`: [IntegerLiteral](../interfaces/gram_ast.integerliteral.md)): number

*Defined in [packages/gram-value/src/gram-value.ts:251](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L251)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [IntegerLiteral](../interfaces/gram_ast.integerliteral.md) |

**Returns:** number

___

### valueOfLiteral

▸ `Const`**valueOfLiteral**(`ast`: [GramLiteral](gram_ast.md#gramliteral)): any

*Defined in [packages/gram-value/src/gram-value.ts:87](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L87)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [GramLiteral](gram_ast.md#gramliteral) |

**Returns:** any

___

### valueOfMeasurement

▸ `Const`**valueOfMeasurement**(`ast`: [MeasurementLiteral](../interfaces/gram_ast.measurementliteral.md)): number

*Defined in [packages/gram-value/src/gram-value.ts:257](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L257)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [MeasurementLiteral](../interfaces/gram_ast.measurementliteral.md) |

**Returns:** number

___

### valueOfOctal

▸ `Const`**valueOfOctal**(`ast`: [OctalLiteral](../interfaces/gram_ast.octalliteral.md)): number

*Defined in [packages/gram-value/src/gram-value.ts:275](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L275)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [OctalLiteral](../interfaces/gram_ast.octalliteral.md) |

**Returns:** number

___

### valueOfString

▸ `Const`**valueOfString**(`ast`: [StringLiteral](../interfaces/gram_ast.stringliteral.md)): string

*Defined in [packages/gram-value/src/gram-value.ts:130](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L130)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [StringLiteral](../interfaces/gram_ast.stringliteral.md) |

**Returns:** string

___

### valueOfTaggedLiteral

▸ `Const`**valueOfTaggedLiteral**(`ast`: [TaggedTextLiteral](../interfaces/gram_ast.taggedtextliteral.md)): string

*Defined in [packages/gram-value/src/gram-value.ts:137](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L137)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [TaggedTextLiteral](../interfaces/gram_ast.taggedtextliteral.md) |

**Returns:** string

___

### valueOfTime

▸ `Const`**valueOfTime**(`ast`: [TimeLiteral](../interfaces/gram_ast.timeliteral.md)): Date

*Defined in [packages/gram-value/src/gram-value.ts:183](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value.ts#L183)*

Value of time as number of milliseconds since midnight.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ast` | [TimeLiteral](../interfaces/gram_ast.timeliteral.md) |   |

**Returns:** Date

## Object literals

### defaultSettings

▪ `Const` **defaultSettings**: object

*Defined in [packages/gram-value/src/gram-value-plugin.ts:13](https://github.com/gram-data/gram-js/blob/4926192/packages/gram-value/src/gram-value-plugin.ts#L13)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`literalValueEvaluator` | valueOfLiteral | valueOfLiteral |
