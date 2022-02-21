import styled from 'styled-components';
import { FontIcon } from '@fluentui/react';

export const RedWarning = styled(FontIcon)`
  color: ${({ theme }) => theme.colors.custom.error};
`;
