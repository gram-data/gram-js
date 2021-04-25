import { toAST } from '../../src/parser';
import {
  EMPTY_PATH_ID,
  isGramNode,
  isGramPath,
  isGramEmptyPath,
} from '../../src/ast';
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

