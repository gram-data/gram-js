import { Plugin, Transformer } from 'unified';
import { Node as UnistNode } from 'unist';

// import {VFile} from 'vfile'

import { isGramPathlike } from '@gram-data/gram-ast';
import { shortID } from './gram-identity';
const visit = require('unist-util-visit');

interface IdentityPluginSettings {
  kind?: 'numeric' | 'shortid';
}

const defaultSettings: IdentityPluginSettings = {
  kind: 'numeric',
};

const gramIdentityPlugin: Plugin<IdentityPluginSettings[]> = (
  s: IdentityPluginSettings = defaultSettings
) => {
  const mergedSettings = { ...defaultSettings, ...s };

  const identification: Transformer = (tree: UnistNode) => {
    let counter = 0;
    visit(tree, (element: UnistNode) => {
      if (isGramPathlike(element)) {
        switch (mergedSettings.kind) {
          case 'numeric':
            element.id = element.id || `${counter++}`;
            break;
          case 'shortid':
            element.id = element.id || shortID();
            break;
        }
      }
    });
  };

  return identification;
};

export default gramIdentityPlugin;
