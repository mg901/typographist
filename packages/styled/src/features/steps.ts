import { toRem, toEm } from '@typographist/utils';
import { modularScale } from '@typographist/modular-scale';
import { CONFIG_SYMBOL } from '../constants';
import { Props, Styles } from '../types';

export const steps =
  (step: number) =>
  ({ theme }: Props): Styles => {
    const { breakpointsMap: breaks } = theme[CONFIG_SYMBOL];
    const result = {} as Styles;

    for (const key in breaks) {
      if (key !== 'initial') {
        const { root, base, ratio, minWidth } = breaks[key];

        result[`@media (min-width: ${toEm(minWidth)})`] = {
          'font-size': toRem(root, modularScale(step, base, ratio)),
        };
      } else {
        const { root, base, ratio } = breaks[key];

        result['font-size'] = toRem(root, modularScale(step, base, ratio));
      }
    }

    return result;
  };
