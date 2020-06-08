import gram from '@gram-data/gram-format';

describe('Gram', () => {
  it('parses text into an ast', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    expect(gram.ast.isGram(parsed)).toBeTruthy();
  });
  it('extracts nodes from the ast', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    const nodes = gram.transform.foldNodes(parsed);
    expect(nodes).toHaveLength(2);
  });
  it('extracts links from the ast', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    const links = gram.transform.foldEdges(parsed);
    expect(links).toHaveLength(1);
  });

  it('extracts links that point to nodes', () => {
    const src = '(a)-->(b)';
    const parsed = gram.parse(src);
    const nodes = gram.transform.foldNodes(parsed);
    const links = gram.transform.foldEdges(parsed);
    expect(gram.ast.isNode(links[0].children[0])).toBeTruthy();
    expect(gram.ast.isNode(links[0].children[1])).toBeTruthy();
    expect(links[0].children[0]).toBe(nodes[0]);
    expect(links[0].children[1]).toBe(nodes[1]);
  });
});
