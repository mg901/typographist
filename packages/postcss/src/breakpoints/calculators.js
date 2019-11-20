const { toEm } = require('@typographist/utils');
const {
  toPx,
  toEmOrNot,
  hasEm,
  camelize,
} = require('@typographist/utils/postcss');
const { getNextBreakpointValue } = require('./utils');

// normalizeBreakParams :: [String] -> String
const normalizeBreakParams = (x) => camelize(String(x));

// calcMaxBreakValue :: (String | Number) -> Number
const calcMaxBreakValue = (x) => toEm(parseFloat(x) - 0.02);

// calcMinWidth :: Object -> [String] -> String
exports.calcMinWidth = (breakpoints) => (breakpoint) => {
  const breakParams = normalizeBreakParams(breakpoint);

  return breakpoints[breakParams]
    ? toEm(breakpoints[breakParams].value)
    : toEmOrNot(breakParams);
};

// calcMaxWidth :: Object -> String -> String
exports.calcMaxWidth = (breakpoints) => (breakpoint) => {
  const breakParams = normalizeBreakParams(breakpoint);

  if (breakpoints[breakParams]) {
    const nextBreakpointValue = getNextBreakpointValue(
      breakParams,
      breakpoints,
    );

    return calcMaxBreakValue(nextBreakpointValue);
  }

  if (hasEm(breakParams)) {
    return calcMaxBreakValue(toPx(breakParams));
  }

  return calcMaxBreakValue(breakParams);
};
