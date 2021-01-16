import unified from 'unified';
import gramParserPlugin from './gram-parser-plugin';
import * as gramTypes from '@gram-data/gram-ast';

import * as errors from './gram-errors';

const toAST = (src: string) => {
  const processor = unified()
    .use(gramParserPlugin)
    .freeze();
  return processor.parse(src) as gramTypes.GramSeq;
};
export { toAST, gramParserPlugin, errors };
