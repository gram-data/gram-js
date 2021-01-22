---
title: gram_ops
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-ops

# Package: gram-ops

`(ast)-[ops]->(features)`

Utility operations for extracting path features from `gram` AST.

## How to gram-ops

### Install:

``` bash
npm install @gram-data/gram-ops
```

### Build a path 

Use [gram-builder](gram_builder.md) to create a path. 

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';

const left = node('a');
const right = node('b');
const path = edge([left, right], 'right');
```

### Extract features from the path

Extract a node list:

``` TypeScript
import { nodes } from '@gram-data/gram-ops';

const ns:GramPath[] = nodes(path); 
```

Extract an edge list:

``` TypeScript
import { nodes } from '@gram-data/gram-ops';

const es:GramPath[] = edges(path); 
```

## Next Steps

- Write back to a string using [gram-stringify](gram_stringify.md)
- Introspect the AST using [gram-ast](gram_ast.md)

## Index

### Functions

* [count](gram_ops.md#count)
* [edges](gram_ops.md#edges)
* [head](gram_ops.md#head)
* [identity](gram_ops.md#identity)
* [merge](gram_ops.md#merge)
* [nodes](gram_ops.md#nodes)
* [tail](gram_ops.md#tail)

## Functions

### count

▸ `Const`**count**(`p`: [GramPath](../interfaces/gram_ast.grampath.md)): number

*Defined in [packages/gram-ops/src/index.ts:11](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** number

___

### edges

▸ `Const`**edges**(`p`: [GramPath](../interfaces/gram_ast.grampath.md)): [GramEdge](../interfaces/gram_ast.gramedge.md)[]

*Defined in [packages/gram-ops/src/index.ts:70](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L70)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** [GramEdge](../interfaces/gram_ast.gramedge.md)[]

___

### head

▸ `Const`**head**(`p`: [GramPath](../interfaces/gram_ast.grampath.md)): [GramNode](../interfaces/gram_ast.gramnode.md)

*Defined in [packages/gram-ops/src/index.ts:18](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** [GramNode](../interfaces/gram_ast.gramnode.md)

___

### identity

▸ `Const`**identity**(`p`: [GramPath](../interfaces/gram_ast.grampath.md)): undefined \| string

*Defined in [packages/gram-ops/src/index.ts:35](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L35)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** undefined \| string

___

### merge

▸ `Const`**merge**(`_`: [GramPath](../interfaces/gram_ast.grampath.md), `next`: [GramPath](../interfaces/gram_ast.grampath.md)): [GramPath](../interfaces/gram_ast.grampath.md)

*Defined in [packages/gram-ops/src/index.ts:30](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`_` | [GramPath](../interfaces/gram_ast.grampath.md) |
`next` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** [GramPath](../interfaces/gram_ast.grampath.md)

___

### nodes

▸ `Const`**nodes**(`p`: [GramPath](../interfaces/gram_ast.grampath.md) \| [GramPath](../interfaces/gram_ast.grampath.md)[] \| [GramSeq](../interfaces/gram_ast.gramseq.md)): [GramNode](../interfaces/gram_ast.gramnode.md)[]

*Defined in [packages/gram-ops/src/index.ts:44](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L44)*

Node set projected from within a path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) \| [GramPath](../interfaces/gram_ast.grampath.md)[] \| [GramSeq](../interfaces/gram_ast.gramseq.md) | paths from which to project nodes  |

**Returns:** [GramNode](../interfaces/gram_ast.gramnode.md)[]

___

### tail

▸ `Const`**tail**(`p`: [GramPath](../interfaces/gram_ast.grampath.md)): [GramNode](../interfaces/gram_ast.gramnode.md)

*Defined in [packages/gram-ops/src/index.ts:24](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-ops/src/index.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [GramPath](../interfaces/gram_ast.grampath.md) |

**Returns:** [GramNode](../interfaces/gram_ast.gramnode.md)
