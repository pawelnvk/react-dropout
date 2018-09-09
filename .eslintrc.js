module.exports = {
  extends: 'airbnb',
  globals: {
    beforeEach: true,
    describe: true,
    document: true,
    expect: true,
    it: true,
    jest: true,
    window: true
  },
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0
  }
};
