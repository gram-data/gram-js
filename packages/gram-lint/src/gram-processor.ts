import unified from 'unified';

import { Parser, Stringify } from '@gram-data/gram';

export default unified()
  .use(Parser.gramParserPlugin)
  .use(Stringify.gramStringifyPlugin);
// .freeze();
