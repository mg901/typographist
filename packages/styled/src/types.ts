import { BreakpointsMap } from '@typographist/core';
import { MediaQueries } from 'styled-breakpoints';
import { CONFIG_SYMBOL } from './constants';

export type Styles = Record<string, string | Record<string, string>>;
export type InitialBreakpoint = Record<
  string,
  {
    base: [16];
    lineHeight: 1.5;
    ratio: 1.333;
    root: 12;
    minWidth: '0px';
  }
>;

export type DefaultTheme = {
  [CONFIG_SYMBOL]: {
    breakpointsMap: InitialBreakpoint;
    mediaQueries: Record<string, unknown>;
  };
};

export type CustomTheme = {
  [CONFIG_SYMBOL]: {
    breakpointsMap: BreakpointsMap;
    mediaQueries: MediaQueries;
  };
};

export type Theme = DefaultTheme | CustomTheme;

export type Props = Record<string, any>;
