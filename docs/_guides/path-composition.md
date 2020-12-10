---
title: Path Composition
---

Paths are like self-aware lists -- they contain ordered elements _and_ information about themselves.


`[route66:Historic:Highway {established: date`1926-11-26`} (santaMonica)-->(beverlyHills)-->(chicago)]`

## Type Definitions

### Paths

Paths are either empty or the composition of two paths.

~~~
data Path = empty | path (Path) (Path)
  empty :: Path
  path :: Path --> Path --> Path
~~~

### Graph elements

Graph elements are special cases of a Path.

A Node is a Path of length.

~~~
type Node = Path
node :: Empty --> Empty --> Node
~~~


An Edge is a Path of length 1 containing two Nodes.
~~~
type Edge = Path
edge :: Node --> Node --> Edge
~~~

### Path sequence

A Path Sequence is an ordered list of Paths. The elements are composed pairwise to produce the final Path representation. The order of pairing is left-to-right.

~~~
type PathSequence = List Path
foldPath :: PathSequence --> Path
~~~

### Graphs

The classic graph 𝔾 = (𝕍, 𝔼) is derived from Paths. 

In Gram, 𝕍 is an ordered set of nodes. The position of any 

𝔼 is a set of edges which compose any two nodes (or the same node twice) from the `NodeSet`. The order of appearance within a Path represents a sort of additive history for the graph elements. Record values and labels are merged forward.

~~~
type NodeSet = List Node
nodes :: Path --> List Node
~~~
~~~
type EdgeSet = List Edge
edges :: Path --> List Edge
~~~

~~~
type Graph = { nodes :: NodeSet, edges :: EdgeSet, paths :: PathSeq }
~~~

## Path Notation

Gram uses two complementary notations for paths:

1. Cypher node patterns: alternating nodes and edges
2. Path composition: two paths composed into a new path

Both notations can compose the these kinds of paths:

| kind | use                          |
| <--  | oriented to the left         |
| -->  | oriented to the right        |
| ——   | oriented in either direction |
| ,    | pairwise association         |


|                  |	Empty   | Node	    | Edge	           | Path                  |
| Cypher path      |	        | `(n)`	    | `(n1)-[e]->(n2)` | `p = ()-->(),()<--()` |
| Path composition |  `[ø]`	  | `[n ø ø]`	| `[e --> n1 n2]`	 | `[p , p1 p2]`         |

Cypher path notation is easier to read. Path composition is harder to read. The notation can be mixed to annotate information about a cypher path. These three notations are equivalent:

Cypher path	p = (n1)-[e1]->(n2)<-[e2]-(n3)
Path composition	[p [e1 --> n1 [e2 <-- n2 n3] ] ]
Mixed notation	[p (n1)-[e1]->(n2)<-[e2]-(n3)]


---

### _Footnotes_

- [Mostly Adequate guide to Hindley-Milner type system](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/ch07.html)
- [Cypher data patterns](https://neo4j.com/docs/cypher-manual/current/syntax/patterns/#cypher-pattern-related-nodes)
  innovated the ascii-art representation of round graph nodes `(a)` and interrupted arrows `-[e]->` for graph relationships. 
