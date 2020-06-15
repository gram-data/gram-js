import { GramNode, GramEdge, isGramNode } from './gram-types';

/**
 * Finds left node of an edge.
 *
 * @param edge
 */
export const leftNodeOf = (edge: GramEdge): GramNode => {
  return edge.children[0] as GramNode;
};

/**
 * Finds right node of an edge.
 *
 * @param edge
 */
export const rightNodeOf = (edge: GramEdge): GramNode => {
  const rightHandPathExpression = edge.children[1];
  return isGramNode(rightHandPathExpression) ? rightHandPathExpression : leftNodeOf(rightHandPathExpression);
};

// export const propertyOf = (name: string, ast: Record): Option<RecordValue> => {
//   return ast[name] === undefined ? none : some(ast[name]);
// };

export default {
  leftNodeOf,
  rightNodeOf,
};
