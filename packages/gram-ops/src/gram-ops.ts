import { GramNode, GramPath, GramPathlike } from '@gram-data/gram-ast';
import { edge } from '@gram-data/gram-builder';

export const count = (p:GramPathlike):number => {
  return (p === undefined) ? 0 : 
    (p.children === undefined ) ? 1 : 
    (p.children.reduce(
      (acc: number, child: GramPath) => acc + count(child),
      1
    ))
}

export const head = (p:GramPathlike):GramNode => {
  return (p.children === undefined || p.children.length === 0) ? p as GramNode
    : head(p.children[0]);
}

export const tail = (p:GramPathlike):GramNode => {
  return (p.children === undefined || p.children.length === 0) ? p as GramNode
    : tail(p.children[p.children.length - 1]);
}

export const nodes = (p:GramPathlike):GramPath[] => {
  return (p === undefined) ? [] :
    (p.children === undefined || p.children.length === 0) ? [p as GramPath] :
    (p.children.reduce(
      (acc:GramPath[], child: GramPath) =>  [...acc, ...nodes(child)],
      [] as GramPath[]
    ))
}

export const edges = (p:GramPathlike):GramPath[] => {
  return (p === undefined) ? [] 
    : (p.children === undefined || p.children.length === 0) ? [] 
    : (p.children.length === 2) ? [
        ...edges(p.children[0]), 
        ...((p.relation !== undefined && p.relation !== 'pair') ? [edge([tail(p.children[0]), head(p.children[1])], p.relation, p.id, p.labels, p.record)] : []), 
        ...edges(p.children[1])
      ] 
    : (p.children.reduce(
      (acc:GramPath[], child: GramPath) =>  [...acc, ...edges(child)],
      [] as GramPath[]
    ))
}