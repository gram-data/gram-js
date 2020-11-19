import {
  GramNode,
  GramEdge,
  GramRecord,
  GramLiteral,
  GramPath,
  GramRecordValue,
  GramProperty,
  isLiteral,
  isGramNode,
  isGramEdge,
  GramPathlike,
  GramPathSeq,
  isGramEmptyPath,
  isGramLiteralArray,
  GramPropertyMap,
  isGramPathlike,
  AnyGramLiteral,
} from '@gram-data/gram-ast';

const isEmpty = (o: any) => Object.keys(o).length === 0;

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
const toStringLiteral = (l: AnyGramLiteral): string => {
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
      return assertNever(l)
  }
};

const toStringValue = (v: GramRecordValue) => {
  if (isGramLiteralArray(v)) {
    return `[${v.map((l: AnyGramLiteral) => toStringLiteral(l)).join(',')}]`;
  } else if (isLiteral(v)) {
    return toStringLiteral(v);
  } else {
    return recordToString(v);
  }
};

const recordToString = (record: GramRecord): string => {
  const fields = record.map(
    (property: GramProperty, i: number) =>
      `${i > 0 ? ',' : ''}${property.name}:${toStringValue(property.value)}`
  );
  return `{${fields.join('')}}`;
};

const recordMapToString = (record: GramPropertyMap): string => {
  const fields = Object.entries(record).map(
    ([name, value], i: number) =>
      `${i > 0 ? ',' : ''}${name}:${toStringValue(value)}`
  );
  return `{${fields.join('')}}`;
};

const elementContentToString = (ast: GramPathlike): string => {
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
  const left = ast.relation === 'left' ? '<-' : '-';
  const right = ast.relation === 'right' ? '->' : '-';

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
    ast.relation === 'left'
      ? '<--'
      : ast.relation === 'right'
      ? '-->'
      : ast.relation === 'either'
      ? '--'
      : lhs.length > 0 && rhs.length > 0
      ? ','
      : '';
  const content = elementContentToString(ast);

  return `[${content}${relation.length > 0 ? ' ' : ''}${relation}${
    lhs.length > 0 ? ' ' : ''
  }${lhs}${rhs.length > 0 ? ' ' : ''}${rhs}]`;
};
const pathToString = (ast?: GramPath): string => {
  const pathExpression = ast
    ? `${
        isGramEmptyPath(ast)
          ? ''
          : isGramNode(ast)
          ? nodeToString(ast)
          : isGramEdge(ast)
          ? edgeToString(ast)
          : pathCompositionToString(ast)
      }`
    : '';
  return pathExpression;
};

export const stringify = (ast: GramPathlike | GramPathSeq | GramPropertyMap): string => {
  
  if (isGramPathlike(ast)) {
    switch (ast.type) {
      case 'seq':
        const paths = ast.children as GramPath[];
        return paths.map((path: GramPath) => stringify(path)).join('\n');
      case 'path':
        return pathToString(ast as GramPath);
      default:
        console.error(`Impossible:`, typeof ast);
    }
  } else if (typeof ast === 'object') {
    return recordMapToString(ast)
  }

  throw new Error(`Can't stringify <${ast}>`)
};

export default stringify;
