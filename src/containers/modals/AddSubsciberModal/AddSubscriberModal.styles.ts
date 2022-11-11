import { Dialog } from '@fluentui/react';
import styled from 'styled-components';

export const StyledSubsOptions = styled.div`
  max-width: calc(100% - 65px);
  width: 442px;
  border: 1px solid black;
  position: fixed;
  z-index: 1;
  background-color: #fff;

  @media (min-width: 370px) {
    width: 452px;
  }
`;

export const StyledDialog = styled(Dialog)`
  .ms-Modal-scrollableContent {
    max-height: 600px;
  }
`
