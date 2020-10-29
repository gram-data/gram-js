- Start Date: (2020-05-06)
- RFC PR: (https://github.com/neo-technology/daedalus/pull/29)
- @relate Issue: (leave this empty)

# Summary
Allow first and third party developers to extend the `@relate` stack with additional functionality in two primary ways; `STATIC` and `APPLICATION` extensions, as well as through "event hooks" emitted in various parts of the application.

## Extensions
Adds new functionality to one or more modules by:
- `STATIC` extensions: Adding static html bundles (i.e. "graph apps") to the web module. 
- `APPLICATION` extensions: Injecting [@nestjs](https://docs.nestjs.com/) modules to any of our supported application extension points:
    - `SYSTEM`: Shared across all modules
    - `CLI`: Only for CLI module
    - `WEB`: Only for Web module
    - `ELECTRON`: Only for Electron module
    
## Event Hooks
Allows reacting to events within the application and modify values being processed.

# Basic example
## STATIC extensions
Static extensions simply need to be a directory containing at least an `index.html` file as well as a `package.json file` containing `name`, `version`, and `main` properties.

Static extensions are installed under:
```sh
# Darwin
~/Library/Application Support/com.Neo4j.Relate/Data/extensions/STATIC
# Linux
~/.local/share/neo4j-relate/extensions/STATIC
# Win32
%appdata%\Local\Neo4j\Relate\Data\extensions\STATIC
```
A sample `package.json`
```JSON
{
  "name": "<name>",
  "version": "<semver>",
  "main": "dist"
}
```

## Application extensions
Application extensions simply need to be a directory containing at least an `index.js` file.
The entry point of application extensions are defined in their `relate.manifest.json` file:
```JSON
{
  "name": "<name>",
  "version": "<semver>",
  "type": "<type>",
  "main": "dist/index.js"
}
```
The entrypoint **must have a default export** of a `@nestjs` module. Please see https://github.com/huboneo/grandql-extension for a simple example.

Extensions are installed under:
```sh
# Darwin
~/Library/Application Support/com.Neo4j.Relate/Data/extensions/<APP_TYPE>
# Linux
~/.local/share/neo4j-relate/extensions/<APP_TYPE>
# Win32
%appdata%\Local\Neo4j\Relate\Data\extensions\<APP_TYPE>
```
Where `<APP_TYPE>` is one of:
- `SYSTEM` Targeting the core system API (shared across all applications)
- `WEB` Targeting the WEB applications
- `CLI` Targeting the CLI applications
- `ELECTRON` Targeting the Electron applications

## Event Hooks
Hooks are used to register listeners to events that potentially return a modified value.
```TypeScript
import { HOOK_EVENTS, Listener } from '@relate/common';

// exported by the @relate/common package
export declare function emitHookEvent<T = any>(eventName: HOOK_EVENTS, eventData: T): Promise<T>;
export declare function registerHookListener(eventName: HOOK_EVENTS, listener: Listener): void;
export declare function deregisterHookListener(eventName: HOOK_EVENTS, listener: Listener): void;
```
The list of available events is continuously being extended and not covered as part of this RFC.

# Motivation
There are two primary reasons for adding this functionality. 

First of all we want separation of concerns. We want a clear distinction between core and extended functionality. Whilst application extensions can modify anything within the application, they are still not part of the core deliverable and as such subject to a separate QA process.

Secondly we want to offer ourselves and third parties the flexibility to enhance the `@relate` with whatever functionality their specific use-case requires. We want to minimise the cognitive overhead required to do so and empower developers to quickly take advantage of our core functionality.

# Detailed design
## Extensions
This entire concept revolves around the `relate.manifest.json` file:
```JSON
{
  "name": "<name>",
  "version": "<semver>",
  "type": "<type>",
  "main": "dist/index.(js|html)"
}
```
Using the information above `@relate` can determine what to do with the code-package. `STATIC` extensions are simply exposed over http (and thus require no restart or setup), whilst application extensions are added to the `@nestjs` module hierarchy and as such require restart.

The idea here is to allow developers to use any pre-existing code without having to be aware of `@relate` specific caveats, with the only contract being a default export of a `@nestjs` module:
```TypeScript
import {Inject, Module, OnApplicationBootstrap} from '@nestjs/common';
import {SystemModule, SystemProvider} from '@relate/common';

@Module({
    imports: [SystemModule],
})
export default class ExampleModule implements OnApplicationBootstrap {
    constructor(@Inject(SystemProvider) private readonly systemProvider: SystemProvider) {}

    async onApplicationBootstrap() {
        const defaultAccount = await this.systemProvider.getAccount();
        const installedDbmss = await defaultAccount.listDbmss();
        
        console.log(`@relate dbmss: ${installedDbmss.map(({name}) => name)}`);
    }
}
```
From here extensions are free to do whatever they want within the NestJS ecosystem.

We chose a liberal approach to encourage adoption and minimise the learning curve for creating extensions. To ensure that extensions do not introduce breaking changes we will have two separate categories: Offical, and Custom. Official extensions will be signed by our [Code Signing CA](https://github.com/neo4j-apps/code-signing-ca) and also undergo code-reviews before being signed. Official extensions will be published to our JFrog repository and available to be installed through the core API. Custom extensions will have no enforcement and only be installable using a provided tarball. This allows developers to quickly iterate extensions and when ready apply for official status.

## Event Hooks.
This concept revolves around the pub/sub pattern, based losely on the DOM `addEventListener()` API:
To give an example we can look to the `HOOK_EVENTS.ELECTRON_WINDOW_OPTIONS`:
````typescript
import {emitHookEvent, HOOK_EVENTS, registerHookListener} from '@relate/common';

// options to be passed to the electron BrowserWindow constructor when creating a window.
const windowOptions = await emitHookEvent(HOOK_EVENTS.ELECTRON_WINDOW_OPTIONS, {
    height: 600,
    width: 800,
});
// new BrowserWindow(windowOptions);

// somewhere else you can listen for and respond to the event
registerHookListener(HOOK_EVENTS.ELECTRON_WINDOW_OPTIONS, (options) => ({
    ...options,
    width: 400
}));
````

# Drawbacks
As with any plugin-oriented architecture we are exposing ourselves to a halo effect. Should an installed extension negatively effect the core applications users could perceive this as our fault.
Along similar lines, introducing hooks exposes us to unintentional side effects such as mutations or blocking scripts.
- Extensions could prove computationally expensive and slow down the application.
- The lack of enforcement on our end could prove expensive if extensions are large or hard to review/test.
- Hooks are liberal by nature, and as place a lot of responsibility on the developer to know what they are doing.
- Debugging could become complicated if an extension or hooks does something strange.
- Security of the application becomes paramount as if we accidentally expose secrets they would be available to anyone with access to the parameters passed.
- We will be bound to the APIs we expose to extensions, as any breaking change would require clients to update.

# Alternatives
The alternative to this path is to only allow core functionality, and force third-party developers to raise PR's directly against the `@relate` repo. This process would be slow and labor intensive, taking our focus away from new features and functionality.

# Adoption strategy
Creating example extensions for all our modules and work with DevRel to spread knowledge.
