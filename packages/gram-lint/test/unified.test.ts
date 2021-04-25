
import { Parser, Ast } from '@gram-data/gram';

import lint from '../src';

describe('using gram as the Parser for unified()', () => {
  it('accepts an empty node "()" ', () => {
    const src = `()`;
    const result = lint.parse(src) as Ast.GramSeq;

    expect(Ast.isGramSeq(result)).toBeTruthy();
    const firstPath = result.children[0];
    expect(Ast.isGramNode(firstPath)).toBeTruthy();
  });

  it('rejects a missing close parenthesis in "(" ', () => {
    const src = `(`;
    lint.process(src).then(
      value => {
        fail(`Unexpected process value: ${value}`);
      },
      reason => {
        expect(reason.message).toBe(Parser.errors.INCOMPLETE_PARSE);
      }
    );
  });

  it('rejects an unexpected square bracket in "(]" ', () => {
    const src = `(]`;
    lint.process(src).then(
      value => {
        console.log(value);
      },
      reason => {
        expect(reason.message).toMatch(Parser.errors.SYNTAX_ERROR);
        expect(reason.location.start.line).toBe(1);
        expect(reason.location.start.column).toBe(2);
      }
    );
  });
});
