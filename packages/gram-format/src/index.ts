import * as nearley from 'nearley';
import profile from './profile';
import reporter from './reporter';
import stringify from './gram-stringify';
import grammar from './gram-parse';
import builder from './gram-builder';
import find from './gram-find';
import transform from './gram-transform';
import identity from './gram-identity';
import tokens from './gram-tokens';

import * as ast from './gram-types';

const makeParser = () => {
  return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
};

const parse = (src: string): ast.GramPathSeq => {
  const parser = makeParser();
  const parsed = parser.feed(src);
  return parsed.results[0];
};

export { ast, tokens, builder, find, identity, makeParser, parse, reporter, stringify, profile, transform };

export default {
  ast,
  builder,
  tokens,
  find,
  makeParser,
  parse,
  stringify,
  profile,
  reporter,
  transform,
  identity,
};
