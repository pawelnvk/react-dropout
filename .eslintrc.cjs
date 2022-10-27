const prettierConfig = require('./.prettierrc.cjs');

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  globals: {
    beforeEach: true,
    describe: true,
    document: true,
    expect: true,
    it: true,
    jest: true,
    window: true,
  },
  parser: '@babel/eslint-parser',
  plugins: ['prettier'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': ['error', prettierConfig],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': 0,
  },
};
