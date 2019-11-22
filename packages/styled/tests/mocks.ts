export const CONFIG_SYMBOL = '@typographist/styled';

export const defaultTheme = {
  [CONFIG_SYMBOL]: {
    breakpointsMap: {
      initial: {
        base: [16],
        lineHeight: 1.5,
        ratio: 1.333,
        root: 12,
        value: '0px',
      },
    },
    mediaQueries: {},
  },
};

export const propsWithDefaultTheme = {
  fluid: false,
  theme: defaultTheme,
};

export const customTheme = {
  [CONFIG_SYMBOL]: {
    breakpointsMap: {
      initial: {
        base: [14],
        lineHeight: 1.4,
        ratio: 1.066666667,
        root: 10,
        value: '0px',
      },
      tablet: {
        base: [16],
        lineHeight: 1.5,
        ratio: 1.125,
        root: 12,
        value: '768px',
      },
      desktop: {
        base: [18],
        lineHeight: 1.5,
        ratio: 1.2,
        root: 13.5,
        value: '992px',
      },
      lgDesktop: {
        base: [20],
        lineHeight: 1.5,
        ratio: 1.2,
        root: 15,
        value: '1200px',
      },
    },
    mediaQueries: {
      tablet: '768px',
      desktop: '992px',
      lgDesktop: '1200px',
    },
  },
};

export const propsWithCustomTheme = {
  fluid: false,
  theme: customTheme,
};
