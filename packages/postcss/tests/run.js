const postcss = require('postcss');
const { typographist } = require('../src');
const { userConfig } = require('../../../mocks');
require('jest-postcss');

module.exports = (input) =>
  postcss([typographist(userConfig)]).process(input, {
    from: 'CSS',
  });
