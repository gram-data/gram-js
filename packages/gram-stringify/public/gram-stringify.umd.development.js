(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.stringify = {})));
}(this, (function (exports) { 'use strict';

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
   * Type guard for GramSeq.
   *
   * @param o any object
   */


  var isGramSeq = function isGramSeq(o) {
    return !!o.type && o.type === 'seq';
  };

  var isGramPathlike = function isGramPathlike(o) {
    return isGramUnit(o) || isGramNode(o) || isGramEdge(o) || isGramPath(o) || isGramSeq(o);
  };
  /**
   * Type guard for GramSeq.
   *
   * @param o any object
   */


  var isLiteral = function isLiteral(o) {
    return !!o.type && !!o.value;
  };

  var isEmpty = function isEmpty(o) {
    return Object.keys(o).length === 0;
  };

  var toStringLiteral = function toStringLiteral(l) {
    switch (l.type) {
      case 'integer':
        return l.value;

      case 'string':
        return "`" + l.value + "`";

      case 'tagged':
        return l.tag + "`" + l.value + "`";

      default:
        return "<ERROR, can't stringify literals of type " + l.type + ">";
    }
  };

  var toStringValue = function toStringValue(v) {
    if (Array.isArray(v)) {
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
    var fields = Object.entries(record).map(function (_ref, i) {
      var key = _ref[0],
          value = _ref[1];
      return "" + (i > 0 ? ',' : '') + key + ":" + toStringValue(value);
    });
    return "{" + fields.join('') + "}";
  };

  var elementContentToString = function elementContentToString(ast) {
    var idString = ast.id || '';
    var labelsString = ast.labels && ast.labels.length > 0 ? ':' + ast.labels.join(':') : '';
    var recordString = ast.record && !isEmpty(ast.record) ? recordToString(ast.record) : '';
    return "" + idString + labelsString + (recordString.length > 0 ? ' ' : '') + recordString;
  };

  var nodeToString = function nodeToString(ast) {
    return "(" + elementContentToString(ast) + ")";
  };

  var edgeToString = function edgeToString(ast) {
    var left = ast.relation === 'left' ? '<-' : '-';
    var right = ast.relation === 'right' ? '->' : '-';
    var leftNode = isGramNode(ast.children[0]) ? nodeToString(ast.children[0]) : edgeToString(ast.children[0]);
    var rightNode = isGramNode(ast.children[1]) ? nodeToString(ast.children[1]) : edgeToString(ast.children[1]);
    var content = elementContentToString(ast);
    var boxedContent = content.length > 0 ? "[" + content + "]" : '';
    return "" + leftNode + left + boxedContent + right + rightNode;
  };

  var pathToString = function pathToString(ast) {
    var pathContent = elementContentToString(ast);
    var pathChild = ast.children[0];
    var pathExpression = pathChild ? "" + (isGramNode(pathChild) ? nodeToString(pathChild) : isGramEdge(pathChild) ? edgeToString(pathChild) : isGramUnit(pathChild) ? '' : pathToString(pathChild)) : '';

    if (pathContent.length > 0) {
      return "[" + pathContent + " " + pathExpression + "]";
    } else {
      return pathExpression;
    }
  };

  var stringify = function stringify(ast) {
    var tokens = [];

    switch (ast.type) {
      case 'seq':
        var paths = ast.children;
        return paths.map(function (path) {
          return stringify(path);
        }).join('\n');

      case 'path':
        return pathToString(ast);

      case 'node':
        return nodeToString(ast);

      case 'edge':
        return edgeToString(ast);

      default:
        console.error("Impossible:", typeof ast);
    }

    return tokens.join('');
  };

  // import {VFile} from 'vfile'

  var stringifyCompiler = function stringifyCompiler(element) {
    if (isGramPathlike(element)) {
      return stringify(element);
    } else {
      return "Don't know how to stringify \"" + element.type + "\" nodes";
    }
  };

  var gramStringifyPlugin = function gramStringifyPlugin() {
    this.Compiler = stringifyCompiler;
  };

  exports.gramStringifyPlugin = gramStringifyPlugin;
  exports.toString = stringify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-stringify.umd.development.js.map
