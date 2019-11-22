import { BreakpointsMap } from '@typographist/core';
import { MediaQueries } from 'styled-breakpoints';
import { CONFIG_SYMBOL } from './constants';

export type Styles = {
  [ruleOrSelector: string]: string | number | Styles;
};

export type InitialBreakpoint = {
  [key: string]: {
    base: [16];
    lineHeight: 1.5;
    ratio: 1.333;
    root: 12;
    value: '0px';
  };
};

export type DefaultTheme = {
  [CONFIG_SYMBOL]: {
    breakpointsMap: InitialBreakpoint;
    mediaQueries: {};
  };
};

export type CustomTheme = {
  [CONFIG_SYMBOL]: {
    breakpointsMap: BreakpointsMap;
    mediaQueries: MediaQueries;
  };
};

export type Theme = DefaultTheme | CustomTheme;

export type Props = {
  [key: string]: any;
};
