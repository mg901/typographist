import { Breakpoint } from '@typographist/core';
import { toEm } from '@typographist/utils';
import { CONFIG_SYMBOL } from '../constants';
import { Props } from '../model';

const calcBase = ({ base, root }: Breakpoint): string =>
  `${Number(base) / root}rem`;

export const base = ({ theme }: Props): string => {
  const { breakpointsMap: breaks } = theme[CONFIG_SYMBOL];
  let result = '';

  for (const key in breaks) {
    if (key === 'initial') {
      result += `font-size: ${calcBase(breaks[key])};`;
    } else {
      result += ` @media (min-width: ${toEm(
        breaks[key].value,
      )}) { font-size: ${calcBase(breaks[key])}; }`;
    }
  }

  return result;
};
