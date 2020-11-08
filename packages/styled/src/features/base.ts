import { Breakpoint } from '@typographist/core';
import { toEm } from '@typographist/utils';
import { CONFIG_SYMBOL } from '../constants';
import { Props, Styles } from '../types';

const calcBase = ({ base, root }: Breakpoint): string =>
  `${Number(base) / root}rem`;

export const base = ({ theme }: Props): Styles => {
  const { breakpointsMap: breaks } = theme[CONFIG_SYMBOL];
  const result = {} as Styles;

  for (const key in breaks) {
    if (key !== 'initial') {
      result[`@media (min-with: ${toEm(breaks[key].minWidth)})`] = {
        'font-size': calcBase(breaks[key]),
      };
    } else {
      result['font-size'] = calcBase(breaks[key]);
    }
  }

  return result;
};
