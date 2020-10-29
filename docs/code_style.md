---
title: Code Style
---

List of rules we should keep in mind when writing code in this repo.

-   Don't import barrels from the folder you're in:

```TypeScript
// Don't do this
import {download, extract} from '.';

// Do this instead
import {download} from './download';
import {extract} from './download';
```

-   Don't export barrels from other folders:

```TypeScript
// Don't do this if environment is a directory
export * from './environment';
```

-   Don't manipulate environment variables manually

```TypeScript
// This will throw an error on Windows
spawn(binPath, ['start'], {
    env: {
        ...process.env,
        PATH: process.env.PATH,
    },
});

// This will handle case insentitive values correctly
const env = new EnvVars({cloneFromProcess: true});
env.set('PATH', process.env.PATH);
spawn(binPath, ['start', {env}]);
```
