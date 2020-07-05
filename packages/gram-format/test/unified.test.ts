import unified, { CompilerFunction, Plugin } from 'unified';
import { Node as UnistNode } from 'unist';
import { VFile } from 'vfile';

import * as gramTypes from '../src/gram-types';
import * as gramErrors from '../src/gram-errors';
import parse from '../src/gram-parser-plugin';
import stringify from '../src/gram-stringify-plugin';

const mockCompiler: CompilerFunction = (element: UnistNode, file: VFile) => {
  console.log(element, file);
  return 'mock compiler for testing';
};

const testCompilerPlugin: Plugin = function() {
  this.Compiler = mockCompiler;
};

describe('using gram as the Parser for unified()', () => {
  it('accepts an empty node "()" ', () => {
    const src = `()`;
    const processor = unified()
      .use(parse)
      .freeze();
    const result = processor.parse(src) as gramTypes.GramPathSeq;

    expect(gramTypes.isGramPathSequence(result)).toBeTruthy();
    const firstPath = result.children[0];
    expect(gramTypes.isGramNode(firstPath)).toBeTruthy();
  });

  it('rejects a missing close parenthesis in "(" ', () => {
    const src = `(`;
    const processor = unified()
      .use(parse)
      .use(testCompilerPlugin)
      .freeze();
    processor.process(src).then(
      value => {
        fail(`Unexpected process value: ${value}`);
      },
      reason => {
        expect(reason.message).toBe(gramErrors.INCOMPLETE_PARSE);
      }
    );
  });

  it('rejects an unexpected square bracket in "(]" ', () => {
    const src = `(]`;
    const processor = unified()
      .use(parse)
      .use(testCompilerPlugin)
      .freeze();
    processor.process(src).then(
      value => {
        console.log(value);
      },
      reason => {
        expect(reason.message).toMatch(gramErrors.SYNTAX_ERROR);
        expect(reason.location.start.line).toBe(1);
        expect(reason.location.start.column).toBe(2);
      }
    );
  });
});

describe('using gram as the Parser and Compiler for unified()', () => {
  it('returns a noce named "(n)" ', () => {
    const src = `(n)`;
    const processor = unified()
      .use(parse)
      .use(stringify)
      .freeze();
    processor.process(src).then(
      value => {
        expect(value.contents).toBe(src);
      },
      reason => {
        fail(reason.message);
      }
    );
  });
});
