const postcss = require('postcss');
const typographist = require('../src');

module.exports = (input, output, opts) => {
  const result = postcss([typographist(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
};
