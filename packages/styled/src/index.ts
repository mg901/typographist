import { createStyledBreakpoints } from 'styled-breakpoints/styled-breakpoints';
import { CONFIG_SYMBOL } from './constants';

export { ratios } from '@typographist/core';
export { step } from './features/step';
export { steps } from './features/steps';
export { TypographistProvider } from './provider';

export const { up, down, between, only } = createStyledBreakpoints({
  errorPrefix: '[typographist]: ',
  pathToMediaQueries: `${CONFIG_SYMBOL}.mediaQueries`,
  breakpoints: {},
});
