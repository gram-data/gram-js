import {ParserFunction, Plugin} from 'unified'
// import {Node as UnistNode} from 'unist';
import {VFile} from 'vfile'
import * as nearley from 'nearley';

import grammar from './gram-grammar'
import * as errors from './gram-errors';

import { Point } from 'unist';
import { LexerState } from 'nearley';
import { Token } from 'moo';

const lexerLocation = (state:LexerState):Point => {
  return {
    line:state.line,
    column:state.col
  }
}

const tokenLocation = (token:Token) => {
  return {
    line:token.line,
    column:token.col
  }
}


export const parse:ParserFunction = (text: string, file: VFile) => {
  const nearleyParser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  try {
    const parsed = nearleyParser.feed(text);
    if (parsed.results[0] === undefined && parsed.lexerState) {
      const location = lexerLocation(parsed.lexerState)
      file.fail(errors.INCOMPLETE_PARSE, location);
    }
    return parsed.results[0] || {type:'error'};  
  } catch (e) {
    const location = (e.token) ? tokenLocation(e.token) : {line:0,column:0};
    file.fail(e.message, location)
  }
}
export interface GramParserSettings {
  strict: boolean
}


const gramParserPlugin:Plugin<GramParserSettings[]> = function() {
  this.Parser = parse
}

export default gramParserPlugin