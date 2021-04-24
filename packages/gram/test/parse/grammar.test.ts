import nearley, { Parser } from 'nearley';

import grammar from '../../src/parse/gram-grammar';

import { Node } from 'unist';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

export const rawParse = (text: string): Parser => {
  const nearleyParser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar)
  );
  return nearleyParser.feed(text);
};

describe('parsing', () => {
  it.each`
    gram
    ${'()'}
    ${'(1:First)'}
    ${'(1{kind:"ordinal"})'}
    ${'(1 {kind:"ordinal"})'}
    ${'(1:First{kind:"ordinal"})'}
    ${'(1:First {kind:"ordinal"})'}
  `('$gram is unambiguous', ({ gram }) => {
    const parsed = rawParse(gram);
    // console.dir(parsed.results);
    // show(parsed.results[0])
    expect(parsed).toBeDefined();
    expect(parsed.results).toHaveLength(1);
  });

  it('[]', () => {
    const src = `[]`;
    const parsed = rawParse(src);
    // console.dir(parsed.results);
    // show(parsed.results[0])
    expect(parsed).toBeDefined();
    expect(parsed.results).toHaveLength(1);
  });
});

it('(a)-->(b),(a)-->(c)', () => {
  const src = `(a)-->(b),(a)-->(c)`;
  const parsed = rawParse(src);
  // console.dir(parsed.results);
  // show(parsed.results[0])
  expect(parsed).toBeDefined();
  expect(parsed.results).toHaveLength(1);
});
