
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');

module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'gram.parse'
      delete config.external;
      config.plugins.push(builtins());
      config.plugins.push(globals());
    }
  
    return config;
  }
}