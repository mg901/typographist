/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { toRem, toEm } from '@typographist/utils';
import { modularScale } from '@typographist/modular-scale';
import { Breakpoint } from '@typographist/core';
import mem from 'memoize-one';
import { CONFIG_SYMBOL } from '../constants';
import { Props } from '../model';

type MakeFontSizeProp = (x: number, y: Breakpoint) => string;

type Steps = (x: number) => (y: Props) => string;

export const makeFontSizeProp: MakeFontSizeProp = (
  step,
  { root, base, ratio },
) => `font-size: ${toRem(root, modularScale(step, base, ratio))};`;

export const steps: Steps = mem((step) => ({ theme }) => {
  const { breakpointsMap: breaks } = theme[CONFIG_SYMBOL];
  let result = '';

  for (const key in breaks) {
    if (key === 'initial') {
      result += makeFontSizeProp(step, breaks[key]);
    } else {
      result += ` @media (min-width: ${toEm(
        breaks[key].value,
      )}) { ${makeFontSizeProp(step, breaks[key])} }`;
    }
  }

  return result;
});
