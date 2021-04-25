'use strict';
var unified = require('unified')

var gram = require('@gram-data/gram');
var gramParserPlugin = gram.Parser.gramParserPlugin;

var gramPresetBasic = require('..');

var visit = require('unist-util-visit');

var inspect = require('unist-util-inspect');

var mockCompiler = () => {
  return 'mock compiler for testing';
};

var testCompilerPlugin = function() {
  this.Compiler = mockCompiler;
};

var expectAllPathlikeElementsToHaveId = () => {
    return (tree) => {
      // console.log(inspect(tree));
      visit(tree, 'path', (element) => {
        if (element) {
          expect(element.id).toBeDefined();
        }
      });
    };
  };

var gramProcessor = unified()
  .use(gramParserPlugin)
  .use(gramPresetBasic)
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveId);

describe('gram-preset-basic', () => {
    it('adds identity to a plain node "()" ', () => {
        var src = `()`;
        var processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
    it('adds identity to all plain nodes "() () ()" ', () => {
        var src = `() () ()`;
        var processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
    it('adds identity to connected nodes and edges"()-->()<--()" ', () => {
        var src = `()-->()<--()`;
        var processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
    it('adds identity to path compositions "[ {composed:true} (a),(b)]" ', () => {
        var src = `[ {composed:true} (a),(b)]`;
        var processed = gramProcessor.process(src);
        expect(processed).toBeDefined();
    });
});


