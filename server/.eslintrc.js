const path = require('path');
module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    parser: 'babel-eslint',
    requireConfigFile: true,
    babelOptions: {
      configFile: path.resolve(__dirname, 'config.babel.js'),
    },
  },
  rules: {
    "no-console": 0,
    "no-new": 0,
    "no-underscore-dangle": 0,
    "import/prefer-default-export": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-cycle": 0,
    "no-return-await": 0,
    "prefer-spread": 0,
    "camelcase": 0,
  },
};
