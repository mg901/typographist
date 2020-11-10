import React from 'react';
import { Normalize } from 'styled-normalize';
import { ratios, TypographistProvider } from '@typographist/styled';
import { H1 } from './components/h1';
import { Measure } from './components/measure';

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

export const App = () => (
  <TypographistProvider config={userConfig}>
    <Normalize />
    <Measure>
      <H1>Typographist</H1>
      <p>
        The Typographist is a mobile first progressive toolkit for web designers
        and developers that allows you to build interfaces with responsive
        graphics. Having absorbed the best qualities of{' '}
        <a
          href="https://sassline.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Sassline
        </a>{' '}
        and{' '}
        <a
          href="https://matejlatin.github.io/Gutenberg/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Gutenberg
        </a>{' '}
        it significantly simplifies the process of improving typography on the
        web. The framework objective is to provide developers with the most
        simple, powerful and flexible tool that will take over all the routine
        work in the form of complex calculations. The Typographist builds a
        basic grid to establish the correct vertical rhythm on the basis of rem,
        and also establishes macro-tipography, which allows paying special
        attention to micro-tipographic details. Also the toolkit is perfectly
        combined with css grid layout.
      </p>
    </Measure>
  </TypographistProvider>
);
