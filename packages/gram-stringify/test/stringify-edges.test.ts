import * as g from '@gram-data/gram-builder';
import { stringify } from '../src';

// @ts-ignore
const inspect = require('unist-util-inspect');

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

describe('gram stringify fully specified edges with nodes', () => {
  it('shows "(you)-[:GREET {message:`hello`}]-(wordl)"', () => {
    const p = g.edge(
      [g.node('you'), g.node('world')], 'right', 
      undefined, ['GREET'], 
      g.mapToRecord({message:g.string('hello')}));
    console.log(inspect(p));
    console.dir(p.record);
    expect(stringify(p)).toBe('(you)-[:GREET {message:`hello`}]->(world)');
  });
});

