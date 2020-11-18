
import * as laws from 'fp-ts-laws';
import { showNumber, showString } from 'fp-ts/lib/Show';
// import * as fc from 'fast-check';

import * as T from 'fp-ts/Tree';
// import { eqNumber } from 'fp-ts/lib/Eq';

// const fcSymbol = fc.uuid().map(t => Symbol.for(t));

// const fcTree = T.make(fc.integer(), [T.make(fc.integer()), T.make(fc.integer())])

describe('Tree instance of Applicative', () => {
  it('obeys the Applicative laws', () => {
    laws.applicative(T.Applicative);
  });
  it('can make trees from integers', () => {
    const singleTree = T.of(1);
    const showIntTree = T.getShow(showNumber);
    expect(showIntTree.show(singleTree)).toBe('make(1)');
  });
  it('can make trees from strings', () => {
    const element = 'knowledge';
    const singleTree = T.of(element);
    const showStringTree = T.getShow(showString);
    expect(showStringTree.show(singleTree)).toBe(`make("${element}")`);
  });
});
