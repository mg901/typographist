var utils = require('./lib');

var ERROR_PREFIX = '[typographist]: Check your config. ';

var BASE_MUST_BE_AN_ARRAY =
  "is invalid 'base'. Base must be an array of strings. " +
  "Example 'base': ['14px', '32px'].";

var BASE_MUST_CONTAIN_PX =
  "is invalid 'base'. Base must contain pixels " +
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
  throwDoesntContainBreakpointProp(x);
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
// throwBaseMustBeAnArray -> a -> Void
function throwBaseMustBeAnArray(x) {
  invariantWithErrorPrefix(
    Array.isArray(x),
    "'" + x + "' " + BASE_MUST_BE_AN_ARRAY,
  );
}

// throwBaseMustContainPixels :: a -> Void
function throwBaseMustContainPixels(x) {
  invariantWithErrorPrefix(hasPx(x), "'" + x + "' " + BASE_MUST_CONTAIN_PX);
}

// validateBases :: Object -> Void
function validateBases(x) {
  utils
    .deepObjectValues('base')(x)
    .forEach((item) => {
      throwBaseMustBeAnArray(item);
      item.forEach(throwBaseMustContainPixels);
    });
}

// ---------- BREAKPOINTS ------------------------------------------------------
// validateBreakpoint :: Object -> Void
function throwDoesntContainBreakpointProp(x) {
  var breaks = utils.omit('base', 'lineHeight', 'ratio', x);
  var keys = Object.keys(breaks);

  if (keys.length) {
    keys.forEach((key) => {
      invariantWithErrorPrefix(
        breaks[key].breakpoint,
        "'" +
          key +
          "'" +
          ': must contain the mandatory breakpoint property. Example ' +
          "'" +
          key +
          "': {breakpoint: '768px'}.",
      );
    });
  }
}

// validateField :: a -> Void
function throwInvalidBreakpoint(x) {
  invariantWithErrorPrefix(
    typeof x === 'string' && hasPx(x),
    "'" + x + "' " + BREAKPOINT_ERROR_MESSAGE,
  );
}

// validateFields :: config -> Void
function validateBreakpoints(x) {
  utils
    .deepObjectValues('breakpoint')(x)
    .forEach(throwInvalidBreakpoint);
}

// ---------- LINE-HEIGHT --------------------------------------------------------
// validateField :: a -> Void
function throwInvalidLineHeight(x) {
  invariantWithErrorPrefix(
    typeof x === 'number' && utils.isNumeric(x),
    "'" + x + "' " + LINE_HEIGHT_ERRROR_MESSAGE,
  );
}

// validateFields :: config -> Void
function validateLineHeights(x) {
  utils
    .deepObjectValues('lineHeight')(x)
    .forEach(throwInvalidLineHeight);
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
function throwInvalidRatio(x) {
  var isValid =
    (typeof x === 'number' && utils.isNumeric(x)) ||
    (ratioHasFontSize(x) && ratioHasAtWord(x) && ratioHasStep(x));

  invariantWithErrorPrefix(isValid, "'" + x + "' " + RATIO_ERROR_MESSAGE);
}

// validateFields :: config -> Void
function validateRatios(x) {
  utils
    .deepObjectValues('ratio')(x)
    .forEach(throwInvalidRatio);
}

module.exports = {
  hasPx,
  throwBaseMustBeAnArray,
  throwBaseMustContainPixels,
  validateBases,
  throwDoesntContainBreakpointProp,
  throwInvalidBreakpoint,
  validateBreakpoints,
  throwInvalidLineHeight,
  validateLineHeights,
  ratioHasFontSize,
  ratioHasAtWord,
  ratioHasStep,
  throwInvalidRatio,
  validateRatios,
  validateConfig,
};
