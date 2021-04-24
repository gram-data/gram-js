
module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'gram.stringify'
      delete config.external;
    }
  
    return config;
  }
}