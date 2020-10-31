import * as g from '../src/';
import { isGramEmptyPath, EMPTY_PATH_ID, isGramNode, isGramEdge, isGramPath, BooleanLiteral, StringLiteral, IntegerLiteral, isBooleanLiteral, GramLiteral, isStringLiteral, isIntegerLiteral, TaggedLiteral, isTaggedLiteral, MeasurementLiteral, isMeasurementLiteral, DecimalLiteral, isDecimalLiteral, HexadecimalLiteral, isHexadecimalLiteral, OctalLiteral, isOctalLiteral, DateLiteral, isDateLiteral, WellKnownTextLiteral, isWellKnownTextLiteral } from '@gram-data/gram-ast';

import { unfoldProperties } from '../src/';
// import { unfoldProperties } from '../src/';

// import { Node as UnistNode } from 'unist';
const inspect = require('unist-util-inspect');

/**
 * treeSize returns the number of exclusive descendents
 */
const treeSize = require('unist-util-size');

// const show = (expected:string, actual:UnistNode) => {
//   console.log(expected, inspect(actual));
// }

describe('gram builder for records', () => {
  it('with boolean values', () => {
    const value = true;
    const record = { k: g.boolean(value) };

    expect((record.k as BooleanLiteral).type).toBe('boolean');
    expect(isBooleanLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });
  it('with string values', () => {
    const value = 'some text';
    const record = { k: g.string(value) };

    expect((record.k as StringLiteral).type).toBe('string');
    expect(isStringLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });
  it('with integer values', () => {
    const value = 42;
    const record = { k: g.integer(value) };

    expect((record.k as IntegerLiteral).type).toBe('integer');
    expect(isIntegerLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as TaggedLiteral).type).toBe('tagged');
    expect(isTaggedLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as TaggedLiteral).tag).toBe(String(tag));
  });
  it('with measurements values', () => {
    const value = 1280;
    const unit = 'px';
    const record = { k: g.measurement(unit, value) };

    expect((record.k as MeasurementLiteral).type).toBe('measurement');
    expect(isMeasurementLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as MeasurementLiteral).unit).toBe(String(unit));
  });
  it('with decimal values', () => {
    const value = 3.1495;
    const record = { k: g.decimal(value) };

    expect((record.k as DecimalLiteral).type).toBe('decimal');
    expect(isDecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });

  it('with hexadecimal values', () => {
    const value = '0xCAFE1234';
    const record = { k: g.hexadecimal(value) };

    expect((record.k as HexadecimalLiteral).type).toBe('hexadecimal');
    expect(isHexadecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });

  it('with octal values', () => {
    const value = '01234';
    const record = { k: g.octal(value) };

    expect((record.k as OctalLiteral).type).toBe('octal');
    expect(isOctalLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });
  it('with tagged date values', () => {
    const value = new Date().toISOString();
    const tag = 'date';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as DateLiteral).type).toBe('tagged');
    expect(isDateLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as DateLiteral).tag).toBe(String(tag));
  });
  it('with tagged wkt values (geospatial)', () => {
    const value = 'POINT(-83.123 42.123)';
    const tag = 'wkt';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as WellKnownTextLiteral).type).toBe('tagged');
    expect(isWellKnownTextLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as WellKnownTextLiteral).tag).toBe(String(tag));
  });
});

describe('gram cons() can build empty paths', () => {
  it('when there are no children, as empty = [] =~ [ø]', () => {
    const p = g.cons();
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // empty paths are paths
    expect(p.id).toBe(EMPTY_PATH_ID);
    expect(p.children).toBeUndefined();
    expect(treeSize(p)).toBe(0);
  });
  it('when the identity is ø, as empty = [ø] =~ [ø]', () => {
    const p = g.cons(undefined, {id:"ø"});
    console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // empty paths are paths
    expect(p.id).toBe(EMPTY_PATH_ID);
    expect(p.children).toBeUndefined();
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
    expect(p.children).toBeUndefined();
    expect(treeSize(p)).toBe(0);
  });
  it('called a few times as empty() === empty() === empty()', () => {
    const ps = [g.empty(), g.empty(), g.empty()];
    expect(ps.every( p => isGramEmptyPath(p))).toBeTruthy();
    expect(ps.every( p => p.id === EMPTY_PATH_ID)).toBeTruthy();
  });

});

describe('gram cons() can build nodes, which are paths of length 0', () => {

  it('using an identified node, as n = [ a ] =~ [a [ø] [ø] ]', () => {
    const p = g.cons(undefined, {id:'a'});
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // a node is a path
    expect(p.children).toHaveLength(0); // empty path children are not kept
    expect(treeSize(p)).toBe(0);
  });

  it('using path composition from empty nodes, as n = [ [] [] ] =~ [ [ø] [ø] ]', () => {
    const left = g.EMPTY_PATH;
    const right = g.EMPTY_PATH;
    const p = g.cons([left, right]);
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // a node is a path
    expect(p.children).toHaveLength(0); // empty path children are not kept
    expect(treeSize(p)).toBe(0);
  });

  it('using path composition of an LHS [ø] with an implied RHS [ø], as [ [] ] =~ [ [ø] [ø] ]', () => {
    const p = g.cons([g.EMPTY_PATH]);
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
    const p = g.cons([g.EMPTY_PATH], { id: 'n' });
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
    expect(p.labels).toContain('NEGATE')
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
    const p = g.node(undefined, undefined, unfoldProperties(record));
    // console.log(inspect( b:'hello', c:42})", p);

    expect(p.record).toBeDefined();
    if (p.record) {
      expect(
        (p.record[0].value as BooleanLiteral).type
      ).toBe('boolean');
      expect((p.record[1].value as StringLiteral).type).toBe(
        'string'
      );
      expect(
        (p.record[2].value as IntegerLiteral).type
      ).toBe('integer');
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
    expect(p.relation).toBe('pair');
    expect(isGramPath(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramPath(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('[e --> [n1][n2]] is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.cons([left, right], { id: 'e', relation: 'right' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.relation).toBe('right');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('[e <-- [n1][n2]] is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.cons([left, right], { id: 'e', relation: 'left' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.relation).toBe('left');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });

  it('[e -- [n1][n2]] is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.cons([left, right], { id: 'e', relation: 'either' });
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.relation).toBe('either');
    expect(isGramEdge(p) && isGramNode(p.children[0])).toBeTruthy();
    expect(isGramEdge(p) && isGramNode(p.children[1])).toBeTruthy();
    expect(treeSize(p)).toBe(2);
  });
});

describe('gram edge() can build edges', () => {

  it('()-->() is an edge', () => {
    const left = g.node();
    const right = g.node();
    const p = g.edge([left, right], 'right', 'e'  );
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramEdge(p)).toBeTruthy();
    expect(isGramPath(p)).toBeTruthy(); // edges are paths
    expect(p.relation).toBe('right');
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
    expect(p.relation).toBe('left');
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
    expect(p.relation).toBe('either');
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
    const record = g.unfoldProperties({
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
      expect((p.record[0].value as BooleanLiteral).type).toBe(
        'boolean'
      );
      expect((p.record[1].value as StringLiteral).type).toBe(
        'string'
      );
      expect((p.record[2].value as IntegerLiteral).type).toBe(
        'integer'
      );
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
describe("gram cons() decorator patterns", () => {

  it('extend an empty path with an implied RHS [ø], producing a node [ [ø] [ø] ]', () => {
    const child = g.empty();
    const p = g.cons([child], {id:'p'});
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeTruthy();
    expect(treeSize(p)).toBe(0); // the empty paths are dropped
  });

  it('extend a node with an implied RHS [ø], as [p (n)] =~ [p (n) [ø] ]', () => {
    const child = g.node('n');
    const p = g.cons([child], {id:'p'});
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(1); // the node with the empty path
  });

  it('decorate a node with label, as  [:EXTRA (n)] =~ [:EXTRA (n) [ø] ]', () => {
    const child = g.node('n');
    const p = g.cons([child], {labels:['EXTRA']});
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(1); // the node without the implied empty path
  });

  it('decorate a node with an extra record, as  [{editor:"ABK"} (n)] =~ [{editor:"ABK"} (n) [ø] ]', () => {
    const child = g.node('n');
    const p = g.cons([child], {record:unfoldProperties({editor:g.string("ABK")})});
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramNode(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(1); // the node without the implied ø
  });

  it('extend an edge with an implied RHS [ø], producing [p ()-[e]-() [ø] ], but drops the ø', () => {
    const child = g.edge([g.node(), g.node()], 'right', 'e');
    const p = g.cons([child], {id:'p'});
    // console.log(inspect(p));
    expect(isGramEmptyPath(p)).toBeFalsy();
    expect(isGramPath(p)).toBeTruthy();
    expect(treeSize(p)).toBe(3); // node (2) + edge (1) + empty (0) = 3
  });

});

describe('gram cons() composing combinations of empty, node, and edge', () => {
  const lhs =            [g.empty(),  g.node(),   g.edge([g.node(), g.node()], 'right')];
  const rhs =            [g.empty(),  g.node(),   g.edge([g.node(), g.node()], 'left')];
  const isExpectedPair = [isGramNode, isGramPath, isGramPath]
  const isExpectedPath = [isGramNode, isGramPath, isGramPath]

  it('pair relation', () => {
    const relation = 'pair'
    for (let i=0; i<lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', relation });
      // console.log(inspect( p1 p2]", p);
      expect(isExpectedPair[i](p)).toBeTruthy();
      expect(p.relation).toBe(relation)
    }
  });

  it('left relation', () => {
    const relation = 'left'
    for (let i=0; i<lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', relation });
      // console.log(inspect(p));
      expect(isExpectedPath[i](p)).toBeTruthy();
      expect(p.relation).toBe(relation)
    }
  });

  it('right relation', () => {
    const relation = 'right'
    for (let i=0; i<lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', relation });
      // console.log(inspect(p));
      expect(isExpectedPath[i](p)).toBeTruthy();
      expect(p.relation).toBe(relation)
    }
  });

  it('either relation', () => {
    const relation = 'either'
    for (let i=0; i<lhs.length; i++) {
      const p = g.cons([lhs[i], rhs[i]], { id: 'p', relation });
      // console.log(inspect(p));
      expect(isExpectedPath[i](p)).toBeTruthy();
      expect(p.relation).toBe(relation)
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
    const p = g.reduce('pair', [g.node(id)]);
    // console.log(inspect(p));
    expect(p.id).toBe(id);
    expect(p.children?.length).toBe(0); 
  });
  it('two nodes as a tree of two pairs, terminated by ø', () => {
    const p = g.reduce('pair', [g.node('a'), g.node('b')]);
    // console.log(inspect((b) =~ [, a [, b ø] ]", p);
    expect(p.children?.length).toBe(2);
    expect(treeSize(p, { type: 'path', relation: 'pair' })).toBe(1); // descendent count
  });
  it('three nodes, becoming three pairs, terminated by ø', () => {
    const p = g.reduce('pair', [g.node('a'), g.node('b'), g.node('c')]);
    // console.log(inspect((b),(c) =~ [, a [, b [, c ø ] ] ]", p);
    expect(p.children?.length).toBe(2);
    expect(treeSize(p, { type: 'path', relation: 'pair' })).toBe(2); // descendent count
  });
  it('accepts five nodes, becoming five pairs, terminated by ø', () => {
    const p = g.reduce('pair', [
        g.node('a'),
        g.node('b'),
        g.node('c'),
        g.node('d'),
        g.node('e'),
      ]);
    // console.log(inspect((b),(c),(d),(e) =~ [, a [, b [, c [, d [, e ø ] ] ] ] ]", p);
    expect(treeSize(p, { type: 'path', relation: 'pair' })).toBe(4); // descendent count
  });
});



// describe('gram builder flatten()', () => {
//   it('flattens an already flat array', () => {
//     const unflat = [1, 2, 3];
//     const flattened = g.flatten(unflat);
//     expect(flattened).toEqual(expect.arrayContaining([1, 2, 3]));
//   });
// });
