import { renderStandardOrFluidRoot } from '../src/features/root';
import { customTheme } from './mocks';

describe('toStringRootFontSize', () => {
  it('return string with calculated root font-sizes', () => {
    expect(
      renderStandardOrFluidRoot({
        fluid: false,
        theme: customTheme,
      }),
    ).toEqual(
      'font-size: 62.5%; @media (min-width: 48em) { font-size: 75%; } @media (min-width: 62em) { font-size: 84.375%; } @media (min-width: 75em) { font-size: 93.75%; }',
    );
  });
});

describe('makeFluidRootFontSizes', () => {
  it('return string with fluid root font-sizes', () => {
    expect(
      renderStandardOrFluidRoot({
        fluid: true,
        theme: customTheme,
      }),
    ).toEqual(
      'font-size: 62.5%; @media (min-width: 48em) { font-size: calc(62.5% + 2 * ((100vw - 48em) / 224)); } @media (min-width: 62em) { font-size: calc(75% + 1.5 * ((100vw - 62em) / 208)); } @media (min-width: 75em) { font-size: 93.75%; }',
    );
  });
});
