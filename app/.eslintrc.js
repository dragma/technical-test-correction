module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'import/prefer-default-export': 0,
    'jsx-a11y/accessible-emoji': 0,
    camelcase: 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
  }
};
