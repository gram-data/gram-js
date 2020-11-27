'use strict';
import unified from 'unified';

import {
  Node as UnistNode,
} from 'unist';

import { gramParserPlugin } from '@gram-data/gram-parse';

import * as gramPresetBasic from '..';

const visit = require('unist-util-visit');

const mockCompiler = () => {
  return 'mock compiler for testing';
};

const testCompilerPlugin = function(this: any) {
  this.Compiler = mockCompiler;
};

const expectAllPathlikeElementsToHaveId = () => {
    return (tree:UnistNode) => {
      // console.log(inspect(tree));
      visit(tree, 'path', (element:UnistNode) => {
        if (element) {
          expect(element.id).toBeDefined();
        }
      });
    };
  };

const gramProcessor = unified()
  .use(gramParserPlugin)
  .use(gramPresetBasic)
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveId);

describe('gram-preset-basic', () => {
    it('adds identity to a plain node "()" ', () => {
        const src = `()`;
        const processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
    it('adds identity to all plain nodes "() () ()" ', () => {
        const src = `() () ()`;
        const processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
    it('adds identity to connected nodes and edges"()-->()<--()" ', () => {
        const src = `()-->()<--()`;
        const processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
    it('adds identity to path compositions "[ {composed:true} (a),(b)]" ', () => {
        const src = `[ {composed:true} (a),(b)]`;
        const processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
});


