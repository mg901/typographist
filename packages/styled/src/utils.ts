import { createBreakpointsMap } from '@typographist/core';
import { MediaQueries } from 'styled-breakpoints';
import { CONFIG_SYMBOL, DEFAULT_CONFIG } from './constants';
import { CustomTheme, InitialBreakpoint, DefaultTheme, Theme } from './model';

const createMediaQueries = (x: object): MediaQueries => {
  const breaks = createBreakpointsMap(x);
  const result = {} as MediaQueries;

  for (const key in breaks) {
    if (key !== 'initial') {
      result[key] = breaks[key].value;
    }
  }

  return result;
};

const customTheme = (x: object): CustomTheme => ({
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

export const setCustomOrDefaultTheme = (x?: object): Theme =>
  x ? customTheme(x) : defaultTheme();
