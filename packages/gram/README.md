# `gram`

Gram is a textual format for data graphs. 

## How to gram


```js
const {default:gram} = require('gram');

const n = gram.builder.node();
console.log(gram.stringify.toGram(n));

const src = "(a)-->(b)<--(c)";
const p = gram.parser.toAST(src);
console.log(gram.stringify.toGram(p));

```

```ts
import * as gram from '@gram-data/gram'

```