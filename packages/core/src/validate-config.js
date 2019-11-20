var utils = require('./lib');

var ERROR_PREFIX = '[typographist]: Check your config. ';

var BASE_ERROR_MESSAGE =
  "is invalid 'base'. Base must be an array of strings. " +
  "Example 'base': ['14px', '32px'].";

var BREAKPOINT_ERROR_MESSAGE =
  "is invalid 'breakpoint'. Breakpoint must be a string with a value (in pixels). " +
  "Example 'breakpoint': '1024px'.";

var LINE_HEIGHT_ERRROR_MESSAGE =
  "is invalid 'lineHeight'. LineHeight must be a number. Example 'lineHeight': 1.5'";

var RATIO_ERROR_MESSAGE =
  "is ivalid 'ratio'. Ratio must be a number or string containing the font size (in pixels), " +
  "the word 'at' and step. Example ratio: 1.25 or ratio: '36px at 6'.";

// validateConfig :: config -> Void
var validateConfig = function(x) {
  validateBases(x);
  throwIfDoesntContainBreakpointProp(x);
  validateBreakpoints(x);
  validateLineHeights(x);
  validateRatios(x);
};

function invariantWithErrorPrefix(condition, message) {
  return utils.invariant(condition, ERROR_PREFIX + message);
}

// hasPx :: a -> Boolean
function hasPx(x) {
  return /\d+(\.\d+)?px/.test(x);
}

// ---------- BASE ------------------------------------------------------------

// validateField :: a -> Void
function throwIsInvalidBase(x) {
  return invariantWithErrorPrefix(
    hasPx(x),
    "'" + x + "' " + BASE_ERROR_MESSAGE,
  );
}

// validateBases :: Object -> Void
function validateBases(x) {
  return (
    utils
      .deepObjectValues('base')(x)
      // make flat array
      .reduce((acc, y) => acc.concat(y), [])
      .forEach(throwIsInvalidBase)
  );
}

// ---------- BREAKPOINTS ------------------------------------------------------
// validateBreakpoint :: Object -> Void
function throwIfDoesntContainBreakpointProp(x) {
  var breaks = utils.omit('base', 'lineHeight', 'ratio', x);

  Object.keys(breaks).forEach((key) => {
    invariantWithErrorPrefix(
      breaks[key].breakpoint,
      "'" +
        key +
        "': must contain the mandatory breakpoint property. Example '" +
        key +
        "': {breakpoint: '768px'}.",
    );
  });
}

// validateField :: a -> Void
function throwIsInvalidBreakpoint(x) {
  invariantWithErrorPrefix(
    typeof x === 'string' && hasPx(x),
    "'" + x + "' " + BREAKPOINT_ERROR_MESSAGE,
  );
}

// validateFields :: config -> Void
function validateBreakpoints(x) {
  utils
    .deepObjectValues('breakpoint')(x)
    .forEach((y) => {
      // throwIfDoesntContainBreakpointProp(y);
      throwIsInvalidBreakpoint(y);
    });
}

// ---------- LINE-HEIGHT --------------------------------------------------------
// validateField :: a -> Void
function throwIsInvalidLineHeight(x) {
  invariantWithErrorPrefix(
    typeof x === 'number' && utils.isNumeric(x),
    "'" + x + "' " + LINE_HEIGHT_ERRROR_MESSAGE,
  );
}

// validateFields :: config -> Void
function validateLineHeights(x) {
  return utils
    .deepObjectValues('lineHeight')(x)
    .forEach(throwIsInvalidLineHeight);
}

// ---------- RATIO --------------------------------------------------------------

// ratioHasFontSize :: String -> Boolean
function ratioHasFontSize(x) {
  return /^\d+(\.\d+)?px\b/g.test(x);
}

// ratioHasAtWord :: String -> Boolean
function ratioHasAtWord(x) {
  return /\sat\s/.test(x);
}

// ratioHasStep :: String -> Boolean
function ratioHasStep(x) {
  return /-?\b\d+(\.\d+)?\b\s*$/g.test(x);
}

// validateField :: a -> Void
function throwIsInvalidRatio(x) {
  var isValid =
    (typeof x === 'number' && utils.isNumeric(x)) ||
    (ratioHasFontSize(x) && ratioHasAtWord(x) && ratioHasStep(x));

  utils.invariant(isValid, ERROR_PREFIX + "'" + x + "' " + RATIO_ERROR_MESSAGE);
}

// validateFields :: config -> Void
function validateRatios(x) {
  return utils
    .deepObjectValues('ratio')(x)
    .forEach(throwIsInvalidRatio);
}

module.exports = {
  hasPx,
  throwIsInvalidBase,
  validateBases,
  throwIfDoesntContainBreakpointProp,
  throwIsInvalidBreakpoint,
  validateBreakpoints,
  throwIsInvalidLineHeight,
  validateLineHeights,
  ratioHasFontSize,
  ratioHasAtWord,
  ratioHasStep,
  throwIsInvalidRatio,
  validateRatios,
  validateConfig,
};
