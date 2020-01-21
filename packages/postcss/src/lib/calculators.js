const { toRem } = require('@typographist/utils');
const { modularScale } = require('@typographist/modular-scale');

// createFluidFontSize :: Object -> String
exports.createFluidFontSize = ({
  minWidth: minW,
  maxWidth: maxW,
  minFontSize,
  maxFontSize,
  fn = (x) => `${x}px`,
}) => {
  const minWidth = parseFloat(minW);
  const maxWidth = parseFloat(maxW);
  const a = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const b = minFontSize - a * minWidth;
  const viewportWidth = a * 100;

  return b < 0
    ? `calc(${viewportWidth}vw - ${fn(Math.abs(b))})`
    : `calc(${viewportWidth}vw + ${fn(b)})`;
};

// calcFontSize :: Object -> (Number | String, String) -> String
exports.calcFontSize = (breakpoints) => (step, breakName = 'initial') => {
  if (breakpoints[breakName]) {
    const { root, base, ratio } = breakpoints[breakName];

    return toRem(root)(modularScale(Number(step), base, ratio));
  }

  return null;
};
