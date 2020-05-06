# -gram

## Naming

### 
### Pro-gram 

verb:
> (programs, programming, programmed, or programs, programing, programed) [with object]
>   1 provide (a computer or other machine) with coded instructions for the automatic performance of a task: it is a simple matter to program the computer to recognize such symbols.

> Origin: early 17th century (in the sense ‘written notice’): via late Latin from Greek programma, from prographein ‘write publicly’, from pro ‘before’ + graphein ‘write’.

## Library Components

- `gram-ast` Abstract Syntax Tree type specifications
- `gram-builder` to compose a gram AST
- `gram-find` to traverse a gram AST
- `gram-transform` to process a gram AST
- `gram-stringify` to produce

## TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

### Local Development

Below is a list of commands you will probably find useful.

#### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

#### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

#### `yarn test`

Order of testing:

1. `yarn test-lib` - test non-parser library functions
  - `gram-ast` - the abstract

# Credits

Thanks to these project for inspiration:

- The entire [unist family](https://unifiedjs.com)
- [mdast-builder](https://github.com/mike-north/mdast-builder) for how to make a builder