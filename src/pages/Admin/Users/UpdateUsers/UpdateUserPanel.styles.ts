import { FontIcon } from '@fluentui/react';
import styled from 'styled-components';

export const ActiveIcon = styled(FontIcon)`
  color: ${({ theme }) => theme.colors.custom.success ?? '#107C10'};
  padding-left: 10px;
`;
export const InactiveIcon = styled(FontIcon)`
  color: ${({ theme }) => theme.colors.custom.error ?? '#A4262C'};
  padding-left: 10px;
`;
