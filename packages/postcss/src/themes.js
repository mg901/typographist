const { ratios } = require('@typographist/core');

exports.theme = {
  base: ['16px'],
  lineHeight: 1.5,
  ratio: ratios.MINOR_SECOND,
  sm: {
    minWidth: '576px',
    ratio: ratios.MAJOR_SECOND,
  },
  md: {
    minWidth: '768px',
    base: ['17px'],
    ratio: ratios.MAJOR_SECOND,
  },
  lg: {
    minWidth: '992px',
    base: ['18px'],
    ratio: ratios.MINOR_THIRD,
  },
  xl: {
    minWidth: '1400px',
    base: ['22px'],
  },
};

exports.fluidTheme = {
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
