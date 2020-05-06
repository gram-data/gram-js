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

const toStringLiteral = (l: Literal): string => {
  switch (l.type) {
    case 'integer':
      return l.value;
      break;
    case 'string':
      return `\`${l.value}\``;
      break;
    case 'tagged':
      return `${l.tag}\`${l.value}\``;
      break;
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
  const labelsString = ast.labels ? ':' + ast.labels.join(':') : '';
  const recordString = ast.record ? recordToString(ast.record) : '';
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
  const pathChild = ast.children[0];
  return `\n${pathChild.type === 'node' ? nodeToString(pathChild) : edgeToString(pathChild)}`;
};
const stringify = (ast: GramAstStructure): string => {
  const tokens: Array<string> = [];
  switch (ast.type) {
    case 'gram':
      return ast.children.map(stringify).join('');
      break;
    case 'path':
      return pathToString(ast);
      break;
    case 'node':
      return nodeToString(ast);
      break;
    case 'edge':
      return edgeToString(ast);
      break;
    default:
      console.error(`Impossible:`, typeof ast);
  }

  return tokens.join('');
};

export default stringify;
