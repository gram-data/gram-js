import nearley, { Parser } from 'nearley';
import { toAST } from '../src';
import {
  isGramNode,
  isGramPath,
} from '@gram-data/gram-ast';
import { Node } from 'unist';

import grammar from '../src/gram-grammar';


const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  const DEBUG = false;
  if (DEBUG) console.log(inspect(ast));
};

export const rawParse = (text: string): Parser => {
  const nearleyParser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar)
  );
  return nearleyParser.feed(text);
};

describe('parsing path annotation (composition with an implied ø rhs)', () => {
  it('[p (n)] ', () => {
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

  it('[p [n]]', () => {
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

  it('[p (n) ] with whitespace before the closing "]"', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId}) ]`;
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

  it.each`
    gram
    ${'[()]'}
    ${'[() ]'}
    ${'[ ()]'}
    ${'[p()]'}
    ${'[p ()]'}
    ${'[ p ()]'}
    ${'[:Path()]'}
    ${'[:Path ()]'}
    ${'[ :Path()]'}
    ${'[p:Path()]'}
    ${'[p:Path ()]'}
    ${'[ p:Path()]'}
    ${'[ p :Path ()]'}
    ${'[p:Path{k:1}()]'}
    ${'[p:Path{k:1} ()]'}
    ${'[ p:Path{k:1}()]'}
    ${'[ p:Path{k:1} ()]'}
    ${'[ p:Path {k:1} ()]'}
    ${'[ p :Path {k:1} ()]'}
    ${'(),()'}
    ${'(), ()'}
    ${'(),() '}
  `('$gram is unambiguous', ({ gram }) => {
    const parsed = rawParse(gram);
    // console.dir(parsed.results);
    // show(parsed.results[0])
    expect(parsed).toBeDefined();
    expect(parsed.results).toHaveLength(1);
  });


  it('tolerates linebreaks', () => {
    const gram = `
    (), 
    () ()
    ()
    (
      
    )
    `
    const parsed = rawParse(gram);
    // console.dir(parsed.results);
    // show(parsed.results[0])
    expect(parsed).toBeDefined();
    expect(parsed.results).toHaveLength(1);
  });

});
