import styled from 'styled-components';
import { up } from '@typographist/styled';

export const Measure = styled.div`
  // @ts-ignore
  ${(props) => console.log(props)}

  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 490px;

  ${up('tablet')} {
    max-width: 550px;
  }

  ${up('desktop')} {
    max-width: 600px;
  }

  ${up('lgDesktop')} {
    max-width: 675px;
  }
`;
