
module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'gram.identity'
      delete config.external;
    }
  
    return config;
  }
}