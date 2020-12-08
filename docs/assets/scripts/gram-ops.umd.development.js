(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.ops = {})));
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
   * Type guard for GramNode.
   *
   * @param o any object
   */


  var isGramNode = function isGramNode(o) {
    return isGramPath(o) && o.children && o.children.length === 0 && o.id !== EMPTY_PATH_ID;
  };

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /**
   * Build an Edge.
   *
   * @param children
   * @param kind
   * @param id
   * @param labels
   * @param record
   */


  var edge = function edge(children, kind, id, labels, record) {
    return _extends({
      type: 'path',
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      kind: kind,
      children: children
    });
  };

  var count = function count(p) {
    return p.children.reduce(function (acc, child) {
      return acc + count(child);
    }, 1);
  };
  var head = function head(p) {
    return p.children === undefined || p.children.length === 0 ? p : head(p.children[0]);
  };
  var tail = function tail(p) {
    return p.children === undefined || p.children.length === 0 ? p : tail(p.children[p.children.length - 1]);
  };
  var merge = function merge(_, next) {
    // return path
    return next;
  };
  var identity = function identity(p) {
    return p.id;
  };
  /**
   * Node set projected from within a path.
   *
   * @param p paths from which to project nodes
   */

  var nodes = function nodes(p) {
    if (isGramNode(p)) return [p];
    if (isGramSeq(p)) return nodes(p.children);

    if (Array.isArray(p)) {
      var unidentifiedNodes = [];
      var nodemap = p.map(nodes).flat().reduce(function (acc, child) {
        if (child.id) {
          if (acc.has(child.id)) {
            acc.set(child.id, Object.assign(acc.get(child.id), child));
          } else {
            acc.set(child.id, child);
          }
        } else {
          unidentifiedNodes.push(child);
        }

        return acc;
      }, new Map());
      return Array.from(nodemap.values()).concat(unidentifiedNodes);
    } else {
      return nodes(p.children);
    }
  };
  var edges = function edges(p) {
    return p === undefined ? [] : p.children === undefined || p.children.length === 0 ? [] : p.children.length === 2 ? [].concat(edges(p.children[0]), p.kind !== undefined && p.kind !== 'pair' ? [edge([tail(p.children[0]), head(p.children[1])], p.kind, p.id, p.labels, p.record)] : [], edges(p.children[1])) : p.children.reduce(function (acc, child) {
      return [].concat(acc, edges(child));
    }, []);
  };

  exports.count = count;
  exports.edges = edges;
  exports.head = head;
  exports.identity = identity;
  exports.merge = merge;
  exports.nodes = nodes;
  exports.tail = tail;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-ops.umd.development.js.map
