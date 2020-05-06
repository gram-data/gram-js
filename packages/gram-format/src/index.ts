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

const parser = () => {
  return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
};

export { ast, tokens, builder, find, identity };

export default {
  ast,
  builder,
  tokens,
  find,
  parser,
  stringify,
  profile,
  reporter,
  transform,
  identity,
};
