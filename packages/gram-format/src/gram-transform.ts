import { Option, getOrElse } from 'fp-ts/lib/Option';

import { GramParent, Node, GramAstStructure } from './gram-ast';
import { idEncoder } from './gram-identity';
const visit = require('unist-util-visit');

/**
 *
 * @param root
 * @param idTransformer
 */
export const reidentify = (root: GramParent, idTransformer: (n: Node) => Option<string>): GramParent => {
  const mappedId = new Map<string, string>();
  visit(root, 'node', (n: Node) => {
    const nodeId = n.id;
    if (nodeId) {
      const transformedId = idEncoder(mappedId.get(nodeId) || getOrElse(() => nodeId)(idTransformer(n)));
      mappedId.set(nodeId, transformedId);
      Object.assign(n, { id: transformedId });
    }
  });
  return root;
};

export const identify = (root: GramParent, idGenerator: (e: GramAstStructure) => string) => {
  visit(root, ['node', 'edge'], (e: GramAstStructure) => {
    if (!e.hasOwnProperty('id')) {
      e.id = idGenerator(e);
    }
  });
};

export default {
  reidentify,
};
