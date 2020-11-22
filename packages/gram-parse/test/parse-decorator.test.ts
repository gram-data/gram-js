import { toAST } from '../src';
import {
  EMPTY_PATH_ID,
  isGramNode,
  isGramPath,
  isGramEmptyPath,
} from '@gram-data/gram-ast';
import { Node } from 'unist';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

describe('parsing empty paths', () => {
  it('[] as an empty path', () => {
    const src = `[]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    const firstPath = result.children[0];
    expect(isGramEmptyPath(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(EMPTY_PATH_ID);
  });
  it('[ø] as an empty path with explicit, exclusive ID for empty paths', () => {
    const src = `[ø]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEmptyPath(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(EMPTY_PATH_ID);
  });

  it('[[]] =~ [ [ø] [ø] ] =~ ()', () => {
    const src = `[[]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
  });

  it('[[[]]] as a path equivalent to [ [ [ø] [ø] ] [ø] ] =~ [ () [ø] ]', () => {
    const src = `[[[]]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
  });
});

describe('parsing nested nodes (implied ø rhs)', () => {
  it('[p (n)] as a defined path containing a single node', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId})]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(isGramNode(nestedPath)).toBeTruthy();
  });

  it('[p [n]] =~ [p (n) [ø]]', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} [${nodeId}]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(isGramNode(nestedPath)).toBeTruthy();
  });

  it('[p (n) []] =~ [p (n) [ø]]', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId}) []]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(isGramNode(nestedPath)).toBeTruthy();
  });
});
