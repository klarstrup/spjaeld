const path = require('path');
const baseRules = require('eslint-config-airbnb-base/rules/style');
const [_, ...restricted] = baseRules.rules['no-restricted-syntax'];

module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: [
    'babel',
    'import',
    'compat',
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'linebreak-style': 0,
    'no-restricted-syntax': [2,
      ...restricted.filter(
        r => !['ForOfStatement'].includes(r.selector)
      ),
    ],
    'global-require': 0,
    'import/no-unresolved': [2, { commonjs: true }],
    'compat/compat': 2
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.join(__dirname),
          'node_modules',
        ],
      },
    },
  },
};
