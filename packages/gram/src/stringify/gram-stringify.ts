import {
  GramNode,
  GramEdge,
  GramRecord,
  GramPath,
  GramRecordValue,
  GramProperty,
  isGramLiteral,
  isGramNode,
  isGramEdge,
  isGramEmptyPath,
  isGramLiteralArray,
  GramLiteral,
  isGramPath,
  isGramRecord,
} from '@gram-data/gram-ast';

const isEmpty = (r: GramRecord) => r.size === 0;

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
const toStringLiteral = (l: GramLiteral): string => {
  switch (l.type) {
    case 'integer':
    case 'boolean':
    case 'octal':
    case 'hexadecimal':
    case 'decimal':
      return l.value;
    case 'string':
      return `\`${l.value}\``;
    case 'tagged':
      return `${l.tag}\`${l.value}\``;
    case 'measurement':
      return `${l.value}${l.unit}`;
    default:
      return assertNever(l);
  }
};

const toStringValue = (v: GramRecordValue) => {
  if (isGramLiteralArray(v)) {
    return `[${v.map((l: GramLiteral) => toStringLiteral(l)).join(',')}]`;
  } else if (isGramLiteral(v)) {
    return toStringLiteral(v);
  } else {
    return objectToString(v);
  }
};

const propertyToString = (property: GramProperty) =>
  `${property.name}:${toStringValue(property.value)}`;

const recordToString = (record: GramRecord): string => {
  const fields = Array.from(
    record,
    ([k, v], i: number) => `${i > 0 ? ',' : ''}${k}:${toStringValue(v)}`
  );
  return `{${fields.join('')}}`;
};

const arrayToString = (xs: any[]): string => `[${xs.map(stringify).join(',')}]`;

const objectToString = (o: { [key: string]: any }): string => {
  const fields = Object.entries(o).map(
    ([name, value], i: number) =>
      `${i > 0 ? ',' : ''}${name}:${stringify(value)}`
  );
  return `{${fields.join('')}}`;
};

const elementContentToString = (ast: GramPath): string => {
  const idString = ast.id || '';
  const labelsString =
    ast.labels && ast.labels.length > 0 ? ':' + ast.labels.join(':') : '';
  const recordString =
    ast.record && !isEmpty(ast.record) ? recordToString(ast.record) : '';
  return `${idString}${labelsString}${
    ((idString.length > 0 || labelsString.length > 0) && recordString.length) >
    0
      ? ' '
      : ''
  }${recordString}`;
};

const nodeToString = (ast: GramNode): string =>
  `(${elementContentToString(ast)})`;

const edgeToString = (ast: GramEdge): string => {
  const left = ast.kind === 'left' ? '<-' : '-';
  const right = ast.kind === 'right' ? '->' : '-';

  const leftNode = isGramNode(ast.children[0])
    ? nodeToString(ast.children[0])
    : edgeToString(ast.children[0]);
  const rightNode = isGramNode(ast.children[1])
    ? nodeToString(ast.children[1])
    : edgeToString(ast.children[1]);
  const content = elementContentToString(ast);
  const boxedContent = content.length > 0 ? `[${content}]` : '';

  return `${leftNode}${left}${boxedContent}${right}${rightNode}`;
};

const pathCompositionToString = (ast: GramPath): string => {
  const lhs =
    ast.children && ast.children.length > 0
      ? pathToString(ast.children[0])
      : '';
  const rhs =
    ast.children && ast.children.length > 1
      ? pathToString(ast.children[1])
      : '';
  const relation =
    ast.kind === 'left'
      ? '<--'
      : ast.kind === 'right'
      ? '-->'
      : ast.kind === 'either'
      ? '--'
      : lhs.length > 0 && rhs.length > 0
      ? ','
      : '';
  const content = elementContentToString(ast);

  return `[${content}${relation.length > 0 ? ' ' : ''}${relation}${
    lhs.length > 0 ? ' ' : ''
  }${lhs}${rhs.length > 0 ? ' ' : ''}${rhs}]`;
};

const pairToString = (ast: GramPath): string => {
  const lhs =
    ast.children && ast.children.length > 0
      ? pathToString(ast.children[0])
      : '';
  const rhs =
    ast.children && ast.children.length > 1
      ? pathToString(ast.children[1])
      : '';
  return `${lhs},${rhs.length > 0 ? ' ' : ''}${rhs}`;
};

const hasAttributes = (p: GramPath) => p.id || p.labels || p.record;

const pathToString = (ast?: GramPath): string => {
  const pathExpression = ast
    ? `${
        isGramEmptyPath(ast)
          ? ''
          : isGramNode(ast)
          ? nodeToString(ast)
          : isGramEdge(ast)
          ? edgeToString(ast)
          : hasAttributes(ast)
          ? pathCompositionToString(ast)
          : pairToString(ast)
      }`
    : '';
  return pathExpression;
};

export const stringify = (ast: any | any[]): string => {
  if (Array.isArray(ast)) {
    if (ast.length > 0) {
      const element = ast[0];
      if (isGramPath(element)) {
        return ast.map(stringify).join(' ');
      } else {
        return arrayToString(ast);
      }
    } else return '[]';
  } else if (ast.type !== undefined) {
    switch (ast.type) {
      case 'path':
        return pathToString(ast as GramPath);
      case 'seq':
        return stringify(ast.children as GramPath[]);
      case 'property':
        return propertyToString(ast);
      default:
        if (isGramLiteral(ast)) {
          return toStringLiteral(ast);
        }
        return objectToString(ast);
    }
  } else if (typeof ast === 'object') {
    if (isGramRecord(ast)) {
      return recordToString(ast);
    } else {
      return objectToString(ast);
    }
  }

  throw new Error(`Can't stringify <${ast}>`);
};

export default stringify;
