
import * as laws from 'fp-ts-laws';
import * as fc from 'fast-check';

import { eqIdPath, eqNodePath, functorPath, semigroupPath } from '../src';

const fcSymbol = fc.uuid().map(t => Symbol.for(t));

describe('Path obeys Eq laws', () => {
  it('admits equality by identity', () => {
    laws.eq(eqIdPath, fc.record({id:fcSymbol}))
  });
  it('admits equality by node path', () => {
    laws.eq(eqNodePath, fc.record({id:fcSymbol}))
  });
});

describe('Path obeys Functor laws', () => {
  it('should obey Functor laws', () => {
    laws.functor(functorPath)
  });
});

describe('Path obeys Semigroup laws', () => {
  it('should obey Semigroup laws. path concat is associative by node path equality', () => {
    laws.semigroup(semigroupPath, eqNodePath, fc.record({id:fcSymbol}))
  });
});