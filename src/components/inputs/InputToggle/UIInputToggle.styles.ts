import { Toggle } from '@fluentui/react';
import styled from 'styled-components';

export const ThemedToggle = styled(Toggle)`
  label {
    color: ${({ theme }) => theme.colors.neutralPrimary};
  }
`;
