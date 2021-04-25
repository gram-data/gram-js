/**
 * gram package.
 *
 * @packageDocumentation
 */

import unified from 'unified';
import { VFileCompatible } from 'vfile';
import { GramSeq } from './ast';
import { gramParserPlugin } from './parser';
// import * as gramPresetBasic from '@gram-data/gram-preset-basic';
import { toGram } from './stringify';

const gramProcessor = (): unified.Processor => {
  return unified().use(gramParserPlugin);
  // .use(gramPresetBasic);
};

/**
 * Parse text into an ast.
 * @param src gram formatted text
 */
export const parse = (src: VFileCompatible): GramSeq =>
  gramProcessor().runSync(gramProcessor().parse(src)) as GramSeq;

export { toGram };

const processor = {
  parse,
  toGram,
};

export default processor;
