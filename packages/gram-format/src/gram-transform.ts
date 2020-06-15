import { GramPathlikeElement, GramNode, GramEdge, GramLeaf, isGramNode, GramLiteral, GramPathlike } from './gram-types';
import { shortID } from './gram-identity';
import { node } from './gram-builder';

const visit = require('unist-util-visit');

export const merge = <T extends GramLeaf>(target: T, source: T) => {
  if (isGramNode(target) && isGramNode(source)) {
    return node(
      source.id || target.id,
      [...(source.labels || []), ...(target.labels || [])],
      Object.assign(target.record || {}, source.record || {})
    );
  }

  return target;
};

export const values = (from: GramLiteral[]) => from.map(literal => literal.value);

/**
 * Folds over node-type ast elements with an identity-based merge.
 * The result is a set of all nodes, each with the most recent labels
 * and record values.
 *
 * @param ast the root of the ast in which to find nodes
 */
export const mergeNodes = (ast: GramPathlikeElement): GramNode[] => {
  const nodeMap = new Map<string, GramNode>();
  visit(ast, 'node', (n: GramNode) => {
    const nodeId = identify(n, shortID);
    const existingNode = nodeMap.get(nodeId) || node();
    nodeMap.set(nodeId, merge(existingNode, n));
  });
  return Array.from(nodeMap.values());
};

export const mergeEdges = (ast: GramPathlikeElement): GramEdge[] => {
  const edgeMap = new Map<string, GramEdge>();
  visit(ast, 'edge', (n: GramEdge) => {
    edgeMap.set(identify(n, shortID), n);
  });
  return Array.from(edgeMap.values());
};

/**
 *
 * @param root
 * @param idTransformer
 */
// export const reidentify = (root: GramParent, idTransformer: (n: Node) => Option<string>): GramParent => {
//   const mappedId = new Map<string, string>();
//   visit(root, 'node', (n: Node) => {
//     const nodeId = n.id;
//     if (nodeId) {
//       const transformedId = idEncoder(mappedId.get(nodeId) || getOrElse(() => nodeId)(idTransformer(n)));
//       mappedId.set(nodeId, transformedId);
//       Object.assign(n, { id: transformedId });
//     }
//   });
//   return root;
// };

export const identify = (e: GramPathlike, idGenerator: (e: GramPathlike) => string): string => {
  e.id = e.id || idGenerator(e);
  return e.id;
};

export default {
  mergeNodes,
  mergeEdges,
  identify,
};
