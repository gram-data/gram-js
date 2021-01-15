---
title: gram_parse.nearleylexer
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / [gram-parse](../modules/gram_parse.md) / NearleyLexer

# Interface: NearleyLexer

## Hierarchy

* **NearleyLexer**

## Index

### Properties

* [formatError](gram_parse.nearleylexer.md#formaterror)
* [has](gram_parse.nearleylexer.md#has)
* [next](gram_parse.nearleylexer.md#next)
* [reset](gram_parse.nearleylexer.md#reset)
* [save](gram_parse.nearleylexer.md#save)

## Properties

### formatError

•  **formatError**: (token: never) => string

*Defined in [packages/gram-parse/src/gram-grammar.ts:119](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-parse/src/gram-grammar.ts#L119)*

___

### has

•  **has**: (tokenType: string) => boolean

*Defined in [packages/gram-parse/src/gram-grammar.ts:120](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-parse/src/gram-grammar.ts#L120)*

___

### next

•  **next**: () => [NearleyToken](gram_parse.nearleytoken.md) \| undefined

*Defined in [packages/gram-parse/src/gram-grammar.ts:117](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-parse/src/gram-grammar.ts#L117)*

___

### reset

•  **reset**: (chunk: string, info: any) => void

*Defined in [packages/gram-parse/src/gram-grammar.ts:116](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-parse/src/gram-grammar.ts#L116)*

___

### save

•  **save**: () => any

*Defined in [packages/gram-parse/src/gram-grammar.ts:118](https://github.com/gram-data/gram-js/blob/4edc28f/packages/gram-parse/src/gram-grammar.ts#L118)*
