const { default: gram, builder, ast, ops } = require('..');

describe('gram builder', () => {
  it('can make a node', () => {
    const n = builder.node();
    expect(ast.isGramNode(n)).toBeTruthy();
  });
});

describe('gram parse', () => {
  it('can parse a node "()"', () => {
    const src = `()`;
    const seq = gram.parse(src);
    const n = seq.children[0];

    expect(ast.isGramSeq(seq)).toBeTruthy();
    expect(ast.isGramNode(n)).toBeTruthy();
  });
});

describe('gram ops', () => {
  it('can extract nodes from a path seq', () => {
    const src = `() () ()-->()`;
    const seq = gram.parse(src);
    const nodes = ops.nodes(seq);

    expect(nodes.length).toBe(4);
  });
});

describe('gram stringify', () => {
  it('can serialize a parsed node "()"', () => {
    const src = `()`;
    const seq = gram.parse(src);
    const serialized = gram.stringify(seq);

    expect(serialized).toBe(src);
  });
});
