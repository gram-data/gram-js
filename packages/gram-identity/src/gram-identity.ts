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

/**
 * Identifier function which produces a pseudo-random, short identifier.
 *
 */
export const shortID = shortid.generate;
