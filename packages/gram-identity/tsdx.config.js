
const builtins = require('rollup-plugin-node-builtins');
// const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'gram.identity'
      delete config.external;
      config.plugins.push(builtins())
    }
  
    return config;
  }
}