
 A Path is an expression composing two other paths. 

 - denoted with matching, non-empty square brackets: `[id]`
 - path equivalence: `[]`
 - identity: yes (required)
 - children: yes (optional)
 - labels: yes
 - record: yes
 - path length: sum(children[0].length, children[1].length)
 - path cardinality: nodes().length
 - information role: data annotation

 A GramUnit is an empty path expression which contains no sub-paths and has no identity.

 - denoted with matching square brackets: `[]`
 - path equivalence: `[]`
 - identity: no
 - children: no
 - labels: no
 - record: no
 - path length: 0
 - path cardinality: 0
 - information role: emptiness

A Node is a zero length path. 

- denoted with matching square brackets: `()`
- path equivalence: `[n] =~ (n)`
- identity: yes
- children: ø, ø
- labels: yes
- record: yes
- path length: 0
- path cardinality: 1
- information role: an entity or a noun


An Edge is:

- a path expression composing two nodes 
- a path expression of length 1
- logically equivalent to an empty path (path with no children) within an enclosing path: `(n) =~ [n []]`
- the operand in path expressions
- usually a noun concept


