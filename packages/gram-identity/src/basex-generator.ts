import { IDGenerator, alphabets } from './gram-identity';

import {toBufferBE} from 'bigint-buffer';
const basex = require('base-x');

/**
 * Creates an IDGenerator based an alphabet progression
 * (like counting numbers with an alternative encoding).
 * 
 * @see [base-x](https://github.com/cryptocoinjs/base-x)
 * @see [bigint-buffer](https://github.com/no2chem/bigint-buffer)
 *
 */
export const basexIDGenerator = (alphabet:string = alphabets.crock32, prefix?:string):IDGenerator => {
  const one = BigInt(1);
  let nextid = BigInt(0);
  const generator = basex(alphabet);
  return {
    generate: () => {
      const id = generator.encode(toBufferBE(nextid, 8))
      nextid = nextid + one;
      return prefix ? prefix + id : id;
    }
  }
};
