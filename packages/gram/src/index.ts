/**
 * gram package.
 *
 * @packageDocumentation
 */
import * as Ast from './ast';

import {parse, toGram} from './processor';

export * as Builder from './builder';
export * as Identity from './identity';
export * as Ops from './ops';
export * as Parser from './parser';
export * as Stringify from './stringify';
export * as Value from './value';

export {
  Ast
}

const gram = {
  parse,
  toGram
}

export default gram;