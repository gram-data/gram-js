(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.value = {})));
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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
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
   * A type guard to narrow a GramRecordValue to a GramRecord.
   *
   * Warning: this is not a runtime guarantee
   *
   * @param v any GramRecordValue
   */


  var isGramRecord = function isGramRecord(v) {
    return typeof v == 'object' && v instanceof Map;
  };

  var isGramLiteralArray = function isGramLiteralArray(v) {
    return Array.isArray(v) && isGramLiteral(v[0]);
  };
  /**
   * Type guard for GramLiteral.
   *
   * @param o any object
   */


  var isGramLiteral = function isGramLiteral(o) {
    return !!o.type && !!o.value && o.type !== 'property';
  };

  var iso8601Year = /^([+-]\d{4,}\b|\d{4})$/;
  var iso8601YearMonth = /^([0-9]{4})-(1[0-2]|0[1-9])$/;
  var iso8601YearMonthDay = /^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/;
  var iso8601OrdinalDate = /^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/;
  var iso8601WeekOfYear = /^([0-9]{4})-?W(5[0-3]|[1-4][0-9]|0[1-9])$/;
  var iso8601WeekDate = /^([0-9]{4})-?W(5[0-3]|[1-4][0-9]|0[1-9])-?([1-7])$/;
  var iso8601LocalTime = /^(2[0-3]|[01][0-9]):?([0-5][0-9])(:?([0-5][0-9](\.[0-9]{3})?))?$/; // export const iso8601Time = /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9](\.[0-9]{3})?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;

  var iso8601Time = /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9](\.[0-9]{3})?)?(Z|([+-])((?:2[0-3]|[01][0-9]))(?::?([0-5][0-9]))?)?$/;
  var iso8601Duration = /^P((\d+)Y)?((\d+)M)?((\d+)D)?(T((\d+)H)?((\d+)M)?((\d+)S)?)?$/;
  var iso8601Repeat = /^R(\d*)$/;

  var InvalidAstError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(InvalidAstError, _Error);

    function InvalidAstError(ast) {
      var _this;

      _this = _Error.call(this, 'AST is invalid:' + JSON.stringify(ast)) || this;
      _this.name = 'InvalidAstError';
      _this.ast = ast;
      return _this;
    }

    return InvalidAstError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  /**
   * Evaluates data structures and text literal values, returning
   * native objects and primitive values.
   *
   * @see {@linkcode valueOfLiteral} for default literal value evaluator
   */


  var valueOf = function valueOf(recordValue, literalValueEvaluator) {
    if (literalValueEvaluator === void 0) {
      literalValueEvaluator = valueOfLiteral;
    }

    if (isGramRecord(recordValue)) {
      return Array.from(recordValue).reduce(function (acc, _ref) {
        var k = _ref[0],
            v = _ref[1];
        acc[k] = valueOf(v);
        return acc;
      }, {});
    } else {
      if (isGramLiteralArray(recordValue)) {
        return recordValue.map(function (v) {
          return valueOf(v);
        });
      } else if (isGramLiteral(recordValue)) {
        return literalValueEvaluator(recordValue);
      } else if (typeof recordValue === 'object') {
        return Object.entries(recordValue).reduce(function (acc, _ref2) {
          var k = _ref2[0],
              v = _ref2[1];
          acc[k] = valueOf(v);
          return acc;
        }, {});
      }
    }
  };

  function assertNever(x) {
    throw new Error('Unexpected object: ' + x);
  }

  var valueOfLiteral = function valueOfLiteral(ast) {
    switch (ast.type) {
      case 'boolean':
        return valueOfBoolean(ast);

      case 'string':
        return valueOfString(ast);

      case 'integer':
        return valueOfInteger(ast);

      case 'decimal':
        return valueOfDecimal(ast);

      case 'hexadecimal':
        return valueOfHexadecimal(ast);

      case 'octal':
        return valueOfOctal(ast);

      case 'tagged':
        switch (ast.tag) {
          case 'date':
            return valueOfDate(ast);

          case 'time':
            return valueOfTime(ast);

          case 'datetime':
            return 'TODO';

          case 'interval':
            return 'TODO';

          case 'duration':
            return 'TODO';

          case 'uri':
            return ast.value;

          case 'wkt':
            return 'TODO';

          default:
            return 'TODO';
        }

      case 'measurement':
        return 'measure by measure';

      default:
        return assertNever(ast);
    }
  };
  var valueOfBoolean = function valueOfBoolean(ast) {
    return ast.value && ast.value.toLowerCase() === 'true';
  };
  var valueOfString = function valueOfString(ast) {
    if (ast.value) {
      return ast.value;
    }

    throw new InvalidAstError(ast);
  };
  var valueOfTaggedLiteral = function valueOfTaggedLiteral(ast) {
    if (ast.value) {
      return ast.value;
    }

    throw new InvalidAstError(ast);
  };
  var valueOfDate = function valueOfDate(ast) {
    if (ast.value) {
      var extracted = iso8601YearMonthDay.exec(ast.value);

      if (extracted) {
        return new Date(Date.UTC(Number.parseInt(extracted[1]), Number.parseInt(extracted[3]) - 1, Number.parseInt(extracted[4])));
      }

      extracted = iso8601YearMonth.exec(ast.value);

      if (extracted) {
        return new Date(Date.UTC(Number.parseInt(extracted[1]), Number.parseInt(extracted[2])));
      }

      extracted = iso8601Year.exec(ast.value);

      if (extracted) {
        return new Date(Number.parseInt(extracted[1]), 1);
      }

      throw SyntaxError("Unable to parse date from " + ast.value);
    }

    throw new InvalidAstError(ast);
  };
  var MILLIS_IN_A_SECOND = 1000;
  var MILLIS_IN_A_MINUTE = MILLIS_IN_A_SECOND * 60;
  var MILLIS_IN_AN_HOUR = MILLIS_IN_A_MINUTE * 60;
  var MILLIS_IN_A_DAY = MILLIS_IN_AN_HOUR * 24;
  var MILLIS_IN_A_MONTH = MILLIS_IN_A_DAY * 30;
  var MILLIS_IN_A_YEAR = MILLIS_IN_A_DAY * 365;
  /**
   * Value of time as number of milliseconds since midnight.
   *
   * @param ast
   */

  var valueOfTime = function valueOfTime(ast) {
    if (ast.value) {
      var extracted = iso8601Time.exec(ast.value);

      if (extracted) {
        var hours = Number.parseInt(extracted[1]);
        var minutes = extracted[1] ? Number.parseInt(extracted[2]) : 0;
        var seconds = extracted[3] ? Number.parseFloat(extracted[3]) : 0.0;
        var tz = extracted[5]; // console.log('time', extracted, hours, minutes, seconds, tz);

        var millis = hours * MILLIS_IN_AN_HOUR + minutes * MILLIS_IN_A_MINUTE + seconds * MILLIS_IN_A_SECOND;

        if (tz) {
          var offset = tz === 'Z' ? 0 : Number.parseInt(extracted[7]) * MILLIS_IN_AN_HOUR + Number.parseInt(extracted[8] || '0') * MILLIS_IN_A_MINUTE;
          return new Date(extracted[6] === '-' ? millis + offset : millis - offset);
        }

        return new Date(millis);
      }

      throw SyntaxError("Unable to parse time from " + ast.value);
    }

    throw new InvalidAstError(ast);
  };
  /**
   * Evaluates the duration as a total of milliseconds, unreliably estimating milliseconds
   * per year or month. Reliable duration values can only be calculated with precision
   * of days, hours, minutes or seconds.
   *
   * @param ast
   */

  var valueOfDuration = function valueOfDuration(ast) {
    if (ast.value) {
      var extracted = iso8601Duration.exec(ast.value);

      if (extracted) {
        var years = extracted[2] ? Number.parseInt(extracted[2]) : 0;
        var months = extracted[4] ? Number.parseInt(extracted[4]) : 0;
        var days = extracted[6] ? Number.parseInt(extracted[6]) : 0;
        var hours = extracted[9] ? Number.parseInt(extracted[9]) : 0;
        var minutes = extracted[11] ? Number.parseInt(extracted[11]) : 0;
        var seconds = extracted[13] ? Number.parseInt(extracted[13]) : 0; // console.log('duration', extracted, years, months, days, hours, minutes, seconds);

        var millis = years * MILLIS_IN_A_YEAR + months * MILLIS_IN_A_MONTH + days * MILLIS_IN_A_DAY + hours * MILLIS_IN_AN_HOUR + minutes * MILLIS_IN_A_MINUTE + seconds * MILLIS_IN_A_SECOND;
        return new Date(millis);
      }

      throw SyntaxError("Unable to parse duration from " + ast.value);
    }

    throw new InvalidAstError(ast);
  };
  var valueOfInteger = function valueOfInteger(ast) {
    if (ast.value) {
      return Number.parseInt(ast.value);
    } else throw new InvalidAstError(ast);
  };
  var valueOfMeasurement = function valueOfMeasurement(ast) {
    if (ast.value) {
      return Number.parseInt(ast.value);
    } else throw new InvalidAstError(ast);
  };
  var valueOfDecimal = function valueOfDecimal(ast) {
    if (ast.value) {
      return Number.parseFloat(ast.value);
    } else throw new InvalidAstError(ast);
  };
  var valueOfHexadecimal = function valueOfHexadecimal(ast) {
    if (ast.value) {
      return Number.parseInt(ast.value, 16);
    } else throw new InvalidAstError(ast);
  };
  var valueOfOctal = function valueOfOctal(ast) {
    if (ast.value) {
      return Number.parseInt(ast.value, 8);
    } else throw new InvalidAstError(ast);
  };

  var convert_1 = convert;

  function convert(test) {
    if (test == null) {
      return ok
    }

    if (typeof test === 'string') {
      return typeFactory(test)
    }

    if (typeof test === 'object') {
      return 'length' in test ? anyFactory(test) : allFactory(test)
    }

    if (typeof test === 'function') {
      return test
    }

    throw new Error('Expected function, string, or object as test')
  }

  // Utility assert each property in `test` is represented in `node`, and each
  // values are strictly equal.
  function allFactory(test) {
    return all

    function all(node) {
      var key;

      for (key in test) {
        if (node[key] !== test[key]) return false
      }

      return true
    }
  }

  function anyFactory(tests) {
    var checks = [];
    var index = -1;

    while (++index < tests.length) {
      checks[index] = convert(tests[index]);
    }

    return any

    function any() {
      var index = -1;

      while (++index < checks.length) {
        if (checks[index].apply(this, arguments)) {
          return true
        }
      }

      return false
    }
  }

  // Utility to convert a string into a function which checks a given node’s type
  // for said string.
  function typeFactory(test) {
    return type

    function type(node) {
      return Boolean(node && node.type === test)
    }
  }

  // Utility to return true.
  function ok() {
    return true
  }

  var color_browser = identity;
  function identity(d) {
    return d
  }

  var unistUtilVisitParents = visitParents;




  var CONTINUE = true;
  var SKIP = 'skip';
  var EXIT = false;

  visitParents.CONTINUE = CONTINUE;
  visitParents.SKIP = SKIP;
  visitParents.EXIT = EXIT;

  function visitParents(tree, test, visitor, reverse) {
    var step;
    var is;

    if (typeof test === 'function' && typeof visitor !== 'function') {
      reverse = visitor;
      visitor = test;
      test = null;
    }

    is = convert_1(test);
    step = reverse ? -1 : 1;

    factory(tree, null, [])();

    function factory(node, index, parents) {
      var value = typeof node === 'object' && node !== null ? node : {};
      var name;

      if (typeof value.type === 'string') {
        name =
          typeof value.tagName === 'string'
            ? value.tagName
            : typeof value.name === 'string'
            ? value.name
            : undefined;

        visit.displayName =
          'node (' + color_browser(value.type + (name ? '<' + name + '>' : '')) + ')';
      }

      return visit

      function visit() {
        var grandparents = parents.concat(node);
        var result = [];
        var subresult;
        var offset;

        if (!test || is(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));

          if (result[0] === EXIT) {
            return result
          }
        }

        if (node.children && result[0] !== SKIP) {
          offset = (reverse ? node.children.length : -1) + step;

          while (offset > -1 && offset < node.children.length) {
            subresult = factory(node.children[offset], offset, grandparents)();

            if (subresult[0] === EXIT) {
              return subresult
            }

            offset =
              typeof subresult[1] === 'number' ? subresult[1] : offset + step;
          }
        }

        return result
      }
    }
  }

  function toResult(value) {
    if (value !== null && typeof value === 'object' && 'length' in value) {
      return value
    }

    if (typeof value === 'number') {
      return [CONTINUE, value]
    }

    return [value]
  }

  var unistUtilVisit = visit;



  var CONTINUE$1 = unistUtilVisitParents.CONTINUE;
  var SKIP$1 = unistUtilVisitParents.SKIP;
  var EXIT$1 = unistUtilVisitParents.EXIT;

  visit.CONTINUE = CONTINUE$1;
  visit.SKIP = SKIP$1;
  visit.EXIT = EXIT$1;

  function visit(tree, test, visitor, reverse) {
    if (typeof test === 'function' && typeof visitor !== 'function') {
      reverse = visitor;
      visitor = test;
      test = null;
    }

    unistUtilVisitParents(tree, test, overload, reverse);

    function overload(node, parents) {
      var parent = parents[parents.length - 1];
      var index = parent ? parent.children.indexOf(node) : null;
      return visitor(node, index, parent)
    }
  }

  var defaultSettings = {
    literalValueEvaluator: valueOfLiteral
  };
  var gramValuePlugin = function gramValuePlugin(settings) {
    var s = _extends({}, defaultSettings, settings);

    var recordValueEvaluator = function recordValueEvaluator(tree) {
      unistUtilVisit(tree, function (element) {
        if (isGramPath(element) && element.record) {
          element.data = Object.assign(element.data || {}, {
            value: valueOf(element.record, s.literalValueEvaluator)
          });
        }
      });
    };

    return recordValueEvaluator;
  };

  exports.gramValuePlugin = gramValuePlugin;
  exports.iso8601Duration = iso8601Duration;
  exports.iso8601LocalTime = iso8601LocalTime;
  exports.iso8601OrdinalDate = iso8601OrdinalDate;
  exports.iso8601Repeat = iso8601Repeat;
  exports.iso8601Time = iso8601Time;
  exports.iso8601WeekDate = iso8601WeekDate;
  exports.iso8601WeekOfYear = iso8601WeekOfYear;
  exports.iso8601Year = iso8601Year;
  exports.iso8601YearMonth = iso8601YearMonth;
  exports.iso8601YearMonthDay = iso8601YearMonthDay;
  exports.valueOf = valueOf;
  exports.valueOfBoolean = valueOfBoolean;
  exports.valueOfDate = valueOfDate;
  exports.valueOfDecimal = valueOfDecimal;
  exports.valueOfDuration = valueOfDuration;
  exports.valueOfHexadecimal = valueOfHexadecimal;
  exports.valueOfInteger = valueOfInteger;
  exports.valueOfLiteral = valueOfLiteral;
  exports.valueOfMeasurement = valueOfMeasurement;
  exports.valueOfOctal = valueOfOctal;
  exports.valueOfString = valueOfString;
  exports.valueOfTaggedLiteral = valueOfTaggedLiteral;
  exports.valueOfTime = valueOfTime;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-value.umd.development.js.map
