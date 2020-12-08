(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.ast = {})));
}(this, (function (exports) { 'use strict';

  var _boolean = /true|false|TRUE|FALSE\b(?!@)/;
  var hexadecimal = /-?0x(?:[0-9a-fA-F]+)\b(?!@)/;
  var octal = /-?0(?:[0-7]+)\b(?!@)/;
  var measurement = /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?[a-zA-Z]+\b(?!@)/;
  var decimal = /-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][-+]?[0-9]+)?\b(?!@)/;
  var integer = /-?(?:[0-9]|[1-9][0-9]+)(?:[eE][-+]?[0-9]+)?\b(?!@)/;
  var taggedString = /[a-zA-Z][0-9a-zA-Z_@]*`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/;
  var doubleQuotedString = /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/;
  var singleQuotedString = /'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/;
  var tickedString = /`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/;
  var symbol = /[a-zA-Z_][0-9a-zA-Z_]*\b(?!@)/;
  var identifier = /[0-9a-zA-Z_@]+\b@*/;
  var checkIdentifierRegex = /*#__PURE__*/new RegExp('^' + identifier.source + '$');
  /**
   * Checks whether the given string is a valid identifier.
   *
   */

  var isValidIdentifier = function isValidIdentifier(s) {
    return s && checkIdentifierRegex.test(s);
  };

  var gramTokens = {
    __proto__: null,
    boolean: _boolean,
    hexadecimal: hexadecimal,
    octal: octal,
    measurement: measurement,
    decimal: decimal,
    integer: integer,
    taggedString: taggedString,
    doubleQuotedString: doubleQuotedString,
    singleQuotedString: singleQuotedString,
    tickedString: tickedString,
    symbol: symbol,
    identifier: identifier,
    isValidIdentifier: isValidIdentifier
  };

  /**
   * # Gram AST Types
   *
   * References:
   *
   * - [unist](https://github.com/syntax-tree/unist) - Universal Synax Tree
   * - [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
   * @packageDocumentation
   */
  /**
   * Type guard for GramSeq.
   *
   * @param o any object
   */

  var isGramSeq = function isGramSeq(o) {
    return !!o.type && o.type === 'seq';
  };
  /**
   * Type guard for a Path.
   *
   * @param o any object
   */

  var isGramPath = function isGramPath(o) {
    return !!o.type && o.type === 'path';
  };
  /**
   * Constant identity for empty paths: `ø`.
   */

  var EMPTY_PATH_ID = 'ø';
  /**
   * Type guard for GramEmptyPath.
   *
   * @param o any object
   */

  var isGramEmptyPath = function isGramEmptyPath(o) {
    return isGramPath(o) && o.id === EMPTY_PATH_ID;
  };
  /**
   * Type guard for GramNode.
   *
   * @param o any object
   */

  var isGramNode = function isGramNode(o) {
    return isGramPath(o) && o.children && o.children.length === 0 && o.id !== EMPTY_PATH_ID;
  };
  /**
   * Type guard for GramEdge.
   *
   * @param o any object
   */

  var isGramEdge = function isGramEdge(o) {
    return isGramPath(o) && o.kind !== undefined && o.kind !== 'pair' && o.children !== undefined && o.children.every(function (child) {
      return isGramNode(child);
    });
  };
  /**
   * A type guard to narrow a GramRecordValue to a GramRecord,
   * which is a GramProperty[].
   *
   * @param v any GramRecordValue
   */

  var isGramRecord = function isGramRecord(v) {
    return Array.isArray(v) && isGramProperty(v[0]);
  };
  var isGramLiteralArray = function isGramLiteralArray(v) {
    return Array.isArray(v) && isLiteral(v[0]);
  };
  /**
   * Type guard for GramProperty.
   *
   * @param o any object
   */

  var isGramProperty = function isGramProperty(o) {
    return !!o.type && o.type === 'property';
  };
  /**
   * Type guard for GramLiteral.
   *
   * @param o any object
   */

  var isLiteral = function isLiteral(o) {
    return !!o.type && !!o.value && o.type !== 'property';
  };
  /**
   * Type guard for BooleanLiteral.
   *
   * @param o any object
   */

  var isBooleanLiteral = function isBooleanLiteral(o) {
    return !!o.type && !!o.value && o.type === 'boolean';
  };
  /**
   * Type guard for StringLiteral.
   *
   * @param o any object
   */

  var isStringLiteral = function isStringLiteral(o) {
    return !!o.type && !!o.value && o.type === 'string';
  };
  /**
   * Type guard for IntegerLiteral.
   *
   * @param o any object
   */

  var isIntegerLiteral = function isIntegerLiteral(o) {
    return !!o.type && !!o.value && o.type === 'integer';
  };
  /**
   * Type guard for DecimalLiteral.
   *
   * @param o any object
   */

  var isDecimalLiteral = function isDecimalLiteral(o) {
    return !!o.type && !!o.value && o.type === 'decimal';
  };
  /**
   * Type guard for HexadecimalLiteral.
   *
   * @param o any object
   */

  var isHexadecimalLiteral = function isHexadecimalLiteral(o) {
    return !!o.type && !!o.value && o.type === 'hexadecimal';
  };
  /**
   * Type guard for OctalLiteral.
   *
   * @param o any object
   */

  var isOctalLiteral = function isOctalLiteral(o) {
    return !!o.type && !!o.value && o.type === 'octal';
  };
  /**
   * Type guard for MeasurementLiteral.
   *
   * @param o any object
   */

  var isMeasurementLiteral = function isMeasurementLiteral(o) {
    return !!o.type && !!o.value && !!o.unit && o.type === 'measurement';
  };
  /**
   * Type guard for TaggedTextLiteral.
   *
   * @param o any object
   */

  var isTaggedLiteral = function isTaggedLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged';
  };
  /**
   * Type guard for DateLiteral.
   *
   * Note: this does not validate the text representation.
   *
   * @param o any object
   */

  var isDateLiteral = function isDateLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'date';
  };
  /**
   * Type guard for TimeLiteral.
   *
   * Note: this does not validate the text representation.
   *
   * @param o any object
   */

  var isTimeLiteral = function isTimeLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'time';
  };
  /**
   * Type guard for DateTimeLiteral.
   *
   * Note: this does not validate the text representation.
   *
   * @param o any object
   */

  var isDateTimeLiteral = function isDateTimeLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'datetime';
  };
  /**
   * Type guard for DurationLiteral.
   *
   * Note: this does not validate the text representation.
   *
   * @param o any object
   */

  var isDuration = function isDuration(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'duration';
  };
  /**
   * Type guard for TimeIntervalLiteral.
   *
   * Note: this does not validate the text representation.
   *
   * @param o any object
   */

  var isTimeInterval = function isTimeInterval(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'interval';
  };
  /**
   * Type guard for WellKnownTextLiteral.
   *
   * @param o any object
   */

  var isWellKnownTextLiteral = function isWellKnownTextLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'wkt';
  };
  /**
   * Type guard for UriLiteral.
   *
   * @param o any object
   */

  var isUriLiteral = function isUriLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'uri';
  };

  exports.EMPTY_PATH_ID = EMPTY_PATH_ID;
  exports.isBooleanLiteral = isBooleanLiteral;
  exports.isDateLiteral = isDateLiteral;
  exports.isDateTimeLiteral = isDateTimeLiteral;
  exports.isDecimalLiteral = isDecimalLiteral;
  exports.isDuration = isDuration;
  exports.isGramEdge = isGramEdge;
  exports.isGramEmptyPath = isGramEmptyPath;
  exports.isGramLiteralArray = isGramLiteralArray;
  exports.isGramNode = isGramNode;
  exports.isGramPath = isGramPath;
  exports.isGramProperty = isGramProperty;
  exports.isGramRecord = isGramRecord;
  exports.isGramSeq = isGramSeq;
  exports.isHexadecimalLiteral = isHexadecimalLiteral;
  exports.isIntegerLiteral = isIntegerLiteral;
  exports.isLiteral = isLiteral;
  exports.isMeasurementLiteral = isMeasurementLiteral;
  exports.isOctalLiteral = isOctalLiteral;
  exports.isStringLiteral = isStringLiteral;
  exports.isTaggedLiteral = isTaggedLiteral;
  exports.isTimeInterval = isTimeInterval;
  exports.isTimeLiteral = isTimeLiteral;
  exports.isUriLiteral = isUriLiteral;
  exports.isWellKnownTextLiteral = isWellKnownTextLiteral;
  exports.tokens = gramTokens;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-ast.umd.development.js.map
