import { step } from '../src/features/step';
import { propsWithCustomTheme, propsWithDefaultTheme } from './mocks';

describe('step', () => {
  it('calculate step from default theme', () => {
    expect(step(0)(propsWithDefaultTheme)).toEqual('1.3333333333333333rem');
  });
  it('calculate step for default breakpoint', () => {
    expect(step(0)(propsWithCustomTheme)).toEqual('1.4rem');
  });

  it("calculate step for breakpoint with name 'tablet'", () => {
    expect(step(0, 'tablet')(propsWithCustomTheme)).toEqual(
      '1.3333333333333333rem',
    );
  });

  it("calculate step for breakpoint with name 'desktop'", () => {
    expect(step(0, 'desktop')(propsWithCustomTheme)).toEqual(
      '1.3333333333333333rem',
    );
  });

  it("calculate step for breakpoint with name 'lgDesktop'", () => {
    expect(step(0, 'lgDesktop')(propsWithCustomTheme)).toEqual(
      '1.3333333333333333rem',
    );
  });

  it("show warn if the breakpoint name isn't valid", () => {
    try {
      step(0, 'blablabla')(propsWithCustomTheme);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[typographist]: 'blablabla' is invalid breakpoint name. Use tablet, desktop, lgDesktop.`,
      );
    }
  });
});
