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
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative' && typeof crypto === 'undefined') {
      throw new Error('React Native does not have a built-in secure random generator. ' + 'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' + 'For secure IDs, import `react-native-get-random-values` ' + 'before Nano ID. If you use Expo, install `expo-random` ' + 'and use `nanoid/async`.');
    }

    if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
      throw new Error('Import file with `if (!window.crypto) window.crypto = window.msCrypto`' + ' before importing Nano ID to fix IE 11 support');
    }

    if (typeof crypto === 'undefined') {
      throw new Error('Your browser does not have secure random generator. ' + 'If you don’t need unpredictable IDs, you can use nanoid/non-secure.');
    }
  }

  var random = function random(bytes) {
    return crypto.getRandomValues(new Uint8Array(bytes));
  };

  var customRandom = function customRandom(alphabet, size, getRandom) {
    // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
    // values closer to the alphabet size. The bitmask calculates the closest
    // `2^31 - 1` number, which exceeds the alphabet size.
    // For example, the bitmask for the alphabet size 30 is 31 (00011111).
    // `Math.clz32` is not used, because it is not available in browsers.
    var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1; // Though, the bitmask solution is not perfect since the bytes exceeding
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

    var step = -~(1.6 * mask * size / alphabet.length);
    return function () {
      var id = '';

      while (true) {
        var bytes = getRandom(step); // A compact alternative for `for (var i = 0; i < step; i++)`.

        var j = step;

        while (j--) {
          // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
          id += alphabet[bytes[j] & mask] || '';
          if (id.length === size) return id;
        }
      }
    };
  };

  var customAlphabet = function customAlphabet(alphabet, size) {
    return customRandom(alphabet, size, random);
  };

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

  var visit = /*#__PURE__*/require('unist-util-visit');

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

      visit(tree, function (element) {
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
