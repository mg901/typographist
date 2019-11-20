const { toKebabCase } = require('@typographist/utils/postcss');

const NOT_BREAKPOINT_NAMES = /^\(([a-z0-9-]+(,?[a-z0-9-]+)?)\).*$/i;
const ALL_CHARACTERS_BEFORE_COLON = /^\(.+\):?/;
const SPACES = /\s/g;

// getOrientation :: String -> String
exports.getOrientation = function(x) {
  return x.replace(ALL_CHARACTERS_BEFORE_COLON, '');
};

// getBreakpointValues :: String -> [String]
exports.getBreakpointValues = function(params) {
  return params
    .replace(SPACES, '')
    .replace(NOT_BREAKPOINT_NAMES, '$1')
    .split(',');
};

// makeBreakpointList :: Object -> [String]
exports.makeBreakpointList = function(x) {
  return Object.keys(x)
    .slice(1)
    .map(toKebabCase)
    .join(', ');
};

// withMinWidth :: String -> String
exports.withMinWidth = function(x) {
  return `(min-width: ${x})`;
};

// withMaxMedia :: String -> String
exports.withMaxWidth = function(x) {
  return `(max-width: ${x})`;
};

// withMinAndMaxWidth :: (String, String) -> String
exports.withMinAndMaxWidth = function(min, max) {
  return `(min-width: ${min}) and (max-width: ${max})`;
};

// withOrientationOrNot :: String -> String -> String
exports.withOrientationOrNot = (orientation) => (params) =>
  orientation ? `${params} and (orientation: ${orientation})` : params;

// antecedentBreakName :: Object -> String
exports.antecedentBreakName = (x) => Object.keys(x)[Object.keys(x).length - 2];

// getlastBreakIndex :: Object -> Number
exports.getlastBreakIndex = (x) => Object.keys(x).length - 1;

// getCurrentIndex :: (String, Object) -> Number
const getCurrentIndex = function(name, breakpoints) {
  return Object.keys(breakpoints).indexOf(name);
};

exports.getCurrentIndex = getCurrentIndex;

// getNextBreakpointValue :: String  -> Object -> String
exports.getNextBreakpointValue = function getNextBreakpointValue(
  name,
  breakpoints,
) {
  const currentIndex = getCurrentIndex(name, breakpoints);
  const nextBreakpointName = Object.keys(breakpoints)[currentIndex + 1];

  return breakpoints[nextBreakpointName].value;
};
