(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.graph = {})));
}(this, (function (exports) { 'use strict';

  var sum = function sum(a, b) {
    {
      console.log('boop');
    }

    return a + b;
  };

  exports.sum = sum;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-graph.umd.development.js.map
