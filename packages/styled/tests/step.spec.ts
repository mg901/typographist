import { base } from '../src/features/base';
import { propsWithCustomTheme } from './mocks';

describe('base', () => {
  it('return string with base font-sizes', () => {
    expect(base(propsWithCustomTheme)).toEqual(
      'font-size: 1.4rem; @media (min-width: 48em) { font-size: 1.3333333333333333rem; } @media (min-width: 62em) { font-size: 1.3333333333333333rem; } @media (min-width: 75em) { font-size: 1.3333333333333333rem; }',
    );
  });
});
