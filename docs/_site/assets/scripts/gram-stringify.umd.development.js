(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.stringify = {})));
}(this, (function (exports) { 'use strict';

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

  var isGramLiteralArray = function isGramLiteralArray(v) {
    return Array.isArray(v) && isLiteral(v[0]);
  };
  /**
   * Type guard for GramLiteral.
   *
   * @param o any object
   */


  var isLiteral = function isLiteral(o) {
    return !!o.type && !!o.value && o.type !== 'property';
  };

  var isEmpty = function isEmpty(o) {
    return Object.keys(o).length === 0;
  };

  function assertNever(x) {
    throw new Error('Unexpected object: ' + x);
  }

  var toStringLiteral = function toStringLiteral(l) {
    switch (l.type) {
      case 'integer':
      case 'boolean':
      case 'octal':
      case 'hexadecimal':
      case 'decimal':
        return l.value;

      case 'string':
        return "`" + l.value + "`";

      case 'tagged':
        return l.tag + "`" + l.value + "`";

      case 'measurement':
        return "" + l.value + l.unit;

      default:
        return assertNever(l);
    }
  };

  var toStringValue = function toStringValue(v) {
    if (isGramLiteralArray(v)) {
      return "[" + v.map(function (l) {
        return toStringLiteral(l);
      }).join(',') + "]";
    } else if (isLiteral(v)) {
      return toStringLiteral(v);
    } else {
      return recordToString(v);
    }
  };

  var recordToString = function recordToString(record) {
    var fields = record.map(function (property, i) {
      return "" + (i > 0 ? ',' : '') + property.name + ":" + toStringValue(property.value);
    });
    return "{" + fields.join('') + "}";
  };

  var recordMapToString = function recordMapToString(record) {
    var fields = Object.entries(record).map(function (_ref, i) {
      var name = _ref[0],
          value = _ref[1];
      return "" + (i > 0 ? ',' : '') + name + ":" + toStringValue(value);
    });
    return "{" + fields.join('') + "}";
  };

  var elementContentToString = function elementContentToString(ast) {
    var idString = ast.id || '';
    var labelsString = ast.labels && ast.labels.length > 0 ? ':' + ast.labels.join(':') : '';
    var recordString = ast.record && !isEmpty(ast.record) ? recordToString(ast.record) : '';
    return "" + idString + labelsString + (((idString.length > 0 || labelsString.length > 0) && recordString.length) > 0 ? ' ' : '') + recordString;
  };

  var nodeToString = function nodeToString(ast) {
    return "(" + elementContentToString(ast) + ")";
  };

  var edgeToString = function edgeToString(ast) {
    var left = ast.kind === 'left' ? '<-' : '-';
    var right = ast.kind === 'right' ? '->' : '-';
    var leftNode = isGramNode(ast.children[0]) ? nodeToString(ast.children[0]) : edgeToString(ast.children[0]);
    var rightNode = isGramNode(ast.children[1]) ? nodeToString(ast.children[1]) : edgeToString(ast.children[1]);
    var content = elementContentToString(ast);
    var boxedContent = content.length > 0 ? "[" + content + "]" : '';
    return "" + leftNode + left + boxedContent + right + rightNode;
  };

  var pathCompositionToString = function pathCompositionToString(ast) {
    var lhs = ast.children && ast.children.length > 0 ? pathToString(ast.children[0]) : '';
    var rhs = ast.children && ast.children.length > 1 ? pathToString(ast.children[1]) : '';
    var relation = ast.kind === 'left' ? '<--' : ast.kind === 'right' ? '-->' : ast.kind === 'either' ? '--' : lhs.length > 0 && rhs.length > 0 ? ',' : '';
    var content = elementContentToString(ast);
    return "[" + content + (relation.length > 0 ? ' ' : '') + relation + (lhs.length > 0 ? ' ' : '') + lhs + (rhs.length > 0 ? ' ' : '') + rhs + "]";
  };

  var pairToString = function pairToString(ast) {
    var lhs = ast.children && ast.children.length > 0 ? pathToString(ast.children[0]) : '';
    var rhs = ast.children && ast.children.length > 1 ? pathToString(ast.children[1]) : '';
    return lhs + "," + (rhs.length > 0 ? ' ' : '') + rhs;
  };

  var hasAttributes = function hasAttributes(p) {
    return p.id || p.labels || p.record;
  };

  var pathToString = function pathToString(ast) {
    var pathExpression = ast ? "" + (isGramEmptyPath(ast) ? '' : isGramNode(ast) ? nodeToString(ast) : isGramEdge(ast) ? edgeToString(ast) : hasAttributes(ast) ? pathCompositionToString(ast) : pairToString(ast)) : '';
    return pathExpression;
  };

  var stringify = function stringify(ast) {
    if (Array.isArray(ast)) {
      return ast.map(stringify).join(' ');
    } else if (ast.type !== undefined) {
      switch (ast.type) {
        case 'path':
          return pathToString(ast);

        case 'seq':
          return stringify(ast.children);
      }
    } else if (typeof ast === 'object') {
      return recordMapToString(ast);
    }

    throw new Error("Can't stringify <" + ast + ">");
  };

  // import {VFile} from 'vfile'

  var stringifyCompiler = function stringifyCompiler(element) {
    if (isGramPath(element)) {
      return stringify(element);
    }

    if (isGramSeq(element)) {
      return stringify(element);
    } else {
      throw new Error("Don't know how to stringify \"" + element.type + "\"");
    }
  };

  var gramStringifyPlugin = function gramStringifyPlugin() {
    this.Compiler = stringifyCompiler;
  };

  exports.gramStringifyPlugin = gramStringifyPlugin;
  exports.stringify = stringify;
  exports.toGram = stringify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-stringify.umd.development.js.map
