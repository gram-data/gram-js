import unified from 'unified';
import * as ast from '@gram-data/gram-ast';
import * as builder from '@gram-data/gram-builder';
import * as identity from '@gram-data/gram-identity';
import * as parser from '@gram-data/gram-parse';
import * as ops from '@gram-data/gram-ops';
import * as value from '@gram-data/gram-value';
import * as stringify from '@gram-data/gram-stringify';

import { gramParserPlugin } from '@gram-data/gram-parse';
import * as gramPresetBasic from '@gram-data/gram-preset-basic';

const gramProcessor = unified()
  .use(gramParserPlugin)
  .use(gramPresetBasic);

export { ast, builder, identity, parser, ops, value, stringify };

export default gramProcessor;