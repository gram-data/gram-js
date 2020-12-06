/**
 * This is the doc comment for gram-builder.
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
  TaggedLiteral,
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
  GramPropertyMap,
  DateLiteral,
  TimeLiteral,
  DurationLiteral,
  PathKind,
  RelationshipKind,
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
 * Build a path
 *
 * @param children
 * @param id
 * @param labels
 * @param record
 */
// export const path = (
//   members: [GramPath] | [GramPath, GramPath],
//   id?: string,
//   labels?: string[],
//   record?: GramRecord
// ): GramPath => ({
//   type: 'path',
//   id,
//   ...(labels && { labels }),
//   ...(record && { record }),
//   children: members,
// });

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
 * Reduces an array of GramProperties into a map.
 *
 * @param properties
 */
export const recordToMap = (properties: GramRecord): GramPropertyMap => {
  return properties.reduce((acc: GramPropertyMap, p: GramProperty) => {
    acc[p.name] = p.value;
    return acc;
  }, {} as GramPropertyMap);
};

/**
 * Unfolds a property map<string,GramRecordValue> into a property list[GramProperty].
 *
 * @param properties
 */
export const mapToRecord = (properties: GramPropertyMap): GramRecord => {
  return Object.entries(properties).reduce((acc: GramRecord, [k, v]) => {
    acc.push(property(k, v));
    return acc;
  }, [] as GramRecord);
};

export const pluck = (properties: GramRecord, path: string) => {
  return properties.reduce((acc, prop) => {
    return prop.name === path ? prop : acc;
  });
};

export const property = (
  name: string,
  value: GramRecordValue
): GramProperty => {
  const Node: GramProperty = {
    type: 'property',
    name,
    value,
  };
  return Node;
};

export const boolean = (value: boolean): BooleanLiteral => ({
  type: 'boolean',
  value: value ? 'true' : 'false',
});

export const string = (value: string): StringLiteral => ({
  type: 'string',
  value,
});

export const tagged = (tag: string, value: string): TaggedLiteral => ({
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
  recordToMap,
  mapToRecord,
};
