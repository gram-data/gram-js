From nothing to a valid gram AST.

## How to gram-builder

### Install:

``` bash
npm install @gram-data/gram-builder
```

### Build an AST using [[gram-builder]]:

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');
```

## Next Steps

- Transform to js objects using [[gram-value]]
- Write back to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]