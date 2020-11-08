module.exports = {
  extends: [
    '../../.eslintrc.js',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-wrap-multilines': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-curly-newline': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
  },
};
