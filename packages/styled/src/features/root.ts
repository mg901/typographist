import { BreakpointsMap } from '@typographist/core';
import { toEm, percentage } from '@typographist/utils';
import { CONFIG_SYMBOL } from '../constants';
import { Props } from '../model';

const BROWSER_VIEWPORT_WIDTH = '100vw';

type Root = number | string;
type MakeRoot = (x: Root) => string;

export const makeRoot: MakeRoot = (root) => `font-size: ${percentage(root)};`;

export const makeRootFontSizes = (x: BreakpointsMap): string => {
  let result = '';

  for (const key in x) {
    if (key === 'initial') {
      result += makeRoot(x[key].root);
    } else {
      result += ` @media (min-width: ${toEm(x[key].value)}) { ${makeRoot(
        x[key].root,
      )} }`;
    }
  }

  return result;
};

export const makeFluidRootFontSizes = (x: BreakpointsMap): string =>
  Object.keys(x)
    .map((key) => x[key])
    .reduce((acc, item, index, list) => {
      const root = item.root;
      const value = item.value;
      const nextIndex = index + 1;
      const prevIndex = index - 1;
      const isLastElem = index === list.length - 1;

      if (index === 0) {
        acc += makeRoot(root);
      }

      if (index > 0 && list[nextIndex]) {
        const prevRoot = list[prevIndex].root;
        const nextBreakValue = list[nextIndex].value;

        const fontSize = `${percentage(prevRoot)} + ${root - prevRoot}`;

        const breaksRatio = `${toEm(value)}) / ${parseFloat(nextBreakValue) -
          parseFloat(value)}`;

        acc += ` @media (min-width: ${toEm(
          value,
        )}) { font-size: calc(${fontSize} * ((${BROWSER_VIEWPORT_WIDTH} - ${breaksRatio})); }`;
      }

      if (isLastElem) {
        acc += ` @media (min-width: ${toEm(value)}) { ${makeRoot(root)} }`;
      }

      return acc;
    }, '');

export const renderStandardOrFluidRoot = ({ fluid, theme }: Props): string => {
  const { breakpointsMap } = theme[CONFIG_SYMBOL];

  return fluid
    ? makeFluidRootFontSizes(breakpointsMap)
    : makeRootFontSizes(breakpointsMap);
};
