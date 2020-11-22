import { toAST } from '../src';
import { isGramNode, isGramEdge } from '@gram-data/gram-ast';
import { Node } from 'unist';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

describe('parsing path composition', () => {
  it('[e -- () ()] ≅ ()-[e]-(), an edge identified as "e"', () => {
    const edgeId = 'e';
    const src = `[${edgeId} -- () ()]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.kind).toBe('either');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('[e --> () ()] ≅ ()-[e]->(), an edge identified as "e"', () => {
    const edgeId = 'e';
    const src = `[${edgeId} --> () ()]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.kind).toBe('right');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });
});
