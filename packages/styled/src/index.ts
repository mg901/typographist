import { _makeStyledBreakpoints } from 'styled-breakpoints';
import { CONFIG_SYMBOL } from './constants';

export { ratios } from '@typographist/core';
export { step, steps } from './features';
export { TypographistProvider } from './provider';

export const { up, down, between, only } = _makeStyledBreakpoints({
  errorPrefix: '[typographist]: ',
  pathToMediaQueries: [CONFIG_SYMBOL, 'mediaQueries'],
});
