import { base } from '../src/features/base';
import { propsWithCustomTheme } from './mocks';

describe('renderBaseFontSize', () => {
  it('return string with base font-sizes', () => {
    expect(base(propsWithCustomTheme)).toEqual({
      'font-size': '1.3333333333333333rem',
      '@media (min-with: 48em)': { 'font-size': '1.3333333333333333rem' },
      '@media (min-with: 62em)': { 'font-size': '1.3333333333333333rem' },
      '@media (min-with: 75em)': { 'font-size': '1.3333333333333333rem' },
    });
  });
});
