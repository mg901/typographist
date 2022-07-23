var { configValidation } = require('./config-validation');
var utils = require('./library');

// getBreakpoints :: Object -> Object | Void
function createBreakpointsMap(config) {
  configValidation(config);

  return createBreakpointsMapProcess(config);
}

// createBreakpointsMap :: Object -> Object
function createBreakpointsMapProcess(config) {
  return []
    .concat(createInitialBreakpoint(config), createNamedBreakpoints(config))
    .reduce(inheritProps, [])
    .map((item) => createRootProp(createRatio(normalizeBase(item))))
    .reduce(setBreakpointNameProp, {});
}

// createInitialBreakpoint :: Object -> [Object]
function createInitialBreakpoint(config) {
  return {
    base: config.base,
    lineHeight: config.lineHeight,
    ratio: config.ratio,
    name: 'initial',
    minWidth: '0px',
  };
}

// createNamedBreakpoints :: Object -> [Object]
function createNamedBreakpoints(config) {
  var breaks = utils.omit('base', 'lineHeight', 'ratio', config);
  var result = [];
  var key;

  for (key in breaks) {
    breaks[key].name = key;

    result.push(breaks[key]);
  }

  return result;
}

// inheritProps :: Object -> Object
function inheritProps(acc, item, index) {
  return acc.concat(utils.merge({}, acc[index - 1], item));
}

// ---------- BASE ------------------------------------------------------------
// normalizeBase :: Object -> Object
function normalizeBase(breakpoint) {
  return utils.merge(breakpoint, { base: breakpoint.base.map(parseFloat) });
}

// ---------- RATIO -----------------------------------------------------------

// createRatio :: Object -> Object
function createRatio(breakpoint) {
  return utils.merge(breakpoint, {
    ratio:
      typeof breakpoint.ratio === 'string'
        ? calcRatio(breakpoint.ratio, breakpoint.base)
        : breakpoint.ratio,
  });
}
// calcRatio :: (String, [Number]) -> Number
function calcRatio(ratio, base) {
  var values = ratio.trim().split(' ');
  var firstBase = base[0];

  return (getFontSize(values) / firstBase) ** (1 / getStep(values));
}

// getStep :: [String] -> Number
function getStep(x) {
  return parseFloat(x.slice(-1));
}

// getFontSize :: [String] -> Number
function getFontSize(x) {
  return parseFloat(x[0]);
}

// ---------- ROOT -----------------------------------------------------------
// createRootProp :: Object -> Object
function createRootProp(breakpoint) {
  var half = 2;

  return utils.merge(breakpoint, {
    root: calcLeading(breakpoint.base, breakpoint.lineHeight) / half,
  });
}

// calcLeading :: ([Number], Number) -> Number
function calcLeading(base, lineHeight) {
  return Math.round(base[0] * lineHeight);
}

// setBreakpointNameProp :: (Object, Object) -> Object
function setBreakpointNameProp(acc, breakpoint) {
  acc[breakpoint.name] = utils.omit('name', breakpoint);

  return acc;
}

module.exports = {
  createInitialBreakpoint,
  createNamedBreakpoints,
  inheritProps,
  normalizeBase,
  getFontSize,
  getStep,
  calcRatio,
  createRatio,
  calcLeading,
  createRootProp,
  setBreakpointNameProp,
  createBreakpointsMapProcess,
  createBreakpointsMap,
};
