# gram-format

This is the Gram data interchange format. Gram is a lightweight data graph.
This textual representation is easy to read and write. 

## Data Graphs in Gram

Gram data comes in two parts:

1. Records which contain data values
2. Paths which compose records into structures

A gram file is a sequence of paths, making it ideal for streaming.

Let's create some data...

### Unit Path, an empty path

The smallest amount of data is no data, put in a container so we know
it is there. An empty path is infinite nothingness. 

Empty path constructions:

```
[]
[] + [] = []
[ [] [] ] = []
```

As a special case, a single nest path implies composition with an empty path:
```
[ [] ] = [ [] [] ] = []
```

Identity:
```
identityof [] = undefined || all the same?
```

### Nodes, a named path of length 0

When given a name, a path can be identified and described and discussed. 
The smallest named path has a special name in graphs. It is called a Node. 

To help identify Nodes they can use special notation using parenthesis. 

Node constructions:
```
[n]
(n) =~ [n]
() != []
```

The empty parenthesis expression is _not_ an empty path. Nodes always
have identity. The identity is simply unknown. Implementations may
invent an identity, but must guarantee that it is unique across all paths.

Node compositions with units:
```
(n) + []   =~ [ + n _ ]  =~ [n] =~ (n)
[]  + (n)  =~ [ + _ n ]  =~ [n] =~ (n)
```

Identity:
```
identityof (n) =~ n
identityof ()  =~ <auto>
```

### Edges, named paths of length 1

Nodes can be composed together to create a new path called an Edge.

Edge construction:
```
e = (n) + (n)  =~ [e + n n ]
e = (n1) + (n2) =~ [e + n1 n2]
```

That `+` is a placeholder for any path composition operator. 
Edges use operators that define the navigability of the path.

Edge operators:
- `-->` right association
- `<--` left association
-  `--` either direction

The edge operators can include the name of the edge.

Identity:
```
e =~ ()-->() =~ ()-[e]->() =~ [e --> () ()]

```


### Paths, general composition

Paths generalize edges, allowing composition of any path-like
structure into larger nested structures.

Path construction:
```
p = ()-->()<--() = [p --> [e <-- () ()] () ]
p = [p [p1] [p2]] =~ [p , [p1] [p2] ]

```

Paths can use any of the navigability operators used by edges,
and also a special 'pair' operator which associates two
path-like elements without explicitly connecting them.

Path operator:
- `,` pair association


Identitity:
```
identityof [p + n n2] =~ p
identityof [  + n n ] =~ <auto>
```

### Sequence, a list or stream of paths


### Graphs, a merged view of all paths

### Records, type-safe nested data values

JSON-like nested structures:

```
{
  name: 'Andreas',
  birthDay: date'1969-01-07',
  height: 184cm
  nicknames: ['abk']
}
```


## Exploration...

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