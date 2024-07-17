//the configuration is changed according to https://github.com/strapi/strapi/issues/13802
module.exports = {
  'parser': '@babel/eslint-parser',
  'extends': 'eslint:recommended',
  'ignorePatterns': ['**/generated/*', '.cache', 'build', '**/node_modules/**', '*.ts'],
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
    'browser': false
  },
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': false
    },
    'sourceType': 'module',
    'requireConfigFile': false,
    'babelOptions': { 'presets': ['@babel/preset-react'] }
  },
  'globals': {
    'strapi': true
  },
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 'linebreak-style': ['error', 'unix'],
    // 'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'no-console': 0,
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
