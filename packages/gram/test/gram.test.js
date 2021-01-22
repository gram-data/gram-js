var gram = require('..').default;
var ast = require('@gram-data/gram-ast');

describe('gram parse', () => {
  it('can parse a node "()"', () => {
    const src = `()`;
    const seq = gram.parse(src);
    const n = seq.children[0];

    expect(ast.isGramSeq(seq)).toBeTruthy();
    expect(ast.isGramNode(n)).toBeTruthy();
  });
});

describe('gram toGram', () => {
  it('can serialize a parsed node "(1)"', () => {
    const src = `(1)`;
    const seq = gram.parse(src);
    const serialized = gram.toGram(seq);

    expect(serialized).toBe(src);
  });
});
