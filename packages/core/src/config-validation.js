var utils = require('./library');

// configValidation :: config -> Void
var configValidation = function (config) {
  validateDefaultBreakpoint(config);
  validateBases(config);
  throwDoesNotContainMinWidthProp(config);
  validateBreakpoints(config);
  validateLineHeights(config);
  validateRatios(config);
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
function validateDefaultBreakpoint(config) {
  const fields = getFields(config);

  const requiredFields = ['base', 'lineHeight', 'ratio'];

  requiredFields.forEach((k) => {
    invariantWithErrorPrefix(
      fields.indexOf(k) !== -1,
      "'" + k + "' is required field for default breakpoint.",
    );
  });
}

function getFields(config) {
  return Object.keys(Object(config)).filter(
    (key) => utils.type(config[key]) !== 'Object',
  );
}

// ---------- BASE ------------------------------------------------------------
// throwBaseMustBeAnArray -> a -> Void
function throwBaseMustBeAnArray(base) {
  invariantWithErrorPrefix(
    Array.isArray(base),
    "'" +
      base +
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
function validateBases(config) {
  utils
    .deepObjectValues('base')(Object(config))
    .forEach((bases) => {
      throwBaseMustBeAnArray(bases);
      bases.map(throwBaseMustContainPixels);
    });
}

// ---------- BREAKPOINTS ------------------------------------------------------
// validateBreakpoint :: Object -> Void
function throwDoesNotContainMinWidthProp(config) {
  var breakpoints = utils.omit('base', 'lineHeight', 'ratio', Object(config));

  Object.keys(breakpoints).forEach((breakpoint) => {
    invariantWithErrorPrefix(
      breakpoints[breakpoint].minWidth,
      "'" +
        breakpoint +
        "'" +
        ": must contain the mandatory 'minWidth' property. Example " +
        "'" +
        breakpoint +
        "': {minWidth: '768px'}.",
    );
  });
}

// validateField :: a -> Void
function throwInvalidBreakpoint(breakpoint) {
  invariantWithErrorPrefix(
    typeof breakpoint === 'string' && breakpoint.includes('px'),
    "'" +
      breakpoint +
      "' is invalid 'breakpoint'. Breakpoint must be a string with a value (in pixels). " +
      "Example 'minWidth': '1024px'.",
  );
}

// validateFields :: config -> Void
function validateBreakpoints(config) {
  utils
    .deepObjectValues('breakpoint')(Object(config))
    .map(throwInvalidBreakpoint);
}

// ---------- LINE-HEIGHT --------------------------------------------------------
// validateField :: a -> Void
function throwInvalidLineHeight(lineHeight) {
  invariantWithErrorPrefix(
    typeof lineHeight === 'number' && utils.isNumeric(lineHeight),
    "'" +
      lineHeight +
      "' is invalid 'lineHeight'. LineHeight must be a number. Example 'lineHeight': 1.5'",
  );
}

// validateFields :: config -> Void
function validateLineHeights(config) {
  utils
    .deepObjectValues('lineHeight')(Object(config))
    .map(throwInvalidLineHeight);
}

// ---------- RATIO --------------------------------------------------------------

// ratioHasFontSize :: String -> Boolean
function ratioHasFontSize(ratio) {
  return /^\d+(\.\d+)?px\b/g.test(ratio);
}

// ratioHasAtWord :: String -> Boolean
function ratioHasAtWord(ratio) {
  return /\sat\s/.test(ratio);
}

// ratioHasStep :: String -> Boolean
function ratioHasStep(ratio) {
  return /-?\b\d+(\.\d+)?\b\s*$/g.test(ratio);
}

// validateField :: a -> Void
function throwInvalidRatio(ratio) {
  var isValid =
    (typeof ratio === 'number' && utils.isNumeric(ratio)) ||
    (ratioHasFontSize(ratio) && ratioHasAtWord(ratio) && ratioHasStep(ratio));

  invariantWithErrorPrefix(
    isValid,
    "'" +
      ratio +
      "' is invalid ratio. Ratio must be a number or string containing the font size (in pixels), " +
      'the word `at` and step. Example ratio: `1.25` or ratio: `36px at 6`.',
  );
}

// validateFields :: config -> Void
function validateRatios(config) {
  utils.deepObjectValues('ratio')(Object(config)).map(throwInvalidRatio);
}

module.exports = {
  validateDefaultBreakpoint,
  throwBaseMustBeAnArray,
  throwBaseMustContainPixels,
  validateBases,
  throwDoesNotContainMinWidthProp,
  throwInvalidBreakpoint,
  validateBreakpoints,
  throwInvalidLineHeight,
  validateLineHeights,
  ratioHasFontSize,
  ratioHasAtWord,
  ratioHasStep,
  throwInvalidRatio,
  validateRatios,
  configValidation,
};
