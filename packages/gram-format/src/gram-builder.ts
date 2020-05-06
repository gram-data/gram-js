import {
  Gram,
  Path,
  Node,
  Edge,
  Property,
  Literal,
  EdgeDirection,
  BooleanLiteral,
  StringLiteral,
  TaggedLiteral,
  IntegerLiteral,
  DecimalLiteral,
  HexadecimalLiteral,
  OctalLiteral,
  UnitLiteral,
  Record,
} from './gram-ast';
import { Node as UnistNode } from 'unist';

export type Children<T> = T | T[] | (() => T | T[]);

type NodeOrEdge = Node | Edge;

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

export const gram = (paths: Children<Path>, id?: string, labels = [], record?: Record): Gram => ({
  type: 'gram',
  ...(id && { id }),
  labels,
  ...(record && { record }),
  children: normalizeChildren<Path>(paths),
});

export const path = (child?: NodeOrEdge, id?: string, labels?: string[], record?: Record): Path => ({
  type: 'path',
  ...(id && { id }),
  labels,
  ...(record && { record }),
  children: child? [child] : [],
});

// export const EMPTY = {
//     labels: [],
//     record: {}
// }

// export const content = (id?:string, labels?:string[], record?:Record) => ({
//     ...(id && {id}),
//     labels: (labels === undefined) ? [] : labels,
//     ...(record && {record})
// })

export const record = (properties: Property[]): Record => {
  return properties.reduce((acc: Record, p: Property) => {
    acc[p.name] = p.value;
    return acc;
  }, <Record>{});
};

/**
 * Construct a Node.
 *
 * @param id identifier
 * @param labels
 * @param record
 */
export const node = (id?: string, labels?: string[], record?: Record): Node => ({
  type: 'node',
  ...(id && { id }),
  ...(labels && { labels }),
  ...(record && { record }),
});

export const edge = (
  children: [Node, NodeOrEdge],
  direction: EdgeDirection = 'right',
  id?: string,
  labels?: string[],
  record?: Record
): Edge => ({
  type: 'edge',
  ...(id && { id }),
  ...(labels && { labels }),
  ...(record && { record }),
  direction,
  children,
});

export const property = (name: string, value: Literal | Literal[]): Property => {
  const Node: Property = {
    type: 'property',
    name,
    value,
  };
  return Node;
};

export const boolean = (value: boolean): BooleanLiteral => ({ type: 'boolean', value: value ? 'true' : 'false' });

export const string = (value: string): StringLiteral => ({ type: 'string', value });

export const tagged = (tag: string, value: string): TaggedLiteral => ({ type: 'tagged', value, tag });

export const integer = (value: string | number): IntegerLiteral => ({ type: 'integer', value: String(value) });

export const decimal = (value: string | number): DecimalLiteral => ({ type: 'decimal', value: String(value) });

export const hexadecimal = (value: string): HexadecimalLiteral => ({ type: 'hexadecimal', value });

export const octal = (value: string): OctalLiteral => ({ type: 'octal', value });

export const unit = (unit: string, value: string | number): UnitLiteral => ({
  type: 'unit',
  value: String(value),
  unit,
});

export const year = (value: string | Date): TaggedLiteral =>
  tagged(value instanceof Date ? value.getFullYear().toString() : value, 'date');

export const date = (value: string | Date): TaggedLiteral =>
  tagged(value instanceof Date ? dateToYMD(value) : value, 'date');

export const dayOfMonth = (value: string | Date): TaggedLiteral =>
  tagged(value instanceof Date ? dateToDayOfMonth(value) : value, 'date');

export const time = (value: string | Date): TaggedLiteral =>
  tagged(value instanceof Date ? dateToYMD(value) : value, 'time');

export default {
  gram,
  path,
  node,
  edge,
  record,
  property,
  boolean,
  string,
  tagged,
  integer,
  decimal,
  hexadecimal,
  octal,
  unit,
  date,
  time,
};
