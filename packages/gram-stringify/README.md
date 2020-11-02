From gram AST to text literal `(a)-->(b)`.

## How to gram-stringify

### Install:

``` bash
npm install @gram-data/gram-stringify
```

### Build an AST using [[gram-builder]], then pretty print with gram-stringify:

``` TypeScript
import { node, edge } from '@gram-data/gram-builder';
import { stringify } from '@gram-data/gram-stringify'; 

const left = node('a');
const right = node('b');
const ast = edge([left, right], 'right');

console.log(stringify(ast));
```

### Parse to AST using [[gram-parse]], then pretty print with gram-stringify:

``` TypeScript
import { toAST } from '@gram-data/gram-parse'; 
import { stringify } from '@gram-data/gram-stringify'; 

const src = '(a)-->(b)';
const ast = toAST(src);

console.log(stringify(ast));
```

## Next Steps

- Save to a file to share a gram with a friend!