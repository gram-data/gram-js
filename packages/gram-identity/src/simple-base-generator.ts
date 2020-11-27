import { IDGenerator, alphabets } from './gram-identity';

import { convertBase } from 'simple-base-converter';

/**
 * Creates an IDGenerator based an alphabet progression
 * (like counting numbers with an alternative encoding).
 *
 * @see [power-radix](https://github.com/cflynn07/power-radix)
 * @see [bigint-buffer](https://github.com/no2chem/bigint-buffer)
 *
 */
export const simpleBaseIDGenerator = (
  alphabet: string = alphabets.crock32,
  prefix?: string
): IDGenerator => {
  const one = BigInt(1);
  let nextid = BigInt(0);

  return {
    generate: () => {
      const id = convertBase(nextid.toString(), 10, alphabet);
      nextid = nextid + one;
      return prefix ? prefix + id : id;
    },
  };
};
