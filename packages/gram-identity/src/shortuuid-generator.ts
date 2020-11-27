import { IDGenerator } from '.';
const short = require('short-uuid');

/**
 * Factory for creating an IDGenerator based on
 * [short-uuid](https://github.com/oculus42/short-uuid)
 *
 */
export const shortUUIDGenerator = (
  alphabet?: string,
  opt?: any
): IDGenerator => {
  return short(alphabet, opt);
};
