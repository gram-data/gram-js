import { builder as g } from '@gram-data/gram-builder';
// import {Relation} from '@gram-data/gram-ast';
import { stringify } from '../src';

// const inspect = require('unist-util-inspect');

describe('gram stringify for basic edge patterns', () => {
  it('shows ()--() => "()--()"', () => {
    const p = g.edge([g.node(), g.node()], 'either');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()--()');
  });
  it('shows ()-->() => "()-->()"', () => {
    const p = g.edge([g.node(), g.node()], 'right');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-->()');
  });
  it('shows ()<--() => "()<--()"', () => {
    const p = g.edge([g.node(), g.node()], 'left');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()<--()');
  });
});
describe('gram stringify identified edge patterns', () => {
  it('shows identified edges, ()-[e]-() => "()-[e]-()"', () => {
    const p = g.edge([g.node(), g.node()], 'either', 'e');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[e]-()');
  });
});
describe('gram stringify identified edge patterns', () => {
  it('shows labled edges, ()-[:THEN]-() => "()-[:THEN]-()"', () => {
    const p = g.edge([g.node(), g.node()], 'either', undefined, ['THEN']);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[:THEN]-()');
  });
  it('shows an edge with record, ()-[{k:"v"}]-() => "()-[k:`v`]-()"', () => {
    const record = g.mapToRecord({ k: g.string('v') });
    const p = g.edge(
      [g.node(), g.node()],
      'either',
      undefined,
      undefined,
      record
    );
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[{k:`v`}]-()');
  });
  it('shows a fully specified edge, ()-[e:THEN {k:"v"}]-() => "()-[e:THEN k:`v`]-()"', () => {
    const record = g.mapToRecord({ k: g.string('v') });
    const p = g.edge([g.node(), g.node()], 'either', 'e', ['THEN'], record);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[e:THEN {k:`v`}]-()');
  });
});

describe('gram stringify of pairwise paths', () => {
  it('shows two paired nodes, [p () ()] as "[p , () ()]', () => {
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
