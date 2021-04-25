import gram, {Ast} from '..';

describe('gram parse', () => {
  it('can parse a node "()"', () => {
    const src = `()`;
    const seq = gram.parse(src) as Ast.GramSeq;
    const n = seq.children[0];

    expect(Ast.isGramSeq(seq)).toBeTruthy();
    expect(Ast.isGramNode(n)).toBeTruthy();
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
