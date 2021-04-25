Evaluate data graph AST values, producing Javascript primitive or object values.

## How to gram-value

### Install:

``` bash
npm install @gram-data/gram-value
```

### Build an AST using [[gram-builder]]:

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');
```

## Next Steps

- Write back to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]
- Write your own [unified](https://github.com/unifiedjs/unified#plugin) plugin for processing the AST
