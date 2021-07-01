const {
  validateDefaultBreakpoint,
  validateConfig,
  throwBaseMustBeAnArray,
  throwBaseMustContainPixels,
  throwDoesntContainminWidthProp,
  throwInvalidBreakpoint,
  throwInvalidLineHeight,
  ratioHasFontSize,
  ratioHasAtWord,
  ratioHasStep,
  throwInvalidRatio,
} = require('../src/validate-config');

describe('validateDefaultBreakpoint', () => {
  it('show warn if them base prop is missing', () => {
    try {
      validateDefaultBreakpoint({
        lineHeight: 1,
        ratio: 1,
      });
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. 'base' is required field for default breakpoint.",
      );
    }
  });
});

describe('throwBaseMustBeAnArray', () => {
  it('show warn if the  base not an array', () => {
    try {
      throwBaseMustBeAnArray('1rem');
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '1rem' is invalid 'base'. Base must be an array of strings. Example 'base': ['14px', '32px'].",
      );
    }
  });
});

describe('throwBaseMustContainPixels', () => {
  it("show warn if the base doesn't contain pixels", () => {
    try {
      throwBaseMustContainPixels('1rem');
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '1rem' is invalid 'base'. Base must contain pixels Example 'base': ['14px', '32px'].",
      );
    }
  });
});

describe('throwDoesntContainBreakpointProp', () => {
  it("show warn if the breakpoint doesn't contain the 'minWidth' property", () => {
    try {
      throwDoesntContainminWidthProp({
        base: ['16px'],
        lineHeight: 1.2,
        ratio: 1,
        tablet: {},
      });
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. 'tablet': must contain the mandatory 'minWidth' property. Example 'tablet': {minWidth: '768px'}.",
      );
    }
  });
});

describe('Name of the group', () => {});

describe('throwInvalidBreakpoint', () => {
  it("show warn if the breakpoint value isn't valid", () => {
    try {
      throwInvalidBreakpoint('60rem');
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '60rem' is invalid 'breakpoint'. Breakpoint must be a string with a value (in pixels). Example 'minWidth': '1024px'.",
      );
    }
  });
});

describe('throwInvalidLineHeight', () => {
  it("show warn if the line height value isn't valid", () => {
    try {
      throwInvalidLineHeight('1.5');
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '1.5' is invalid 'lineHeight'. LineHeight must be a number. Example 'lineHeight': 1.5'",
      );
    }
  });
});

describe('ratioHasFontSize', () => {
  it('return `false` if the font size does not contain pixels', () => {
    expect(ratioHasFontSize('35em at 6')).toEqual(false);
  });

  it('return `true` if contain positive integer mumber with pixels at the beggining of the string', () => {
    expect(ratioHasFontSize('35px at 6')).toEqual(true);
  });

  it('return `false` if there are spaces at the beginning of the line', () => {
    expect(ratioHasFontSize('   35px at 6')).toEqual(false);
  });
});

describe('ratioHasAtWord', () => {
  it('should ratio string has `at` word', () => {
    expect(ratioHasAtWord('123px at 7')).toEqual(true);
  });

  it("should doesn't contain `at` word", () => {
    expect(ratioHasAtWord('123px  7px')).toEqual(false);
  });
});

describe('ratioHasStep', () => {
  it('return `true` if it contains a negative integer number at end of a string', () => {
    expect(ratioHasStep('123px at -7')).toEqual(true);
  });

  it('return `true` if it contains a floating point number at end of a string', () => {
    expect(ratioHasStep('123px at 7.4')).toEqual(true);
  });

  it('return `true` if it contains a nagative floating point number at end of a string', () => {
    expect(ratioHasStep('123px at -7.4')).toEqual(true);
  });

  it('return `fase` if it contains a integer number with  units at end of a string', () => {
    expect(ratioHasStep('123px at 6px')).toEqual(false);
  });

  it('return `fase` if it contains a negative floating point number in px units at end of a string', () => {
    expect(ratioHasStep('123px at -6.7px')).toEqual(false);
  });
});

describe('throwInvalidRatio', () => {
  it("show warn if the ratio value isn't valid", () => {
    try {
      throwInvalidRatio('45 at 6');
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '45 at 6' is invalid ratio. Ratio must be a number or string containing the font size (in pixels), the word `at` and step. Example ratio: `1.25` or ratio: `36px at 6`.",
      );
    }
  });
});

describe('validateConfig', () => {
  it("show warn if the user config isn't valid", () => {
    try {
      validateConfig({
        base: ['1rem', '16px'],
        lineHeight: 1,
        ratio: 1,
      });
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '1rem' is invalid 'base'. Base must contain pixels Example 'base': ['14px', '32px'].",
      );
    }
  });

  it('validate default config', () => {
    try {
      validateConfig({
        base: '16px',
        lineHeight: 1,
        ratio: 1,
      });
      expect(true).toEqual(true);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: Check your configuration. '16px' is invalid 'base'. Base must be an array of strings. Example 'base': ['14px', '32px'].",
      );
    }
  });
});
