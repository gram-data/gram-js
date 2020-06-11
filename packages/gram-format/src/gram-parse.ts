// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
import g from './gram-builder';
import { RE } from './gram-tokens';
function id(d: any[]): any {
  return d[0];
}
declare var identifier: any;
declare var tickedString: any;
declare var boolean: any;
declare var singleQuotedString: any;
declare var doubleQuotedString: any;
declare var taggedString: any;
declare var integer: any;
declare var decimal: any;
declare var hexadecimal: any;
declare var octal: any;
declare var unit: any;
declare var whitespace: any;
declare var lineComment: any;

const moo = require('moo');

let lexer = moo.compile({
  whitespace: { match: /\s+/, lineBreaks: true },
  lineComment: { match: /\/\/.*?$/ },
  hexadecimal: RE.hexadecimal,
  octal: RE.octal,
  unit: RE.unit,
  decimal: RE.decimal,
  integer: RE.integer,
  taggedString: { match: RE.taggedString },
  doubleQuotedString: { match: RE.doubleQuotedString, value: (s: string) => s.slice(1, -1) },
  singleQuotedString: { match: RE.singleQuotedString, value: (s: string) => s.slice(1, -1) },
  tickedString: { match: RE.tickedString, value: (s: string) => s.slice(1, -1) },
  boolean: ['true', 'TRUE', 'True', 'false', 'FALSE', 'False'],
  identifier: RE.identifier,
  '-->': '-->',
  '--': '--',
  '<--': '<--',
  '-[]->': '-[]->',
  '-[]-': '-[]-',
  '<-[]-': '<-[]-',
  '<-[': '<-[',
  ']->': ']->',
  '-[': '-[',
  ']-': ']-',
  '{': '{',
  '}': '}',
  '[': '[',
  ']': ']',
  '(': '(',
  ')': ')',
  ',': ',',
  ':': ':',
  '`': '`',
  "'": "'",
});

const empty = () => null;

const text = ([token]: Array<any>): string => token.text;

function extractPairs(pairGroups: Array<any>) {
  return pairGroups.map((pairGroup: Array<any>) => {
    return pairGroup[3];
  });
}

function extractArray(valueGroups: Array<any>): Array<any> {
  return valueGroups.map(valueGroup => valueGroup[3]);
}

function separateTagFromString(taggedStringValue: string) {
  let valueParts = taggedStringValue.match(/([^`]+)`(.+)`$/);
  if (valueParts === null || valueParts === undefined) throw Error(`Malformed tagged string: ${taggedStringValue}`);
  return {
    tag: valueParts![1],
    value: valueParts![2],
  };
}

function separateNumberFromUnit(unitNumberValue: string) {
  let valueParts = unitNumberValue.match(/(-?[0-9.]+)([a-zA-Z]+)/);
  if (valueParts === null || valueParts === undefined) throw Error(`Malformed unit number: ${unitNumberValue}`);
  return {
    value: valueParts![1],
    unit: valueParts![2],
  };
}

interface NearleyToken {
  value: any;
  [key: string]: any;
}

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
}

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
}

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    { name: 'Gram$ebnf$1', symbols: ['Block'] },
    { name: 'Gram$ebnf$1', symbols: ['Gram$ebnf$1', 'Block'], postprocess: d => d[0].concat([d[1]]) },
    { name: 'Gram', symbols: ['Gram$ebnf$1'], postprocess: data => g.gram(g.flatten(data)) },
    { name: 'Block', symbols: ['PathPattern', '_'], postprocess: ([pp]) => pp },
    { name: 'Block', symbols: ['Comment'], postprocess: empty },
    { name: 'PathPattern$ebnf$1', symbols: ['EdgePattern'], postprocess: id },
    { name: 'PathPattern$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'PathPattern',
      symbols: [{ literal: '[' }, '_', 'ContentSpecification', '_', 'PathPattern$ebnf$1', { literal: ']' }],
      postprocess: ([, , content, , ep]) => g.path(ep || [], content.id, content.labels, content.record),
    },
    { name: 'PathPattern', symbols: ['EdgePattern'], postprocess: ([ep]) => g.path(ep) },
    {
      name: 'NodePattern',
      symbols: [{ literal: '(' }, '_', 'ContentSpecification', { literal: ')' }],
      postprocess: ([, , content]) => g.node(content.id, content.labels, content.record),
    },
    {
      name: 'EdgePattern',
      symbols: ['NodePattern', 'EdgeSpecification', 'EdgePattern'],
      postprocess: ([np, es, ep]) => g.edge([np, ep], es.direction, es.id, es.labels, es.record),
    },
    { name: 'EdgePattern', symbols: ['NodePattern'], postprocess: id },
    {
      name: 'EdgeSpecification',
      symbols: [{ literal: '-[' }, '_', 'ContentSpecification', { literal: ']->' }],
      postprocess: ([, , content]) => ({ direction: 'right', ...content }),
    },
    {
      name: 'EdgeSpecification',
      symbols: [{ literal: '-[' }, '_', 'ContentSpecification', { literal: ']-' }],
      postprocess: ([, , content]) => ({ direction: 'none', ...content }),
    },
    {
      name: 'EdgeSpecification',
      symbols: [{ literal: '<-[' }, '_', 'ContentSpecification', { literal: ']-' }],
      postprocess: ([, , content]) => ({ direction: 'left', ...content }),
    },
    { name: 'EdgeSpecification', symbols: [{ literal: '-[]->' }], postprocess: () => ({ direction: 'right' }) },
    { name: 'EdgeSpecification', symbols: [{ literal: '-[]-' }], postprocess: () => ({ direction: 'none' }) },
    { name: 'EdgeSpecification', symbols: [{ literal: '<-[]-' }], postprocess: () => ({ direction: 'left' }) },
    { name: 'EdgeSpecification', symbols: [{ literal: '-->' }], postprocess: () => ({ direction: 'right' }) },
    { name: 'EdgeSpecification', symbols: [{ literal: '--' }], postprocess: () => ({ direction: 'none' }) },
    { name: 'EdgeSpecification', symbols: [{ literal: '<--' }], postprocess: () => ({ direction: 'left' }) },
    { name: 'EdgeSpecification', symbols: [{ literal: ',' }], postprocess: () => ({ direction: 'pair' }) },
    { name: 'ContentSpecification$ebnf$1', symbols: ['SymbolicName'], postprocess: id },
    { name: 'ContentSpecification$ebnf$1', symbols: [], postprocess: () => null },
    { name: 'ContentSpecification$ebnf$2', symbols: ['LabelList'], postprocess: id },
    { name: 'ContentSpecification$ebnf$2', symbols: [], postprocess: () => null },
    { name: 'ContentSpecification$ebnf$3', symbols: ['Record'], postprocess: id },
    { name: 'ContentSpecification$ebnf$3', symbols: [], postprocess: () => null },
    {
      name: 'ContentSpecification',
      symbols: ['ContentSpecification$ebnf$1', '_', 'ContentSpecification$ebnf$2', '_', 'ContentSpecification$ebnf$3'],
      postprocess: ([id, , labels, , record]) => ({ id, labels, record }),
    },
    { name: 'LabelList$ebnf$1', symbols: ['Label'] },
    { name: 'LabelList$ebnf$1', symbols: ['LabelList$ebnf$1', 'Label'], postprocess: d => d[0].concat([d[1]]) },
    { name: 'LabelList', symbols: ['LabelList$ebnf$1'], postprocess: ([labels]) => labels },
    { name: 'Label', symbols: [{ literal: ':' }, 'SymbolicName'], postprocess: ([, label]) => label },
    {
      name: 'SymbolicName',
      symbols: [lexer.has('identifier') ? { type: 'identifier' } : identifier],
      postprocess: text,
    },
    {
      name: 'SymbolicName',
      symbols: [lexer.has('tickedString') ? { type: 'tickedString' } : tickedString],
      postprocess: ([t]) => t.text.slice(1, -1),
    },
    { name: 'Record', symbols: [{ literal: '{' }, '_', { literal: '}' }], postprocess: empty },
    { name: 'Record$ebnf$1', symbols: [] },
    { name: 'Record$ebnf$1$subexpression$1', symbols: ['_', { literal: ',' }, '_', 'Property'] },
    {
      name: 'Record$ebnf$1',
      symbols: ['Record$ebnf$1', 'Record$ebnf$1$subexpression$1'],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'Record',
      symbols: [{ literal: '{' }, '_', 'Property', 'Record$ebnf$1', { literal: '}' }],
      postprocess: ([, , p, ps]) => g.record([p, ...extractPairs(ps)]),
    },
    {
      name: 'Property',
      symbols: ['Key', '_', { literal: ':' }, '_', 'Value'],
      postprocess: ([k, , , , v]) => g.property(k, v),
    },
    { name: 'Key', symbols: ['SymbolicName'], postprocess: id },
    { name: 'Value', symbols: ['StringLiteral'], postprocess: id },
    { name: 'Value', symbols: ['NumericLiteral'], postprocess: id },
    {
      name: 'Value',
      symbols: [lexer.has('boolean') ? { type: 'boolean' } : boolean],
      postprocess: d => g.boolean(JSON.parse(d[0].value.toLowerCase())),
    },
    { name: 'Value$ebnf$1', symbols: [] },
    { name: 'Value$ebnf$1$subexpression$1', symbols: ['_', { literal: ',' }, '_', 'Value'] },
    {
      name: 'Value$ebnf$1',
      symbols: ['Value$ebnf$1', 'Value$ebnf$1$subexpression$1'],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'Value',
      symbols: [{ literal: '[' }, '_', 'Value', 'Value$ebnf$1', { literal: ']' }],
      postprocess: ([, , v, vs]) => [v, ...extractArray(vs)],
    },
    {
      name: 'StringLiteral',
      symbols: [lexer.has('singleQuotedString') ? { type: 'singleQuotedString' } : singleQuotedString],
      postprocess: d => g.string(d[0].value),
    },
    {
      name: 'StringLiteral',
      symbols: [lexer.has('doubleQuotedString') ? { type: 'doubleQuotedString' } : doubleQuotedString],
      postprocess: d => g.string(d[0].value),
    },
    {
      name: 'StringLiteral',
      symbols: [lexer.has('tickedString') ? { type: 'tickedString' } : tickedString],
      postprocess: d => g.string(d[0].value),
    },
    {
      name: 'StringLiteral',
      symbols: [lexer.has('taggedString') ? { type: 'taggedString' } : taggedString],
      postprocess: d => {
        const parts = separateTagFromString(d[0].value);
        return g.tagged(parts.tag, parts.value);
      },
    },
    {
      name: 'NumericLiteral',
      symbols: [lexer.has('integer') ? { type: 'integer' } : integer],
      postprocess: d => g.integer(d[0].value),
    },
    {
      name: 'NumericLiteral',
      symbols: [lexer.has('decimal') ? { type: 'decimal' } : decimal],
      postprocess: d => g.decimal(d[0].value),
    },
    {
      name: 'NumericLiteral',
      symbols: [lexer.has('hexadecimal') ? { type: 'hexadecimal' } : hexadecimal],
      postprocess: d => g.hexadecimal(d[0].value),
    },
    {
      name: 'NumericLiteral',
      symbols: [lexer.has('octal') ? { type: 'octal' } : octal],
      postprocess: d => g.octal(d[0].value),
    },
    {
      name: 'NumericLiteral',
      symbols: [lexer.has('unit') ? { type: 'unit' } : unit],
      postprocess: d => {
        const parts = separateNumberFromUnit(d[0].value);
        return g.unit(parts.unit, parts.value);
      },
    },
    { name: '_', symbols: [] },
    { name: '_', symbols: [lexer.has('whitespace') ? { type: 'whitespace' } : whitespace], postprocess: empty },
    {
      name: 'EOL$ebnf$1$subexpression$1',
      symbols: [lexer.has('lineComment') ? { type: 'lineComment' } : lineComment, /[\n]/],
    },
    { name: 'EOL$ebnf$1', symbols: ['EOL$ebnf$1$subexpression$1'], postprocess: id },
    { name: 'EOL$ebnf$1', symbols: [], postprocess: () => null },
    { name: 'EOL', symbols: ['_', 'EOL$ebnf$1'], postprocess: empty },
    { name: 'Comment$ebnf$1', symbols: [/[\n]/], postprocess: id },
    { name: 'Comment$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'Comment',
      symbols: [lexer.has('lineComment') ? { type: 'lineComment' } : lineComment, 'Comment$ebnf$1'],
      postprocess: empty,
    },
  ],
  ParserStart: 'Gram',
};

export default grammar;
