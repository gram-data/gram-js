export const boolean = /true|false|TRUE|FALSE\b(?!@)/;
export const hexadecimal = /-?0x(?:[0-9a-fA-F]+)\b(?!@)/;
export const octal = /-?0(?:[0-7]+)\b(?!@)/;
export const measurement = /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?[a-zA-Z]+\b(?!@)/;
export const decimal = /-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][-+]?[0-9]+)?\b(?!@)/;
export const integer = /-?(?:[0-9]|[1-9][0-9]+)(?:[eE][-+]?[0-9]+)?\b(?!@)/;
export const taggedString = /[a-zA-Z][0-9a-zA-Z_@]*`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/;
export const doubleQuotedString = /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/;
export const singleQuotedString = /'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/;
export const tickedString = /`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/;
export const symbol = /[a-zA-Z_][0-9a-zA-Z_]*\b(?!@)/;
export const identifier = /[0-9a-zA-Z_@]+\b@*/;

const checkIdentifierRegex = new RegExp('^' + identifier.source + '$');

/**
 * Checks whether the given string is a valid identifier.
 *
 */

export const isValidIdentifier = (s?: string) =>
  s && checkIdentifierRegex.test(s);
