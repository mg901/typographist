const { rule } = require('postcss');
const { toRem } = require('@typographist/utils');
const { makeBreakpointName } = require('@typographist/utils/postcss');
const { modularScale } = require('@typographist/modular-scale');
const { mediaQuery, fontSizeProp } = require('../elements');

const FONT_SIZE_PROP = /^font-size$/;
const STEP_FUNCTION_WITH_VALUE = /^step\(.+?\)$/;
const STEP_WITH_PARENTHESES = /step\(/;
const INVERCE_PARENTHESES = /\)$/;

// isStepFunction :: Object -> Boolean
exports.isStepFunction = ({ prop, value }) =>
  FONT_SIZE_PROP.test(prop) && STEP_FUNCTION_WITH_VALUE.test(value);

// stepFunction :: (Object, Object) -> Void
exports.stepFunction = (decl, breakpointsMap) => {
  const stepToRem = calcFontSize(breakpointsMap);
  const target = makeTarget(decl.value);

  tailOfBreaksEntries(breakpointsMap)
    .reverse()
    .map(([name, { value }]) => {
      const fontSize = fontSizeProp(
        stepToRem(target, makeBreakpointName(name)),
      );
      const selectorWithFontSize = parentSelector(decl.parent).append(fontSize);

      return decl.parent.after(mediaQuery(value).append(selectorWithFontSize));
    });

  decl.replaceWith(fontSizeProp(stepToRem(target)));
};

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

// tailOfBreaksEntries :: Object -> Object
function tailOfBreaksEntries({ initial, ...breaks }) {
  return Object.entries(breaks);
}

// makeTarget :: String -> String
function makeTarget(x) {
  return x.replace(STEP_WITH_PARENTHESES, '').replace(INVERCE_PARENTHESES, '');
}

// parentSelector :: Object -> Object
function parentSelector({ selector }) {
  return rule({
    selector,
  });
}
