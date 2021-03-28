import styled from 'styled-components';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';

export const StyledModal = styled(Dialog)`
  .ms-Dialog-main {
    border-top: 5px solid ${({ theme }) => theme.colors.themePrimary};
  }

  .ms-Dialog-actionsRight {
    line-height: 1em;
  }
`;
