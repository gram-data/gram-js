---
name: Introduction
---

Gram is a textual format for data graphs. Named values are packed into records, qualified with labels, given identity, and organized into expressive patterns. It's `JSON` for data graphs!

## Invaluable values

Gram offers a rich set of value types. Foundational values like `string` can be prepended with a tag to 
specialize the string format. Similarly, `integers` or `decimals` can have a unit appended -- no more
guessing whether a weight is metrics or imperial. 

``` js
({
  name: "Gram",
  stars: 42,
  since: date`2020-06-06`,
  homepage: url`https://github.com/`,
  weight: 22kg
})
```


## Highly qualified records

Gram's semi-structured data records have an extra layer of information. The record can be
given an explicit identity and qualified with labels. 

```js
(g:Text:Data { name: "Gram", stars: 42, since: date`2020-06-06`, weight: 22kg })
```

Multiple records can be listed together, forming a sequence of records.

```js
(g:Text:Data   { name: "Gram", stars: 42, since: date`2020-06-06`, weight: 22kg })
(a:Ast:Data    { specification: "@gram-data/gram-ast", extends:"unist" })
(j:Object:Data { language: "javascript" })
```

## Well composed data

Individual records can be composed into data patterns called paths, inspired by Neo4j's Cypher language.
Path members can reference previously defined records.

Here we arrange `g`,`a`, and `j` into a path:

```
(g)-->(a)-->(j)
```

---

### _Footnotes_

- [gram-ast]({{site.baseurl}}/api/interfaces/gram_ast.textliteral) for text literal data types
- [gram-value]({{site.baseurl}}/api/modules/gram_value/) for standard conversions to JS primitives
- [Semi-structured data](https://en.wikipedia.org/wiki/Semi-structured_data) use arbitrary nesting of lists and maps. There is structure without a constraining schema.
- [Cypher data patterns](https://neo4j.com/docs/cypher-manual/current/syntax/patterns/#cypher-pattern-related-nodes)
  innovated the ascii-art representation of round graph nodes `(a)` and interrupted arrows `-[e]->` for graph relationships. 
