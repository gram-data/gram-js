import { GramPath } from '@gram-data/gram-ast';
import * as g from '@gram-data/gram-builder';
import { stringify } from '../../src/stringify';

// const inspect = require('unist-util-inspect');

describe('gram stringify lists', () => {
  it('shows node lists, [(a),(b),(c)] => "(a) (b) (c)"', () => {
    const p: GramPath[] = ['a', 'b', 'c'].map(id => g.node(id));
    // console.log(inspect(p));
    expect(stringify(p[0])).toBe('(a)');
  });
  // it('shows identified edges, ()-[e]-() => "()-[e]-()"', () => {
  //   const p = g.edge([g.node(), g.node()], 'either', 'e');
  //   // console.log(inspect(p));
  //   expect(stringify(p)).toBe('()-[e]-()');
  // });
});
