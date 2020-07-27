import unified, { CompilerFunction, Plugin } from 'unified';
import { Node as UnistNode } from 'unist';

import { tokens, isGramPathlike } from '@gram-data/gram-ast';

import { gramParserPlugin } from '@gram-data/gram-parse';

import { gramIdentityPlugin } from '../src';

const visit = require('unist-util-visit');

const inspect = require('unist-util-inspect');

const mockCompiler: CompilerFunction = () => {
  // console.log(element, file);
  return 'mock compiler for testing';
};

const testCompilerPlugin: Plugin = function() {
  this.Compiler = mockCompiler;
};

const expectAllPathlikeElementsToHaveId = () => {
  return (tree: UnistNode) => {
    console.log(inspect(tree));
    visit(tree, (element: UnistNode) => {
      if (element && isGramPathlike(element)) {
        expect(tokens.isValidIdentifier(element.id)).toBeTruthy();
      }
    });
  };
};

const defaultProcessor = unified()
  .use(gramParserPlugin)
  .use(gramIdentityPlugin)
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveId);

const shortIdProcessor = unified()
  .use(gramParserPlugin)
  .use(gramIdentityPlugin, { kind: 'shortid' })
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveId);

describe('using the gram-identity-plugin with default settings', () => {
  it('adds identity to an empty node "()" ', () => {
    const src = `()`;
    return defaultProcessor.process(src);
  });
  it('adds identity to an empty edge and its nodes "()-->()" ', () => {
    const src = `()-->()`;
    return defaultProcessor.process(src);
  });

  it('adds identity to a paths "[:PreservedPath ()-->()]" ', () => {
    const src = `[:PreservedPath ()-->()]`;
    return defaultProcessor.process(src);
  });
});

describe('using the gram-identity-plugin with shortid identifiers', () => {
  it('adds identity to an empty node "()" ', () => {
    const src = `()`;
    return shortIdProcessor.process(src);
  });
  it('adds identity to an empty edge and its nodes "()-->()" ', () => {
    const src = `()-->()`;
    return shortIdProcessor.process(src);
  });

  it('adds identity to a paths "[:PreservedPath ()-->()]" ', () => {
    const src = `[:PreservedPath ()-->()]`;
    return shortIdProcessor.process(src);
  });
});
