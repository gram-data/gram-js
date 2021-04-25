import { CompilerFunction, Plugin } from 'unified';
import { Node as UnistNode } from 'unist';
// import {VFile} from 'vfile'

import { isGramPath, isGramSeq } from '../ast';

import stringify from './gram-stringify';

const stringifyCompiler: CompilerFunction = (element: UnistNode) => {
  if (isGramPath(element)) {
    return stringify(element);
  }
  if (isGramSeq(element)) {
    return stringify(element);
  } else {
    throw new Error(`Don't know how to stringify "${element.type}"`);
  }
};

const gramStringifyPlugin: Plugin = function() {
  this.Compiler = stringifyCompiler;
};

export default gramStringifyPlugin;
