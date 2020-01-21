import { toRem, toEm } from '@typographist/utils';
import { modularScale } from '@typographist/modular-scale';
import mem from 'memoize-one';
import { CONFIG_SYMBOL } from '../constants';
import { Props, Styles } from '../model';

export const steps = mem((step: number) => ({ theme }: Props): Styles => {
  const { breakpointsMap: breaks } = theme[CONFIG_SYMBOL];
  const result: Styles = {};

  for (const key in breaks) {
    if (key !== 'initial') {
      const x = breaks[key];

      result[`@media (min-width: ${toEm(breaks[key].value)})`] = {
        'font-size': toRem(x.root, modularScale(step, x.base, x.ratio)),
      };
    } else {
      const y = breaks[key];

      result['font-size'] = toRem(y.root, modularScale(step, y.base, y.ratio));
    }
  }

  return result;
});
