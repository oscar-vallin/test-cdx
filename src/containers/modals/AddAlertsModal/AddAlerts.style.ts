import { FontIcon } from '@fluentui/react';
import styled from 'styled-components';

export const ChevronIcon = styled(FontIcon)`
  font-size: 0.75em;
  cursor: pointer;
  margin-left: 20px;
  font-weight:${({ theme }) => theme.fontWeights.bold};
`;
