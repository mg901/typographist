import styled from 'styled-components';
import { up, steps } from '@typographist/styled';

export const H1 = styled.h1`
  ${steps(6)};
  line-height: 4rem;
  margin-top: 8rem;
  margin-bottom: 0;

  ${up('tablet')} {
    margin-bottom: 1rem;
  }

  ${up('desktop')} {
    margin-bottom: 2rem;
  }
`;
