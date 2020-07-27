import unified from 'unified';

import { gramParserPlugin } from '@gram-data/gram-parse';
import { gramStringifyPlugin } from '@gram-data/gram-stringify';

export default unified()
  .use(gramParserPlugin)
  .use(gramStringifyPlugin);
// .freeze();
