const {
  getOrientation,
  getBreakpointValues,
  withMinWidth,
  withMaxWidth,
  withMinAndMaxWidth,
  withOrientationOrNot,
} = require('./utils');
const { calcMinWidth, calcMaxWidth } = require('./calculators');
const {
  throwInvalidOrientation,
  throwInvalidBreakpointValue,
  throwLastBreakpoint,
  throwLessThanTwoArgs,
} = require('./validators');

// up :: (Object, Object) -> String | Void
exports.up = (atrule, breakpoints) => {
  throwInvalidOrientation(atrule);
  throwInvalidBreakpointValue(breakpoints, atrule);

  return [
    getBreakpointValues,
    calcMinWidth(breakpoints),
    withMinWidth,
    withOrientationOrNot(getOrientation(atrule.params)),
  ].reduce((acc, f) => f(acc), atrule.params);
};

// down :: (Object, Object) -> String | Void
exports.down = (atrule, breakpoints) => {
  throwInvalidOrientation(atrule);
  throwInvalidBreakpointValue(breakpoints, atrule);
  throwLastBreakpoint(breakpoints, atrule);

  return [
    getBreakpointValues,
    calcMaxWidth(breakpoints),
    withMaxWidth,
    withOrientationOrNot(getOrientation(atrule.params)),
  ].reduce((acc, f) => f(acc), atrule.params);
};

// only :: (Object, Object) -> String | Void
exports.only = (atrule, breakpoints) => {
  const { params } = atrule;

  throwInvalidOrientation(atrule);
  throwInvalidBreakpointValue(breakpoints, atrule);
  throwLastBreakpoint(breakpoints, atrule);

  // min :: String -> String
  const min = [getBreakpointValues, calcMinWidth(breakpoints)].reduce(
    (acc, f) => f(acc),
    params,
  );

  // max :: String -> String
  const max = [getBreakpointValues, calcMaxWidth(breakpoints)].reduce(
    (acc, f) => f(acc),
    params,
  );

  const mediaQueries = withMinAndMaxWidth(min, max);
  const withOrientation = withOrientationOrNot(getOrientation(params));

  return withOrientation(mediaQueries);
};

// only :: (Object, Object) -> String | Void
exports.between = (atrule, breakpoints) => {
  const { params } = atrule;
  throwLessThanTwoArgs(atrule);
  throwInvalidBreakpointValue(breakpoints, atrule);
  throwInvalidOrientation(atrule);
  throwLastBreakpoint(breakpoints, atrule);

  // min :: [String] -> String
  const min = (x) => {
    const [head] = getBreakpointValues(x);

    return calcMinWidth(breakpoints)(head);
  };

  // max :: [String] -> String
  const max = (x) => {
    const [, ...tail] = getBreakpointValues(x);

    return calcMaxWidth(breakpoints)(tail);
  };

  const mediaQueries = withMinAndMaxWidth(min(params), max(params));
  const withOrientation = withOrientationOrNot(getOrientation(params));

  return withOrientation(mediaQueries);
};
