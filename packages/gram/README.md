# `gram`

Gram is a textual format for data graphs. 

## How to gram


```js
const {default:gram} = require('@gram-data/gram');

const src = "(a)-->(b)";
const p = gram.parse(src);
console.log(gram.stringify(p));

```

```ts
import gram from '@gram-data/gram'

const src = "(a)-->(b)";
const p = gram.parse(src);
console.log(gram.stringify(p));
```