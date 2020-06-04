import { Option, getOrElse } from 'fp-ts/lib/Option';

import { GramParent, Node, GramAstStructure, Edge } from './gram-ast';
import { idEncoder, shortID } from './gram-identity';
const visit = require('unist-util-visit');

/**
 * Extracts node-type ast elements from a gram ast.
 *
 * @param ast the root of the ast from which nodes will be extracted
 */
export const foldNodes = (ast: GramParent): Node[] => {
  const nodeMap = new Map<string, Node>();
  visit(ast, 'node', (n: Node) => {
    nodeMap.set(identify(n, shortID), n);
  });
  return Array.from(nodeMap.values());
};

export const foldEdges = (ast: GramParent): Edge[] => {
  const edgeMap = new Map<string, Edge>();
  visit(ast, 'edge', (n: Edge) => {
    edgeMap.set(identify(n, shortID), n);
  });
  return Array.from(edgeMap.values());
};

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

export const identify = (e: GramAstStructure, idGenerator: (e: GramAstStructure) => string): string => {
  e.id = e.id || idGenerator(e);
  return e.id;
};

export default {
  foldNodes,
  foldEdges,
  identify,
  reidentify,
};
