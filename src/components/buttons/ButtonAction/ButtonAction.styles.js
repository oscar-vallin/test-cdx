import styled from 'styled-components';
import { ActionButton } from '@fluentui/react';

export const StyledButtonAction = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.themePrimary};
`;
