/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BreakpointsMap, Breakpoint } from '@typographist/core';
import { invariant, toRem } from '@typographist/utils';
import { modularScale } from '@typographist/modular-scale';
import mem from 'memoize-one';
import { CONFIG_SYMBOL } from '../constants';
import { Props } from '../model';

type MakeErrorMessage = (x: BreakpointsMap, y: string) => string;

export const makeErrorMessage: MakeErrorMessage = (breaks, name) => {
  const breakpointNamesList = Object.keys(breaks)
    .slice(1)
    .join(', ');

  return `'${name}' is invalid breakpoint name. Use ${breakpointNamesList}.`;
};

type GetValidBreakpoint = (x: BreakpointsMap, y: string) => Breakpoint;

const getValidBreakpoint: GetValidBreakpoint = (breaks, name) => {
  invariant(breaks[name], makeErrorMessage(breaks, name));

  return breaks[name];
};

type Step = (x: number, y?: string) => (z: Props) => string;

export const step: Step = mem((target, name) => ({ theme }) => {
  const { root, base, ratio } = getValidBreakpoint(
    theme[CONFIG_SYMBOL].breakpointsMap,
    name || 'initial',
  );

  return toRem(root, modularScale(target, base, ratio));
});
