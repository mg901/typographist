exports.defaultConfig = {
  base: ['16px'],
  lineHeight: 1.5,
  ratio: 1.333,
};

exports.config = {
  base: ['16px', '32px'],
  lineHeight: 1.5,
  ratio: '45px at 6',
  tablet: {
    minWidth: '768px',
    base: ['17px'],
  },
  desktop: {
    minWidth: '992px',
    base: ['18px'],
    lineHeight: 1.7,
    ratio: 1.333,
  },
  lgDesktop: {
    minWidth: '1200px',
    base: ['20px'],
  },
  xlDesktop: {
    minWidth: '1600px',
    base: ['22px'],
  },
};

exports.invalidConfig = {
  base: ['1rem', '2em'],
  lineHeight: 1.5,
  ratio: '45 at 6',
  tablet: {
    base: '17px',
  },
  desktop: {
    breakpoint: '64rem',
    base: '18px',
    lineHeight: '1.7',
    ratio: 1.333,
  },
  lgDesktop: {
    minWidth: '75rem',
    base: '20px',
  },
  xlDesktop: {
    minWidth: '100rem',
  },
};

exports.breakpoints = [
  {
    base: [16, 32],
    lineHeight: 1.5,
    name: 'initial',
    ratio: 1.1880883987824906,
    root: 12,
    minWidth: '0px',
  },
  {
    base: [17],
    lineHeight: 1.5,
    name: 'tablet',
    ratio: 1.1761442744249144,
    root: 13,
    minWidth: '640px',
  },
  {
    base: [18],
    lineHeight: 1.7,
    name: 'desktop',
    ratio: 1.333,
    root: 15.5,
    minWidth: '1024px',
  },
  {
    base: [20],
    lineHeight: 1.7,
    name: 'lgDesktop',
    ratio: 1.333,
    root: 17,
    minWidth: '1200px',
  },
  {
    base: [22],
    lineHeight: 1.7,
    name: 'xlDesktop',
    ratio: 1.333,
    root: 18.5,
    minWidth: '1600px',
  },
];

exports.breakpointsMap = {
  initial: {
    base: [16, 32],
    lineHeight: 1.5,
    ratio: 1.1880883987824906,
    root: 12,
    minWidth: '0px',
  },
  tablet: {
    base: [17],
    lineHeight: 1.5,
    ratio: 1.1761442744249144,
    root: 13,
    minWidth: '768px',
  },
  desktop: {
    base: [18],
    lineHeight: 1.7,
    ratio: 1.333,
    root: 15.5,
    minWidth: '992px',
  },
  lgDesktop: {
    base: [20],
    lineHeight: 1.7,
    ratio: 1.333,
    root: 17,
    minWidth: '1200px',
  },
  xlDesktop: {
    base: [22],
    lineHeight: 1.7,
    ratio: 1.333,
    root: 18.5,
    minWidth: '1600px',
  },
};
