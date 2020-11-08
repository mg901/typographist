import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DEFAULT_CONFIG } from './constants';
import { setCustomOrDefaultTheme } from './library';
import { renderStandardOrFluidRoot } from './features/root';
import { base } from './features/base';

const GlobalStyles = createGlobalStyle`
  :root {
    ${renderStandardOrFluidRoot}
  }
  
  body {
		line-height: 2rem;
    ${base}
    body {
    font-style: normal;
    font-weight: normal;
  }
  }

	p {
		margin: 0;
		margin-bottom: 2rem;
	}
`;

type Props = {
  fluid?: boolean;
  config?: Record<string, any>;
  children: React.ReactNode;
};

export const TypographistProvider: React.FC<Props> = ({
  fluid = false,
  config = DEFAULT_CONFIG,
  children,
}) => (
  <ThemeProvider theme={setCustomOrDefaultTheme(config)}>
    <GlobalStyles fluid={fluid} />
    {children}
  </ThemeProvider>
);
