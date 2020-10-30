const { toKebabCase } = require('../lib/convertors');

// getOrientation :: String -> String
exports.getOrientation = function (x) {
  const allCharactersBeforeColon = /^\(.+\):?/;

  return x.replace(allCharactersBeforeColon, '');
};

// getBreakpointValues :: String -> [String]
exports.getBreakpointValues = function (params) {
  const notBreakpointsNames = /^\(([a-z0-9-]+(,?[a-z0-9-]+)?)\).*$/i;

  return params
    .replace(/\s/g, '')
    .replace(notBreakpointsNames, '$1')
    .split(',');
};

// createBreakpointList :: Object -> [String]
exports.createBreakpointList = function (x) {
  return Object.keys(x).slice(1).map(toKebabCase).join(', ');
};

// withMinWidth :: String -> String
exports.withMinWidth = function (x) {
  return `(min-width: ${x})`;
};

// withMaxMedia :: String -> String
exports.withMaxWidth = function (x) {
  return `(max-width: ${x})`;
};

// withMinAndMaxWidth :: (String, String) -> String
exports.withMinAndMaxWidth = function (min, max) {
  return `(min-width: ${min}) and (max-width: ${max})`;
};

// withOrientationOrNot :: String -> String -> String
exports.withOrientationOrNot = (orientation) => (params) =>
  orientation ? `${params} and (orientation: ${orientation})` : params;

// antecedentBreakName :: Object -> String
exports.antecedentBreakName = (x) => {
  const keys = Object.keys(x);

  return keys[keys.length - 2];
};

// getlastBreakIndex :: Object -> Number
exports.getlastBreakIndex = (x) => Object.keys(x).length - 1;

// getCurrentIndex :: (String, Object) -> Number
const getCurrentIndex = (name, breakpoints) =>
  Object.keys(breakpoints).indexOf(name);

exports.getCurrentIndex = getCurrentIndex;

// getNextBreakpointValue :: String  -> Object -> String
exports.getNextBreakpointValue = (name, breakpoints) => {
  const currentIndex = getCurrentIndex(name, breakpoints);
  const nextBreakpointName = Object.keys(breakpoints)[currentIndex + 1];

  return breakpoints[nextBreakpointName].minWidth;
};
