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

- Transform to js objects using [[gram-value]]
- Write back to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]