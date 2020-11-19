Utility operations for extracting path features.

## How to gram-ops

### Install:

``` bash
npm install @gram-data/gram-ops
```

### Build a path 

Use [[gram-builder]] to create a path. 

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';

const left = node('a');
const right = node('b');
const path = edge([left, right], 'right');
```

### Extract features from the path

Extract a node list:

``` TypeScript
import { nodes } from '@gram-data/gram-ops';

const ns:GramPath[] = nodes(path); 
```

Extract an edge list:

``` TypeScript
import { nodes } from '@gram-data/gram-ops';

const es:GramPath[] = edges(path); 
console.log(ns.map(n => stringify(n)).join()); // (a),(b)
```

## Next Steps

- Transform to js objects using [[gram-value]]
- Write back to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]