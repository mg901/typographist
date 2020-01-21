const {
  createInitialBreakpoint,
  createNamedBreakpoints,
  inheritProps,
  createBreakpointsMapProcess,
  setBreakpointNameProp,
  createBreakpointsMap,
  normalizeBase,
  getFontSize,
  getStep,
  calcRatio,
  calcLeading,
  createRootProp,
} = require('../src/create-breakpoints-map');
const { config, breakpointsMap } = require('./mocks');

describe('createInitialBreakpoint', () => {
  it('returns the array with a initial breakpoint', () => {
    expect(createInitialBreakpoint(config)).toEqual([
      {
        base: ['16px', '32px'],
        lineHeight: 1.5,
        name: 'initial',
        ratio: '45px at 6',
        minWidth: '0px',
      },
    ]);
  });
});

describe('createNamedBreakpoints', () => {
  it('returns array of breakpoints with prop `value`', () => {
    expect(createNamedBreakpoints(config)).toEqual([
      {
        base: ['17px'],
        minWidth: '768px',
        name: 'tablet',
      },
      {
        base: ['18px'],
        minWidth: '992px',
        lineHeight: 1.7,
        name: 'desktop',
        ratio: 1.333,
      },
      {
        base: ['20px'],
        minWidth: '1200px',
        name: 'lgDesktop',
      },
      {
        base: ['22px'],
        minWidth: '1600px',
        name: 'xlDesktop',
      },
    ]);
  });
});

describe('inheritProps', () => {
  it('inherits all missing key values', () => {
    const breaks = [
      {
        base: ['16px', '32px'],
        lineHeight: 1.5,
        name: 'initial',
        ratio: '45px at 6',
        value: '0px',
      },
      {
        base: '17px',
        name: 'tablet',
        value: '768px',
      },
      {
        base: '18px',
        lineHeight: 1.7,
        name: 'desktop',
        ratio: 1.333,
        value: '992px',
      },
      {
        base: '20px',
        name: 'lgDesktop',
        value: '1200px',
      },
      {
        base: '22px',
        name: 'xlDesktop',
        value: '1600px',
      },
    ];

    expect(breaks.reduce(inheritProps, [])).toEqual([
      {
        base: ['16px', '32px'],
        lineHeight: 1.5,
        name: 'initial',
        ratio: '45px at 6',
        value: '0px',
      },
      {
        base: '17px',
        lineHeight: 1.5,
        name: 'tablet',
        ratio: '45px at 6',
        value: '768px',
      },
      {
        base: '18px',
        lineHeight: 1.7,
        name: 'desktop',
        ratio: 1.333,
        value: '992px',
      },
      {
        base: '20px',
        lineHeight: 1.7,
        name: 'lgDesktop',
        ratio: 1.333,
        value: '1200px',
      },
      {
        base: '22px',
        lineHeight: 1.7,
        name: 'xlDesktop',
        ratio: 1.333,
        value: '1600px',
      },
    ]);
  });
});

describe('normalizeBase', () => {
  it('return object with calculated base', () => {
    expect(normalizeBase({ base: ['10px'] })).toEqual({ base: [10] });
  });
});

describe('getFontSize', () => {
  it('should found number if font-size has rem', () => {
    expect(getFontSize('666em at 8'.split(' '))).toEqual(666);
  });

  it('should found floating point number if font-size has pixels', () => {
    expect(getFontSize('6.66px at 8'.split(' '))).toEqual(6.66);
  });
});

describe('getStep', () => {
  it('should number after the word at', () => {
    expect(getStep('666px at 8'.split(' '))).toEqual(8);
  });

  it('should negative number after the word at', () => {
    expect(getStep('666px at -8'.split(' '))).toEqual(-8);
  });

  it('should floating-point number after the word at', () => {
    expect(getStep('666px at 8.777'.split(' '))).toEqual(8.777);
  });

  it('should negative floating-point number after the word at', () => {
    expect(getStep('666px at -8.777'.split(' '))).toEqual(-8.777);
  });
});

describe('calcRatio', () => {
  it('calculate ratio', () => {
    expect(calcRatio(config.ratio, [16])).toEqual(1.1880883987824906);
  });
});

describe('calcLeading', () => {
  it('return calculated leading', () => {
    expect(calcLeading([16], 1.5)).toEqual(24);
  });
});

describe('createRootProp', () => {
  it('adds the root property to the breakpoint', () => {
    expect(
      createRootProp({
        value: '1200px',
        base: [16],
        lineHeight: 1.5,
        ratio: 1.618,
        name: 'tablet',
      }),
    ).toEqual({
      value: '1200px',
      base: [16],
      lineHeight: 1.5,
      ratio: 1.618,
      name: 'tablet',
      root: 12,
    });
  });
});

describe('setBreakpointNameProp', () => {
  it('set breakpoint name prop', () => {
    expect([{ a: 1, name: 'test' }].reduce(setBreakpointNameProp, {})).toEqual({
      test: { a: 1 },
    });
  });
});

describe('createBreakpointsMapProcess', () => {
  it('return breakpoints model', () => {
    expect(createBreakpointsMapProcess(config)).toEqual(breakpointsMap);
  });
});

describe('createBreakpointsMap', () => {
  it('create a list of breakpoint values if the user config is valid', () => {
    expect(createBreakpointsMap(config)).toEqual(breakpointsMap);
  });
});
