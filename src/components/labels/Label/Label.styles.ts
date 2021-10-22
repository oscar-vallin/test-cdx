import styled from 'styled-components';
import { Label } from 'office-ui-fabric-react';

export const StyledLabel = styled(Label)`
  .ms-Icon {
    color: ${({ theme }) => theme.colors.custom.infoAlt});
    transform: translateY(2px);
  }
`;
