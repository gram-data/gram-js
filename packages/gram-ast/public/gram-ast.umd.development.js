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
    identifier: identifier
  };

  /**
   * # Gram AST Types
   *
   * These AST elements
   *
   * References:
   *
   * - [unist](https://github.com/syntax-tree/unist) - Universal Synax Tree
   * - [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
   * @packageDocumentation
   */
  ///////////////////////////////////////////////////////////////////////////////
  // Pathlike types...

  /**
   * Identity of all units.
   */
  var UNIT_ID = '0';
  /**
   * Type guard for GramUnit.
   *
   * @param o any object
   */

  var isGramUnit = function isGramUnit(o) {
    return !!o.type && o.type === 'unit';
  };
  /**
   * Type guard for GramNode.
   *
   * @param o any object
   */

  var isGramNode = function isGramNode(o) {
    return !!o.type && o.type === 'node';
  };
  /**
   * Type guard for GramEdge.
   *
   * @param o any object
   */

  var isGramEdge = function isGramEdge(o) {
    return 'type' in o && 'relation' in o && o.type === 'edge';
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
   * Type guard for GramPathSequence.
   *
   * @param o any object
   */

  var isGramPathSequence = function isGramPathSequence(o) {
    return !!o.type && o.type === 'seq';
  };
  var isGramPathlike = function isGramPathlike(o) {
    return isGramUnit(o) || isGramNode(o) || isGramEdge(o) || isGramPath(o) || isGramPathSequence(o);
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
   * Type guard for GramPathSequence.
   *
   * @param o any object
   */

  var isLiteral = function isLiteral(o) {
    return !!o.type && !!o.value;
  };
  /**
   * Type guard for GramPathSequence.
   *
   * @param o any object
   */

  var isBooleanLiteral = function isBooleanLiteral(o) {
    return !!o.type && !!o.value && o.type === 'boolean';
  };
  /**
   * Type guard for GramPathSequence.
   *
   * @param o any object
   */

  var isStringLiteral = function isStringLiteral(o) {
    return !!o.type && !!o.value && o.type === 'string';
  };
  /**
   * Type guard for GramPathSequence.
   *
   * @param o any object
   */

  var isTaggedLiteral = function isTaggedLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged';
  };
  /**
   * Type guard for GramPathSequence.
   *
   * @param o any object
   */

  var isIntegerLiteral = function isIntegerLiteral(o) {
    return !!o.type && !!o.value && o.type === 'integer';
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
   * Type guard for DateLiteral.
   *
   * @param o any object
   */

  var isDateLiteral = function isDateLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'date';
  };
  /**
   * Type guard for GeospatialLiteral.
   *
   * @param o any object
   */

  var isGeospatialLiteral = function isGeospatialLiteral(o) {
    return !!o.type && !!o.value && !!o.tag && o.type === 'tagged' && o.tag === 'geo';
  };

  exports.UNIT_ID = UNIT_ID;
  exports.isBooleanLiteral = isBooleanLiteral;
  exports.isDateLiteral = isDateLiteral;
  exports.isDecimalLiteral = isDecimalLiteral;
  exports.isGeospatialLiteral = isGeospatialLiteral;
  exports.isGramEdge = isGramEdge;
  exports.isGramNode = isGramNode;
  exports.isGramPath = isGramPath;
  exports.isGramPathSequence = isGramPathSequence;
  exports.isGramPathlike = isGramPathlike;
  exports.isGramProperty = isGramProperty;
  exports.isGramUnit = isGramUnit;
  exports.isHexadecimalLiteral = isHexadecimalLiteral;
  exports.isIntegerLiteral = isIntegerLiteral;
  exports.isLiteral = isLiteral;
  exports.isMeasurementLiteral = isMeasurementLiteral;
  exports.isOctalLiteral = isOctalLiteral;
  exports.isStringLiteral = isStringLiteral;
  exports.isTaggedLiteral = isTaggedLiteral;
  exports.tokens = gramTokens;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-ast.umd.development.js.map
