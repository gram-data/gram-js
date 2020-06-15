import {
  GramNode,
  GramEdge,
  GramRecord,
  GramLiteral,
  GramPath,
  GramRecordValue,
  isLiteral,
  isGramNode,
  GramPathlikeElement,
  isGramEdge
} from './gram-types';

const isEmpty = (o: any) => Object.keys(o).length === 0;

const toStringLiteral = (l: GramLiteral): string => {
  switch (l.type) {
    case 'integer':
      return l.value;
    case 'string':
      return `\`${l.value}\``;
    case 'tagged':
      return `${l.tag}\`${l.value}\``;
    default:
      return `<ERROR, can't stringify literals of type ${l.type}>`;
  }
};

const toStringValue = (v: GramRecordValue) => {
  if (Array.isArray(v)) {
    return `[${v.map(l => toStringLiteral(l)).join(',')}]`;
  } else if (isLiteral(v)) {
    return toStringLiteral(v);
  } else {
    return recordToString(v);
  }
};

const recordToString = (record: GramRecord): string => {
  const fields = Object.entries(record).map(([key, value], i) => `${i > 0 ? ',' : ''}${key}:${toStringValue(value)}`);
  return `{${fields.join('')}}`;
};

const elementContentToString = (ast: GramPathlikeElement): string => {
  const idString = ast.id || '';
  const labelsString = ast.labels && ast.labels.length > 0 ? ':' + ast.labels.join(':') : '';
  const recordString = ast.record && !isEmpty(ast.record) ? recordToString(ast.record) : '';
  return `${idString}${labelsString}${recordString.length > 0 ? ' ' : ''}${recordString}`;
};

const nodeToString = (ast: GramNode): string => `(${elementContentToString(ast)})`;

const edgeToString = (ast: GramEdge): string => {
  const left = ast.direction === 'left' ? '<-' : '-';
  const right = ast.direction === 'right' ? '->' : '-';

  const leftNode = isGramNode(ast.children[0]) ? nodeToString(ast.children[0]) : edgeToString(ast.children[0]);
  const rightNode = isGramNode(ast.children[1]) ? nodeToString(ast.children[1]) : edgeToString(ast.children[1]);
  const content = elementContentToString(ast);
  const boxedContent = content.length > 0 ? `[${content}]` : '';

  return `${leftNode}${left}${boxedContent}${right}${rightNode}`;
};

const pathToString = (ast: GramPath): string => {
  const pathContent = elementContentToString(ast);
  const pathChild = ast.children[0];
  const pathExpression = pathChild
    ? `${
        isGramNode(pathChild)
          ? nodeToString(pathChild)
          : isGramEdge(pathChild)
          ? edgeToString(pathChild)
          : pathToString(pathChild)
      }`
    : '';
  if (pathContent.length > 0) {
    return `[${pathContent} ${pathExpression}]`;
  } else {
    return pathExpression;
  }
};

const stringify = (ast: GramPathlikeElement): string => {
  const tokens: Array<string> = [];
  switch (ast.type) {
    case 'seq':
      const paths = ast.children as GramPath[];
      return paths.map( (path:GramPath) => stringify(path)).join('\n');
    case 'path':
      return pathToString(ast as GramPath);
    case 'node':
      return nodeToString(ast as GramNode);
    case 'edge':
      return edgeToString(ast as GramEdge);
    default:
      console.error(`Impossible:`, typeof ast);
  }

  return tokens.join('');
};

export default stringify;
