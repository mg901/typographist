module.exports = {
  extends: ['../../.eslintrc.js'],
  plugins: ['prettier'],
  rules: {
    'no-var': 0,
  },
  overrides: [
    {
      files: ['**.spec.js'],
      rules: {
        'no-console': 0,
      },
    },
  ],
};
