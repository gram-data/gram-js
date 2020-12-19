/**
 * # Gram AST Types
 *
 * References:
 *
 * - [unist](https://github.com/syntax-tree/unist) - Universal Synax Tree
 * - [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
 * @packageDocumentation
 */

import {
  Parent as UnistParent,
  Literal as UnistLiteral,
  Node as UnistNode,
} from 'unist';
import * as tokens from './gram-tokens';

export { tokens };

/**
 * A GramSeq is a sequence of paths.
 *
 */
export interface GramSeq extends UnistParent {
  /**
   * Type discriminator for this AST element, aways 'seq'.
   */
  type: 'seq';

  children: GramPath[];
}

/**
 * Type guard for GramSeq.
 *
 * @param o any object
 */
export const isGramSeq = (o: any): o is GramSeq => !!o.type && o.type === 'seq';

///////////////////////////////////////////////////////////////////////////////
// Path-like types...

/**
 * GramPath is either empty, or the composition of two paths.
 */
export interface GramPath extends UnistParent {
  /**
   * Type discriminator for this AST element, always 'path'.
   */
  type: 'path';

  /**
   * An identifier for the path.
   *
   * For example, '1' in `()-[1]->()` or 'a' in `(a)`
   */
  id?: string;

  /**
   * The kind of path composition.
   */
  kind?: PathKind;

  /**
   * Labels are used to qualify a path.
   *
   * For example, 'Aye' in `(:Aye)` or 'KNOWS' in `(a)-[:KNOWS]->(b)`
   */
  labels?: string[];

  /**
   * The data content of the path.
   */
  record?: GramRecord;

  /**
   * The children are the path members which the path composed.
   *
   * The 'children' field is compatible with generic AST.
   *
   * Either:
   * - no children
   * - a single child with an implied RHS empty path
   * - two children which are composed into a path
   */
  children: [] | [GramPath] | [GramPath, GramPath];
}

/**
 * Type guard for a Path.
 *
 * @param o any object
 */
export const isGramPath = (o: any): o is GramPath =>
  !!o.type && o.type === 'path';

/**
 * Constant identity for empty paths: `ø`.
 */
export const EMPTY_PATH_ID = 'ø';

/**
 * A GramEmptyPath is an empty path with no children,
 * no labels, and no record
 * but a unique singleton identity of {@link EMPTY_PATH_ID}.
 */
export interface GramEmptyPath extends GramPath {
  id: typeof EMPTY_PATH_ID;

  labels: undefined;

  record: undefined;

  children: [];
}

/**
 * Type guard for GramEmptyPath.
 *
 * @param o any object
 */
export const isGramEmptyPath = (o: any): o is GramEmptyPath =>
  isGramPath(o) && o.id === EMPTY_PATH_ID;

/**
 * A GramNode is a special case of a path composed of two
 * empty paths, which is equivalent to having no children.
 */
export interface GramNode extends GramPath {
  /**
   * Optimized to no children, though understood
   * to have two empty paths as children.
   */
  children: [];
}

/**
 * Type guard for GramNode.
 *
 * @param o any object
 */
export const isGramNode = (o: any): o is GramNode =>
  isGramPath(o) &&
  o.children &&
  o.children.length === 0 &&
  o.id !== EMPTY_PATH_ID;

/**
 * A GramEdge is a special case of a path composed of
 * two GramNodes.
 *
 */
export interface GramEdge extends GramPath {
  /**
   * The adjacent Nodes of the Edge, known as "children" in the AST.
   *
   * children[0] is the 'left' Node
   * children[1] is the 'right' Node
   */
  children: [GramNode, GramNode];
}

/**
 * Type guard for GramEdge.
 *
 * @param o any object
 */
export const isGramEdge = (o: any): o is GramEdge =>
  isGramPath(o) &&
  o.kind !== undefined &&
  o.kind !== 'pair' &&
  o.children !== undefined &&
  o.children.every(child => isGramNode(child));

/**
 * Kind of path which forms a graph relationship.
 *
 * One of:
 *
 * - left   `(a)<--(b)`
 * - right  `(a)-->(b)`
 * - either `(a)--(b)`
 *
 */
export type RelationshipKind = 'left' | 'right' | 'either';

/**
 * Kind of path which combines two paths together
 * without implying any semantics.
 *
 * One of:
 *
 * - pair  `(a),(b)`
 *
 */
export type CombinationKind = 'pair';

/**
 * PathKind describes the nature of the
 * path composition.
 *
 * One of:
 *
 * - RelationshipKind: 'left', 'right', 'either'
 * - CombinationKind:  `pair`
 */
export type PathKind = RelationshipKind | CombinationKind;

/**
 * GramPathlike is a discriminated union of GramPath with
 * its two primary specializations, GramNode and GramEdge.
 */
export type GramPathlike = GramPath | GramNode | GramEdge;

///////////////////////////////////////////////////////////////////////////////
// Records...

/**
 * GramRecordValue is a union of literals, literal arrays and nested records.
 * This forms a familiar OO-style structure.
 */
export type GramRecordValue = GramLiteral | GramRecord | GramRecordValue[];

/**
 * A GramRecord is a map of name/value pairs.
 *
 */
export type GramRecord = Map<string, GramRecordValue>; // { [key: string]: GramRecordValue };

/**
 * A type guard to narrow a GramRecordValue to a GramRecord.
 *
 * Warning: this is not a runtime guarantee
 *
 * @param v any GramRecordValue
 */
export const isGramRecord = (v: any): v is GramRecord =>
  typeof v == 'object' && v instanceof Map;

export const isGramLiteralArray = (v: GramRecordValue): v is GramLiteral[] =>
  Array.isArray(v) && isGramLiteral(v[0]);

/**
 * A GramProperty is a name/value pair.
 */
export interface GramProperty extends UnistNode {
  /**
   * Type discriminator for this AST element, always 'property'.
   */
  type: 'property';

  /**
   * The property name.
   */
  name: string;

  /**
   * The property value. Either a single literal, an array of literals, or a GramRecord.
   */
  value: GramRecordValue;
}

/**
 * Type guard for GramProperty.
 *
 * @param o any object
 */
export const isGramProperty = (o: any): o is GramProperty =>
  !!o.type && o.type === 'property';

/**
 * Base interface for literals, all of which
 * only provide textual value representations.
 *
 */
interface TextLiteral extends UnistLiteral {
  value: string;
}

/**
 * Discrimination union of all possible literals.
 */
export type GramLiteral =
  | BooleanLiteral
  | StringLiteral
  | TaggedTextLiteral
  | IntegerLiteral
  | MeasurementLiteral
  | DecimalLiteral
  | HexadecimalLiteral
  | OctalLiteral;

/**
 * Type guard for GramLiteral.
 *
 * @param o any object
 */
export const isGramLiteral = (o: any): o is GramLiteral =>
  !!o.type && !!o.value && o.type !== 'property';

/**
 * Represents a boolean literal, like `true` or `false`.
 */
export interface BooleanLiteral extends TextLiteral {
  /**
   * Represents this variant of a Literal.
   */
  type: 'boolean';

  value: 'true' | 'false';
}

/**
 * Type guard for BooleanLiteral.
 *
 * @param o any object
 */
export const isBooleanLiteral = (o: any): o is TextLiteral =>
  !!o.type && !!o.value && o.type === 'boolean';

/**
 * Represents a string literal, like "hello".
 */
export interface StringLiteral extends TextLiteral {
  /**
   * Represents this variant of a Literal.
   */
  type: 'string';
}

/**
 * Type guard for StringLiteral.
 *
 * @param o any object
 */
export const isStringLiteral = (o: any): o is TextLiteral =>
  !!o.type && !!o.value && o.type === 'string';

/**
 * Represents an integer number, like 235276234.
 * Note: there is no explicit min or max value.
 */
export interface IntegerLiteral extends TextLiteral {
  type: 'integer';
}

/**
 * Type guard for IntegerLiteral.
 *
 * @param o any object
 */
export const isIntegerLiteral = (o: any): o is IntegerLiteral =>
  !!o.type && !!o.value && o.type === 'integer';

/**
 * Represents an decimal number, like 3.1495.
 * Note: there is no explicit min or max value.
 */
export interface DecimalLiteral extends TextLiteral {
  type: 'decimal';
}

/**
 * Type guard for DecimalLiteral.
 *
 * @param o any object
 */
export const isDecimalLiteral = (o: any): o is DecimalLiteral =>
  !!o.type && !!o.value && o.type === 'decimal';

/**
 * Represents an integer expressed in hexadecimal, like 0xc0d3.
 *
 * The prefix `0x` signifies a hexadecimal value to follow.
 */
export interface HexadecimalLiteral extends TextLiteral {
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
export interface OctalLiteral extends TextLiteral {
  type: 'octal';
}

/**
 * Type guard for OctalLiteral.
 *
 * @param o any object
 */
export const isOctalLiteral = (o: any): o is OctalLiteral =>
  !!o.type && !!o.value && o.type === 'octal';

/**
 * Represents a decimal with units, like 12.4px or 42.0mm
 */
export interface MeasurementLiteral extends TextLiteral {
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

///////////////////////////////////////
// Tagged text literals

export type TaggedLiteral =
  | DateLiteral
  | TimeLiteral
  | DateTimeLiteral
  | TimeIntervalLiteral
  | DurationLiteral
  | WellKnownTextLiteral
  | UriLiteral;
/**
 * Represents a string value with a format indicated by a "tag".
 *
 * Some well-known tags:
 * - `md\`# Hello World\``
 * - `html\`<h1>Hello World</h1>\``
 * - `date\`2020-07-14```
 * - `time\`17:35:42\``
 * - `uri\`https://gram-data.github.io\`
 * - `wkt\`POINT(-83.123 42.123)\``
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals | Wikipedia Template literals}
 */
export interface TaggedTextLiteral extends TextLiteral {
  type: 'tagged';

  /**
   * The tag prefix of the string value.
   */
  tag: string;
}

/**
 * Type guard for TaggedTextLiteral.
 *
 * @param o any object
 */
export const isTaggedLiteral = (o: any): o is TaggedLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged';

/**
 * Represents an ISO8601 calendar date, like `2020-02-02`.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates | Wikipedia ISO8601 Caelndar dates}
 */
export interface DateLiteral extends TaggedTextLiteral {
  tag: 'date';
}

/**
 * Type guard for DateLiteral.
 *
 * Note: this does not validate the text representation.
 *
 * @param o any object
 */
export const isDateLiteral = (o: any): o is DateLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'date';

/**
 * Represents an ISO8601 time, like `13:47:30`.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601#Times | Wikipedia ISO8601 Times}
 */
export interface TimeLiteral extends TaggedTextLiteral {
  tag: 'time';
}

/**
 * Type guard for TimeLiteral.
 *
 * Note: this does not validate the text representation.
 *
 * @param o any object
 */
export const isTimeLiteral = (o: any): o is TaggedTextLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'time';

/**
 * Represents an ISO8601 date-time, like `2007-04-05T14:30Z` which is
 * a date followed by a time, separated by a 'T'.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations | Wikipedia ISO8601 Date and time}
 */
export interface DateTimeLiteral extends TaggedTextLiteral {
  tag: 'datetime';
}

/**
 * Type guard for DateTimeLiteral.
 *
 * Note: this does not validate the text representation.
 *
 * @param o any object
 */
export const isDateTimeLiteral = (o: any): o is DateTimeLiteral =>
  !!o.type &&
  !!o.value &&
  !!o.tag &&
  o.type === 'tagged' &&
  o.tag === 'datetime';

/**
 * Represents an ISO8601 duration, like `P23DT23H`.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601#Durations | Wikipedia ISO8601 Durations}
 */
export interface DurationLiteral extends TaggedTextLiteral {
  tag: 'duration';
}

/**
 * Type guard for DurationLiteral.
 *
 * Note: this does not validate the text representation.
 *
 * @param o any object
 */
export const isDuration = (o: any): o is DurationLiteral =>
  !!o.type &&
  !!o.value &&
  !!o.tag &&
  o.type === 'tagged' &&
  o.tag === 'duration';

/**
 * Represents an ISO8601 time interval, like `2007-03-01T13:00:00Z/2008-05-11T15:30:00Z`.
 *
 * This can also represent a repeating interval.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601#Time_intervals | Wikipedia ISO8601 Time_intervals}
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals | Wikipedia ISO8601 Repeating_intervals}
 */
export interface TimeIntervalLiteral extends TaggedTextLiteral {
  tag: 'interval';
}

/**
 * Type guard for TimeIntervalLiteral.
 *
 * Note: this does not validate the text representation.
 *
 * @param o any object
 */
export const isTimeInterval = (o: any): o is TimeIntervalLiteral =>
  !!o.type &&
  !!o.value &&
  !!o.tag &&
  o.type === 'tagged' &&
  o.tag === 'interval';

/**
 * Represents a WKT 2 geospatial value, like `POINT(-83.123 42.123)`
 *
 * @see {@link http://docs.opengeospatial.org/is/18-010r7/18-010r7.html | Opengeospatial WKT}
 * @see {@link https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry | Wikipedia Well-known text geometry}
 */
export interface WellKnownTextLiteral extends TaggedTextLiteral {
  tag: 'wkt';
}

/**
 * Type guard for WellKnownTextLiteral.
 *
 * @param o any object
 */
export const isWellKnownTextLiteral = (o: any): o is WellKnownTextLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'wkt';

/**
 * Represents a well-formed URI.
 *
 * ## Some examples:
 *
 * ### `geo`
 *
 * > A 'geo' URI identifies a physical location in a two- or three-dimensional
 * > coordinate reference system in a compact, simple, human-readable, and
 * > protocol-independent way.
 *
 * ```
 * uri`geo:39.282495,-76.594709`
 * ```
 *
 * @see {@link https://tools.ietf.org/html/rfc5870 | IETF RFC5870 }
 *
 * ### `plus`
 *
 * > A 'plus' URI identifies a physical location encoded as
 * > Open Location Code, a "plus code".
 *
 * ```
 * uri`plus:7CJ4+W4 Baltimore, MD`
 * ```
 *
 * @see {@link https://github.com/google/open-location-code | Open Location Code }
 *
 * ### `h3`
 *
 * > An 'h3' URI identifies a physical location encoded using
 * > the H3 geospatial indexing system, a multi-precision hexagonal
 * > tiling of the sphere indexed with hierarchical linear indexes.
 *
 * ```
 * uri`h3:8c2aa8c76b11bff`
 * ```
 *
 * @see {@link https://h3geo.org | H3 }
 *
 * ### `http(s)`
 *
 * > Hopefully This Thing Presents Sensibly, a popular scheme used
 * >on the interwebs.
 *
 */
export interface UriLiteral extends TaggedTextLiteral {
  tag: 'uri';
}

/**
 * Type guard for UriLiteral.
 *
 * @param o any object
 */
export const isUriLiteral = (o: any): o is UriLiteral =>
  !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'uri';
