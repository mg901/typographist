const ratios = {
  AUGMENTED_FOURTH: 1.41421,
  DOUBLE_OCTAVE: 4,
  GOLDEN_SECTION: 1.618034,
  MAJOR_ELEVENTH: 2.666666667,
  MAJOR_SECOND: 1.125,
  MAJOR_SEVENTH: 1.875,
  MAJOR_SIXTH: 1.666666667,
  MAJOR_TENTH: 2.5,
  MAJOR_THIRD: 1.25,
  MAJOR_TWELFTH: 3,
  MINOR_SECOND: 1.066666667,
  MINOR_SEVENTH: 1.777777778,
  MINOR_THIRD: 1.2,
  OCTAVE: 2,
  PERFECT_FIFTH: 1.5,
  PERFECT_FOURTH: 1.333333333,
  PHI: 1.618034,
};

const userConfig = {
  base: ['16px'],
  lineHeight: 1.5,
  ratio: ratios.MINOR_SECOND,
  tablet: {
    minWidth: '768px',
    base: ['17px'],
    ratio: ratios.MAJOR_SECOND,
  },
  desktop: {
    minWidth: '992px',
    base: ['19px'],
    ratio: ratios.MINOR_THIRD,
  },
  lgDesktop: {
    minWidth: '1200px',
    base: ['21px'],
  },
};

const fluidUserConfig = {
  base: ['16px'],
  lineHeight: 1.5,
  ratio: '48px at 6',
  sm: {
    base: ['16px'],
    minWidth: '640px',
  },
  md: {
    base: ['18px'],
    minWidth: '992px',
  },
  lg: {
    base: ['20px'],
    ratio: '70px at 6',
    minWidth: '1440px',
  },
};

const breakpointsMap = {
  initial: {
    base: [16],
    lineHeight: 1.5,
    ratio: 1.066666667,
    minWidth: '0px',
    root: 12,
  },
  tablet: {
    base: [17],
    lineHeight: 1.5,
    ratio: 1.125,
    minWidth: '768px',
    root: 13,
  },
  desktop: {
    base: [19],
    lineHeight: 1.5,
    ratio: 1.2,
    minWidth: '992px',
    root: 14.5,
  },
  lgDesktop: {
    base: [21],
    lineHeight: 1.5,
    ratio: 1.2,
    minWidth: '1200px',
    root: 16,
  },
};

exports.ratios = ratios;
exports.userConfig = userConfig;
exports.fluidUserConfig = fluidUserConfig;
exports.breakpointsMap = breakpointsMap;
