import {
  nodes,
  count,
  head,
  tail,
  edges
} from '../src';
import { builder as g } from '@gram-data/gram-builder';

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
  it('count(`[()]`) === 2 === 1 seq + 1 node', () => {
    const paths = g.seq(g.node());
    const expectedCount = 2;
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`[(), ()]`) === 3 === 1 seq + 1 node', () => {
    const paths = g.seq([g.node(), g.node()]);
    const expectedCount = 3;
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`[(), (), ()]`) === 4 === 1 seq + 3 node', () => {
    const paths = g.seq([g.node(), g.node(), g.node()]);
    const expectedCount = 4;
    expect(count(paths)).toBe(expectedCount);
  });
  it('count(`[(), ()-->(), ()]`) === 6 === 1 seq + 4 node + 1 edge', () => {
    const paths = g.seq([g.node(), g.edge([g.node(), g.node()], 'right'), g.node()]);
    const expectedCount = 6;
    expect(count(paths)).toBe(expectedCount);
  });
});

describe('head() of paths', () => {
  it('head(`(a)`) is Some(a)', () => {
    const expectedHead = g.node('a');
    const paths = expectedHead;
    expect(head(paths)).toBeTruthy();
    expect(head(paths)).toBe(expectedHead);
  });
  it('head(`(a)-[e]->(b)`) is Some(a)', () => {
    const expectedHead = g.node('a');
    const paths = g.edge([expectedHead, g.node('b')], 'right', 'e');
    expect(head(paths)).toBeTruthy();
    expect(head(paths)).toBe(expectedHead);
  });
  it('head(`[(a)]`) is Some(a)', () => {
    const expectedHead = g.node('a');
    const paths = g.seq(expectedHead)
    expect(head(paths)).toBeTruthy();
    expect(head(paths)).toBe(expectedHead);
  });

});

describe('tail() of paths', () => {
  it('tail(`(a)`) is Some(a)', () => {
    const expectedTail = g.node('a');
    const paths = expectedTail;
    expect(tail(paths)).toBeTruthy();
    expect(tail(paths)).toBe(expectedTail);
  });
  it('tail(`(a)-[e]->(b)`) is Some(b)', () => {
    const expectedTail = g.node('b');
    const paths = g.edge([g.node('a'), expectedTail], 'right', 'e');
    expect(tail(paths)).toBeTruthy();
    expect(tail(paths)).toBe(expectedTail);
  });
  it('tail(`[(a)]`) is Some(a)', () => {
    const expectedTail = g.node('a');
    const paths = g.seq(expectedTail)
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
  it('nodes(`[(a)]`) has 1 node', () => {
    const a = g.node('a');
    const paths = g.seq([a]);
    const expectedNodes = [a];
    expect(nodes(paths)).toHaveLength(1);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`[(a),(b)]`) has 2 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const paths = g.seq([a,b]);
    const expectedNodes = [a,b];
    expect(nodes(paths)).toHaveLength(2);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`[(a),(b),(c)]`) has 3 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const c = g.node('c');
    const paths = g.seq([a,b,c]);
    const expectedNodes = [a,b,c];
    expect(nodes(paths)).toHaveLength(3);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`(a)-->(b)`) has 2 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const paths = g.edge([a,b], 'right');
    const expectedNodes = [a,b];
    expect(nodes(paths)).toHaveLength(2);
    expect(nodes(paths)).toEqual(expect.arrayContaining(expectedNodes));
  });
  it('nodes(`[(a)-->(b),(c)<--(d)]`) has 4 nodes', () => {
    const a = g.node('a');
    const b = g.node('b');
    const c = g.node('c');
    const d = g.node('d');
    const paths = g.seq([g.edge([a,b], 'right'), g.edge([c,d], 'left')]);
    const expectedNodes = [a,b,c,d];
    expect(nodes(paths)).toHaveLength(4);
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
    const e = g.edge([a,b], 'right');
    const paths = e;
    const expectedEdges = [e];
    expect(edges(paths)).toHaveLength(1);
    expect(edges(paths)).toEqual(expect.arrayContaining(expectedEdges));
  });
  it('edges(`[(a)-->(b),(c)<--(d)]`) has 2 edges', () => {
    const a = g.node('a');
    const b = g.node('b');
    const e1 = g.edge([a,b], 'right');
    const c = g.node('c');
    const d = g.node('d');
    const e2 = g.edge([c,d], 'left');
    const paths = g.seq([e1, e2]);
    const expectedEdges = [e1,e2];
    expect(edges(paths)).toHaveLength(2);
    expect(edges(paths)).toEqual(expect.arrayContaining(expectedEdges));
  });
});
