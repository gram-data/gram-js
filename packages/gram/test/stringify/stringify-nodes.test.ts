import * as g from '@gram-data/gram-builder';
import { stringify } from '../../src/stringify';

// const inspect = require('unist-util-inspect');

describe('gram stringify for empty paths', () => {
  it('omits empty paths, [ø] => ""', () => {
    const p = g.empty();
    // console.log(inspect(p));
    expect(stringify(p)).toBe('');
  });
});

describe('gram stringify for basic node patterns', () => {
  it('shows unidentified nodes, () => "()"', () => {
    const p = g.node();
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()');
  });
  it('shows identified nodes, (n) => "(n)"', () => {
    const p = g.node('n');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('(n)');
  });
  it('shows a labled nodes, (:Thing) => "(:Thing)"', () => {
    const p = g.node(undefined, ['Thing']);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('(:Thing)');
  });
  it('shows a node with record, ({k:"v"}) => "({k:`v`})"', () => {
    const record = g.objectToRecord({ k: g.string('v') });
    const p = g.node(undefined, undefined, record);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('({k:`v`})');
  });
  it('shows a fully specified node, (n:Thing {k:"v"}) => "(n:Thing {k:`v`})"', () => {
    const record = g.objectToRecord({ k: g.string('v') });
    const p = g.node('n', ['Thing'], record);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('(n:Thing {k:`v`})');
  });
});
