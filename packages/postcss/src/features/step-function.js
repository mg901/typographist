const { rule } = require('postcss');
const { calcFontSize } = require('../lib/calculators');
const { createBreakpointName } = require('../lib/media-queries');
const { createMediaQuery, createFontSizeProp } = require('../elements');

// stepFn :: (Object, Object) -> Void
exports.stepFn = function(decl, breakpointsMap) {
  if (!isStepFn(decl)) return;

  const stepToRem = calcFontSize(breakpointsMap);
  const step = createStep(decl.value);

  Object.entries(breakpointsMap)
    .slice(1)
    .reverse()
    .forEach(([name, { minWidth }]) => {
      const fontSize = createFontSizeProp(
        stepToRem(step, createBreakpointName(name)),
      );
      const selectorWithFontSize = rule({
        selector: decl.parent.selector,
      }).append(fontSize);

      decl.parent.after(
        createMediaQuery(minWidth).append(selectorWithFontSize),
      );
    });

  decl.replaceWith(createFontSizeProp(stepToRem(step)));
};

// isStepFn :: Object -> Boolean
function isStepFn({ prop, value }) {
  const stepFnWithValue = /^step\(.+?\)$/;

  return /^font-size$/.test(prop) && stepFnWithValue.test(value);
}

// createStep :: String -> String
function createStep(x) {
  const outsideOfParentheses = /^step\((\w+)\).*$/g;

  return x.replace(outsideOfParentheses, '$1');
}
