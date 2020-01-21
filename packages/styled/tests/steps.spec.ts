import { steps } from '../src/features/steps';
import { propsWithCustomTheme } from './mocks';

describe('steps', () => {
  it('return font-size properties with values and media queries for all breakpoints', () => {
    expect(steps(0)(propsWithCustomTheme)).toEqual({
      'font-size': '1.3333333333333333rem',
      '@media (min-width: 48em)': { 'font-size': '1.3076923076923077rem' },
      '@media (min-width: 62em)': { 'font-size': '1.3103448275862069rem' },
      '@media (min-width: 75em)': { 'font-size': '1.3125rem' },
    });
  });
});
