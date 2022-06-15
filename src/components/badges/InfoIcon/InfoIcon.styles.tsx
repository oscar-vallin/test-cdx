import styled from 'styled-components';
import { FontIcon } from '@fluentui/react';

export const BlueInfo = styled(FontIcon)`
  margin-left: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.custom.info};
`;