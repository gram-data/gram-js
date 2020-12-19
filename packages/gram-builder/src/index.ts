/**
 * gram-builder package.
 *
 * @packageDocumentation
 */

import { Node as UnistNode } from 'unist';
import {
  GramSeq,
  GramPath,
  GramNode,
  GramEdge,
  GramProperty,
  GramRecordValue,
  BooleanLiteral,
  StringLiteral,
  IntegerLiteral,
  DecimalLiteral,
  HexadecimalLiteral,
  OctalLiteral,
  MeasurementLiteral,
  GramRecord,
  GramEmptyPath,
  isGramNode,
  isGramEmptyPath,
  EMPTY_PATH_ID,
  DateLiteral,
  TimeLiteral,
  DurationLiteral,
  PathKind,
  RelationshipKind,
  TaggedTextLiteral,
  isGramLiteral,
  isGramRecord,
} from '@gram-data/gram-ast';

export type Children<T> = T | T[] | (() => T | T[]);

function normalizeChildren<T extends UnistNode>(children?: Children<T>): T[] {
  if (Array.isArray(children)) {
    return children;
  } else if (children instanceof Function) {
    const res = children();
    return normalizeChildren<T>(res);
  } else if (typeof children === 'undefined') {
    return [];
  } else {
    return [children];
  }
}

const dateToYMD = (d: Date) => d.toISOString().slice(0, 10);

const dateToDayOfMonth = (d: Date) => '--' + d.toISOString().slice(5, 10);

/**
 * Build a path sequence that represents a graph.
 *
 * @param paths sequence of paths through history
 * @param id optional reference identifier. The "name" of this graph instance.
 * @param labels optional labels
 * @param record optional graph-level data
 */
export const seq = (
  paths: Children<GramPath>,
  id?: string,
  labels?: string[],
  record?: GramRecord
): GramSeq => ({
  type: 'seq',
  id,
  ...(labels && { labels }),
  ...(record && { record }),
  children: normalizeChildren<GramPath>(paths),
});

export interface PathAttributes {
  id?: string;
  labels?: string[];
  record?: GramRecord;
  kind?: PathKind;
}

/**
 * Reduce a list of paths into a single path composed using the given kind.
 *
 * @param kind the kind to apply to all sub-paths
 * @param pathlist sub-paths to be paired
 * @param baseID the baseID from which path expressions will derive new IDs
 */
export const listToPath = (
  kind: PathKind = 'pair',
  pathlist: GramPath[]
): GramPath => {
  if (pathlist.length > 1) {
    return pathlist
      .slice(0, pathlist.length - 1)
      .reduceRight((acc: GramPath, curr) => {
        return cons([curr, acc], { kind });
      }, pathlist[pathlist.length - 1]);
  } else {
    return pathlist[0];
  }
};

/**
 * Build a path.
 *
 * @param members sub-paths to compose
 * @param attributes attributes
 */
export const cons = (
  members?: [] | [GramPath] | [GramPath, GramPath],
  attributes: PathAttributes = {}
): GramPath => {
  const element: any = {
    type: 'path',
    ...(attributes.id && { id: attributes.id }),
    ...(attributes.labels && { labels: attributes.labels }),
    ...(attributes.record && { record: attributes.record }),
    // children: members ? members.filter(child => child && !isGramEmptyPath(child)) : undefined,
  };
  if (members === undefined) {
    if (element.id && element.id !== EMPTY_PATH_ID) {
      element.children = [];
      return element;
    }
    element.children = undefined;
    return EMPTY_PATH;
  } else if (members.length === 0) {
    if (element.id === EMPTY_PATH_ID) {
      return EMPTY_PATH;
    }
    element.children = [];
    return element as GramNode;
  } else if (members.length === 1) {
    const lhs = members[0];

    if (isGramEmptyPath(lhs)) {
      element.children = [];
      return element as GramNode;
    } else {
      element.children = [lhs];
      return element as GramPath;
    }
  } else if (members.length === 2) {
    if (
      attributes.kind &&
      attributes.kind !== 'pair' &&
      isGramNode(members[0]) &&
      isGramNode(members[1])
    ) {
      element.kind = attributes.kind;
      element.children = [members[0], members[1]];
      return element as GramEdge;
    } else if (isGramEmptyPath(members[0]) && isGramEmptyPath(members[1])) {
      element.kind = attributes.kind;
      element.children = [];
      return element as GramNode;
    }
    element.children = [members[0], members[1]];
  }
  element.kind = attributes.kind || 'pair';
  return element as GramPath;
};

/**
 * Singleton instance of GramEmptyPath
 */
const EMPTY_PATH: GramEmptyPath = {
  type: 'path',
  id: EMPTY_PATH_ID,
  labels: undefined,
  record: undefined,
  children: [],
};

/**
 * Convenience function for retrieving the singleton GramEmptyPath.
 */
export const empty = (): GramEmptyPath => EMPTY_PATH;

/**
 * Build a GramNode.
 *
 * @param id identifier
 * @param labels
 * @param record
 * @param annotation
 */
export const node = (
  id?: string,
  labels?: string[],
  record?: GramRecord
): GramNode => ({
  type: 'path',
  ...(id && { id }),
  ...(labels && { labels }),
  ...(record && { record }),
  children: [],
});

/**
 * Build an Edge.
 *
 * @param children
 * @param kind
 * @param id
 * @param labels
 * @param record
 */
export const edge = (
  children: [GramNode, GramNode],
  kind: RelationshipKind,
  id?: string,
  labels?: string[],
  record?: GramRecord
): GramEdge => ({
  type: 'path',
  id,
  ...(labels && { labels }),
  ...(record && { record }),
  kind,
  children,
});

/**
 * Build a pair
 *
 * @param children
 * @param id
 * @param labels
 * @param record
 */
export const path = (
  kind: PathKind,
  members: [GramPath, GramPath],
  id?: string,
  labels?: string[],
  record?: GramRecord
): GramPath => ({
  type: 'path',
  kind,
  id,
  ...(labels && { labels }),
  ...(record && { record }),
  children: members,
});

/**
 * Build a pair
 *
 * @param children
 * @param id
 * @param labels
 * @param record
 */
export const pair = (
  members: [GramPath, GramPath],
  id?: string,
  labels?: string[],
  record?: GramRecord
): GramPath => path('pair', members, id, labels, record);

/**
 * Create a new, empty GramRecord.
 *
 */
export const emptyRecord = () => new Map<string, GramRecordValue>();

/**
 * Reduces an array of GramProperties into a GramRecord.
 *
 * @param properties
 */
export const propertiesToRecord = (properties: GramProperty[]): GramRecord => {
  return properties.reduce((acc: GramRecord, p: GramProperty) => {
    acc.set(p.name, p.value);
    return acc;
  }, emptyRecord());
};

/**
 * Transforms a plain js object into a GramRecord.
 *
 * @param o
 */
export const objectToRecord = (o: any): GramRecord => {
  return Object.entries(o).reduce((acc: GramRecord, [k, v]) => {
    acc.set(k, propertyValue(v));
    return acc;
  }, emptyRecord());
};

/**
 * Extracts the value from a GramLiteral, if available.
 *
 * @param l
 */
export const getValue = (l: GramRecordValue | undefined) =>
  isGramLiteral(l) ? l.value : undefined;

/**
 * Produces a Lens into a literal value with a GramRecord.
 *
 * @param path
 */
export const getLiteral = (name: string) => {
  return (v: GramRecord) => {
    const l = v.get(name);
    return getValue(l);
  };
};

/**
 * Produces a Lens into a record value with a GramRecord.
 *
 * @param path
 */
export const getRecord = (name: string) => {
  return (r: GramRecord) => {
    const v = r.get(name);
    return isGramRecord(v) ? v : undefined;
  };
};

/**
 * Produces a Lens down into nested GramRecords.
 *
 * ### Examples:
 *
 * Descend using either an array of names, or dot notation.
 *
 * ```
 * const o = g.objectToRecord({a:{b:{c:g.string("value")}}})
 *
 * const getAbc1 = g.getDown(['a','b','c']);
 * const getAbc2 = g.getDown("a.b.c");
 *
 * expect(getAbc1(o)).toStrictEqual(getAbc2(o));
 * ```
 *
 * Descend, then apply a function to extract the text value.
 *
 * ```
 * const o = objectToRecord({a:{b:{c:string("value")}}})
 * const getAbc = getDown("a.b.c", getValue);
 *
 * expect(getAbc(o)).toBe("value");
 * ```
 *
 * @param hierarchy array or dot-notation path to descend
 */
export const getDown = (
  hierarchy: string[] | string,
  f?: (r: GramRecordValue) => any
) => {
  const pathDown = Array.isArray(hierarchy) ? hierarchy : hierarchy.split('.');
  return (r: GramRecord) => {
    const bottom = pathDown.reduce(
      (acc, name) => (isGramRecord(acc) ? acc.get(name) : undefined),
      r as GramRecordValue | undefined
    );
    return bottom && (f ? f(bottom) : bottom);
  };
};

/**
 * Builds a GramProperty from a name
 * @param name
 * @param value
 */
export const property = (name: string, value: any): GramProperty => {
  const Node: GramProperty = {
    type: 'property',
    name,
    value: isGramLiteral(value) ? value : propertyValue(value),
  };
  return Node;
};

export const propertyValue = (value: any): GramRecordValue => {
  if (Array.isArray(value)) {
    return value.map(v => propertyValue(v));
  } else if (typeof value === 'object') {
    if (value instanceof Date) {
      return date(value);
    } else if (isGramLiteral(value)) {
      return value;
    }
    return objectToRecord(value);
  } else {
    switch (typeof value) {
      case 'string':
        return string(value);
      case 'bigint':
        return decimal(value.toString());
      case 'boolean':
        return boolean(value);
      case 'number':
        return decimal(value.toString());
      case 'symbol':
        return string(value.toString());
      default:
        throw new Error(`Unsupported value: ${value}`);
    }
  }
};

export const boolean = (value: boolean): BooleanLiteral => ({
  type: 'boolean',
  value: value ? 'true' : 'false',
});

export const string = (value: string): StringLiteral => ({
  type: 'string',
  value,
});

export const tagged = (tag: string, value: string): TaggedTextLiteral => ({
  type: 'tagged',
  value,
  tag,
});

export const integer = (value: string | number): IntegerLiteral => ({
  type: 'integer',
  value: String(value),
});

export const decimal = (value: string | number): DecimalLiteral => ({
  type: 'decimal',
  value: String(value),
});

export const hexadecimal = (value: string | number): HexadecimalLiteral => ({
  type: 'hexadecimal',
  value: typeof value === 'number' ? value.toString(16) : value,
});

export const octal = (value: string | number): OctalLiteral => ({
  type: 'octal',
  value: typeof value === 'number' ? value.toString(8) : value,
});

export const measurement = (
  unit: string,
  value: string | number
): MeasurementLiteral => ({
  type: 'measurement',
  value: String(value),
  unit,
});

export const year = (value: string | Date): DateLiteral =>
  tagged(
    'date',
    value instanceof Date ? value.getFullYear().toString() : value
  ) as DateLiteral;

export const date = (value: string | Date): DateLiteral =>
  tagged(
    'date',
    value instanceof Date ? dateToYMD(value) : value
  ) as DateLiteral;

export const dayOfMonth = (value: string | Date): DateLiteral =>
  tagged(
    'date',
    value instanceof Date ? dateToDayOfMonth(value) : value
  ) as DateLiteral;

export const time = (value: string | Date): TimeLiteral =>
  tagged(
    'time',
    value instanceof Date ? value.toTimeString() : value
  ) as TimeLiteral;

export const duration = (value: string | Date): DurationLiteral =>
  tagged(
    'duration',
    value instanceof Date
      ? `P${value.getUTCFullYear() -
          1970}Y${value.getUTCMonth()}M${value.getUTCDate()}DT${value.getUTCHours()}H${value.getUTCMinutes()}M${value.getUTCMilliseconds() /
          1000}S`
      : value
  ) as DurationLiteral;

export const flatten = (xs: any[], depth = 1) =>
  xs.flat(depth).filter(x => x !== null);

export default {
  seq,
  empty,
  cons,
  pair,
  listToPath,
  node,
  edge,
  property,
  boolean,
  string,
  tagged,
  integer,
  decimal,
  hexadecimal,
  octal,
  measurement,
  date,
  time,
  duration,
  flatten,
  objectToRecord,
  propertiesToRecord,
  propertyValue,
  fromLiteral: getLiteral,
};
