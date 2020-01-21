const { toEm } = require('@typographist/utils');
const { toPx, toEmOrNot, camelize } = require('../lib/convertors');
const { getNextBreakpointValue } = require('./utils');

// calcMaxBreakValue :: (String | Number) -> Number
const calcMaxBreakValue = (x) => toEm(parseFloat(x) - 0.02);

// calcMinWidth :: Object -> [String] -> String
exports.calcMinWidth = (breakpoints) => (breakpoint) => {
  const breakParams = camelize(String(breakpoint));

  return breakpoints[breakParams]
    ? toEm(breakpoints[breakParams].minWidth)
    : toEmOrNot(breakParams);
};

// calcMaxWidth :: Object -> String -> String
exports.calcMaxWidth = (breakpoints) => (breakpoint) => {
  const breakParams = camelize(String(breakpoint));

  if (breakpoints[breakParams]) {
    const nextBreakpointValue = getNextBreakpointValue(
      breakParams,
      breakpoints,
    );

    return calcMaxBreakValue(nextBreakpointValue);
  }

  if (breakParams.includes('em')) {
    return calcMaxBreakValue(toPx(breakParams));
  }

  return calcMaxBreakValue(breakParams);
};
