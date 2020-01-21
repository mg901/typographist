const { camelize } = require('./convertors');

// createBreakpointName :: String -> String
exports.createBreakpointName = (x) => {
  const charactersAfterColon = /:.+\b/;
  const parentheses = /[()]/g;

  return camelize(x.replace(charactersAfterColon, '').replace(parentheses, ''));
};
