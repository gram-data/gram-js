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
