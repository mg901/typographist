// hasPxOrEm :: String -> Boolean
exports.hasPxOrEm = (x) => /\d+(px|em)$/.test(x);

// isFluidTheme :: Object -> Boolean
exports.isFluidTheme = (x) => {
  const newLinesAndSpaces = /\s/g;
  const rootSelectorWithValue = /(:root|html)\{.+?\}/g;

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
