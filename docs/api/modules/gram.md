---
title: gram
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram

# Package: gram

gram package.

## Index

### Variables

* [processor](gram.md#processor)

### Functions

* [parseAndApplyPlugins](gram.md#parseandapplyplugins)

## Variables

### processor

• `Const` **processor**: Processor = unified() .use(gramParserPlugin) .use(gramPresetBasic)

*Defined in [packages/gram/src/index.ts:22](https://github.com/gram-data/gram-js/blob/4926192/packages/gram/src/index.ts#L22)*

## Functions

### parseAndApplyPlugins

▸ `Const`**parseAndApplyPlugins**(`src`: VFileCompatible): [GramSeq](../interfaces/gram_ast.gramseq.md)

*Defined in [packages/gram/src/index.ts:28](https://github.com/gram-data/gram-js/blob/4926192/packages/gram/src/index.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`src` | VFileCompatible |

**Returns:** [GramSeq](../interfaces/gram_ast.gramseq.md)
