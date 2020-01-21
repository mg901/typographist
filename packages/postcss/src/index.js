const { plugin } = require('postcss');
const { ratios } = require('@typographist/core');
const { walk } = require('./walk');

const typographist = plugin('[typographist]', walk);

module.exports = {
  ratios,
  typographist,
};
