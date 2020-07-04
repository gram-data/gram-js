/**
 * Utility functions for Gram element identifiers.
 *
 * @packageDocumentation
 */

import baseX from 'base-x';
import tokens from './gram-tokens';

const shortid = require('shortid');

export const alphabets = {
  base2: '01',
  base8: '01234567',
  base10: '0123456789',
  base11: '0123456789a',
  base16: '0123456789abcdef',
  base32: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  zBase32: 'ybndrfg8ejkmcpqxot1uwisza345h769',
  crock32: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
  base32Hex: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  base36: '0123456789abcdefghijklmnopqrstuvwxyz',
  base58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
  base62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  base64: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@',
};

shortid.characters(alphabets.base64);

const checkIdentifierRegex = new RegExp('^' + tokens.RE.identifier.source + '$');

/**
 * Checks whether the given string is a valid identifier.
 *
 */
export const isValidIdentifier = checkIdentifierRegex.test.bind(checkIdentifierRegex);

/**
 *
 * @param n Converted to fixed-point number with no decimals.
 */
export const decodeInteger = (n: number) => {
  const base10 = baseX(alphabets.base10);
  if (n > Number.MAX_SAFE_INTEGER) throw Error('Value cannot exceed Number.MAX_SAFE_INTEGER.');
  return base10.decode(n.toFixed(0));
};

export const integerToBase = (alphabet: string, n: number) => {
  return baseX(alphabet).encode(decodeInteger(n));
};

export const integerToBaseID = (alphabet: string, n: number) => {
  return '_' + baseX(alphabet).encode(decodeInteger(n));
};

/**
 * Convert an arbitrary length base-10 integer literal into valid identifier in another base representation.
 *
 * @param alphabet alphabet for base-x output
 * @param n base-10 numeric string input
 */
export const integerLiteralToBaseID = (alphabet: string, n: string) => {
  return '_' + baseX(alphabet).encode(baseX(alphabets.base10).decode(n));
};

/**
 * Identifier function which produces a pseudo-random, short identifier.
 *
 */
export const shortID = shortid.generate;

/**
 * Identifier function
 *
 * @param i
 */
export const base36ID = (i: number) => `_${i.toString(36)}`;

export const idFunctionNamed = (idType: string) => {
  return idType === 'number'
    ? (i: number) => `${i}`
    : idType === 'shortid'
    ? (_: number) => shortID()
    : idType === 'base36'
    ? base36ID
    : // : idType === 'base58'
      // ? base58ID
      (_i: number) => '';
};

/**
 * Encodes the id to be valid, mapping:
 *
 * - [whitespace, period, comma, single and double quotes] --> '_'
 * - [all remainining non-valid identifier characters] --> '@'
 */
export const idEncoder = (idToEncode?: string): string => {
  return idToEncode === undefined
    ? ''
    : isValidIdentifier(idToEncode)
    ? idToEncode
    : idToEncode.replace(/[\s.,'"]/gi, '_').replace(/[^_0-9a-zA-Z]/gi, '@');
};

// const nodeRecordLens = Lens.fromProp<Node>()('record').asOptional();

// const isNonArrayLiteral = (l:Literal|Literal[]): l is Literal =>
//     (l !== undefined) && (!Array.isArray(l))

// const literalValueLens = new Optional<Literal|Literal[],string>(
//     (l:Literal|Literal[]) => isNonArrayLiteral(l) ? some(l.value) : none,
//     value => literal => ({...literal, value}))

// export const optionalPropertyValueFromNode = (key:string) => {
//     return nodeRecordLens
//     .compose(Lens.fromProp<Record>()(key))
//     .asOptional()
//     .compose(literalValueLens).getOption
// }

export default {
  alphabets,
  isValidIdentifier,
  shortID,
  base36ID,
  idFunctionNamed,
  idEncoder,
  integerLiteralToBaseID,
};
