import * as gramTypes from '../src/gram-types';
import { parse } from '../src';

describe('parsing nodes', () => {
  it('()', () => {
    const src = '()';
    const result = parse(src);
    expect(gramTypes.isGramPathSequence(result)).toBeTruthy();
    const firstPath = result.children[0];
    expect(gramTypes.isGramPath(firstPath)).toBeTruthy();
    const firstElement = firstPath.children[0];
    expect(gramTypes.isGramNode(firstElement)).toBeTruthy();
  });
  it('(a)', () => {
    const nodeId = 'a';
    const src = `(${nodeId})`;
    const result = parse(src);
    const element = result.children[0].children[0];
    expect(element?.id).toBe(nodeId);
  });
});
