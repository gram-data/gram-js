
module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'gram.value'
      delete config.external;
    }
  
    return config;
  }
}