//  https://www.modularscale.com/

// modularScale :: (Number | String, [Number], Number) -> Number
function modularScale(step, base, ratio) {
  const _step = Number(step);

  if (base.length !== 1) {
    const startPosition = calcStartPosition(_step, base);
    const fontSize = calcFontSize(_step, base, ratio);
    const baseHigh = ratio ** 1 * base[0];
    const normalizedBases = normalizeBases(base, baseHigh, ratio);

    return fontSize * normalizedBases[startPosition];
  }

  return Math.round(ratio ** _step * Number(base));
}

// calcStartPosition :: (Number, [Number]) -> Number
function calcStartPosition(step, base) {
  return Math.round(
    (step / base.length - Math.floor(step / base.length)) * base.length,
  );
}

// calcFontSize :: (Number, [Number], Number) -> Number
function calcFontSize(step, base, ratio) {
  return ratio ** Math.floor(step / base.length);
}

// normalizeBases :: ([Number], Number, Number) -> [Number]
function normalizeBases(base, baseHigh, ratio) {
  const cloneBase = base.slice(0);

  for (let i = 1; i < cloneBase.length; i += 1) {
    // shift up if value too low
    while (cloneBase[i] / 1 < cloneBase[0] / 1) {
      cloneBase[i] *= ratio ** 1;
    }
    // Shift down if too high
    while (cloneBase[i] / 1 >= baseHigh / 1) {
      cloneBase[i] *= ratio ** -1;
    }
  }

  return cloneBase.sort();
}

module.exports = {
  modularScale,
  calcStartPosition,
  calcFontSize,
  normalizeBases,
};
