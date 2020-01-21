import { BreakpointsMap } from '@typographist/core';
import { toEm, percentage } from '@typographist/utils';
import { CONFIG_SYMBOL } from '../constants';
import { Props, Styles } from '../model';

const BROWSER_VIEWPORT_WIDTH = '100vw';

export const createRootFontSizes = (breaks: BreakpointsMap): Styles => {
  const result: Styles = {};

  for (const key in breaks) {
    if (key !== 'initial') {
      result[`@media (min-width: ${toEm(breaks[key].value)})`] = {
        'font-size': percentage(breaks[key].root),
      };
    } else {
      result['font-size'] = percentage(breaks[key].root);
    }
  }

  return result;
};

export const createFluidRootFontSizes = (x: BreakpointsMap): Styles =>
  Object.keys(x)
    .map((key) => x[key])
    .reduce((acc, item, index, list) => {
      const root = item.root;
      const value = item.value;
      const nextIndex = index + 1;
      const prevIndex = index - 1;
      const isLastElem = index === list.length - 1;

      if (index === 0) {
        acc['font-size'] = percentage(root);
      }

      if (index > 0 && list[nextIndex]) {
        const prevRoot = list[prevIndex].root;
        const nextBreakValue = list[nextIndex].value;
        const fontSize = `${percentage(prevRoot)} + ${root - prevRoot}`;
        const breaksRatio = `${toEm(value)}) / ${parseFloat(nextBreakValue) -
          parseFloat(value)}`;

        acc[`@media (min-width: ${toEm(value)})`] = {
          'font-size': `calc(${fontSize} * ((${BROWSER_VIEWPORT_WIDTH} - ${breaksRatio}))`,
        };
      }

      if (isLastElem) {
        acc[`@media (min-width: ${toEm(value)})`] = percentage(root);
      }

      return acc;
    }, {} as Styles);

export const renderStandardOrFluidRoot = ({ fluid, theme }: Props): Styles => {
  const { breakpointsMap } = theme[CONFIG_SYMBOL];

  return fluid
    ? createFluidRootFontSizes(breakpointsMap)
    : createRootFontSizes(breakpointsMap);
};
