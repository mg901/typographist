import styled from 'styled-components';
import { up, steps } from '@typographist/styled';

type Props = {
  children: React.ReactNode;
};

export const H1 = styled.h1<Props>`
  ${steps(5)};
  line-height: 4rem;
  margin-top: 8rem;
  margin-bottom: 1rem;

  ${up('tablet')} {
    margin-bottom: 1rem;
  }

  ${up('desktop')} {
    margin-bottom: 2rem;
  }
`;
