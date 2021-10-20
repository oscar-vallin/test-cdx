import styled from 'styled-components';
import { Persona } from 'office-ui-fabric-react/lib-commonjs/Persona';

export const StyledPersona = styled(Persona)`
  .ms-Persona-initials {
    background: rgba(255, 255, 255, 0.3);
    color: ${({ theme }) => theme.colors.black};
  }
`;
