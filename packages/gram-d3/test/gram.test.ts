import gram from '@gram-data/gram-format';

describe('Gram', () => {
  it('parses text into an ast', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    expect(gram.ast.isGramPathSequence(parsed)).toBeTruthy();
  });
  it('extracts nodes from the ast', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    const nodes = gram.transform.mergeNodes(parsed);
    expect(nodes).toHaveLength(2);
  });
  it('extracts links from the ast', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    const links = gram.transform.mergeEdges(parsed);
    expect(links).toHaveLength(1);
  });

  it('extracts links that point to nodes', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    const nodes = gram.transform.mergeNodes(parsed);
    const links = gram.transform.mergeEdges(parsed);
    expect(gram.ast.isGramNode(links[0].children[0])).toBeTruthy();
    expect(gram.ast.isGramNode(links[0].children[1])).toBeTruthy();
    expect(links[0].children[0].id).toBe(nodes[0].id);
    expect(links[0].children[1].id).toBe(nodes[1].id);
  });
});
