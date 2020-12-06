import * as g from '@gram-data/gram-builder';
import { stringify } from '../src';

import { Node } from 'unist';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

describe('gram stringify for basic pair patterns', () => {
  it('shows (),() => "(), ()"', () => {
    const p = g.pair([g.node(), g.node()]);
    // show(p);
    expect(stringify(p)).toBe('(), ()');
  });
});

describe('gram stringify of pairwise paths', () => {
  it('shows an identified pair, [p () ()] as "[p , () ()]', () => {
    const p = g.cons([g.node(), g.node()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p , () ()]');
  });
  it('shows two paired named nodes, [p (a) (b)] as "[p , (a) (b)]', () => {
    const p = g.cons([g.node('a'), g.node('b')], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p , (a) (b)]');
  });
  it('shows one node paired with an empty path, [p () [ø]] as "[p ()]', () => {
    const p = g.cons([g.node(), g.empty()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p ()]');
  });
  it('shows one empty path paired with a node, [p [ø] ()] as "[p ()]', () => {
    const p = g.cons([g.empty(), g.node()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p ()]');
  });
  it('shows a single node with an implied ø rhs, [p ()] as "[p ()]', () => {
    const p = g.cons([g.empty(), g.node()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p ()]');
  });
  it('shows two paired edges, [p , ()--() ()--()] as "[p , ()--() ()--()]', () => {
    const p = g.cons(
      [
        g.edge([g.node(), g.node()], 'either'),
        g.edge([g.node(), g.node()], 'either'),
      ],
      { id: 'p' }
    );
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p , ()--() ()--()]');
  });
});
