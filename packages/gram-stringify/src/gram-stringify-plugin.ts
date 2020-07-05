import { CompilerFunction, Plugin } from 'unified';
import { Node as UnistNode } from 'unist';
// import {VFile} from 'vfile'

import { isGramPathlike } from '@gram-data/gram-ast';

import stringify from './gram-stringify';

const stringifyCompiler: CompilerFunction = (element: UnistNode) => {
  if (isGramPathlike(element)) {
    return stringify(element);
  } else {
    return `Don't know how to stringify "${element.type}" nodes`;
  }
};

const gramStringifyPlugin: Plugin = function() {
  this.Compiler = stringifyCompiler;
};

export default gramStringifyPlugin;
