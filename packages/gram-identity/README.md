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

- Enrich record properties with js objects using [[gram-value]]
- Serializes to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]