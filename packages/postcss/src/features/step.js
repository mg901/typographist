const { toRem } = require('@typographist/utils');
const { makeBreakpointName } = require('@typographist/utils/postcss');
const { modularScale } = require('@typographist/modular-scale');

const FONT_SIZE_PROP = /^font-size$/;
const VAL_WITH_STEP = /^-?\d+(\.\d+)?step$/;
const SUITABLE_MEDIA_QUERIES = /^((up|down|only)$)|((up|down|only):(landscape|portrait))$/;

const ERROR_MESSAGE =
  '[typographist]: Use @up, @down or @only to calculate the step.';

// isStep :: Object -> Boolean
exports.isStep = ({ prop, value }) =>
  hasFontSizeProp(prop) && hasStepUnit(value);

// step :: (Object, Object) -> Void
exports.step = (decl, breakpointsMap) => {
  const target = getTarget(decl);
  const stepToRem = calcFontSize(breakpointsMap);
  const closestRule = getClosestRule(decl);
  const { type, name, params } = closestRule;

  if (type === 'root') {
    decl.value = stepToRem(target);
  }

  if (isSuitableMedia(name)) {
    decl.value = stepToRem(target, makeBreakpointName(params));
  }

  if (name === 'between') {
    throw decl.error(ERROR_MESSAGE);
  }
};

// getTarget :: Object -> String
function getTarget({ value }) {
  return value.replace(/step/, '');
}

// calcFontSize :: Object -> (Number | String, String) -> String
function calcFontSize(breakpoints) {
  // eslint-disable-next-line consistent-return
  return function(target, breakName = 'initial') {
    if (breakpoints[breakName]) {
      const { root, base, ratio } = breakpoints[breakName];

      return toRem(root, modularScale(Number(target), base, ratio));
    }
  };
}

// hasFontSizeProp :: String -> Boolean
function hasFontSizeProp(prop) {
  return FONT_SIZE_PROP.test(prop);
}

// isAppropriateMedia :: String -> Boolean
function isSuitableMedia(x) {
  return SUITABLE_MEDIA_QUERIES.test(x);
}

// hasStepUnit :: String -> Boolean
function hasStepUnit(value) {
  return VAL_WITH_STEP.test(value);
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
