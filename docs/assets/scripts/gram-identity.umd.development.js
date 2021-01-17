(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.identity = {})));
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

  var alphabets = {
    base2: '01',
    dieBase6: '⚀⚁⚂⚃⚄⚅',
    base8: '01234567',
    base10: '0123456789',
    astrologyBase12: '♈︎♉︎♊︎♋︎♌︎♍︎♎︎♏︎♐︎♑︎♒︎♓︎',
    base11: '0123456789a',
    chessBase12: '♚♛♜♝♞♟♔♕♖♗♘♙',
    base16: '0123456789abcdef',
    dominoBase28: '🁣🁤🁫🁥🁬🁳🁦🁭🁴🁻🁧🁮🁵🁼🂃🁨🁯🁶🁽🂊🂋🁩🁰🁷🁾🂅🂌🂓',
    base32: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    zBase32: 'ybndrfg8ejkmcpqxot1uwisza345h769',
    crock32: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
    base32Hex: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    base36: '0123456789abcdefghijklmnopqrstuvwxyz',
    mahjongBase43: '🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀇🀈🀉🀊🀋🀌🀍🀎🀏🀀🀁🀂🀃🀄︎🀅🀆🀐🀢🀣🀤🀥🀦🀧🀨🀩🀪',
    cards56: '🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃝🃞',
    base58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
    flickrBase58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
    base62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    base64: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@',
    cookieBase90: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~"
  };

  /**
   * Creates an IDGenerator based on incrementing numbers.
   *
   */
  var counterIDGenerator = function counterIDGenerator(prefix) {
    var nextid = 0;
    return {
      generate: function generate() {
        return "" + (prefix || '') + nextid++;
      }
    };
  };

  // This file replaces `index.js` in bundlers like webpack or Rollup,

  {
    // All bundlers will remove this block in the production bundle.
    if (
      typeof navigator !== 'undefined' &&
      navigator.product === 'ReactNative' &&
      typeof crypto === 'undefined'
    ) {
      throw new Error(
        'React Native does not have a built-in secure random generator. ' +
          'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
          'For secure IDs, import `react-native-get-random-values` ' +
          'before Nano ID. If you use Expo, install `expo-random` ' +
          'and use `nanoid/async`.'
      )
    }
    if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
      throw new Error(
        'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
          ' before importing Nano ID to fix IE 11 support'
      )
    }
    if (typeof crypto === 'undefined') {
      throw new Error(
        'Your browser does not have secure random generator. ' +
          'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
      )
    }
  }

  let random = bytes => crypto.getRandomValues(new Uint8Array(bytes));

  let customRandom = (alphabet, size, getRandom) => {
    // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
    // values closer to the alphabet size. The bitmask calculates the closest
    // `2^31 - 1` number, which exceeds the alphabet size.
    // For example, the bitmask for the alphabet size 30 is 31 (00011111).
    // `Math.clz32` is not used, because it is not available in browsers.
    let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
    // Though, the bitmask solution is not perfect since the bytes exceeding
    // the alphabet size are refused. Therefore, to reliably generate the ID,
    // the random bytes redundancy has to be satisfied.

    // Note: every hardware random generator call is performance expensive,
    // because the system call for entropy collection takes a lot of time.
    // So, to avoid additional system calls, extra bytes are requested in advance.

    // Next, a step determines how many random bytes to generate.
    // The number of random bytes gets decided upon the ID size, mask,
    // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
    // according to benchmarks).

    // `-~f => Math.ceil(f)` if f is a float
    // `-~i => i + 1` if i is an integer
    let step = -~((1.6 * mask * size) / alphabet.length);

    return () => {
      let id = '';
      while (true) {
        let bytes = getRandom(step);
        // A compact alternative for `for (var i = 0; i < step; i++)`.
        let j = step;
        while (j--) {
          // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
          id += alphabet[bytes[j] & mask] || '';
          if (id.length === size) return id
        }
      }
    }
  };

  let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random);

  /**
   * Factory for creating an IDGenerator based on
   * [nanoid](https://github.com/ai/nanoid)
   *
   */

  var nanoidGenerator = function nanoidGenerator(alphabet, size, prefix) {
    if (alphabet === void 0) {
      alphabet = alphabets.base64;
    }

    if (size === void 0) {
      size = 21;
    }

    var generator = customAlphabet(alphabet, size);
    return {
      generate: function generate() {
        return prefix ? prefix + generator() : generator();
      }
    };
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
    generator: 'counter',
    alphabet: alphabets.base58,
    prefix: undefined
  };
  var gramIdentityPlugin = function gramIdentityPlugin(settings) {
    var s = _extends({}, defaultSettings, settings);

    var identification = function identification(tree) {
      var generator;

      switch (s.generator) {
        case 'nanoid':
          generator = nanoidGenerator(s.alphabet, 21, s.prefix);
          break;

        case 'counter':
        default:
          generator = counterIDGenerator(s.prefix);
      }

      unistUtilVisit(tree, function (element) {
        if (isGramPath(element)) {
          element.id = element.id || generator.generate();
        }
      });
    };

    return identification;
  };

  exports.alphabets = alphabets;
  exports.counterIDGenerator = counterIDGenerator;
  exports.gramIdentityPlugin = gramIdentityPlugin;
  exports.nanoidGenerator = nanoidGenerator;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-identity.umd.development.js.map
