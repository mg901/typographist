const postcssPresetEnv = require('postcss-preset-env');
const { typographist } = require('../../packages/postcss/src');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      'custom-properties': true,
    }),
    typographist(),
  ],
};
