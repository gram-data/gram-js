// Generated automatically by nearley, version 2.19.5
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
import moo from 'moo';
import * as g from '@gram-data/gram-builder';
import { tokens } from '@gram-data/gram-ast';

function id(d: any[]): any {
  return d[0];
}
declare var identifier: any;
declare var symbol: any;
declare var integer: any;
declare var octal: any;
declare var hexadecimal: any;
declare var measurement: any;
declare var tickedString: any;
declare var boolean: any;
declare var singleQuotedString: any;
declare var doubleQuotedString: any;
declare var taggedString: any;
declare var decimal: any;
declare var whitespace: any;
declare var lineComment: any;

let lexer = (moo.compile({
  whitespace: { match: /\s+/, lineBreaks: true },
  lineComment: { match: /\/\/.*?\n?$/ },
  hexadecimal: tokens.hexadecimal,
  octal: tokens.octal,
  measurement: tokens.measurement,
  decimal: tokens.decimal,
  integer: tokens.integer,
  taggedString: { match: tokens.taggedString },
  boolean: ['true', 'TRUE', 'True', 'false', 'FALSE', 'False'],
  symbol: tokens.symbol,
  identifier: tokens.identifier,
  doubleQuotedString: {
    match: tokens.doubleQuotedString,
    value: (s: string) => s.slice(1, -1),
  },
  singleQuotedString: {
    match: tokens.singleQuotedString,
    value: (s: string) => s.slice(1, -1),
  },
  tickedString: {
    match: tokens.tickedString,
    value: (s: string) => s.slice(1, -1),
  },
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
}) as unknown) as NearleyLexer;

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
  if (valueParts === null || valueParts === undefined)
    throw Error(`Malformed tagged string: ${taggedStringValue}`);
  return {
    tag: valueParts![1],
    value: valueParts![2],
  };
}

function separateNumberFromUnits(measurementValue: string) {
  let valueParts = measurementValue.match(/(-?[0-9.]+)([a-zA-Z]+)/);
  if (valueParts === null || valueParts === undefined)
    throw Error(`Malformed measurement : ${measurementValue}`);
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

type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
}

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {
      name: 'Gram$ebnf$1$subexpression$1$ebnf$1',
      symbols: [{ literal: ',' }],
      postprocess: id,
    },
    {
      name: 'Gram$ebnf$1$subexpression$1$ebnf$1',
      symbols: [],
      postprocess: () => null,
    },
    {
      name: 'Gram$ebnf$1$subexpression$1',
      symbols: ['Pathlike', 'Gram$ebnf$1$subexpression$1$ebnf$1', '_'],
      postprocess: ([pp]) => pp,
    },
    { name: 'Gram$ebnf$1', symbols: ['Gram$ebnf$1$subexpression$1'] },
    {
      name: 'Gram$ebnf$1$subexpression$2$ebnf$1',
      symbols: [{ literal: ',' }],
      postprocess: id,
    },
    {
      name: 'Gram$ebnf$1$subexpression$2$ebnf$1',
      symbols: [],
      postprocess: () => null,
    },
    {
      name: 'Gram$ebnf$1$subexpression$2',
      symbols: ['Pathlike', 'Gram$ebnf$1$subexpression$2$ebnf$1', '_'],
      postprocess: ([pp]) => pp,
    },
    {
      name: 'Gram$ebnf$1',
      symbols: ['Gram$ebnf$1', 'Gram$ebnf$1$subexpression$2'],
      postprocess: d => d[0].concat([d[1]]),
    },
    { name: 'Gram$ebnf$2', symbols: ['EOL'], postprocess: id },
    { name: 'Gram$ebnf$2', symbols: [], postprocess: () => null },
    {
      name: 'Gram',
      symbols: ['Gram$ebnf$1', 'Gram$ebnf$2'],
      postprocess: ([pp]) => g.seq(g.flatten(pp)),
    },
    { name: 'Pathlike', symbols: ['EdgeExpression'], postprocess: id },
    { name: 'Pathlike', symbols: ['PathComposition'], postprocess: id },
    { name: 'Pathlike', symbols: ['Comment'], postprocess: id },
    {
      name: 'EdgeExpression',
      symbols: ['Node', 'Edge', 'EdgeExpression'],
      postprocess: ([np, es, ep]) =>
        g.cons([np, ep], {
          relation: es.relation,
          id: es.id,
          labels: es.labels,
          record: es.record,
        }),
    },
    { name: 'EdgeExpression', symbols: ['Node'], postprocess: id },
    {
      name: 'Node',
      symbols: [{ literal: '(' }, '_', 'Attributes', { literal: ')' }],
      postprocess: ([, , content]) =>
        g.node(content.id, content.labels, content.record),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-[' }, '_', 'Attributes', { literal: ']->' }],
      postprocess: ([, , content]) => ({ relation: 'right', ...content }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-[' }, '_', 'Attributes', { literal: ']-' }],
      postprocess: ([, , content]) => ({ relation: 'either', ...content }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '<-[' }, '_', 'Attributes', { literal: ']-' }],
      postprocess: ([, , content]) => ({ relation: 'left', ...content }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-[]->' }],
      postprocess: () => ({ relation: 'right' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-[]-' }],
      postprocess: () => ({ relation: 'either' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '<-[]-' }],
      postprocess: () => ({ relation: 'left' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-->' }],
      postprocess: () => ({ relation: 'right' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '--' }],
      postprocess: () => ({ relation: 'either' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '<--' }],
      postprocess: () => ({ relation: 'left' }),
    },
    { name: 'PathComposition$ebnf$1', symbols: ['Pathlike'], postprocess: id },
    { name: 'PathComposition$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'PathComposition',
      symbols: [
        { literal: '[' },
        '_',
        'Attributes',
        '_',
        'PathComposition$ebnf$1',
        '_',
        { literal: ']' },
      ],
      postprocess: ([, , attr, , sub]) => g.cons(sub ? [sub] : [], attr),
    },
    {
      name: 'PathComposition',
      symbols: [
        { literal: '[' },
        '_',
        'Attributes',
        '_',
        'Relation',
        '_',
        'Pathlike',
        '_',
        'Pathlike',
        '_',
        { literal: ']' },
      ],
      postprocess: ([, , attr, , relation, , lhs, , rhs]) =>
        g.cons([lhs, rhs], {
          relation,
          id: attr.id,
          labels: attr.labels,
          record: attr.record,
        }),
    },
    {
      name: 'PathComposition$ebnf$2$subexpression$1$ebnf$1',
      symbols: [{ literal: ',' }],
      postprocess: id,
    },
    {
      name: 'PathComposition$ebnf$2$subexpression$1$ebnf$1',
      symbols: [],
      postprocess: () => null,
    },
    {
      name: 'PathComposition$ebnf$2$subexpression$1',
      symbols: [
        'Pathlike',
        'PathComposition$ebnf$2$subexpression$1$ebnf$1',
        '_',
      ],
      postprocess: ([pp]) => pp,
    },
    {
      name: 'PathComposition$ebnf$2',
      symbols: ['PathComposition$ebnf$2$subexpression$1'],
    },
    {
      name: 'PathComposition$ebnf$2$subexpression$2$ebnf$1',
      symbols: [{ literal: ',' }],
      postprocess: id,
    },
    {
      name: 'PathComposition$ebnf$2$subexpression$2$ebnf$1',
      symbols: [],
      postprocess: () => null,
    },
    {
      name: 'PathComposition$ebnf$2$subexpression$2',
      symbols: [
        'Pathlike',
        'PathComposition$ebnf$2$subexpression$2$ebnf$1',
        '_',
      ],
      postprocess: ([pp]) => pp,
    },
    {
      name: 'PathComposition$ebnf$2',
      symbols: [
        'PathComposition$ebnf$2',
        'PathComposition$ebnf$2$subexpression$2',
      ],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'PathComposition',
      symbols: [
        { literal: '[' },
        '_',
        'Attributes',
        '_',
        'PathComposition$ebnf$2',
        { literal: ']' },
      ],
      postprocess: ([, , attr, , pp]) =>
        g.cons(g.reduce('pair', g.flatten(pp)), attr),
    },
    {
      name: 'Relation',
      symbols: [{ literal: ',' }],
      postprocess: () => 'pair',
    },
    {
      name: 'Relation',
      symbols: [{ literal: '-->' }],
      postprocess: () => 'right',
    },
    {
      name: 'Relation',
      symbols: [{ literal: '--' }],
      postprocess: () => 'either',
    },
    {
      name: 'Relation',
      symbols: [{ literal: '<--' }],
      postprocess: () => 'left',
    },
    { name: 'Attributes$ebnf$1', symbols: ['Identity'], postprocess: id },
    { name: 'Attributes$ebnf$1', symbols: [], postprocess: () => null },
    { name: 'Attributes$ebnf$2', symbols: ['LabelList'], postprocess: id },
    { name: 'Attributes$ebnf$2', symbols: [], postprocess: () => null },
    { name: 'Attributes$ebnf$3', symbols: ['Record'], postprocess: id },
    { name: 'Attributes$ebnf$3', symbols: [], postprocess: () => null },
    {
      name: 'Attributes',
      symbols: [
        'Attributes$ebnf$1',
        '_',
        'Attributes$ebnf$2',
        '_',
        'Attributes$ebnf$3',
      ],
      postprocess: ([id, , labels, , record]) => ({ id, labels, record }),
    },
    { name: 'LabelList$ebnf$1', symbols: ['Label'] },
    {
      name: 'LabelList$ebnf$1',
      symbols: ['LabelList$ebnf$1', 'Label'],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'LabelList',
      symbols: ['LabelList$ebnf$1'],
      postprocess: ([labels]) => labels,
    },
    {
      name: 'Label',
      symbols: [{ literal: ':' }, 'Symbol'],
      postprocess: ([, label]) => label,
    },
    {
      name: 'Identity',
      symbols: [lexer.has('identifier') ? { type: 'identifier' } : identifier],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [lexer.has('symbol') ? { type: 'symbol' } : symbol],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [lexer.has('integer') ? { type: 'integer' } : integer],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [lexer.has('octal') ? { type: 'octal' } : octal],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [
        lexer.has('hexadecimal') ? { type: 'hexadecimal' } : hexadecimal,
      ],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [
        lexer.has('measurement') ? { type: 'measurement' } : measurement,
      ],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [
        lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,
      ],
      postprocess: ([t]) => t.text.slice(1, -1),
    },
    {
      name: 'Symbol',
      symbols: [lexer.has('symbol') ? { type: 'symbol' } : symbol],
      postprocess: text,
    },
    {
      name: 'Symbol',
      symbols: [
        lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,
      ],
      postprocess: ([t]) => t.text.slice(1, -1),
    },
    {
      name: 'Record',
      symbols: [{ literal: '{' }, '_', { literal: '}' }],
      postprocess: empty,
    },
    { name: 'Record$ebnf$1', symbols: [] },
    {
      name: 'Record$ebnf$1$subexpression$1',
      symbols: ['_', { literal: ',' }, '_', 'Property'],
    },
    {
      name: 'Record$ebnf$1',
      symbols: ['Record$ebnf$1', 'Record$ebnf$1$subexpression$1'],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'Record',
      symbols: [
        { literal: '{' },
        '_',
        'Property',
        'Record$ebnf$1',
        { literal: '}' },
      ],
      postprocess: ([, , p, ps]) => [p, ...extractPairs(ps)],
    },
    {
      name: 'Property',
      symbols: ['Symbol', '_', { literal: ':' }, '_', 'Value'],
      postprocess: ([k, , , , v]) => g.property(k, v),
    },
    { name: 'Value', symbols: ['StringLiteral'], postprocess: id },
    { name: 'Value', symbols: ['NumericLiteral'], postprocess: id },
    {
      name: 'Value',
      symbols: [lexer.has('boolean') ? { type: 'boolean' } : boolean],
      postprocess: d => g.boolean(JSON.parse(d[0].value.toLowerCase())),
    },
    { name: 'Value$ebnf$1', symbols: [] },
    {
      name: 'Value$ebnf$1$subexpression$1',
      symbols: ['_', { literal: ',' }, '_', 'Value'],
    },
    {
      name: 'Value$ebnf$1',
      symbols: ['Value$ebnf$1', 'Value$ebnf$1$subexpression$1'],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'Value',
      symbols: [
        { literal: '[' },
        '_',
        'Value',
        'Value$ebnf$1',
        { literal: ']' },
      ],
      postprocess: ([, , v, vs]) => [v, ...extractArray(vs)],
    },
    {
      name: 'StringLiteral',
      symbols: [
        lexer.has('singleQuotedString')
          ? { type: 'singleQuotedString' }
          : singleQuotedString,
      ],
      postprocess: d => g.string(d[0].value),
    },
    {
      name: 'StringLiteral',
      symbols: [
        lexer.has('doubleQuotedString')
          ? { type: 'doubleQuotedString' }
          : doubleQuotedString,
      ],
      postprocess: d => g.string(d[0].value),
    },
    {
      name: 'StringLiteral',
      symbols: [
        lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,
      ],
      postprocess: d => g.string(d[0].value),
    },
    {
      name: 'StringLiteral',
      symbols: [
        lexer.has('taggedString') ? { type: 'taggedString' } : taggedString,
      ],
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
      symbols: [
        lexer.has('hexadecimal') ? { type: 'hexadecimal' } : hexadecimal,
      ],
      postprocess: d => g.hexadecimal(d[0].value),
    },
    {
      name: 'NumericLiteral',
      symbols: [lexer.has('octal') ? { type: 'octal' } : octal],
      postprocess: d => g.octal(d[0].value),
    },
    {
      name: 'NumericLiteral',
      symbols: [
        lexer.has('measurement') ? { type: 'measurement' } : measurement,
      ],
      postprocess: d => {
        const parts = separateNumberFromUnits(d[0].value);
        return g.measurement(parts.unit, parts.value);
      },
    },
    { name: '_', symbols: [] },
    {
      name: '_',
      symbols: [lexer.has('whitespace') ? { type: 'whitespace' } : whitespace],
      postprocess: empty,
    },
    {
      name: 'Comment',
      symbols: [
        lexer.has('lineComment') ? { type: 'lineComment' } : lineComment,
      ],
      postprocess: empty,
    },
    { name: 'EOL', symbols: [{ literal: '\n' }], postprocess: empty },
  ],
  ParserStart: 'Gram',
};

export default grammar;
