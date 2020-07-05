import unified from 'unified';

import parse from './gram-parser-plugin';
import stringify from './gram-stringify-plugin';

export default unified()
  .use(parse)
  .use(stringify)
  .freeze();
