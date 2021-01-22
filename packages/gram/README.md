# `gram`

Gram is a textual format for data graphs. 

## How to gram

Node.js:

```js
const gram = require('@gram-data/gram');

const src = "(a)-->(b)";
const p = gram.parse(src);
console.log(gram.toGram(p));

```

TypeScript:
```ts
import gram from '@gram-data/gram'

const src = "(a)-->(b)";
const p = gram.parse(src);
console.log(gram.toGram(p));
```

Vanilla javascript in browser:

- see [examples](https://github.com/gram-data/gram-js/tree/main/packages/gram/public)