---
title: gram_preset_basic
layout: api
---

**[gram.js API](../README.md)**

> [Globals](../globals.md) / gram-preset-basic

# Package: gram-preset-basic

# `gram-preset-basic`

> TODO: description

## How to gram-preset-basic

Prepare a [unified](https://github.com/unifiedjs/unified) text processing engine:

``` javascript
const unified = require('unified');
const gramParserPlugin = require('@gram-data/gram-parse').gramParserPlugin;
const gramPresetBasic = require('@gram-data/gram-preset-basic');

const gramProcessor = unified()
  .use(gramParserPlugin)
  .use(gramPresetBasic);

```

Just parse:

``` javascript
  const parsed = gramProcessor.parse(src);
```

Parse _and_ apply plugins by calling [runSync()](https://github.com/unifiedjs/unified#processorrunsyncnode-file) 
on the processor:

``` javascript
  const parsed = gramProcessor.runSync(gramProcessor.parse(src));
```

## Index

### Variables

* [plugins](gram_preset_basic.md#plugins)

## Variables

### plugins

• `Const` **plugins**: (Attacher<[IdentityPluginSettings](../interfaces/gram_identity.identitypluginsettings.md)[], Settings\> \| Attacher<[ValuePluginSettings](../interfaces/gram_value.valuepluginsettings.md)[], Settings\>)[] = [gramIdentityPlugin, gramValuePlugin]

*Defined in [packages/gram-preset-basic/src/index.ts:9](https://github.com/gram-data/gram-js/blob/594b46d/packages/gram-preset-basic/src/index.ts#L9)*
