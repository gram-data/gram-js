import * as ast from '../src/gram-ast';
import { parse } from '../src/';

describe('parsing nodes', () => {
  it('()', () => {
    const src = '()';
    const result = parse(src);
    expect(ast.isGram(result)).toBeTruthy();
    const firstPath = result.children[0];
    expect(ast.isPath(firstPath)).toBeTruthy();
    const firstElement = firstPath.children[0];
    expect(ast.isNode(firstElement)).toBeTruthy();
  });
  it('(a)', () => {
    const nodeId = 'a';
    const src = `(${nodeId})`;
    const result = parse(src);
    const element = result.children[0].children[0];
    expect(element?.id).toBe(nodeId);
  });
});
