import unified, { CompilerFunction, Plugin } from 'unified';
import { Node as UnistNode } from 'unist';

import { tokens, isGramPath } from '../../src/ast';

import { gramParserPlugin } from '../../src/parser';

import { gramIdentityPlugin } from '../../src/identity';

const visit = require('unist-util-visit');

// const inspect = require('unist-util-inspect');

const mockCompiler: CompilerFunction = () => {
  // console.log(element, file);
  return 'mock compiler for testing';
};

const testCompilerPlugin: Plugin = function() {
  this.Compiler = mockCompiler;
};

const expectAllPathlikeElementsToHaveId = () => {
  return (tree: UnistNode) => {
    // console.log(inspect(tree));
    visit(tree, (element: UnistNode) => {
      if (element && isGramPath(element)) {
        expect(tokens.isValidIdentifier(element.id)).toBeTruthy();
      }
    });
  };
};

const identifierProcessor = unified()
  .use(gramParserPlugin)
  .use(gramIdentityPlugin)
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveId);


describe('using the gram-identity-plugin with default identifiers', () => {
  it('adds identity to an empty node "()" ', () => {
    const src = `()`;
    return identifierProcessor.process(src);
  });
  it('adds identity to an empty edge and its nodes "()-->()" ', () => {
    const src = `()-->()`;
    return identifierProcessor.process(src);
  });

  it('adds identity to paths "[:PreservedPath ()-->()]" ', () => {
    const src = `[:PreservedPath ()-->()]`;
    return identifierProcessor.process(src);
  });
});
