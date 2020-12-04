From nothing to a valid `gram` AST.

## How to gram-builder

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

- Enrich properties as js objects using [[gram-value]]
- Serializes to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]