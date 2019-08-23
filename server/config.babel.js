const babelrc = require('./.babelrc');

module.exports = (api) => {
  api.cache(true);

  return {
    presets: babelrc.presets,
    plugins: babelrc.plugins,
  };
};
