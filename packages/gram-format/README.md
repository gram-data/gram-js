# gram-ast

Graph model abstract syntax tree.

```
////////
// unit: an empty path expression
[]
[] . [] = []

// identity
identityof [] = undefined || all the same?
identityof [n] =~ n


////////
// node: an identified path expression with no children
(n) =~ [n]
identityof (n) =~ n
identityof ()  =~ <auto>

// composition of nodes and units
(n) . []   =~ [ . n _ ]  =~ [n] =~ (n)
[]  . (n)  =~ [ . _ n ]  =~ [n] =~ (n)
(n) . (n)  =~ [ . n n ]
(n) . (n2) =~ [ . n n2]
identityof [ . n n ]  =~ <auto>
identityof [e . n n2] =~ e

////////
// edge: an identified path expression composed of two nodes
[n] . [n] =~ [e . [n] [n]]
[e . (n1) (n2)]
[e1] . [e2] =~ [p] 

////////
// path: an identified path expression composed of path expressions 

// unary path operations
[p [u]] =~ [p]
[p [e]]
[p (n)]
[p [p2]]
[p [p]] =~ [p]

// binary path operations with unit produce the non-unit operand
(n) =~ (n) . []
(n) =~ []  . (n)
[e] =~ [e] . []
[e] =~ []  . [e]
[p] =~ [p] . []
[p] =~ []  . [p]

// binary path operations with non-unit
[p [e]  . [p2]]  =~ [e]  . [p2]
[p [e]  . [e] ]  =~ [e]  . [e]
[p [e]  . (n) ]  =~ [e]  . (n)
[p (n)  . [p2]]  =~ (n)  . [p2]
[p (n)  . [e] ]  =~ (n)  . [e]
[p (n)  . (n) ]  =~ (n)  . (n)   // aka an edge!
[p [p1] . [p2]]  =~ [p1] . [p2]
[p [p1] . [e]]   =~ [p1] . [e]
[p [p1] . (n)    =~ [p1] . (n)
```

## Library Components

- `gram-tokens` with regular expressions to tokenize text
- `gram-ast` Abstract Syntax Tree type specifications
- `gram-builder` to compose a gram AST
- `gram-find` to traverse a gram AST
- `gram-transform` to process a gram AST
- `gram-stringify` to pretty print the AST
- `gram-parse` derived from `gram.ne` to parse text into an AST

## Demo

[![asciicast](https://asciinema.org/a/327270.svg)](https://asciinema.org/a/327270)

## Developer instructions

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

- `yarn build` to build the parser and assemble a distribution
- `yarn link` to get a locally linked `gram-lint` binary

# Credits

Thanks to these project for inspiration:

- The entire [unist family](https://unifiedjs.com)
- [mdast-builder](https://github.com/mike-north/mdast-builder) for how to make a builder