import { Plugin, Transformer } from 'unified';
import { Node as UnistNode } from 'unist';

import { isGramPath } from '@gram-data/gram-ast';
import { valueOf, valueOfLiteral, LiteralValueEvaluator } from '.';

const visit = require('unist-util-visit');

interface ValuePluginSettings {
  literalValueEvaluator?: LiteralValueEvaluator
}

const defaultSettings = {
  literalValueEvaluator: valueOfLiteral
};

const gramValuePlugin: Plugin<ValuePluginSettings[]> = (
  settings: ValuePluginSettings
) => {
  const s = { ...defaultSettings, ...settings };

  const recordValueEvaluator: Transformer = (tree: UnistNode) => {

    visit(tree, (element: UnistNode) => {
      if (isGramPath(element) && element.record) {
        element.data = Object.assign(element.data || {}, {value: valueOf(element.record, s.literalValueEvaluator)});
      }
    });
  };

  return recordValueEvaluator;
};

export default gramValuePlugin;
