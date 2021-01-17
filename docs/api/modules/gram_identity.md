---
title: gram_identity
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-identity

# Package: gram-identity

`(ast)-[identify]->(ast)`

Collection of identity generating functions and an AST
processing plugin which applies identity to any paths
which have none. 

## How to gram-identity

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

### Type aliases

* [IDGenerator](gram_identity.md#idgenerator)

### Functions

* [counterIDGenerator](gram_identity.md#counteridgenerator)
* [gramIdentityPlugin](gram_identity.md#gramidentityplugin)
* [nanoidGenerator](gram_identity.md#nanoidgenerator)

### Object literals

* [alphabets](gram_identity.md#alphabets)

## Type aliases

### IDGenerator

Ƭ  **IDGenerator**: { generate: () => string  }

*Defined in [packages/gram-identity/src/generator-type.ts:2](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-identity/src/generator-type.ts#L2)*

#### Type declaration:

Name | Type |
------ | ------ |
`generate` | () => string |

## Functions

### counterIDGenerator

▸ `Const`**counterIDGenerator**(`prefix?`: undefined \| string): [IDGenerator](gram_identity.md#idgenerator)

*Defined in [packages/gram-identity/src/counter-generator.ts:7](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-identity/src/counter-generator.ts#L7)*

Creates an IDGenerator based on incrementing numbers.

#### Parameters:

Name | Type |
------ | ------ |
`prefix?` | undefined \| string |

**Returns:** [IDGenerator](gram_identity.md#idgenerator)

___

### gramIdentityPlugin

▸ `Const`**gramIdentityPlugin**(`settings`: IdentityPluginSettings): Transformer

*Defined in [packages/gram-identity/src/gram-identity-plugin.ts:24](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-identity/src/gram-identity-plugin.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`settings` | IdentityPluginSettings |

**Returns:** Transformer

___

### nanoidGenerator

▸ `Const`**nanoidGenerator**(`alphabet?`: string, `size?`: number, `prefix?`: undefined \| string): [IDGenerator](gram_identity.md#idgenerator)

*Defined in [packages/gram-identity/src/nanoid-generator.ts:10](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-identity/src/nanoid-generator.ts#L10)*

Factory for creating an IDGenerator based on
[nanoid](https://github.com/ai/nanoid)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`alphabet` | string | alphabets.base64 |
`size` | number | 21 |
`prefix?` | undefined \| string | - |

**Returns:** [IDGenerator](gram_identity.md#idgenerator)

## Object literals

### alphabets

▪ `Const` **alphabets**: object

*Defined in [packages/gram-identity/src/identity-alphabets.ts:1](https://github.com/gram-data/gram-js/blob/fd9a123/packages/gram-identity/src/identity-alphabets.ts#L1)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`astrologyBase12` | string | "♈︎♉︎♊︎♋︎♌︎♍︎♎︎♏︎♐︎♑︎♒︎♓︎" |
`base10` | string | "0123456789" |
`base11` | string | "0123456789a" |
`base16` | string | "0123456789abcdef" |
`base2` | string | "01" |
`base32` | string | "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567" |
`base32Hex` | string | "0123456789ABCDEFGHIJKLMNOPQRSTUV" |
`base36` | string | "0123456789abcdefghijklmnopqrstuvwxyz" |
`base58` | string | "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" |
`base62` | string | "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" |
`base64` | string | "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\_@" |
`base8` | string | "01234567" |
`cards56` | string | "🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃝🃞" |
`chessBase12` | string | "♚♛♜♝♞♟♔♕♖♗♘♙" |
`cookieBase90` | string | "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=\>?@[]^\_\`{\|}~" |
`crock32` | string | "0123456789ABCDEFGHJKMNPQRSTVWXYZ" |
`dieBase6` | string | "⚀⚁⚂⚃⚄⚅" |
`dominoBase28` | string | "🁣🁤🁫🁥🁬🁳🁦🁭🁴🁻🁧🁮🁵🁼🂃🁨🁯🁶🁽🂊🂋🁩🁰🁷🁾🂅🂌🂓" |
`flickrBase58` | string | "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" |
`mahjongBase43` | string | "🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀇🀈🀉🀊🀋🀌🀍🀎🀏🀀🀁🀂🀃🀄︎🀅🀆🀐🀢🀣🀤🀥🀦🀧🀨🀩🀪" |
`zBase32` | string | "ybndrfg8ejkmcpqxot1uwisza345h769" |
