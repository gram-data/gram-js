From text literal `(a)-->(b)` to a gram AST. 

## How to gram-parse

### Install:

``` bash
npm install @gram-data/gram-parse
```

### Parse text into an AST:

``` TypeScript
import { toAST } from '@gram-data/gram-parse'; 

const src = '(a)-->(b)';
const parsed = toAST(src);
```

### Inspect AST using [unist-util-inspect](https://github.com/syntax-tree/unist-util-inspect):

``` TypeScript
const inspect = require('unist-util-inspect');

console.log(inspect(parsed));
```

## Next Steps

- Transform to js objects using [[gram-value]]
- Write back to a string using [[gram-stringify]]
- Introspect the AST using [[gram-ast]]
