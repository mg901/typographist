const postcssPresetEnv = require('postcss-preset-env');
const { typographist } = require('@typographist/postcss');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      'custom-properties': true,
    }),
    typographist(),
  ],
};
