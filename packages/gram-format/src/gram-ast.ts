import { Parent as UnistParent, Literal as UnistLiteral, Node as UnistNode } from 'unist';

export interface GramChild extends UnistNode {}

export interface GramParent extends UnistParent {
  children: Array<Node | Edge | Path>;
}

export type GramAstStructure = Gram | Path | Node | Edge;

export type RecordValue = Literal | Literal[] | Record;

export type Record = { [key: string]: RecordValue };

export interface GramContentElement {
  /**
   * A scoped unique identifier.
   *
   * For example, '1' in `(1)` or 'a' in `()-[a]->()`
   */
  id?: string;

  /**
   * Labels are content.
   *
   * For example, 'Aye' in (:Aye)
   */
  labels?: string[];

  /**
   * The data content of the element.
   *
   */
  record?: Record;
}

/**
 * A Gram is a stream of paths which aggregate into a graph.
 */
export interface Gram extends GramParent, GramContentElement {
  /**
   * Represents this variant of an AST element.
   */
  type: 'gram';

  children: Array<Path>;
}

/**
 * Path is a tree of Nodes and Edges.
 * The direction of a Path is always left to right
 * regardless of the internal directions of any
 * contained Edges.
 * The leftmost syntactic Node is the head, which
 * will be the topmost Node in the descendent tree.
 */
export interface Path extends GramParent, GramContentElement {
  /**
   * Represents this variant of an AST element.
   */
  type: 'path';

  /**
   * Either a single child that is the root of a path expression,
   * or an empty list.
   *
   */
  children: [Node | Edge] | [];
}

/**
 * Checks whether the ast object looks like a Path.
 *
 * @param o any object
 */
export const isPath = (o: any): o is Path => !!o.type && o.type === 'path';

/**
 * A Node is:
 *
 * - a single unit of structure
 * - a zero length path expression
 * - usually a noun concept
 */
export interface Node extends GramChild, GramContentElement {
  /**
   * Represents this variant of an AST element.
   */
  type: 'node';
}

/**
 * Checks whether the ast object looks like an Node.
 *
 * @param o any object
 */
export const isNode = (o: any): o is Node => !!o.type && o.type === 'node';

/**
 * EdgeDirection describes the orientation between pair within a sequential path expression.
 * A path is always traversed left-to-right, with the left-most node as the head and the
 * rightmost node as the tail.
 *
 * One of:
 *
 * - `<--` left
 * - `-->` right
 * - `--`  none
 * - `,`   pair
 */
export type EdgeDirection = 'left' | 'right' | 'none' | 'pair';

/**
 * Edge is a length 1  path expression.
 */
export interface Edge extends GramParent, GramContentElement {
  /**
   * Represents this variant of an AST element.
   */
  type: 'edge';

  /**
   * The direction within a path.
   */
  direction: EdgeDirection;

  /**
   * children[0] is the 'left' child, always a Node.
   * children[1] is the 'right' child, either a Node or another Edge
   */
  children: [Node, Node | Edge];
}

/**
 * Checks whether the ast object looks like an Edge.
 *
 * @param o any object
 */
export const isEdge = (o: any): o is Edge => !!o.type && !!o.direction && o.type === 'edge';

/**
 * Property is a name paired with a record value.
 */
export interface Property extends GramChild {
  name: string;
  value: RecordValue;
}

/**
 * Checks whether the object looks like an AST literal.
 *
 * @param o any object
 */
export const isLiteral = (o: any): o is Literal => !!o.type && !!o.value;

/**
 * Literal is a value represented as text.
 */
export interface Literal extends UnistLiteral {
  type: string;
  value: string;
}

/**
 * Represents a boolean literal, like `true` or `false`.
 */
export interface BooleanLiteral extends Literal {
  /**
   * Represents this variant of a Literal.
   */
  type: 'boolean';

  value: 'true' | 'false';
}

/**
 * Checks whether the object looks like a boolean literal.
 *
 * @param o any object
 */
export const isBooleanLiteral = (o: any): o is BooleanLiteral => !!o.type && !!o.value && o.type === 'boolean';

/**
 * Represents a string literal, like "hello".
 */
export interface StringLiteral extends Literal {
  /**
   * Represents this variant of a Literal.
   */
  type: 'string';
}

/**
 * Checks whether the object looks like a string literal.
 *
 * @param o any object
 */
export const isStringLiteral = (o: any): o is StringLiteral => !!o.type && !!o.value && o.type === 'string';

/**
 * Represents a tagged string, like md`# Title`
 */
export interface TaggedLiteral extends Literal {
  type: 'tagged';

  /**
   * The tag prefix of the string value.
   */
  tag: string;
}

/**
 * Checks whether the object looks like a tagged literal.
 *
 * @param o any object
 */
export const isTaggedLiteral = (o: any): o is TaggedLiteral => !!o.type && !!o.value && !!o.tag && o.type === 'tagged';

/**
 * Represents an integer number, like 235276234.
 */
export interface IntegerLiteral extends Literal {
  type: 'integer';
}

/**
 * Checks whether the object looks like an integer literal.
 *
 * @param o any object
 */
export const isIntegerLiteral = (o: any): o is IntegerLiteral => !!o.type && !!o.value && o.type === 'integer';

/**
 * Represents a decimal with units, like 12.4px
 */
export interface UnitLiteral extends Literal {
  type: 'unit';

  /**
   * The unit suffix of the decimal value.
   */
  unit: string;
}

/**
 * Checks whether the object looks like a unit literal.
 *
 * @param o any object
 */
export const isUnitLiteral = (o: any): o is UnitLiteral => !!o.type && !!o.value && !!o.unit && o.type === 'unit';

/**
 * Represents an decimal number, like 3.1495.
 */
export interface DecimalLiteral extends Literal {
  type: 'decimal';
}

/**
 * Checks whether the object looks like an decimal literal.
 *
 * @param o any object
 */
export const isDecimalLiteral = (o: any): o is DecimalLiteral => !!o.type && !!o.value && o.type === 'decimal';

/**
 * Represents a number expressed in hexadecimal, like 0xc0d3.
 *
 * The prefix `0x` signifies a hexadecimal value to follow.
 */
export interface HexadecimalLiteral extends Literal {
  type: 'hexadecimal';
}

/**
 * Checks whether the object looks like an hexadecimal literal.
 *
 * @param o any object
 */
export const isHexadecimalLiteral = (o: any): o is HexadecimalLiteral =>
  !!o.type && !!o.value && o.type === 'hexadecimal';

/**
 * Represents a number expressed in octal, like 01372.
 *
 * The prefix `0` signifies octal notation value to follow.
 * Without the leading 0, the number would represent an integer.
 */
export interface OctalLiteral extends Literal {
  type: 'octal';
}

/**
 * Checks whether the object looks like an octal literal.
 *
 * @param o any object
 */
export const isOctalLiteral = (o: any): o is OctalLiteral => !!o.type && !!o.value && o.type === 'octal';

/**
 * Represents a ISO8601 calendar date, like `2020-02-02`.
 * @see https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates
 */
export interface DateLiteral extends TaggedLiteral {
  tag: 'date';
}

/**
 * Checks whether the object looks like a tagged date literal.
 *
 * @param o any object
 */
export const isDateLiteral = (o: any): o is DateLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'date';

/**
 * Represents a WKT 2 geospatial value, like `POINT(-83.123 42.123)`
 * @see http://docs.opengeospatial.org/is/18-010r7/18-010r7.html
 * @see https://github.com/arthur-e/Wicket
 */
export interface GeospatialLiteral extends TaggedLiteral {
  tag: 'geo';
}

/**
 * Checks whether the object looks like a tagged geospatial literal.
 *
 * @param o any object
 */
export const isGeospatialLiteral = (o: any): o is GeospatialLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'geo';
