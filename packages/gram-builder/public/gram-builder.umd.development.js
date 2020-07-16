(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.builder = {})));
}(this, (function (exports) { 'use strict';

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

  function normalizeChildren(children) {
    if (Array.isArray(children)) {
      return children;
    } else if (children instanceof Function) {
      var res = children();
      return normalizeChildren(res);
    } else if (typeof children === 'undefined') {
      return [];
    } else {
      return [children];
    }
  }

  var dateToYMD = function dateToYMD(d) {
    return d.toISOString().slice(0, 10);
  };

  var dateToDayOfMonth = function dateToDayOfMonth(d) {
    return '--' + d.toISOString().slice(5, 10);
  };
  /**
   * Build a path sequence that represents a graph
   * accumulating structure over time.
   *
   * @param paths sequence of paths through history
   * @param id optional reference identifier. The "name" of this graph instance.
   * @param labels optional labels
   * @param record optional graph-level data
   */


  var seq = function seq(paths, id, labels, record) {
    return _extends({
      type: 'seq'
    }, id && {
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: normalizeChildren(paths)
    });
  };
  /**
   * Reduce paths into a single path composed using the given relation.
   *
   * @parm relation the relation to apply to all sub-paths
   * @param paths sub-paths to be paired
   */

  var reduce = function reduce(relation, paths) {
    if (relation === void 0) {
      relation = 'pair';
    }

    var pathlist = normalizeChildren(paths);

    if (pathlist) {
      if (pathlist.length > 1) {
        return [pathlist.reduceRight(function (acc, curr) {
          return cons([curr, acc], {
            relation: relation
          });
        }, UNIT)];
      } else {
        return [pathlist[0]];
      }
    }

    return [];
  };
  /**
   * Build any path-like element
   *
   * @param members sub-paths to compose
   * @param attributes attributes
   */

  var cons = function cons(members, attributes) {
    if (attributes === void 0) {
      attributes = {};
    }

    var element = _extends({
      type: 'path',
      id: attributes.id
    }, attributes.labels && {
      labels: attributes.labels
    }, attributes.record && {
      record: attributes.record
    }, {
      children: members.filter(function (child) {
        return child && !isGramUnit(child);
      })
    });

    if (element.children.length === 0) {
      if (element.id || element.labels && element.labels.length > 0 || element.record) {
        element.type = 'node'; // element.id = element.id || identity.shortID();

        return element;
      } else {
        return UNIT;
      }
    } else if (element.children.length === 1) {
      var inner = element.children[0];

      if (element.id) {
        if (isGramUnit(inner)) {
          element.type = 'node';
          element.children = [];
          return element;
        }

        return element;
      } else {
        if (isGramUnit(inner)) return inner; // element.id = identity.shortID();

        if (isGramNode(inner)) return inner;
        if (isGramEdge(inner)) return inner;
        if (isGramPath(inner)) return inner;
      }
    } else if (element.children.length === 2) {
      if (attributes.relation && attributes.relation !== 'pair' && isGramNode(element.children[0]) && isGramNode(element.children[1])) {
        element.type = 'edge'; // element.id = element.id || identity.shortID();

        element.relation = attributes.relation;
        return element;
      }
    } // element.id = element.id || identity.shortID();


    element.relation = attributes.relation || 'pair';
    return element;
  };
  /**
   * Singleton instance of GramUnit
   */

  var UNIT = {
    type: 'unit',
    id: UNIT_ID,
    labels: undefined,
    record: undefined,
    children: []
  };
  /**
   * Convenience function for retrieving the singleton GramUnit.
   */

  var unit = function unit() {
    return UNIT;
  };
  /**
   * Build a GramNode.
   *
   * @param id identifier
   * @param labels
   * @param record
   * @param annotation
   */

  var node = function node(id, labels, record) {
    return _extends({
      type: 'node',
      // id: id || identity.shortID(),
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: []
    });
  };
  /**
   * Build an Edge.
   *
   * @param children
   * @param relation
   * @param id
   * @param labels
   * @param record
   */

  var edge = function edge(children, relation, id, labels, record) {
    if (relation === void 0) {
      relation = 'right';
    }

    return _extends({
      type: 'edge',
      // id: id || identity.shortID(),
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      relation: relation,
      children: children
    });
  };
  /**
   * Build a path
   *
   * @param children
   * @param id
   * @param labels
   * @param record
   */

  var path = function path(members, id, labels, record) {
    return _extends({
      type: 'path'
    }, id && {
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: members
    });
  };
  var record = function record(properties) {
    return properties.reduce(function (acc, p) {
      acc[p.name] = p.value;
      return acc;
    }, {});
  };
  var property = function property(name, value) {
    var Node = {
      type: 'property',
      name: name,
      value: value
    };
    return Node;
  };

  var _boolean = function _boolean(value) {
    return {
      type: 'boolean',
      value: value ? 'true' : 'false'
    };
  };
  var string = function string(value) {
    return {
      type: 'string',
      value: value
    };
  };
  var tagged = function tagged(tag, value) {
    return {
      type: 'tagged',
      value: value,
      tag: tag
    };
  };
  var integer = function integer(value) {
    return {
      type: 'integer',
      value: String(value)
    };
  };
  var decimal = function decimal(value) {
    return {
      type: 'decimal',
      value: String(value)
    };
  };
  var hexadecimal = function hexadecimal(value) {
    return {
      type: 'hexadecimal',
      value: value
    };
  };
  var octal = function octal(value) {
    return {
      type: 'octal',
      value: value
    };
  };
  var measurement = function measurement(unit, value) {
    return {
      type: 'measurement',
      value: String(value),
      unit: unit
    };
  };
  var year = function year(value) {
    return tagged(value instanceof Date ? value.getFullYear().toString() : value, 'date');
  };
  var date = function date(value) {
    return tagged(value instanceof Date ? dateToYMD(value) : value, 'date');
  };
  var dayOfMonth = function dayOfMonth(value) {
    return tagged(value instanceof Date ? dateToDayOfMonth(value) : value, 'date');
  };
  var time = function time(value) {
    return tagged(value instanceof Date ? dateToYMD(value) : value, 'time');
  };
  var flatten = function flatten(xs, depth) {
    if (depth === void 0) {
      depth = 1;
    }

    return xs.flat(depth).filter(function (x) {
      return x !== null;
    });
  };
  var gramBuilder = {
    seq: seq,
    unit: unit,
    cons: cons,
    path: path,
    node: node,
    edge: edge,
    record: record,
    property: property,
    "boolean": _boolean,
    string: string,
    tagged: tagged,
    integer: integer,
    decimal: decimal,
    hexadecimal: hexadecimal,
    octal: octal,
    measurement: measurement,
    date: date,
    time: time,
    flatten: flatten
  };

  var builder = {
    __proto__: null,
    seq: seq,
    reduce: reduce,
    cons: cons,
    UNIT: UNIT,
    unit: unit,
    node: node,
    edge: edge,
    path: path,
    record: record,
    property: property,
    boolean: _boolean,
    string: string,
    tagged: tagged,
    integer: integer,
    decimal: decimal,
    hexadecimal: hexadecimal,
    octal: octal,
    measurement: measurement,
    year: year,
    date: date,
    dayOfMonth: dayOfMonth,
    time: time,
    flatten: flatten,
    'default': gramBuilder
  };

  exports.UNIT = UNIT;
  exports.boolean = _boolean;
  exports.cons = cons;
  exports.date = date;
  exports.dayOfMonth = dayOfMonth;
  exports.decimal = decimal;
  exports.default = builder;
  exports.edge = edge;
  exports.flatten = flatten;
  exports.hexadecimal = hexadecimal;
  exports.integer = integer;
  exports.measurement = measurement;
  exports.node = node;
  exports.octal = octal;
  exports.path = path;
  exports.property = property;
  exports.record = record;
  exports.reduce = reduce;
  exports.seq = seq;
  exports.string = string;
  exports.tagged = tagged;
  exports.time = time;
  exports.unit = unit;
  exports.year = year;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-builder.umd.development.js.map
