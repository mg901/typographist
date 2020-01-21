import { breakpointsMap } from '../../../mocks';

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
    breakpointsMap,
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
