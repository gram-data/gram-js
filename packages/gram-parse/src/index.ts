import unified from 'unified';
import gramParserPlugin from './gram-parser-plugin';
import * as gramTypes from '@gram-data/gram-ast';

export * as errors from './gram-errors';

export const parse = (src:string) => {
  const processor = unified().use(gramParserPlugin).freeze();
  return processor.parse(src) as gramTypes.GramPathSeq;
}

export default gramParserPlugin