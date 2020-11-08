import { step } from '../src/features/step';
import { propsWithCustomTheme, propsWithDefaultTheme } from './mocks';

describe('step', () => {
  it('calculate step for default breakpoint', () => {
    expect(step(0)(propsWithDefaultTheme)).toEqual('1.3333333333333333rem');
  });

  it("calculate step for 'tablet'", () => {
    expect(step(0, 'tablet')(propsWithCustomTheme)).toEqual(
      '1.3076923076923077rem',
    );
  });

  it("calculate step for 'desktop'", () => {
    expect(step(0, 'desktop')(propsWithCustomTheme)).toEqual(
      '1.3103448275862069rem',
    );
  });

  it("calculate step for 'lgDesktop'", () => {
    expect(step(0, 'lgDesktop')(propsWithCustomTheme)).toEqual('1.3125rem');
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
