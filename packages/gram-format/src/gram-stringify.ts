import {
  Node,
  Edge,
  Record,
  Literal,
  Path,
  GramAstStructure,
  GramContentElement,
  RecordValue,
  isLiteral,
} from './gram-ast';

const isEmpty = (o:any) => (Object.keys(o).length === 0);

const toStringLiteral = (l: Literal): string => {
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

const toStringValue = (v: RecordValue) => {
  if (Array.isArray(v)) {
    return `[${v.map(l => toStringLiteral(l)).join(',')}]`;
  } else if (isLiteral(v)) {
    return toStringLiteral(v);
  } else {
    return recordToString(v);
  }
};

const recordToString = (record: Record): string => {
  const fields = Object.entries(record).map(([key, value], i) => `${i > 0 ? ',' : ''}${key}:${toStringValue(value)}`);
  return `{${fields.join('')}}`;
};

const elementContentToString = (ast: GramContentElement): string => {
  const idString = ast.id || '';
  const labelsString = (ast.labels && ast.labels.length>0) ? ':' + ast.labels.join(':') : '';
  const recordString = (ast.record && !isEmpty(ast.record)) ? recordToString(ast.record) : '';
  return `${idString}${labelsString}${recordString.length > 0 ? ' ' : ''}${recordString}`;
};

const nodeToString = (ast: Node): string => `(${elementContentToString(ast)})`;

const edgeToString = (ast: Edge): string => {
  const left = ast.direction === 'left' ? '<-' : '-';
  const right = ast.direction === 'right' ? '->' : '-';

  const leftNode = nodeToString(ast.children[0]);
  const rightNode = ast.children[1].type === 'node' ? nodeToString(ast.children[1]) : edgeToString(ast.children[1]);
  const content = elementContentToString(ast);
  const boxedContent = content.length > 0 ? `[${content}]` : '';

  return `${leftNode}${left}${boxedContent}${right}${rightNode}`;
};

const pathToString = (ast: Path): string => {
  const pathContent = elementContentToString(ast);
  const pathChild = ast.children[0];
  const pathExpression = pathChild
    ? `${pathChild.type === 'node' ? nodeToString(pathChild) : edgeToString(pathChild)}`
    : '';
  if (pathContent.length > 0) {
    return `[${pathContent} ${pathExpression}]`;
  } else {
    return pathExpression;
  }
};

const stringify = (ast: GramAstStructure): string => {
  const tokens: Array<string> = [];
  switch (ast.type) {
    case 'gram':
      return ast.children.map(stringify).join('\n');
    case 'path':
      return pathToString(ast);
    case 'node':
      return nodeToString(ast);
    case 'edge':
      return edgeToString(ast);
    default:
      console.error(`Impossible:`, typeof ast);
  }

  return tokens.join('');
};

export default stringify;
