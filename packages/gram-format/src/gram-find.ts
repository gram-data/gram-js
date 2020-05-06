import { Node, Edge, Record, RecordValue, isNode } from './gram-ast';
import { Option, none, some } from 'fp-ts/lib/Option';

/**
 * Returns left node of an edge.
 *
 * @param edge
 */
export const leftNodeOf = (edge: Edge): Node => {
  return edge.children[0] as Node;
};

/**
 * Returns right node of an edge.
 *
 * @param edge
 */
export const rightNodeOf = (edge: Edge): Node => {
  const rightHandPathExpression = edge.children[1];
  return isNode(rightHandPathExpression) ? rightHandPathExpression : leftNodeOf(rightHandPathExpression);
};

export const propertyOf = (name: string, ast: Record): Option<RecordValue> => {
  return ast[name] === undefined ? none : some(ast[name]);
};

export default {
  leftNodeOf,
  rightNodeOf,
  propertyOf,
};
