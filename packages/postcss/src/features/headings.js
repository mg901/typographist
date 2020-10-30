const { decl, rule } = require('postcss');
const { calcFontSize } = require('../lib/calculators');
const { createBreakpointName } = require('../lib/media-queries');
const { createMediaQuery, createFontSizeProp } = require('../elements');

// renderH1 :: (Object, Object) -> Void
exports.renderH1 = createHeading({
  name: 'h1',
  defaultStep: 6,
  lineHeight: '4rem',
  marginTop: '8rem',
  marginBottom: '2rem',
});

// renderH2 :: (Object, Object) -> Void
exports.renderH2 = createHeading({
  defaultStep: 5,
  lineHeight: '3rem',
  marginTop: '5rem',
  marginBottom: '1rem',
});

// renderH3 :: (Object, Object) -> Void
exports.renderH3 = createHeading({
  defaultStep: 4,
  lineHeight: '2rem',
  marginTop: '4rem',
  marginBottom: '1rem',
});

// renderH4 :: (Object, Object) -> Void
exports.renderH4 = createHeading({
  defaultStep: 3,
  lineHeight: '2rem',
  marginTop: '3rem',
  marginBottom: '1rem',
});

// renderH5 :: (Object, Object) -> Void
exports.renderH5 = createHeading({
  defaultStep: 2,
  lineHeight: '2rem',
  marginTop: '5rem',
  marginBottom: '1rem',
});

// renderH6 :: (Object, Object) -> Void
exports.renderH6 = createHeading({
  defaultStep: 1,
  lineHeight: '2rem',
  marginTop: '5rem',
  marginBottom: '1rem',
});

/*
createHeading :: {
  defaultStep :: Number
  lineHeight :: String,
  marginTop :: String,
  marginBottom :: String,
  
} -> (Object, Object) -> Void
*/
function createHeading({ defaultStep, lineHeight, marginTop, marginBottom }) {
  return function (atrule, breakpoints) {
    if (!isHeading(atrule)) return;

    throwEmptyArgument(atrule);
    throwInvalidParam(atrule);

    const stepToRem = calcFontSize(breakpoints);
    const step = getAtruleParams({
      params: atrule.params,
      defualtParams: defaultStep,
    });

    Object.entries(breakpoints)
      .slice(1)
      .reverse()
      .forEach(([name, { minWidth }]) => {
        const fontSize = createFontSizeProp(
          stepToRem(step, createBreakpointName(name)),
        );
        const selectorWithFontSize = rule({
          selector: atrule.parent.selector,
        }).append(fontSize);

        atrule.parent.after(
          createMediaQuery(minWidth).append(selectorWithFontSize),
        );
      });

    atrule.replaceWith(
      createFontSizeProp(stepToRem(step)),
      decl({
        prop: 'line-height',
        value: lineHeight,
      }),
      decl({
        prop: 'margin-top',
        value: marginTop,
      }),
      decl({
        prop: 'margin-bottom',
        value: marginBottom,
      }),
    );
  };
}

// isHeading :: Object -> Boolean
function isHeading(atrule) {
  return atrule.parent && atrule.parent.selector;
}

// getAtruleParams :: String -> String
function getAtruleParams({ params, defualtParams }) {
  return parseFloat(params.replace(/[()]/g, '')) || defualtParams;
}

function throwEmptyArgument(atrule) {
  const { params, name } = atrule;

  if (params === '()') {
    throw atrule.error(
      `'${params}' argument cannot be empty. @${name} take a number as argument. Example: @${name}(6).`,
    );
  }
}

function throwInvalidParam(atrule) {
  const { params, name } = atrule;
  if (params === '') return;

  if (!parseFloat(params.replace(/[()]/g, ''))) {
    throw atrule.error(
      `'${params}' is invalid params for @${name}. @${name} take a number as argument. Example: @${name}(6).`,
    );
  }
}
