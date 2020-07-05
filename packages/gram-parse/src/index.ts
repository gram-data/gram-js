import unified from 'unified';
import gramParserPlugin from './gram-parser-plugin';
import * as gramTypes from '@gram-data/gram-ast';

import * as errors from './gram-errors';

const parse = (src: string) => {
  const processor = unified()
    .use(gramParserPlugin)
    .freeze();
  return processor.parse(src) as gramTypes.GramPathSeq;
};
export { parse, gramParserPlugin, errors };

export default gramParserPlugin;
