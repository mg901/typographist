import { steps } from '../src/features/steps';
import { propsWithCustomTheme } from './mocks';

describe('renderBaseFontSize', () => {
  it('return string with base font-sizes', () => {
    expect(steps(0)(propsWithCustomTheme)).toEqual({
      'font-size': '1.3333333333333333rem',
      '@media (min-width: 48em)': { 'font-size': '1.3333333333333333rem' },
      '@media (min-width: 62em)': { 'font-size': '1.3333333333333333rem' },
      '@media (min-width: 75em)': { 'font-size': '1.3333333333333333rem' },
    });
  });
});
