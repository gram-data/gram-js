import unified, { CompilerFunction, Plugin } from 'unified';
import { Node as UnistNode } from 'unist';

import { isGramPath } from '@gram-data/gram-ast';
import { gramParserPlugin } from '@gram-data/gram-parse';

import { gramValuePlugin } from '../src';

const visit = require('unist-util-visit');

// @ts-ignore
const inspect = require('unist-util-inspect');

const mockCompiler: CompilerFunction = () => {
  // console.log(element, file);
  return 'mock compiler for testing';
};

const testCompilerPlugin: Plugin = function() {
  this.Compiler = mockCompiler;
};

const expectAllPathlikeElementsToHaveDataValue = () => {
  return (tree: UnistNode) => {
    // console.log(inspect(tree));
    visit(tree, (element: UnistNode) => {
      if (element && isGramPath(element)) {
        expect(element.data!.value).toBeDefined();
      }
    });
  };
};

const recordValueProcessor = unified()
  .use(gramParserPlugin)
  .use(gramValuePlugin)
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveDataValue);


describe('using the gram-value-plugin', () => {
  it('evaluates text literal booleans', () => {
    const src = `({k:true})`;
    return recordValueProcessor.process(src);
  });
  it('evaluates text literal strings', () => {
    const src = `({k:'v'})`;
    return recordValueProcessor.process(src);
  });
  it('evaluates text literal integers', () => {
    const src = `({k:1})`;
    return recordValueProcessor.process(src);
  });
  it('evaluates text literal decimals', () => {
    const src = `({k:1.2})`;
    return recordValueProcessor.process(src);
  });
  it('evaluates text literal hexadecimals', () => {
    const src = `({k:0xC001})`;
    return recordValueProcessor.process(src);
  });
  it('evaluates text literal dates', () => {
    const src = '({k:date`2020-02-02`})';
    return recordValueProcessor.process(src);
  });

});
