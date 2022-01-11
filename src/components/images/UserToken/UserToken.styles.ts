import styled from 'styled-components';
import { Persona } from '@fluentui/react';

export const StyledPersona = styled(Persona)`
  .ms-Persona-initials {
    background: rgba(255, 255, 255, 0.3);
    color: ${({ theme }) => theme.colors.black};
  }
`;
