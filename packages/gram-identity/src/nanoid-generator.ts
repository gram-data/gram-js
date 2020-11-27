import { customAlphabet } from 'nanoid';
import { alphabets, IDGenerator } from '../src/gram-identity';

/**
 * Factory for creating an IDGenerator based on
 * [nanoid](https://github.com/ai/nanoid)
 *
 */
export const nanoidGenerator = (
  alphabet: string = alphabets.base64,
  size: number = 21,
  prefix?: string
): IDGenerator => {
  const generator = customAlphabet(alphabet, size);
  return {
    generate: () => {
      return prefix ? prefix + generator() : generator();
    },
  };
};
