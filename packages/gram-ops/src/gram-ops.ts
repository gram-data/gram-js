import {
  GramNode,
  GramPath,
  GramSeq,
  isGramNode,
  isGramSeq,
} from '@gram-data/gram-ast';
import { edge } from '@gram-data/gram-builder';

export const count = (p: GramPath): number => {
  return (p.children as GramPath[]).reduce(
    (acc: number, child: GramPath) => acc + count(child),
    1
  );
};

export const head = (p: GramPath): GramNode => {
  return p.children === undefined || p.children.length === 0
    ? (p as GramNode)
    : head(p.children[0]);
};

export const tail = (p: GramPath): GramNode => {
  return p.children === undefined || p.children.length === 0
    ? (p as GramNode)
    : tail(p.children[p.children.length - 1]);
};

export const merge = (_: GramPath, next: GramPath) => {
  // return path
  return next;
};

export const identity = (p: GramPath) => {
  return p.id;
};

/**
 * Node set projected from within a path.
 *
 * @param p paths from which to project nodes
 */
export const nodes = (p: GramPath | GramPath[] | GramSeq): GramPath[] => {
  if (isGramNode(p)) return [p];
  if (isGramSeq(p)) return nodes(p.children);
  if (Array.isArray(p)) {
    const nodemap = p
      .map(nodes)
      .flat()
      .reduce((acc: Map<string, GramPath>, child: GramPath) => {
        if (child.id) {
          if (acc.has(child.id)) {
            acc.set(child.id, Object.assign(acc.get(child.id), child));
          } else {
            acc.set(child.id, child);
          }
        }
        return acc;
      }, new Map<string, GramPath>());
    return Array.from(nodemap.values());
  } else {
    return nodes(p.children);
  }
};

export const edges = (p: GramPath): GramPath[] => {
  return p === undefined
    ? []
    : p.children === undefined || p.children.length === 0
    ? []
    : p.children.length === 2
    ? [
        ...edges(p.children[0]),
        ...(p.kind !== undefined && p.kind !== 'pair'
          ? [
              edge(
                [tail(p.children[0]), head(p.children[1])],
                p.kind,
                p.id,
                p.labels,
                p.record
              ),
            ]
          : []),
        ...edges(p.children[1]),
      ]
    : p.children.reduce(
        (acc: GramPath[], child: GramPath) => [...acc, ...edges(child)],
        [] as GramPath[]
      );
};
