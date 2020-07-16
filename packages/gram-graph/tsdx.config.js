module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'gram.graph'
      delete config.external;
    }
    return config;
  }
}
