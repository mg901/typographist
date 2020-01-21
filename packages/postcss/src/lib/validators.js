// hasPxOrEm :: String -> Boolean
exports.hasPxOrEm = (x) => /\d+(px|em)$/.test(x);

// isFluidTheme :: Object -> Boolean
exports.isFluidTheme = (x) => {
  const newLinesAndSpaces = /[\n\s]/g;
  const rootSelectorWithValue = /(:root|html){.+?}/gm;

  return hasFluid(
    x.source.input.css
      .replace(newLinesAndSpaces, '')
      .match(rootSelectorWithValue),
  );
};

// hasFluid :: String -> Boolean
function hasFluid(x) {
  return x.source && x.source.input.css && /fluid/.test(x);
}
