import { renderStandardOrFluidRoot } from '../src/features/root';
import { customTheme } from './mocks';

describe('renderStandardOrFluidRoot', () => {
  it('return string with calculated root font-sizes', () => {
    expect(
      renderStandardOrFluidRoot({
        fluid: false,
        theme: customTheme,
      }),
    ).toEqual({
      'font-size': '75%',
      '@media (min-width: 48em)': { 'font-size': '81.25%' },
      '@media (min-width: 62em)': { 'font-size': '90.625%' },
      '@media (min-width: 75em)': { 'font-size': '100%' },
    });
  });
});

describe('renderStandardOrFluidRoot', () => {
  it('return string with fluid root font-sizes', () => {
    expect(
      renderStandardOrFluidRoot({
        fluid: true,
        theme: customTheme,
      }),
    ).toEqual({
      'font-size': '75%',
      '@media (min-width: 48em)': {
        'font-size': 'calc(75% + 1 * ((100vw - 48em) / 224))',
      },
      '@media (min-width: 62em)': {
        'font-size': 'calc(81.25% + 1.5 * ((100vw - 62em) / 208))',
      },
      '@media (min-width: 75em)': '100%',
    });
  });
});
