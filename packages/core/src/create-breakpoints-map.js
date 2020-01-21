var { validateConfig } = require('./validate-config');
var utils = require('./lib');

// getBreakpoints :: Object -> Object | Void
function createBreakpointsMap(x) {
  validateConfig(x);

  return createBreakpointsMapProcess(x);
}

// createBreakpointsMap :: Object -> Object
function createBreakpointsMapProcess(x) {
  return []
    .concat(createInitialBreakpoint(x), createNamedBreakpoints(x))
    .reduce(inheritProps, [])
    .map((item) => createRootProp(createRatio(normalizeBase(item))))
    .reduce(setBreakpointNameProp, {});
}

// createInitialBreakpoint :: Object -> [Object]
function createInitialBreakpoint(x) {
  return [
    {
      base: x.base,
      lineHeight: x.lineHeight,
      ratio: x.ratio,
      name: 'initial',
      minWidth: '0px',
    },
  ];
}

// createNamedBreakpoints :: Object -> [Object]
function createNamedBreakpoints(x) {
  var breaks = utils.omit('base', 'lineHeight', 'ratio', x);
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
function normalizeBase(x) {
  return utils.merge(x, { base: x.base.map(parseFloat) });
}

// ---------- RATIO -----------------------------------------------------------

// createRatio :: Object -> Object
function createRatio(x) {
  return utils.merge(x, {
    ratio: typeof x.ratio === 'string' ? calcRatio(x.ratio, x.base) : x.ratio,
  });
}
// calcRatio :: (String, [Number]) -> Number
function calcRatio(ratio, base) {
  var values = ratio.trim().split(' ');
  var firstBase = base[0];

  return Math.pow(getFontSize(values) / firstBase, 1 / getStep(values));
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
function createRootProp(x) {
  var half = 2;

  return utils.merge(x, { root: calcLeading(x.base, x.lineHeight) / half });
}

// calcLeading :: ([Number], Number) -> Number
function calcLeading(base, lineHeight) {
  return Math.round(base[0] * lineHeight);
}

// setBreakpointNameProp :: (Object, Object) -> Object
function setBreakpointNameProp(acc, x) {
  acc[x.name] = utils.omit('name', x);

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
