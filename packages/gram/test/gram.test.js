const { default: gram } = require('..');

describe('gram builder', () => {
  it('can make a node', () => {
    const n = gram.builder.node();
    expect(gram.ast.isGramNode(n)).toBeTruthy();
  });
});

describe('gram parse', () => {
  it('can parse a node "()"', () => {
    const src = `()`;
    const seq = gram.parser.toAST(src);
    const n = seq.children[0];

    expect(gram.ast.isGramSeq(seq)).toBeTruthy();
    expect(gram.ast.isGramNode(n)).toBeTruthy();
  });
});

describe('gram ops', () => {
  it('can extract nodes from a path seq', () => {
    const src = `() () ()-->()`;
    const seq = gram.parser.toAST(src);
    const nodes = gram.ops.nodes(seq);

    expect(nodes.length).toBe(4);
  });
});

describe('gram stringify', () => {
  it('can serialize a parsed node "()"', () => {
    const src = `()`;
    const seq = gram.parser.toAST(src);
    const serialized = gram.stringify.toGram(seq);

    expect(serialized).toBe(src);
  });
});
