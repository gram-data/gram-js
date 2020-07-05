/**
 * # Gram AST Types
 *
 * These AST elements
 *
 * References:
 *
 * - [unist](https://github.com/syntax-tree/unist) - Universal Synax Tree
 * - [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
 * @packageDocumentation
 */

import { Parent as UnistParent, Literal as UnistLiteral, Node as UnistNode } from 'unist';

/**
 * A union type of interfaces which are path-like.
 */
// export type GramPathlike = GramUnit | GramNode | GramEdge | GramPath;

/**
 * Path expressions are compositions of nodes and edges.
 *
 * The ast is a tree of GramNodes and GramEdges.
 * The direction of a Path is always left to right
 * regardless of the internal directions of any
 * contained Edges.
 * The leftmost syntactic Node is the head, which
 * will be the topmost Node in the descendent tree.
 */
export type GramPathlike = GramUnit | GramNode | GramEdge | GramPath;

///////////////////////////////////////////////////////////////////////////////
// Base ast types...

/**
 * Base type for elements which have no children.
 */
export interface GramLeaf extends UnistNode {}

/**
 * The base type for all path-like elements.
 */
export interface GramPathlikeBase extends UnistParent {
  /**
   * A type-scoped unique identifier.
   *
   * For example, 'a' in `()-[a]->()` or '_1' in `(_1)`
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
  record?: GramRecord;

  children: GramPathlike[] | [];
}

///////////////////////////////////////////////////////////////////////////////
// Pathlike types...

/**
 * Identity of all units.
 */
export const UNIT_ID = '0';

/**
 * A GramUnit is an empty path expression which contains no sub-paths and has no identity.
 *
 * - denoted with matching square brackets: `[]`
 * - path equivalence: `[]`
 * - identity: no
 * - children: no
 * - labels: no
 * - record: no
 * - path length: 0
 * - path cardinality: 0
 * - information role: emptiness
 */
export interface GramUnit extends GramPathlikeBase {
  /**
   * Type discriminator for this AST element, always 'unit'.
   */
  type: 'unit';

  id: '0';

  labels: undefined;

  record: undefined;

  children: [];
}

/**
 * Type guard for GramUnit.
 *
 * @param o any object
 */
export const isGramUnit = (o: any): o is GramUnit => !!o.type && o.type === 'unit';

/**
 * A GramNode is the foundation for attached data structures.
 *
 * - denoted with matching square brackets: `()`
 * - path equivalence: `[n] =~ (n)`
 * - identity: yes
 * - children: 0
 * - labels: yes
 * - record: yes
 * - path length: 0
 * - path cardinality: 1
 * - information role: an entity or a noun
 */
export interface GramNode extends GramPathlikeBase {
  /**
   * Type discriminator for this AST element, always 'node'.
   */
  type: 'node';

  /**
   * Always empty.
   */
  children: [];
}

/**
 * Type guard for GramNode.
 *
 * @param o any object
 */
export const isGramNode = (o: any): o is GramNode => !!o.type && o.type === 'node';

/**
 * RelationshipOperator composes path expressions.
 *
 * One of:
 *
 * - left   `(a)<--(b)`
 * - right  `(a)-->(b)`
 * - either `(a)--(b)`
 * - self   `(a) =~ (a)--(a)`
 */
export type RelationshipOperator = 'left' | 'right' | 'either' | 'pair';

/**
 * GramEdge is:
 *
 * - a path expression composing two nodes and a
 * - a path expression of length 1
 * - logically equivalent to an empty path (path with no children) within an enclosing path: `(n) =~ [n []]`
 * - the operand in path expressions
 * - usually a noun concept
 */
export interface GramEdge extends GramPathlikeBase {
  /**
   * Type discriminator for this AST element, always 'edge'.
   */
  type: 'edge';

  /**
   * The direction within a path.
   * A missing direction is assumed to be 'either'.
   */
  direction?: RelationshipOperator;

  /**
   * children[0] is the 'left' child
   * children[1] is the 'right' child
   */
  children: [GramNode, GramNode];
}

/**
 * Type guard for GramEdge.
 *
 * @param o any object
 */
export const isGramEdge = (o: any): o is GramEdge => 'type' in o && 'direction' in o && o.type === 'edge';

/**
 * GramPath contains nodes, edges and other paths that have been composed
 * into a path expression.
 *
 * - denoted with matching, non-empty square brackets: `[id]`
 * - path equivalence: `[]`
 * - identity: yes (required)
 * - children: yes (optional)
 * - labels: yes
 * - record: yes
 * - path length: sum(children[0].length, children[1].length)
 * - path cardinality: nodes().length
 * - information role: data annotation
 */
export interface GramPath extends GramPathlikeBase {
  /**
   * Type discriminator for this AST element, always 'path'.
   */
  type: 'path';

  /**
   * The relationship between the left and right children,
   * or a 'pair' that associates without being navigable.
   */
  direction?: RelationshipOperator | 'pair';

  /**
   * Either a single child that is nested within this path,
   * or two children which are composed into a path.
   *
   */
  children: [GramPathlike] | [GramPathlike, GramPathlike];
}

/**
 * Type guard for a Path.
 *
 * @param o any object
 */
export const isGramPath = (o: any): o is GramPath => !!o.type && o.type === 'path';

/**
 * A GramPathSeq is a sequence of paths.
 *
 */
export interface GramPathSeq extends GramPathlikeBase {
  /**
   * Type discriminator for this AST element, aways 'seq'.
   */
  type: 'seq';

  children: GramPathlike[];
}

/**
 * Type guard for GramPathSequence.
 *
 * @param o any object
 */
export const isGramPathSequence = (o: any): o is GramPathSeq => !!o.type && o.type === 'seq';

export const isGramPathlike = (o:any): o is GramPathlike => (
     isGramUnit(o) 
  || isGramNode(o)
  || isGramEdge(o)
  || isGramPath(o)
  || isGramPathSequence(o)
) 

///////////////////////////////////////////////////////////////////////////////
// Records...

/**
 * GramRecordValues are a union of literals and nested records.
 */
export type GramRecordValue = GramLiteral | GramLiteral[] | GramRecord;

/**
 * A GramRecord is a JSON-like nested data structure.
 */
export type GramRecord = { [key: string]: GramRecordValue };

/**
 * Property is a name paired with a record value.
 */
export interface GramProperty extends GramLeaf {
  /**
   * Type discriminator for this AST element, always 'property'.
   */
  type: 'property';

  /**
   * The property name.
   */
  name: string;

  /**
   * The property value. Either a single literal, an array of literals, or a nested GramRecord.
   */
  value: GramRecordValue;
}

/**
 * Type guard for GramProperty.
 *
 * @param o any object
 */
export const isGramProperty = (o: any): o is GramProperty => !!o.type && o.type === 'property';

/**
 * GramLiteral is a data value represented as plain text.
 */
export interface GramLiteral extends UnistLiteral {
  type: string;
  value: string;
}

/**
 * Type guard for GramPathSequence.
 *
 * @param o any object
 */
export const isLiteral = (o: any): o is GramLiteral => !!o.type && !!o.value;

/**
 * Represents a boolean literal, like `true` or `false`.
 */
export interface BooleanLiteral extends GramLiteral {
  /**
   * Represents this variant of a Literal.
   */
  type: 'boolean';

  value: 'true' | 'false';
}

/**
 * Type guard for GramPathSequence.
 *
 * @param o any object
 */
export const isBooleanLiteral = (o: any): o is BooleanLiteral => !!o.type && !!o.value && o.type === 'boolean';

/**
 * Represents a string literal, like "hello".
 */
export interface StringLiteral extends GramLiteral {
  /**
   * Represents this variant of a Literal.
   */
  type: 'string';
}

/**
 * Type guard for GramPathSequence.
 *
 * @param o any object
 */
export const isStringLiteral = (o: any): o is StringLiteral => !!o.type && !!o.value && o.type === 'string';

/**
 * Represents a tagged string, like md`# Title`
 */
export interface TaggedLiteral extends GramLiteral {
  type: 'tagged';

  /**
   * The tag prefix of the string value.
   */
  tag: string;
}

/**
 * Type guard for GramPathSequence.
 *
 * @param o any object
 */
export const isTaggedLiteral = (o: any): o is TaggedLiteral => !!o.type && !!o.value && !!o.tag && o.type === 'tagged';

/**
 * Represents an integer number, like 235276234.
 */
export interface IntegerLiteral extends GramLiteral {
  type: 'integer';
}

/**
 * Type guard for GramPathSequence.
 *
 * @param o any object
 */
export const isIntegerLiteral = (o: any): o is IntegerLiteral => !!o.type && !!o.value && o.type === 'integer';

/**
 * Represents a decimal with units, like 12.4px or 42.0mm
 */
export interface MeasurementLiteral extends GramLiteral {
  type: 'measurement';

  /**
   * The unit suffix of the decimal value.
   */
  unit: string;
}

/**
 * Type guard for MeasurementLiteral.
 *
 * @param o any object
 */
export const isMeasurementLiteral = (o: any): o is MeasurementLiteral =>
  !!o.type && !!o.value && !!o.unit && o.type === 'measurement';

/**
 * Represents an decimal number, like 3.1495.
 */
export interface DecimalLiteral extends GramLiteral {
  type: 'decimal';
}

/**
 * Type guard for DecimalLiteral.
 *
 * @param o any object
 */
export const isDecimalLiteral = (o: any): o is DecimalLiteral => !!o.type && !!o.value && o.type === 'decimal';

/**
 * Represents an integer expressed in hexadecimal, like 0xc0d3.
 *
 * The prefix `0x` signifies a hexadecimal value to follow.
 */
export interface HexadecimalLiteral extends GramLiteral {
  type: 'hexadecimal';
}

/**
 * Type guard for HexadecimalLiteral.
 *
 * @param o any object
 */
export const isHexadecimalLiteral = (o: any): o is HexadecimalLiteral =>
  !!o.type && !!o.value && o.type === 'hexadecimal';

/**
 * Represents an integer expressed in octal, like 01372.
 *
 * The prefix `0` signifies octal notation value to follow.
 * Without the leading 0, the number would represent an integer.
 */
export interface OctalLiteral extends GramLiteral {
  type: 'octal';
}

/**
 * Type guard for OctalLiteral.
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
 * Type guard for DateLiteral.
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
 * Type guard for GeospatialLiteral.
 *
 * @param o any object
 */
export const isGeospatialLiteral = (o: any): o is GeospatialLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'geo';
