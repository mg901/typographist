import { createBreakpointsMap } from '@typographist/core';
import { MediaQueries } from 'styled-breakpoints';
import { CONFIG_SYMBOL, DEFAULT_CONFIG } from './constants';
import { CustomTheme, InitialBreakpoint, DefaultTheme, Theme } from './types';

const createMediaQueries = (x: Record<string, unknown>): MediaQueries => {
  const breaks = createBreakpointsMap(x);
  const result = {} as MediaQueries;

  for (const key in breaks) {
    if (key !== 'initial') {
      result[key] = breaks[key].minWidth;
    }
  }

  return result;
};

const customTheme = (x: Record<string, unknown>): CustomTheme => ({
  [CONFIG_SYMBOL]: {
    breakpointsMap: createBreakpointsMap(x),
    mediaQueries: createMediaQueries(x),
  },
});

export const defaultTheme = (): DefaultTheme => ({
  [CONFIG_SYMBOL]: {
    breakpointsMap: createBreakpointsMap(DEFAULT_CONFIG) as InitialBreakpoint,
    mediaQueries: {},
  },
});

export const setCustomOrDefaultTheme = (x?: Record<string, unknown>): Theme =>
  x ? customTheme(x) : defaultTheme();
