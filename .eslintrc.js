module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-console': 2,
    'newline-before-return': 2,
    'arrow-body-style': 2,
    'import/no-default-export': 2,
    'no-restricted-syntax': 0,
    'prefer-destructuring': 0,
    'prefer-template': 0,
    'no-restricted-properties': 0,
    'no-underscore-dangle': 0,
    'no-restricted-globals': 0,
    'no-use-before-define': 0,
    'func-names': 0,
    'prefer-object-spread': 0,
    'prefer-rest-params': 0,
    'no-param-reassign': 0,
    'guard-for-in': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
