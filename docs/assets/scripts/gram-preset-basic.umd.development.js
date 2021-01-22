(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@gram-data/gram-identity'), require('@gram-data/gram-value')) :
  typeof define === 'function' && define.amd ? define(['exports', '@gram-data/gram-identity', '@gram-data/gram-value'], factory) :
  (global = global || self, factory(global['@gram-data/gram-preset-basic'] = {}, global.gramIdentity, global.gramValue));
}(this, (function (exports, gramIdentity, gramValue) { 'use strict';

  var plugins = [gramIdentity.gramIdentityPlugin, gramValue.gramValuePlugin];

  exports.plugins = plugins;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-preset-basic.umd.development.js.map
