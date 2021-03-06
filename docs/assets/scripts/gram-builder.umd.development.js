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
   * A type guard to narrow a GramRecordValue to a GramRecord.
   *
   * Warning: this is not a runtime guarantee
   *
   * @param v any GramRecordValue
   */


  var isGramRecord = function isGramRecord(v) {
    return typeof v == 'object' && v instanceof Map;
  };
  /**
   * Type guard for GramLiteral.
   *
   * @param o any object
   */


  var isGramLiteral = function isGramLiteral(o) {
    return !!o.type && !!o.value && o.type !== 'property';
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
   * Build a path sequence that represents a graph.
   *
   * @param paths sequence of paths through history
   * @param id optional reference identifier. The "name" of this graph instance.
   * @param labels optional labels
   * @param record optional graph-level data
   */


  var seq = function seq(paths, id, labels, record) {
    return _extends({
      type: 'seq',
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
   * Reduce a list of paths into a single path composed using the given kind.
   *
   * @param kind the kind to apply to all sub-paths
   * @param pathlist sub-paths to be paired
   * @param baseID the baseID from which path expressions will derive new IDs
   */

  var listToPath = function listToPath(kind, pathlist) {
    if (kind === void 0) {
      kind = 'pair';
    }

    if (pathlist.length > 1) {
      return pathlist.slice(0, pathlist.length - 1).reduceRight(function (acc, curr) {
        return cons([curr, acc], {
          kind: kind
        });
      }, pathlist[pathlist.length - 1]);
    } else {
      return pathlist[0];
    }
  };
  /**
   * Build a path.
   *
   * @param members sub-paths to compose
   * @param attributes attributes
   */

  var cons = function cons(members, attributes) {
    if (attributes === void 0) {
      attributes = {};
    }

    var element = _extends({
      type: 'path'
    }, attributes.id && {
      id: attributes.id
    }, attributes.labels && {
      labels: attributes.labels
    }, attributes.record && {
      record: attributes.record
    });

    if (members === undefined) {
      if (element.id && element.id !== EMPTY_PATH_ID) {
        element.children = [];
        return element;
      }

      element.children = undefined;
      return EMPTY_PATH;
    } else if (members.length === 0) {
      if (element.id === EMPTY_PATH_ID) {
        return EMPTY_PATH;
      }

      element.children = [];
      return element;
    } else if (members.length === 1) {
      var lhs = members[0];

      if (isGramEmptyPath(lhs)) {
        element.children = [];
        return element;
      } else {
        element.children = [lhs];
        return element;
      }
    } else if (members.length === 2) {
      if (attributes.kind && attributes.kind !== 'pair' && isGramNode(members[0]) && isGramNode(members[1])) {
        element.kind = attributes.kind;
        element.children = [members[0], members[1]];
        return element;
      } else if (isGramEmptyPath(members[0]) && isGramEmptyPath(members[1])) {
        element.kind = attributes.kind;
        element.children = [];
        return element;
      }

      element.children = [members[0], members[1]];
    }

    element.kind = attributes.kind || 'pair';
    return element;
  };
  /**
   * Singleton instance of GramEmptyPath
   */

  var EMPTY_PATH = {
    type: 'path',
    id: EMPTY_PATH_ID,
    labels: undefined,
    record: undefined,
    children: []
  };
  /**
   * Convenience function for retrieving the singleton GramEmptyPath.
   */

  var empty = function empty() {
    return EMPTY_PATH;
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
      type: 'path'
    }, id && {
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
  /**
   * Build a pair
   *
   * @param children
   * @param id
   * @param labels
   * @param record
   */

  var path = function path(kind, members, id, labels, record) {
    return _extends({
      type: 'path',
      kind: kind,
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: members
    });
  };
  /**
   * Build a pair
   *
   * @param children
   * @param id
   * @param labels
   * @param record
   */

  var pair = function pair(members, id, labels, record) {
    return path('pair', members, id, labels, record);
  };
  /**
   * Create a new, empty GramRecord.
   *
   */

  var emptyRecord = function emptyRecord() {
    return new Map();
  };
  /**
   * Reduces an array of GramProperties into a GramRecord.
   *
   * @param properties
   */

  var propertiesToRecord = function propertiesToRecord(properties) {
    return properties.reduce(function (acc, p) {
      acc.set(p.name, p.value);
      return acc;
    }, emptyRecord());
  };
  /**
   * Transforms a plain js object into a GramRecord.
   *
   * @param o
   */

  var objectToRecord = function objectToRecord(o) {
    return Object.entries(o).reduce(function (acc, _ref) {
      var k = _ref[0],
          v = _ref[1];
      acc.set(k, propertyValue(v));
      return acc;
    }, emptyRecord());
  };
  /**
   * Extracts the value from a GramLiteral, if available.
   *
   * @param l
   */

  var getValue = function getValue(l) {
    return isGramLiteral(l) ? l.value : undefined;
  };
  /**
   * Produces a Lens into a literal value with a GramRecord.
   *
   * @param path
   */

  var getLiteral = function getLiteral(name) {
    return function (v) {
      var l = v.get(name);
      return getValue(l);
    };
  };
  /**
   * Produces a Lens into a record value with a GramRecord.
   *
   * @param path
   */

  var getRecord = function getRecord(name) {
    return function (r) {
      var v = r.get(name);
      return isGramRecord(v) ? v : undefined;
    };
  };
  /**
   * Produces a Lens down into nested GramRecords.
   *
   * ### Examples:
   *
   * Descend using either an array of names, or dot notation.
   *
   * ```
   * const o = g.objectToRecord({a:{b:{c:g.string("value")}}})
   *
   * const getAbc1 = g.getDown(['a','b','c']);
   * const getAbc2 = g.getDown("a.b.c");
   *
   * expect(getAbc1(o)).toStrictEqual(getAbc2(o));
   * ```
   *
   * Descend, then apply a function to extract the text value.
   *
   * ```
   * const o = objectToRecord({a:{b:{c:string("value")}}})
   * const getAbc = getDown("a.b.c", getValue);
   *
   * expect(getAbc(o)).toBe("value");
   * ```
   *
   * @param hierarchy array or dot-notation path to descend
   */

  var getDown = function getDown(hierarchy, f) {
    var pathDown = Array.isArray(hierarchy) ? hierarchy : hierarchy.split('.');
    return function (r) {
      var bottom = pathDown.reduce(function (acc, name) {
        return isGramRecord(acc) ? acc.get(name) : undefined;
      }, r);
      return bottom && (f ? f(bottom) : bottom);
    };
  };
  /**
   * Builds a GramProperty from a name
   * @param name
   * @param value
   */

  var property = function property(name, value) {
    var Node = {
      type: 'property',
      name: name,
      value: isGramLiteral(value) ? value : propertyValue(value)
    };
    return Node;
  };
  var propertyValue = function propertyValue(value) {
    if (Array.isArray(value)) {
      return value.map(function (v) {
        return propertyValue(v);
      });
    } else if (typeof value === 'object') {
      if (value instanceof Date) {
        return date(value);
      } else if (isGramLiteral(value)) {
        return value;
      }

      return objectToRecord(value);
    } else {
      switch (typeof value) {
        case 'string':
          return string(value);

        case 'bigint':
          return decimal(value.toString());

        case 'boolean':
          return _boolean(value);

        case 'number':
          return decimal(value.toString());

        case 'symbol':
          return string(value.toString());

        default:
          throw new Error("Unsupported value: " + value);
      }
    }
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
      value: typeof value === 'number' ? value.toString(16) : value
    };
  };
  var octal = function octal(value) {
    return {
      type: 'octal',
      value: typeof value === 'number' ? value.toString(8) : value
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
    return tagged('date', value instanceof Date ? value.getFullYear().toString() : value);
  };
  var date = function date(value) {
    return tagged('date', value instanceof Date ? dateToYMD(value) : value);
  };
  var dayOfMonth = function dayOfMonth(value) {
    return tagged('date', value instanceof Date ? dateToDayOfMonth(value) : value);
  };
  var time = function time(value) {
    return tagged('time', value instanceof Date ? value.toTimeString() : value);
  };
  var duration = function duration(value) {
    return tagged('duration', value instanceof Date ? "P" + (value.getUTCFullYear() - 1970) + "Y" + value.getUTCMonth() + "M" + value.getUTCDate() + "DT" + value.getUTCHours() + "H" + value.getUTCMinutes() + "M" + value.getUTCMilliseconds() / 1000 + "S" : value);
  };
  var flatten = function flatten(xs, depth) {
    if (depth === void 0) {
      depth = 1;
    }

    return xs.flat(depth).filter(function (x) {
      return x !== null;
    });
  };
  var index = {
    seq: seq,
    empty: empty,
    cons: cons,
    pair: pair,
    listToPath: listToPath,
    node: node,
    edge: edge,
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
    duration: duration,
    flatten: flatten,
    objectToRecord: objectToRecord,
    propertiesToRecord: propertiesToRecord,
    propertyValue: propertyValue,
    fromLiteral: getLiteral
  };

  exports.boolean = _boolean;
  exports.cons = cons;
  exports.date = date;
  exports.dayOfMonth = dayOfMonth;
  exports.decimal = decimal;
  exports.default = index;
  exports.duration = duration;
  exports.edge = edge;
  exports.empty = empty;
  exports.emptyRecord = emptyRecord;
  exports.flatten = flatten;
  exports.getDown = getDown;
  exports.getLiteral = getLiteral;
  exports.getRecord = getRecord;
  exports.getValue = getValue;
  exports.hexadecimal = hexadecimal;
  exports.integer = integer;
  exports.listToPath = listToPath;
  exports.measurement = measurement;
  exports.node = node;
  exports.objectToRecord = objectToRecord;
  exports.octal = octal;
  exports.pair = pair;
  exports.path = path;
  exports.propertiesToRecord = propertiesToRecord;
  exports.property = property;
  exports.propertyValue = propertyValue;
  exports.seq = seq;
  exports.string = string;
  exports.tagged = tagged;
  exports.time = time;
  exports.year = year;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-builder.umd.development.js.map
