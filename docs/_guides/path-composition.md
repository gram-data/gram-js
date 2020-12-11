---
title: Path Composition
---

Paths are like self-aware lists -- they contain ordered elements _and_ information about themselves.

The canonical example is [U.S. Route 66](https://en.wikipedia.org/wiki/U.S._Route_66), an historic highway
popularized in songs, movies and books. The route is both a series of roads connecting locations, and
a thing-in-itself. Where does information about Route 66 go? On the path itself. 

The California segment of Route-66:

```
[ route66inCA:Historic:Highway {established: date`1926-11-26`, segment:'CA'} 
    (santaMonica)-->(losAngeles)-->(pasadena)-->
    (eastPasadena)-->(monrovia)-->(azusa)-->
    (upland)-->(sanBernadino)-->(devore)-->
    (cajonJunction)-->(victorville)-->(barstow)
]
```

### Paths all the way down (or up)

[ route66:Historic:Highway (route66inCA)-->(route66inAZ)-->(route66inIL) ]

---

### _Footnotes_

- [Thing-in-itself](https://en.wikipedia.org/wiki/Thing-in-itself) (misused here) is a deepr notion about existence and observation. 
