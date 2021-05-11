import { BreakpointsMap, Breakpoint } from '@typographist/core';
import { invariant, toRem } from '@typographist/utils';
import { modularScale } from '@typographist/modular-scale';

import { CONFIG_SYMBOL } from '../constants';
import { Props } from '../types';

export const createErrorMessage = (
  breaks: BreakpointsMap,
  name: string,
): string => {
  const breakpointNamesList = Object.keys(breaks).slice(1).join(', ');

  return `[typographist]: '${name}' is invalid breakpoint name. Use ${breakpointNamesList}.`;
};

const getValidBreakpoint = (
  breaks: BreakpointsMap,
  name: string,
): Breakpoint => {
  invariant(breaks[name], createErrorMessage(breaks, name));

  return breaks[name];
};

export const step = (target: number, name = 'initial') => ({
  theme,
}: Props): string => {
  const { root, base, ratio } = getValidBreakpoint(
    theme[CONFIG_SYMBOL].breakpointsMap,
    name,
  );

  return toRem(root, modularScale(target, base, ratio));
};
