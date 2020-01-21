const { calcFontSize } = require('../lib/calculators');
const { createBreakpointName } = require('../lib/media-queries');

// step :: (Object, Object) -> Void
exports.step = function(decl, breakpointsMap) {
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
  const stepUnit = /^-?\d+(\.\d+)?step$/;

  return /^font-size$/.test(prop) && stepUnit.test(value);
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
