import unified from 'unified';
import { VFileCompatible } from 'vfile';

import * as ast from '@gram-data/gram-ast';
import {GramSeq} from '@gram-data/gram-ast';
import * as builder from '@gram-data/gram-builder';
import * as identity from '@gram-data/gram-identity';
import * as parser from '@gram-data/gram-parse';
import * as ops from '@gram-data/gram-ops';
import * as value from '@gram-data/gram-value';
import * as stringify from '@gram-data/gram-stringify';

import { gramParserPlugin } from '@gram-data/gram-parse';
import * as gramPresetBasic from '@gram-data/gram-preset-basic';

export const processor = unified()
  .use(gramParserPlugin)
  .use(gramPresetBasic);

export { ast, builder, identity, parser, ops, value, stringify };

const parseAndApplyPlugins = (src: VFileCompatible):GramSeq => processor.runSync(processor.parse(src)) as GramSeq

export default {
  parse: parseAndApplyPlugins,
  stringify: stringify.toGram
}