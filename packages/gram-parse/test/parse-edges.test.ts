import { toAST } from '../src';
import { isGramNode, isGramEdge } from '@gram-data/gram-ast';
import { Node } from 'unist';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

describe('parsing edges', () => {
  it('()--() relates two nodes, traversable in either direction, with each element assigned a generated id', () => {
    const src = `()--()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.kind).toBe('either');
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()-->() relates two nodes related left to right', () => {
    const src = `()-->()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.kind).toBe('right');
    expect(firstPath.id).toBeUndefined();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()<--() relates two nodes related right to left', () => {
    const src = `()<--()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.kind).toBe('left');
    expect(firstPath.id).toBeUndefined();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('(n)--() relates two nodes, with the left node having a specified id', () => {
    const nodeId = 'n';
    const src = `(${nodeId})--()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(firstPath.children[0]?.id).toBe(nodeId);
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()-[e]-() relates two nodes, with the edge having a specified id', () => {
    const edgeId = 'e';
    const src = `()-[${edgeId}]-()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()--(n) relates two nodes, with the right node having a specified id', () => {
    const nodeId = 'n';
    const src = `()--(${nodeId})`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
    expect(firstPath.children[1]?.id).toBe(nodeId);
  });

  it('()-[e]->() relates two nodes related left to right', () => {
    const edgeId = 'e';
    const src = `()-[${edgeId}]->()`;
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

  it('()<-[e]-() relates two nodes related right to left', () => {
    const edgeId = 'e';
    const src = `()<-[${edgeId}]-()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.kind).toBe('left');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });
});
