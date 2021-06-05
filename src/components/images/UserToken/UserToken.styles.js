import styled from 'styled-components';
import { Persona } from 'office-ui-fabric-react/lib/Persona';

export const StyledPersona = styled(Persona)`
  .ms-Persona-initials {
    background: rgba(255, 255, 255, .3);
    color: ${({ theme }) => theme.colors.black};
  }
`;