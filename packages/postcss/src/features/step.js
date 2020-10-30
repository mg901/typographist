const { calcFontSize } = require('../lib/calculators');
const { createBreakpointName } = require('../lib/media-queries');

// step :: (Object, Object) -> Void
exports.step = function (decl, breakpointsMap) {
  if (!isStep(decl)) return;

  const step = decl.value.replace(/step/, '');
  const stepToRem = calcFontSize(breakpointsMap);
  const closestRule = getClosestRule(decl);
  const { type, name, params } = closestRule;

  if (type === 'root') {
    decl.value = stepToRem(step);
  }

  if (isSuitableMedia(name)) {
    decl.value = stepToRem(step, createBreakpointName(params));
  }

  if (name === 'between') {
    throw decl.error('Use @up, @down or @only to calculate the step.');
  }
};

// isStep :: Object -> Boolean
function isStep({ prop, value }) {
  return (hasFontSizeProp(prop) || hasCssVar(prop)) && hasStepUnit(value);
}

// hasFontSizeProp :: String -> Boolean
function hasFontSizeProp(x) {
  return /^font-size$/.test(x);
}

function hasCssVar(x) {
  return /^--[a-z0-9-]/gi.test(x);
}

// hasStepUnit :: String -> Boolean
function hasStepUnit(x) {
  return /^-?\d+(\.\d+)?step$/.test(x);
}

// isAppropriateMedia :: String -> Boolean
function isSuitableMedia(x) {
  return /^((up|down|only)$)|((up|down|only):(landscape|portrait))$/.test(x);
}

// getClosestRule :: Object -> Object
function getClosestRule({ parent }) {
  let selectorParent = parent;

  while (selectorParent && selectorParent.type !== 'atrule') {
    selectorParent = selectorParent.parent;
    if (selectorParent.type === 'root') {
      return selectorParent;
    }
  }

  return selectorParent;
}
