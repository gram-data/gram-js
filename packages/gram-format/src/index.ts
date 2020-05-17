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

import * as ast from './gram-ast';

const makeParser = () => {
  return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
};

export { ast, tokens, builder, find, identity, makeParser, reporter, stringify, profile, transform };

export default {
  ast,
  builder,
  tokens,
  find,
  makeParser,
  stringify,
  profile,
  reporter,
  transform,
  identity,
};
