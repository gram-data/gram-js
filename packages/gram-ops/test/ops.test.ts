import { nodes, count, head, tail, edges } from '../src';
import { builder as g, listToPath } from '@gram-data/gram-builder';

import { Node } from 'unist';
const inspect = require('unist-util-inspect');

let DEBUG = true;

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

describe('count() paths', () => {
  it('count(`()`) === 1 === 1 node', () => {
    const paths = g.node();
    const expectedCount = 1;
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`()-->()`) === 3 === 2 nodes + 1 edge', () => {
    const paths = g.edge([g.node(), g.node()], 'right');
    const expectedCount = 3;
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`(), ()`) === 3 === 1 pair + 1 node', () => {
    const paths = g.pair([g.node(), g.node()]);
    const expectedCount = 3;
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`list((), (), ())`) === 5 === 2 pair + 3 node', () => {
    const paths = g.listToPath('pair', [g.node(), g.node(), g.node()]);
    const expectedCount = 5;
    // show(paths);
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`list((), (), (), ())`) === 7 === 3 pair + 4 node', () => {
    const paths = g.listToPath('pair', [
      g.node(),
      g.node(),
      g.node(),
      g.node(),
    ]);
    const expectedCount = 7;
    // show(paths);
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`list((), ()-->(), ())`) === 7 === 2 pair + 4 node + 1 edge', () => {
    const paths = g.listToPath('pair', [
      g.node(),
      g.edge([g.node(), g.node()], 'right'),
      g.node(),
    ]);
    const expectedCount = 7;
    expect(count(paths)).toBe(expectedCount);
  });
});

describe('head() of paths', () => {
  it('head(`(a)`) is (a)', () => {
    const expectedHead = g.node('a');
    const paths = expectedHead;
    expect(head(paths)).toBeTruthy();
    expect(head(paths)).toBe(expectedHead);
  });
  it('head(`(a)-[e]->(b)`) is (a)', () => {
    const expectedHead = g.node('a');
    const paths = g.edge([expectedHead, g.node('b')], 'right', 'e');
    expect(head(paths)).toBeTruthy();
    expect(head(paths)).toBe(expectedHead);
  });
  it('head(`list((a))`) is (a)', () => {
    const expectedHead = g.node('a');
    const paths = g.listToPath('pair', [expectedHead]);
    expect(head(paths)).toBeTruthy();
    expect(head(paths)).toBe(expectedHead);
  });
});

describe('tail() of paths', () => {
  it('tail(`(a)`) is (a)', () => {
    const expectedTail = g.node('a');
    const paths = expectedTail;
    expect(tail(paths)).toBeTruthy();
    expect(tail(paths)).toBe(expectedTail);
  });
  it('tail(`(a)-[e]->(b)`) is (b)', () => {
    const expectedTail = g.node('b');
    const paths = g.edge([g.node('a'), expectedTail], 'right', 'e');
    expect(tail(paths)).toBeTruthy();
    expect(tail(paths)).toBe(expectedTail);
  });
  it('tail(`list(a)`) is (a)', () => {
    const expectedTail = g.node('a');
    const paths = g.listToPath('pair', [expectedTail]);
    expect(tail(paths)).toBeTruthy();
    expect(tail(paths)).toBe(expectedTail);
  });
});

describe('nodes() from paths', () => {
  it('nodes(`(a)`) has 1 node', () => {
    const a = g.node('a');
    const paths = a;
    const expectedNodes = [a];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`list((a))]`) has 1 node', () => {
    const a = g.node('a');
    const paths = g.listToPath('pair', [a]);
    const expectedNodes = [a];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`list((a),(b))`) has 2 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const paths = g.listToPath('pair', [a, b]);
    const expectedNodes = [a, b];
    expect(nodes(paths)).toHaveLength(2);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`list((a),(b),(c))`) has 3 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const c = g.node('c');
    const paths = g.listToPath('pair', [a, b, c]);
    const expectedNodes = [a, b, c];
    expect(nodes(paths)).toHaveLength(3);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`(a)-->(b)`) has 2 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const paths = g.edge([a, b], 'right');
    const expectedNodes = [a, b];
    expect(nodes(paths)).toHaveLength(2);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`list((a)-->(b),(c)<--(d))`) has 4 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const c = g.node('c');
    const d = g.node('d');
    const paths = g.listToPath('pair', [
      g.edge([a, b], 'right'),
      g.edge([c, d], 'left'),
    ]);
    const expectedNodes = [a, b, c, d];
    expect(nodes(paths)).toHaveLength(4);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
});

describe('nodes() from paths are unique', () => {
  it('nodes(`()`) has 1 node', () => {
    const a = g.node();
    const paths = g.seq([a]);
    const expectedNodes = [a];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`(a)`) has 1 node', () => {
    const a = g.node('a');
    const paths = a;
    const expectedNodes = [a];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`(a)-->(a)`) has 1 node', () => {
    const a1 = g.node('a');
    const a2 = g.node('a')
    const paths = g.edge([a1, a2], 'right');
    const expectedNodes = [a1];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`(a), (a)`) has 1 node', () => {
    const a1 = g.node('a');
    const a2 = g.node('a')
    const paths = g.seq([a1, a2]);
    const expectedNodes = [a1];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`(a)-->(b), (a)-->(c)`) has 3 nodes', () => {
    const a1 = g.node('a');
    const b  = g.node('b');
    const a2 = g.node('a');
    const c  = g.node('c');
    const paths = g.seq([g.edge([a1,b],'right'), g.edge([a2,c],'right')]);
    const expectedNodes = [a1,b,c];
    expect(nodes(paths)).toHaveLength(3);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });

});

describe('edges() from paths', () => {
  it('edges(`(a)`) has 0 edges', () => {
    const a = g.node('a');
    const paths = a;
    expect(edges(paths)).toHaveLength(0);
  });
  it('edges(`(a)-->(b)`) has 1 edge', () => {
    const a = g.node('a');
    const b = g.node('b');
    const e = g.edge([a, b], 'right');
    const paths = e;
    const expectedEdges = [e];
    expect(edges(paths)).toHaveLength(1);
    expect(edges(paths)).toEqual(expect.arrayContaining(expectedEdges));
  });
  it('edges(`list((a)-->(b),(c)<--(d))`) has 2 edges', () => {
    const a = g.node('a');
    const b = g.node('b');
    const e1 = g.edge([a, b], 'right');
    const c = g.node('c');
    const d = g.node('d');
    const e2 = g.edge([c, d], 'left');
    const paths = g.listToPath('pair', [e1, e2]);
    const expectedEdges = [e1, e2];
    expect(edges(paths)).toHaveLength(2);
    expect(edges(paths)).toEqual(expect.arrayContaining(expectedEdges));
  });
});
