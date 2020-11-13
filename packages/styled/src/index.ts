import { makeStyledBreakpoints } from 'styled-breakpoints/core';
import { CONFIG_SYMBOL } from './constants';

export { ratios } from '@typographist/core';
export { step } from './features/step';
export { steps } from './features/steps';
export { TypographistProvider } from './provider';

export const { up, down, between, only } = makeStyledBreakpoints({
  errorPrefix: '[typographist]: ',
  pathToMediaQueries: [CONFIG_SYMBOL, 'mediaQueries'],
});
