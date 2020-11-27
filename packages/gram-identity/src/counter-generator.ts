import { IDGenerator } from '.';

/**
 * Creates an IDGenerator based on incrementing numbers.
 *
 */
export const counterIDGenerator = (prefix?: string): IDGenerator => {
  let nextid = 0;
  return {
    generate: () => `${prefix || ''}${nextid++}`,
  };
};
