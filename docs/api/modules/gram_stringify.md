---
title: gram_stringify
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-stringify

# Package: gram-stringify

From gram AST to text literal `(a)-->(b)`.

## How to gram-stringify

### Install:

``` bash
npm install @gram-data/gram-stringify
```

### Build an AST using [gram-builder](gram_builder.md), then pretty print with gram-stringify:

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';
import { stringify } from '@gram-data/gram-stringify'; 

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');

console.log(stringify(ast));
```

### Parse to AST using [gram-parse](gram_parse.md), then pretty print with gram-stringify:

``` TypeScript
import { toAST } from '@gram-data/gram-parse'; 
import { stringify } from '@gram-data/gram-stringify'; 

const src = '(a)-->(b)';
const ast = toAST(src);

console.log(stringify(ast));
```

## Next Steps

- Save to a file to share a gram with a friend!

## Index

### Functions

* [arrayToString](gram_stringify.md#arraytostring)
* [assertNever](gram_stringify.md#assertnever)
* [edgeToString](gram_stringify.md#edgetostring)
* [elementContentToString](gram_stringify.md#elementcontenttostring)
* [gramStringifyPlugin](gram_stringify.md#gramstringifyplugin)
* [hasAttributes](gram_stringify.md#hasattributes)
* [isEmpty](gram_stringify.md#isempty)
* [nodeToString](gram_stringify.md#nodetostring)
* [objectToString](gram_stringify.md#objecttostring)
* [pairToString](gram_stringify.md#pairtostring)
* [pathCompositionToString](gram_stringify.md#pathcompositiontostring)
* [pathToString](gram_stringify.md#pathtostring)
* [propertyToString](gram_stringify.md#propertytostring)
* [recordToString](gram_stringify.md#recordtostring)
* [stringify](gram_stringify.md#stringify)
* [stringifyCompiler](gram_stringify.md#stringifycompiler)
* [toStringLiteral](gram_stringify.md#tostringliteral)
* [toStringValue](gram_stringify.md#tostringvalue)

## Functions

### arrayToString

▸ `Const`**arrayToString**(`xs`: any[]): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:63](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L63)*

#### Parameters:

Name | Type |
------ | ------ |
`xs` | any[] |

**Returns:** string

___

### assertNever

▸ **assertNever**(`x`: never): never

*Defined in [packages/gram-stringify/src/gram-stringify.ts:20](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | never |

**Returns:** never

___

### edgeToString

▸ `Const`**edgeToString**(`ast`: [GramEdge](../interfaces/gram_ast.gramedge.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:90](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L90)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [GramEdge](../interfaces/gram_ast.gramedge.md) |

**Returns:** string

___

### elementContentToString

▸ `Const`**elementContentToString**(`ast`: [GramPath](../interfaces/gram_ast.grampath.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:73](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** string

___

### gramStringifyPlugin

▸ `Const`**gramStringifyPlugin**(): void

*Defined in [packages/gram-stringify/src/gram-stringify-plugin.ts:20](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify-plugin.ts#L20)*

**Returns:** void

___

### hasAttributes

▸ `Const`**hasAttributes**(`p`: [GramPath](../interfaces/gram_ast.grampath.md)): undefined \| string \| string[] \| [GramRecord](gram_ast.md#gramrecord)

*Defined in [packages/gram-stringify/src/gram-stringify.ts:144](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L144)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** undefined \| string \| string[] \| [GramRecord](gram_ast.md#gramrecord)

___

### isEmpty

▸ `Const`**isEmpty**(`r`: [GramRecord](gram_ast.md#gramrecord)): boolean

*Defined in [packages/gram-stringify/src/gram-stringify.ts:18](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`r` | [GramRecord](gram_ast.md#gramrecord) |

**Returns:** boolean

___

### nodeToString

▸ `Const`**nodeToString**(`ast`: [GramNode](../interfaces/gram_ast.gramnode.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:87](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L87)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [GramNode](../interfaces/gram_ast.gramnode.md) |

**Returns:** string

___

### objectToString

▸ `Const`**objectToString**(`o`: { [key:string]: any;  }): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:65](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`o` | { [key:string]: any;  } |

**Returns:** string

___

### pairToString

▸ `Const`**pairToString**(`ast`: [GramPath](../interfaces/gram_ast.grampath.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:132](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L132)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** string

___

### pathCompositionToString

▸ `Const`**pathCompositionToString**(`ast`: [GramPath](../interfaces/gram_ast.grampath.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:106](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L106)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** string

___

### pathToString

▸ `Const`**pathToString**(`ast?`: [GramPath](../interfaces/gram_ast.grampath.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:146](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L146)*

#### Parameters:

Name | Type |
------ | ------ |
`ast?` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** string

___

### propertyToString

▸ `Const`**propertyToString**(`property`: [GramProperty](../interfaces/gram_ast.gramproperty.md)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:52](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L52)*

#### Parameters:

Name | Type |
------ | ------ |
`property` | [GramProperty](../interfaces/gram_ast.gramproperty.md) |

**Returns:** string

___

### recordToString

▸ `Const`**recordToString**(`record`: [GramRecord](gram_ast.md#gramrecord)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:55](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`record` | [GramRecord](gram_ast.md#gramrecord) |

**Returns:** string

___

### stringify

▸ `Const`**stringify**(`ast`: any \| any[]): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:163](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L163)*

#### Parameters:

Name | Type |
------ | ------ |
`ast` | any \| any[] |

**Returns:** string

___

### stringifyCompiler

▸ `Const`**stringifyCompiler**(`element`: UnistNode): string

*Defined in [packages/gram-stringify/src/gram-stringify-plugin.ts:9](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify-plugin.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`element` | UnistNode |

**Returns:** string

___

### toStringLiteral

▸ `Const`**toStringLiteral**(`l`: [GramLiteral](gram_ast.md#gramliteral)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:23](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`l` | [GramLiteral](gram_ast.md#gramliteral) |

**Returns:** string

___

### toStringValue

▸ `Const`**toStringValue**(`v`: [GramRecordValue](gram_ast.md#gramrecordvalue)): string

*Defined in [packages/gram-stringify/src/gram-stringify.ts:42](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-stringify/src/gram-stringify.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [GramRecordValue](gram_ast.md#gramrecordvalue) |

**Returns:** string
