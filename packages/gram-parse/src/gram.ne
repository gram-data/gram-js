@preprocessor typescript

@{% 
import moo from 'moo';
import * as g from '@gram-data/gram-builder';
import {tokens} from '@gram-data/gram-ast';

let lexer = moo.compile({
    whitespace: {match: /\s+/, lineBreaks: true},
    lineComment: {match:/\/\/.*?\n?$/},
    hexadecimal: tokens.hexadecimal,
    octal: tokens.octal,
    measurement: tokens.measurement,
    decimal: tokens.decimal,
    integer: tokens.integer,
    taggedString: {match: tokens.taggedString},
    boolean: [ 'true', 'TRUE', 'True', 'false', 'FALSE', 'False' ],
    symbol: tokens.symbol,
    identifier: tokens.identifier,
    doubleQuotedString: {match:tokens.doubleQuotedString, value: (s:string) => s.slice(1,-1)},
    singleQuotedString: {match:tokens.singleQuotedString, value: (s:string) => s.slice(1,-1)},
    tickedString:       {match:tokens.tickedString,       value: (s:string) => s.slice(1,-1)},
    '-->':'-->',
    '--':'--',
    '<--':'<--',
    '-[]->':'-[]->',
    '-[]-':'-[]-',
    '<-[]-':'<-[]-',
    '<-[':'<-[',
    ']->':']->',
    '-[':'-[',
    ']-':']-',
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    '(': '(',
    ')': ')',
    ',': ',',
    ':': ':',
    '`': '`',
    '\'': '\'',
    'ø': 'ø'
}) as unknown as NearleyLexer

%}

@lexer lexer

# Gram -> (Path | Comment):*

# GramSeq is a sequence of paths
GramSeq -> _ (Path {% ([pp]) => pp %}):+ {% ([,pp]) => g.seq( g.flatten(pp) ) %}

# Paths are a generalization of nodes and edges
Path ->
    NodePattern     {% id %}
  | PathComposition {% id %}
  | PathPair        {% id %}

# NodePattern is cypher-like (node1)-[edge]->(node2)
NodePattern ->
    Node _ Edge _ NodePattern
      {% ([n,,es,,np]) => g.cons([n,np], {kind:es.kind, id:es.id, labels:es.labels, record:es.record} ) %}
  | Node {% id %}

Node ->
  "(" _ Attributes:? ")" _
    {% ([,,attrs]) => attrs ? g.node(attrs.id, attrs.labels, attrs.record) : g.node() %}

Edge ->
    "-[" _ Attributes:? "]->" _  
              {% ([,,attrs]) => ({kind:'right', ...attrs}) %}
  | "-[" _ Attributes:? "]-" _   
              {% ([,,attrs]) => ({kind:'either', ...attrs}) %}
  | "<-[" _ Attributes:? "]-" _  
              {% ([,,attrs]) => ({kind:'left', ...attrs}) %}
  | "-[]->" _ {% () => ({kind:'right'}) %}
  | "-[]-"  _ {% () => ({kind:'either'}) %}
  | "<-[]-" _ {% () => ({kind:'left'}) %}
  | "-->"   _ {% () => ({kind:'right'}) %}
  | "--"    _ {% () => ({kind:'either'}) %}
  | "<--"   _ {% () => ({kind:'left'}) %}

PathComposition -> 
    PathPoint       {% id %}
  | PathAnnotation  {% id %}
  | PathExpression  {% id %}

PathPoint ->
  "[" _ Attributes:? "]" _
    {% ([,,attr]) => {
      if ( attr && (attr.id || attr.labels || attr.record) && attr.id !== 'ø' ) {
        // console.log(attr);
        return g.node(attr.id, attr.labels, attr.record)
      } else {
        return g.empty();
      }
    }
    %}

PathAnnotation ->
  "[" _ Attributes:? Path "]" _
    {% ([,,attr,lhs]) => {
      // console.log('annotate()', lhs)
      return g.cons( [lhs], attr ? {id:attr.id, labels:attr.labels, record:attr.record} : {}) 
    }
    %}

PathExpression -> 
  "[" _ Attributes:? Kind:? Path Path "]" _
    {% ([,,attrs,kind,lhs,rhs]) => {
      return g.cons( [lhs,rhs], {kind, id:attrs.id, labels:attrs.labels, record:attrs.record}) 
    }
    %}

PathPair ->
  (NodePattern | PathComposition) "," _ Path
    {% ([lp,,,rp]) => g.pair([lp[0],rp] ) %}

Kind ->
    ","   _ {% () => ('pair') %}
  | "-->" _ {% () => ('right') %}
  | "--"  _ {% () => ('either') %}
  | "<--" _ {% () => ('left') %}

Attributes -> Identity:? LabelList:? Record:? 
    {% function (d,_,reject) {
      const [id,labels,record] = d;
      if (id || labels || record) {
        return {id, labels, record}
      } else return reject;
    }
    %}

LabelList -> 
  Label:+ {% ([labels]) => labels %}

Label -> ":" Symbol {% ([,label]) => label %}

Identity -> 
    %identifier   _ {% text %}
  | "ø"           _ {% text %}
  | %symbol       _ {% text %}
  | %integer      _ {% text %}
  | %octal        _ {% text %}
  | %hexadecimal  _ {% text %}
  | %measurement  _ {% text %}
  | %tickedString _ {% ([t]) => t.text.slice(1,-1) %}

Symbol -> 
    %symbol       _ {% text %}
  | %tickedString _ {% ([t]) => t.text.slice(1,-1) %}

Record -> 
    "{" _ "}" _ {% empty  %}
  | "{" _ Property ("," _ Property {% ([,,p]) => p %}):* "}" _ {% ([,,p,ps]) =>  [p, ...ps] %}

Property -> Symbol ":" _ Value {% ([k,,,v]) => g.property(k,v) %}

# Key -> Symbol {% id %}

Value -> 
    StringLiteral _   {% id %}
  | NumericLiteral _  {% id %}
  | %boolean _        {% (d) => g.boolean(JSON.parse(d[0].value.toLowerCase())) %}
  | "[" _ Value ("," _ Value {% ([,,v]) => v %}):* "]" _ {% ([,,v,vs]) => ([v, ...vs]) %}

StringLiteral -> 
    %singleQuotedString {% (d) => g.string(d[0].value) %}
  | %doubleQuotedString {% (d) => g.string(d[0].value) %}
  | %tickedString       {% (d) => g.string(d[0].value) %}
  | %taggedString       {% (d) => {
      const parts = separateTagFromString(d[0].value);
      return g.tagged(parts.tag, parts.value) 
    }%}

NumericLiteral -> 
    %integer      {% (d) => g.integer(d[0].value) %}
  | %decimal      {% (d) => g.decimal(d[0].value) %}
  | %hexadecimal  {% (d) => g.hexadecimal(d[0].value) %}
  | %octal        {% (d) => g.octal(d[0].value) %}
  | %measurement  {% (d) => {
      const parts = separateNumberFromUnits(d[0].value);
    return g.measurement(parts.unit, parts.value) 
  }%}


#
#  Whitespace and comments
#
_ -> %whitespace:? {% empty %}

# Comment -> %lineComment [\n]:? {% empty %}
Comment -> %lineComment {% empty %}

EOL -> "\n" {% empty %}

@{%

const empty = () => null;

const text =([token]:Array<any>):string => token.text;

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

function separateTagFromString(taggedStringValue:string) {
  let valueParts = taggedStringValue.match(/([^`]+)`(.+)`$/);
  if (valueParts === null || valueParts === undefined) throw Error(`Malformed tagged string: ${taggedStringValue}`) 
  return {
    tag: valueParts![1],
    value: valueParts![2]
  }
}


function separateNumberFromUnits(measurementValue:string) {

  let valueParts = measurementValue.match(/(-?[0-9.]+)([a-zA-Z]+)/);
  if (valueParts === null || valueParts === undefined) throw Error(`Malformed measurement : ${measurementValue}`) 
  return {
    value: valueParts![1],
    unit: valueParts![2],
  }
}
%}