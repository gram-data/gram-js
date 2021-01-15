import { Plugin, Transformer } from 'unified';
import { Node as UnistNode } from 'unist';

// import {VFile} from 'vfile'

import { isGramPath } from '@gram-data/gram-ast';
import { alphabets } from './identity-alphabets';
import { IDGenerator } from './generator-type';
import { counterIDGenerator } from './counter-generator';
import { nanoidGenerator } from './nanoid-generator';

const visit = require('unist-util-visit');

interface IdentityPluginSettings {
  generator: 'counter' | 'nanoid';
  alphabet?: string;
  prefix?: string;
}

const defaultSettings = {
  generator: 'counter',
  alphabet: alphabets.base58,
  prefix: undefined,
};

export const gramIdentityPlugin: Plugin<IdentityPluginSettings[]> = (
  settings: IdentityPluginSettings
) => {
  const s = { ...defaultSettings, ...settings };

  const identification: Transformer = (tree: UnistNode) => {
    let generator: IDGenerator;
    switch (s.generator) {
      case 'nanoid':
        generator = nanoidGenerator(s.alphabet, 21, s.prefix);
        break;
      case 'counter':
      default:
        generator = counterIDGenerator(s.prefix);
    }

    visit(tree, (element: UnistNode) => {
      if (isGramPath(element)) {
        element.id = element.id || generator.generate();
      }
    });
  };

  return identification;
};

export default gramIdentityPlugin;
