const prettierConfig = require('./.prettierrc');

module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    beforeEach: true,
    describe: true,
    document: true,
    expect: true,
    it: true,
    jest: true,
    window: true,
  },
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': ['error', prettierConfig],
    'react/jsx-filename-extension': 0,
  },
};
