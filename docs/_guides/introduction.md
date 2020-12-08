---
name: introduction
---
Gram is a textual format for data that is expressive, streamable and composable. 

Named values are arranged into records, qualified with labels, given identity, and organized into patterns.

## Invaluable values

Gram offers a rich set of value types. Foundational values like `string` can be prepended with a tag to 
indicate the string interpretation. Similarly `integers` or `decimals` can have a unit appended. No more
guessing whether a height is pixels or meters. 

``` js
({
  name: "Gram",
  stars: 42,
  since: date`2020-06-06`,
  height: 190cm
})
```
## Familiar, semi-structured data records

Like JSON, data in gr 

A property record:
```js
(g:Format:Data {
  name: "Gram",
  stars: 42,
  since: date`2020-06-06`,
  height: 190cm
})
```

## 

```
(a)-->(b)-->(c)
```

----
### _Footnotes_

- [Semi-structured data](https://en.wikipedia.org/wiki/Semi-structured_data)
