var utils = require('./lib');

// validateConfig :: config -> Void
var validateConfig = function(x) {
  validateDefaultBreakpoint(x);
  validateBases(x);
  throwDoesntContainminWidthProp(x);
  validateBreakpoints(x);
  validateLineHeights(x);
  validateRatios(x);
};

// invariantWithErrorPrefix :: (a, String) -> Void
function invariantWithErrorPrefix(condition, message) {
  return utils.invariant(
    condition,
    '[typographist]: Check your configuration. ' + message,
  );
}

// ---------- DEFAULT BREAKPOINT ----------------------------------------------
// validateDefaultBreakpoint :: Object -> Void
function validateDefaultBreakpoint(x) {
  const fields = getFields(x);

  const requiredFields = ['base', 'lineHeight', 'ratio'];

  requiredFields.forEach((k) => {
    invariantWithErrorPrefix(
      fields.indexOf(k) !== -1,
      "'" + k + "' is required field for default breakpoint.",
    );
  });
}

function getFields(x) {
  return Object.keys(Object(x)).filter((k) => utils.type(x[k]) !== 'Object');
}

// ---------- BASE ------------------------------------------------------------
// throwBaseMustBeAnArray -> a -> Void
function throwBaseMustBeAnArray(x) {
  invariantWithErrorPrefix(
    Array.isArray(x),
    "'" +
      x +
      "' is invalid 'base'. Base must be an array of strings. " +
      "Example 'base': ['14px', '32px'].",
  );
}

// throwBaseMustContainPixels :: a -> Void
function throwBaseMustContainPixels(x) {
  invariantWithErrorPrefix(
    x.indexOf('px') > -1,
    "'" +
      x +
      "' is invalid 'base'. Base must contain pixels " +
      "Example 'base': ['14px', '32px'].",
  );
}

// validateBases :: Object -> Void
function validateBases(x) {
  utils
    .deepObjectValues('base')(Object(x))
    .forEach((item) => {
      throwBaseMustBeAnArray(item);
      item.map(throwBaseMustContainPixels);
    });
}

// ---------- BREAKPOINTS ------------------------------------------------------
// validateBreakpoint :: Object -> Void
function throwDoesntContainminWidthProp(x) {
  var breaks = utils.omit('base', 'lineHeight', 'ratio', Object(x));
  var keys = Object.keys(breaks);

  if (keys.length) {
    keys.forEach((key) => {
      invariantWithErrorPrefix(
        breaks[key].minWidth,
        "'" +
          key +
          "'" +
          ": must contain the mandatory 'minWidth' property. Example " +
          "'" +
          key +
          "': {minWidth: '768px'}.",
      );
    });
  }
}

// validateField :: a -> Void
function throwInvalidBreakpoint(x) {
  invariantWithErrorPrefix(
    typeof x === 'string' && x.includes('px'),
    "'" +
      x +
      "' is invalid 'breakpoint'. Breakpoint must be a string with a value (in pixels). " +
      "Example 'minWidth': '1024px'.",
  );
}

// validateFields :: config -> Void
function validateBreakpoints(x) {
  utils
    .deepObjectValues('breakpoint')(Object(x))
    .map(throwInvalidBreakpoint);
}

// ---------- LINE-HEIGHT --------------------------------------------------------
// validateField :: a -> Void
function throwInvalidLineHeight(x) {
  invariantWithErrorPrefix(
    typeof x === 'number' && utils.isNumeric(x),
    "'" +
      x +
      "' is invalid 'lineHeight'. LineHeight must be a number. Example 'lineHeight': 1.5'",
  );
}

// validateFields :: config -> Void
function validateLineHeights(x) {
  utils
    .deepObjectValues('lineHeight')(Object(x))
    .map(throwInvalidLineHeight);
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

  invariantWithErrorPrefix(
    isValid,
    "'" +
      x +
      "' is ivalid 'ratio'. Ratio must be a number or string containing the font size (in pixels), " +
      "the word 'at' and step. Example ratio: 1.25 or ratio: '36px at 6'.",
  );
}

// validateFields :: config -> Void
function validateRatios(x) {
  utils
    .deepObjectValues('ratio')(Object(x))
    .map(throwInvalidRatio);
}

module.exports = {
  validateDefaultBreakpoint,
  throwBaseMustBeAnArray,
  throwBaseMustContainPixels,
  validateBases,
  throwDoesntContainminWidthProp,
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
