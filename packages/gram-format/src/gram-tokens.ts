export const RE = {
  boolean: /true|false|TRUE|FALSE\b(?!@)/,
  hexadecimal: /-?0x(?:[0-9a-fA-F]+)\b(?!@)/,
  octal: /-?0(?:[0-7]+)\b(?!@)/,
  measurement: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?[a-zA-Z]+\b(?!@)/,
  decimal: /-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][-+]?[0-9]+)?\b(?!@)/,
  integer: /-?(?:[0-9]|[1-9][0-9]+)(?:[eE][-+]?[0-9]+)?\b(?!@)/,
  taggedString: /[a-zA-Z][0-9a-zA-Z_@]*`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/,
  doubleQuotedString: /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  singleQuotedString: /'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,
  tickedString: /`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/,
  symbol: /[a-zA-Z_][0-9a-zA-Z_]*\b(?!@)/,
  identifier: /[0-9a-zA-Z_@]+\b@*/,
};

export default {
  RE,
};
