import unified from 'unified';

import parse from '@gram-data/gram-parse';
import stringify from '@gram-data/gram-stringify';

export default unified()
  .use(parse)
  .use(stringify)
  .freeze();
