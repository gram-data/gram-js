// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
import moo from 'moo';
import * as g from 'packages/gram/src/builder';
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
  ø: 'ø',
}) as unknown) as NearleyLexer;

const empty = () => null;

const text = ([token]: Array<any>): string => token.text;

/*
# function extractPairs(pairGroups:Array<any>) {
#     return pairGroups.map((pairGroup:Array<any>) => {
#       return pairGroup[3];
#     })
# }

# function extractArray(valueGroups:Array<any>):Array<any> {
#     return valueGroups.map( (valueGroup) => valueGroup[3]);
# }
*/

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
  formatError: (token: never) => string;
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
      name: 'GramSeq$ebnf$1$subexpression$1',
      symbols: ['Path'],
      postprocess: ([pp]) => pp,
    },
    { name: 'GramSeq$ebnf$1', symbols: ['GramSeq$ebnf$1$subexpression$1'] },
    {
      name: 'GramSeq$ebnf$1$subexpression$2',
      symbols: ['Path'],
      postprocess: ([pp]) => pp,
    },
    {
      name: 'GramSeq$ebnf$1',
      symbols: ['GramSeq$ebnf$1', 'GramSeq$ebnf$1$subexpression$2'],
      postprocess: d => d[0].concat([d[1]]),
    },
    {
      name: 'GramSeq',
      symbols: ['_', 'GramSeq$ebnf$1'],
      postprocess: ([, pp]) => g.seq(g.flatten(pp)),
    },
    { name: 'Path', symbols: ['NodePattern'], postprocess: id },
    { name: 'Path', symbols: ['PathComposition'], postprocess: id },
    { name: 'Path', symbols: ['PathPair'], postprocess: id },
    {
      name: 'NodePattern',
      symbols: ['Node', '_', 'Edge', '_', 'NodePattern'],
      postprocess: ([n, , es, , np]) =>
        g.cons([n, np], {
          kind: es.kind,
          id: es.id,
          labels: es.labels,
          record: es.record,
        }),
    },
    { name: 'NodePattern', symbols: ['Node'], postprocess: id },
    { name: 'Node$ebnf$1', symbols: ['Attributes'], postprocess: id },
    { name: 'Node$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'Node',
      symbols: [{ literal: '(' }, '_', 'Node$ebnf$1', { literal: ')' }, '_'],
      postprocess: ([, , attrs]) =>
        attrs ? g.node(attrs.id, attrs.labels, attrs.record) : g.node(),
    },
    { name: 'Edge$ebnf$1', symbols: ['Attributes'], postprocess: id },
    { name: 'Edge$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'Edge',
      symbols: [{ literal: '-[' }, '_', 'Edge$ebnf$1', { literal: ']->' }, '_'],
      postprocess: ([, , attrs]) => ({ kind: 'right', ...attrs }),
    },
    { name: 'Edge$ebnf$2', symbols: ['Attributes'], postprocess: id },
    { name: 'Edge$ebnf$2', symbols: [], postprocess: () => null },
    {
      name: 'Edge',
      symbols: [{ literal: '-[' }, '_', 'Edge$ebnf$2', { literal: ']-' }, '_'],
      postprocess: ([, , attrs]) => ({ kind: 'either', ...attrs }),
    },
    { name: 'Edge$ebnf$3', symbols: ['Attributes'], postprocess: id },
    { name: 'Edge$ebnf$3', symbols: [], postprocess: () => null },
    {
      name: 'Edge',
      symbols: [{ literal: '<-[' }, '_', 'Edge$ebnf$3', { literal: ']-' }, '_'],
      postprocess: ([, , attrs]) => ({ kind: 'left', ...attrs }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-[]->' }, '_'],
      postprocess: () => ({ kind: 'right' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-[]-' }, '_'],
      postprocess: () => ({ kind: 'either' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '<-[]-' }, '_'],
      postprocess: () => ({ kind: 'left' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '-->' }, '_'],
      postprocess: () => ({ kind: 'right' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '--' }, '_'],
      postprocess: () => ({ kind: 'either' }),
    },
    {
      name: 'Edge',
      symbols: [{ literal: '<--' }, '_'],
      postprocess: () => ({ kind: 'left' }),
    },
    { name: 'PathComposition', symbols: ['PathPoint'], postprocess: id },
    { name: 'PathComposition', symbols: ['PathAnnotation'], postprocess: id },
    { name: 'PathComposition', symbols: ['PathExpression'], postprocess: id },
    { name: 'PathPoint$ebnf$1', symbols: ['Attributes'], postprocess: id },
    { name: 'PathPoint$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'PathPoint',
      symbols: [
        { literal: '[' },
        '_',
        'PathPoint$ebnf$1',
        { literal: ']' },
        '_',
      ],
      postprocess: ([, , attr]) => {
        if (
          attr &&
          (attr.id || attr.labels || attr.record) &&
          attr.id !== 'ø'
        ) {
          // console.log(attr);
          return g.node(attr.id, attr.labels, attr.record);
        } else {
          return g.empty();
        }
      },
    },
    { name: 'PathAnnotation$ebnf$1', symbols: ['Attributes'], postprocess: id },
    { name: 'PathAnnotation$ebnf$1', symbols: [], postprocess: () => null },
    {
      name: 'PathAnnotation',
      symbols: [
        { literal: '[' },
        '_',
        'PathAnnotation$ebnf$1',
        'Path',
        { literal: ']' },
        '_',
      ],
      postprocess: ([, , attr, lhs]) => {
        // console.log('annotate()', lhs)
        return g.cons(
          [lhs],
          attr ? { id: attr.id, labels: attr.labels, record: attr.record } : {}
        );
      },
    },
    { name: 'PathExpression$ebnf$1', symbols: ['Attributes'], postprocess: id },
    { name: 'PathExpression$ebnf$1', symbols: [], postprocess: () => null },
    { name: 'PathExpression$ebnf$2', symbols: ['Kind'], postprocess: id },
    { name: 'PathExpression$ebnf$2', symbols: [], postprocess: () => null },
    {
      name: 'PathExpression',
      symbols: [
        { literal: '[' },
        '_',
        'PathExpression$ebnf$1',
        'PathExpression$ebnf$2',
        'Path',
        'Path',
        { literal: ']' },
        '_',
      ],
      postprocess: ([, , attrs, kind, lhs, rhs]) => {
        return g.cons([lhs, rhs], {
          kind,
          id: attrs.id,
          labels: attrs.labels,
          record: attrs.record,
        });
      },
    },
    { name: 'PathPair$subexpression$1', symbols: ['NodePattern'] },
    { name: 'PathPair$subexpression$1', symbols: ['PathComposition'] },
    {
      name: 'PathPair',
      symbols: ['PathPair$subexpression$1', { literal: ',' }, '_', 'Path'],
      postprocess: ([lp, , , rp]) => g.pair([lp[0], rp]),
    },
    {
      name: 'Kind',
      symbols: [{ literal: ',' }, '_'],
      postprocess: () => 'pair',
    },
    {
      name: 'Kind',
      symbols: [{ literal: '-->' }, '_'],
      postprocess: () => 'right',
    },
    {
      name: 'Kind',
      symbols: [{ literal: '--' }, '_'],
      postprocess: () => 'either',
    },
    {
      name: 'Kind',
      symbols: [{ literal: '<--' }, '_'],
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
      symbols: ['Attributes$ebnf$1', 'Attributes$ebnf$2', 'Attributes$ebnf$3'],
      postprocess: function(d, _, reject) {
        const [id, labels, record] = d;
        if (id || labels || record) {
          return { id, labels, record };
        } else return reject;
      },
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
      symbols: [
        lexer.has('identifier') ? { type: 'identifier' } : identifier,
        '_',
      ],
      postprocess: text,
    },
    { name: 'Identity', symbols: [{ literal: 'ø' }, '_'], postprocess: text },
    {
      name: 'Identity',
      symbols: [lexer.has('symbol') ? { type: 'symbol' } : symbol, '_'],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [lexer.has('integer') ? { type: 'integer' } : integer, '_'],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [lexer.has('octal') ? { type: 'octal' } : octal, '_'],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [
        lexer.has('hexadecimal') ? { type: 'hexadecimal' } : hexadecimal,
        '_',
      ],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [
        lexer.has('measurement') ? { type: 'measurement' } : measurement,
        '_',
      ],
      postprocess: text,
    },
    {
      name: 'Identity',
      symbols: [
        lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,
        '_',
      ],
      postprocess: ([t]) => t.text.slice(1, -1),
    },
    {
      name: 'Symbol',
      symbols: [lexer.has('symbol') ? { type: 'symbol' } : symbol, '_'],
      postprocess: text,
    },
    {
      name: 'Symbol',
      symbols: [
        lexer.has('tickedString') ? { type: 'tickedString' } : tickedString,
        '_',
      ],
      postprocess: ([t]) => t.text.slice(1, -1),
    },
    {
      name: 'Record',
      symbols: [{ literal: '{' }, '_', { literal: '}' }, '_'],
      postprocess: empty,
    },
    { name: 'Record$ebnf$1', symbols: [] },
    {
      name: 'Record$ebnf$1$subexpression$1',
      symbols: [{ literal: ',' }, '_', 'Property'],
      postprocess: ([, , p]) => p,
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
        '_',
      ],
      postprocess: ([, , p, ps]) => g.propertiesToRecord([p, ...ps]),
    },
    {
      name: 'Property',
      symbols: ['Symbol', { literal: ':' }, '_', 'Value'],
      postprocess: ([k, , , v]) => g.property(k, v),
    },
    { name: 'Value', symbols: ['StringLiteral', '_'], postprocess: id },
    { name: 'Value', symbols: ['NumericLiteral', '_'], postprocess: id },
    {
      name: 'Value',
      symbols: [lexer.has('boolean') ? { type: 'boolean' } : boolean, '_'],
      postprocess: d => g.boolean(JSON.parse(d[0].value.toLowerCase())),
    },
    { name: 'Value$ebnf$1', symbols: [] },
    {
      name: 'Value$ebnf$1$subexpression$1',
      symbols: [{ literal: ',' }, '_', 'Value'],
      postprocess: ([, , v]) => v,
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
        '_',
      ],
      postprocess: ([, , v, vs]) => [v, ...vs],
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
    {
      name: '_$ebnf$1',
      symbols: [lexer.has('whitespace') ? { type: 'whitespace' } : whitespace],
      postprocess: id,
    },
    { name: '_$ebnf$1', symbols: [], postprocess: () => null },
    { name: '_', symbols: ['_$ebnf$1'], postprocess: empty },
    {
      name: 'Comment',
      symbols: [
        lexer.has('lineComment') ? { type: 'lineComment' } : lineComment,
      ],
      postprocess: empty,
    },
    { name: 'EOL', symbols: [{ literal: '\n' }], postprocess: empty },
  ],
  ParserStart: 'GramSeq',
};

export default grammar;
