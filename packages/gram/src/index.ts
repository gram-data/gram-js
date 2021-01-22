/**
 * gram package.
 *
 * @packageDocumentation
 */

import unified from 'unified';
import { VFileCompatible } from 'vfile';
import { GramSeq } from '@gram-data/gram-ast';
import { gramParserPlugin } from '@gram-data/gram-parse';
import * as gramPresetBasic from '@gram-data/gram-preset-basic';
export { toGram } from '@gram-data/gram-stringify';

const processor = (): unified.Processor => {
  return unified()
    .use(gramParserPlugin)
    .use(gramPresetBasic);
};

/**
 * Parse text into an ast.
 * @param src gram formatted text
 */
export const parse = (src: VFileCompatible): GramSeq =>
  processor().runSync(processor().parse(src)) as GramSeq;

export default {
  parse,
  // toGram,
};
