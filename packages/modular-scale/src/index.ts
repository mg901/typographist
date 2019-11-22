//  https://www.modularscale.com/

export function modularScale(
  rawStep: number,
  base: number[],
  ratio: number,
): number {
  const step = Number(rawStep);

  if (base.length !== 1) {
    const startPosition = calcStartPosition(step, base);
    const fontSize = calcFontSize(step, base, ratio);
    const baseHigh = Math.pow(ratio, 1) * base[0];
    const normalizedBases = normalizeBases(base, baseHigh, ratio);

    return fontSize * normalizedBases[startPosition];
  }

  return Math.round(Math.pow(ratio, step) * Number(base));
}

function calcStartPosition(step: number, base: number[]): number {
  return Math.round(
    (step / base.length - Math.floor(step / base.length)) * base.length,
  );
}

function calcFontSize(step: number, base: number[], ratio: number): number {
  return Math.pow(ratio, Math.floor(step / base.length));
}

function normalizeBases(
  base: number[],
  baseHigh: number,
  ratio: number,
): number[] {
  const cloneBase = base.slice(0);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < cloneBase.length; i++) {
    // shift up if value too low
    while (cloneBase[i] / 1 < cloneBase[0] / 1) {
      cloneBase[i] *= Math.pow(ratio, 1);
    }
    // Shift down if too high
    while (cloneBase[i] / 1 >= baseHigh / 1) {
      cloneBase[i] *= Math.pow(ratio, -1);
    }
  }

  return cloneBase.sort();
}
