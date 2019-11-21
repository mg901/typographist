import { modularscale } from '.';

describe('modularscale', () => {
  it('calculated `font-size` from the multi-stranded modular scales ', () => {
    expect(modularscale(7, [16, 33, 15], 1.5)).toEqual(49.5);
  });

  it('calculated `font-size` from one ratio', () => {
    expect(modularscale(6, [16], 1.333)).toEqual(90);
  });

  it('calculated `font-size` from one ratio with custom ratio', () => {
    const customRatio = 1.1880883987824906;
    expect(modularscale(6, [16], customRatio)).toEqual(45);
  });
});
