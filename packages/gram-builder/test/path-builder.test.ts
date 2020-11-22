import * as g from '../src';
import {
  isGramEmptyPath,
  EMPTY_PATH_ID,
  isGramNode,
  isGramEdge,
  isGramPath,
  BooleanLiteral,
  StringLiteral,
  IntegerLiteral,
} from '@gram-data/gram-ast';

import chalk from 'chalk';
import { Node as UnistNode } from 'unist';
const inspect = require('unist-util-inspect');

let DEBUG = true;

/**
 * treeSize returns the number of exclusive descendents
 */
const treeSize = require('unist-util-size');

// @ts-ignore
const show = (expected: string, actual: UnistNode) => {
  if (DEBUG) console.log(chalk`{green ${expected}}\n ${inspect(actual)}`);
};

describe('gram empty() builds empty paths', () => {
  it('empty() always returns the singleton empty path', () => {
    const p = g.empty();
    expect(isGramEmptyPath(p)).toBeTruthy();
  });
});

describe('gram cons() can build empty paths', () => {
  it('when there are no children, as empty = [] =~ [ø]', () => {
    const p = g.cons();
    // show('[ø]', p);
    expect(isGramEmptyPath(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // empty paths are paths
    expect(p.id).toBe(EMPTY_PATH_ID);
    expect(p.children).toHaveLength(0);
    expect(treeSize(p)).toBe(0);
  });
  it('when the identity is ø, as empty = [ø] =~ [ø]', () => {
    const p = g.cons(undefined, { id: 'ø' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // empty paths are paths
    expect(p.id).toBe(EMPTY_PATH_ID);
    expect(p.children).toHaveLength(0);
    expect(treeSize(p)).toBe(0);
  });
});

describe('gram empty() maps to the empty path singleton', () => {
  it('called once as empty()', () => {
    const p = g.empty();
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // empty paths are paths
    expect(p.id).toBe(EMPTY_PATH_ID);
    expect(p.children).toHaveLength(0);
    expect(treeSize(p)).toBe(0);
  });
  it('called a few times as empty() === empty() === empty()', () => {
    const ps = [g.empty(), g.empty(), g.empty()];
    expect(ps.every(p => isGramEmptyPath(p))).toBeTruthy();
    expect(ps.every(p => p.id === EMPTY_PATH_ID)).toBeTruthy();
  });
});

describe('gram cons() can build nodes, which are paths of length 0', () => {
  it('using an identified node, as n = [ a ] =~ [a [ø] [ø] ]', () => {
    const p = g.cons(undefined, { id: 'a' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // a node is a path
    expect(p.children).toHaveLength(0); // empty path children are not kept
    expect(treeSize(p)).toBe(0);
  });

  it('using path composition from empty nodes, as n = [ [] [] ] =~ [ [ø] [ø] ]', () => {
    const left = g.empty();
    const right = g.empty();
    const p = g.cons([left, right]);
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // a node is a path
    expect(p.children).toHaveLength(0); // empty path children are not kept
    expect(treeSize(p)).toBe(0);
  });

  it('using path composition of an LHS [ø] with an implied RHS [ø], as [ [] ] =~ [ [ø] [ø] ]', () => {
    const p = g.cons([g.empty()]);
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0); // empty paths are not kept
    expect(treeSize(p)).toBe(0);
  });

  it('using an empty array which implies an LHS and RHS that are both [ø], which has no path syntax =~ [ [ø] [ø] ]', () => {
    const p = g.cons([]);
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0); // empty paths are not kept
    expect(treeSize(p)).toBe(0);
  });

  it('with identity, as [n]', () => {
    const p = g.cons([], { id: 'n' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('with identity and LHS child [ø], as [n []] =~ [n [ø] [ø]]', () => {
    const p = g.cons([g.empty()], { id: 'n' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  /**
   * @see https://www.goodreads.com/quotes/24012-once-you-label-me-you-negate-me
   */
  it('with a label as [:NEGATE] that makes Danes sad', () => {
    const p = g.cons([], { labels: ['NEGATE'] });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(p.labels).toContain('NEGATE');
    expect(p.children).toHaveLength(0);
  });

  it('with a record as [ {valuable:true}]', () => {
    const p = g.cons([], { record: [g.property('valuable', g.boolean(true))] });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });
});

describe('gram node() builder ', () => {
  it('() is an empty node', () => {
    const p = g.node();
    // console.log(inspect(p));
    expect(p.record).toBeUndefined();
    expect(p.id).toBeUndefined();
  });
  it('(a) is an identified node', () => {
    const nodeId = 'a';
    const p = g.node(nodeId);
    // console.log(inspect(p));
    expect(p.id).toBeDefined();
    expect(p.id).toBe(nodeId);
  });
  it('(:Aye) is a labeled node', () => {
    const label = 'Aye';
    const p = g.node(undefined, [label]);
    // console.log(inspect(p));
    expect(p.labels).toContain(label);
  });
  it('({a:false, b:"hello", c:42}) is a node with a record', () => {
    const record = {
      a: g.boolean(false),
      b: g.string('hello'),
      c: g.integer(42),
    };
    const p = g.node(undefined, undefined, g.mapToRecord(record));
    // console.log(inspect( b:'hello', c:42})", p);

    expect(p.record).toBeDefined();
    if (p.record) {
      expect((p.record[0].value as BooleanLiteral).type).toBe('boolean');
      expect((p.record[1].value as StringLiteral).type).toBe('string');
      expect((p.record[2].value as IntegerLiteral).type).toBe('integer');
    } else fail('Record expected to be an array of GramProperty');
  });
});

describe('gram cons() can build edges, which are paths of length 1', () => {
  it('[e [n1][n2]] is not yet an edge, but a path with a pair of nodes', () => {
    const left = g.cons([], { id: 'n1' });
    const right = g.cons([], { id: 'n2' });
    const p = g.cons([left, right], { id: 'e' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(p.kind).toBe('pair');
    expect(isGramPath(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramPath(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('[e --> [n1][n2]] is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.cons([left, right], { id: 'e', kind: 'right' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.kind).toBe('right');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('[e <-- [n1][n2]] is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.cons([left, right], { id: 'e', kind: 'left' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.kind).toBe('left');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('[e -- [n1][n2]] is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.cons([left, right], { id: 'e', kind: 'either' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.kind).toBe('either');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });
});

describe('gram edge() can build edges', () => {
  it('(a)-->(b) is an edge', () => {
    const left = g.node('a');
    const right = g.node('b');
    const p = g.edge([left, right], 'right');
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.kind).toBe('right');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('()<--() is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.edge([left, right], 'left', 'e');
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.kind).toBe('left');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('()--() is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.edge([left, right], 'either');
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.kind).toBe('either');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('()-[e]-() is a named edge', () => {
    const pid = 'e';
    const p = g.edge([g.node(), g.node()], 'either', pid);
    // console.log(inspect(p));
    expect(isGramEdge(p)).toBeTruthy();
    expect(p.id).toBe(pid);
  });

  it('()-[:KNOWS]->()', () => {
    const label = 'KNOWS';
    const p = g.edge([g.node(), g.node()], 'either', undefined, [label]);
    // console.log(inspect(p));
    expect(p.labels).toContain(label);
  });

  it('()-[{a:false, b:"hello", c:42}]->()', () => {
    const record = g.mapToRecord({
      a: g.boolean(false),
      b: g.string('hello'),
      c: g.integer(42),
    });
    const p = g.edge(
      [g.node(), g.node()],
      'either',
      undefined,
      undefined,
      record
    );
    expect(p.record).toBeDefined();
    if (p.record) {
      expect((p.record[0].value as BooleanLiteral).type).toBe('boolean');
      expect((p.record[1].value as StringLiteral).type).toBe('string');
      expect((p.record[2].value as IntegerLiteral).type).toBe('integer');
    } else fail('GramRecord expected on GramEdge');
  });
});

/**
 * The decorator pattern extends an existing path element without
 * changing the structure of the graph by composing with an empty
 * path.
 *
 * This can be useful for graph annotations.
 */
describe('gram cons() decorator patterns', () => {
  it('extend an empty path with an implied RHS [ø], producing a node [ [ø] [ø] ]', () => {
    const child = g.empty();
    const p = g.cons([child], { id: 'p' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(treeSize(p)).toBe(0); // the empty paths are dropped
  });

  it('extend a node with an implied RHS [ø], as [p (n)] =~ [p (n) [ø] ]', () => {
    const child = g.node('n');
    const p = g.cons([child], { id: 'p' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(1); // the node with the empty path
  });

  it('decorate a node with label, as  [:EXTRA (n)] =~ [:EXTRA (n) [ø] ]', () => {
    const child = g.node('n');
    const p = g.cons([child], { labels: ['EXTRA'] });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(1); // the node without the implied empty path
  });

  it('decorate a node with an extra record, as  [{editor:"ABK"} (n)] =~ [{editor:"ABK"} (n) [ø] ]', () => {
    const child = g.node('n');
    const p = g.cons([child], {
      record: g.mapToRecord({ editor: g.string('ABK') }),
    });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(1); // the node without the implied ø
  });

  it('extend an edge with an implied RHS [ø], producing [p ()-[e]-() [ø] ], but drops the ø', () => {
    const child = g.edge([g.node(), g.node()], 'right', 'e');
    const p = g.cons([child], { id: 'p' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(3); // node (2) + edge (1) + empty (0) = 3
  });
});

describe('gram cons() composing combinations of empty, node, and edge', () => {
  const lhs = [g.empty(), g.node(), g.edge([g.node(), g.node()], 'right')];
  const rhs = [g.empty(), g.node(), g.edge([g.node(), g.node()], 'left')];
  const isExpectedPair = [isGramNode, isGramPath, isGramPath];
  const isExpectedPath = [isGramNode, isGramPath, isGramPath];

  it('pair kind', () => {
    const kind = 'pair';
    for (let i = 0; i < lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', kind });
      // console.log(inspect( p1 p2]", p);
      expect(isExpectedPair[i](p)).toBeTruthy();
      expect(p.kind).toBe(kind);
    }
  });

  it('left kind', () => {
    const kind = 'left';
    for (let i = 0; i < lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', kind });
      // console.log(inspect(p));
      expect(isExpectedPath[i](p)).toBeTruthy();
      expect(p.kind).toBe(kind);
    }
  });

  it('right kind', () => {
    const kind = 'right';
    for (let i = 0; i < lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', kind });
      // console.log(inspect(p));
      expect(isExpectedPath[i](p)).toBeTruthy();
      expect(p.kind).toBe(kind);
    }
  });

  it('either kind', () => {
    const kind = 'either';
    for (let i = 0; i < lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', kind });
      // console.log(inspect(p));
      expect(isExpectedPath[i](p)).toBeTruthy();
      expect(p.kind).toBe(kind);
    }
  });
});

describe('gram builder for path sequence', () => {
  it('may be empty', () => {
    const paths = g.seq([]);
    expect(paths.children.length).toBe(0);
  });
  it('may have identity', () => {
    const id = 'a';
    const paths = g.seq([], id);
    expect(paths.id).toBe(id);
  });
});

describe('gram builder for reducing an array of paths into a tree of composed paths', () => {
  it('a single node returns unchanged', () => {
    const id = 'a';
    const p = g.listToPath('pair', [g.node(id)]);
    // console.log(inspect(p));
    expect(p.id).toBe(id);
    expect(p.children?.length).toBe(0);
  });
  it('two nodes as a tree of 1 pair', () => {
    const p = g.listToPath('pair', [g.node('a'), g.node('b')]);
    // console.log(inspect(p));
    expect(p.children?.length).toBe(2);
    expect(treeSize(p, { type: 'path', kind: 'pair' })).toBe(0); // descendent count
  });
  it('three nodes, becoming two pairs', () => {
    const p = g.listToPath('pair', [g.node('a'), g.node('b'), g.node('c')]);
    // console.log(inspect(p));
    expect(p.children?.length).toBe(2);
    expect(treeSize(p, { type: 'path', kind: 'pair' })).toBe(1); // descendent count
  });
  it('five nodes, becoming four pairs', () => {
    const p = g.listToPath('pair', [
      g.node('a'),
      g.node('b'),
      g.node('c'),
      g.node('d'),
      g.node('e'),
    ]);
    // console.log(inspect(p));
    expect(treeSize(p, { type: 'path', kind: 'pair' })).toBe(3); // descendent count
  });
});

// describe('gram builder flatten()', () => {
//   it('flattens an already flat array', () => {
//     const unflat = [1, 2, 3];
//     const flattened = g.flatten(unflat);
//     expect(flattened).toEqual(expect.arrayContaining([1, 2, 3]));
//   });
// });
