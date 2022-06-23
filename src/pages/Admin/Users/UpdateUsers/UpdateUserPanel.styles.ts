import { FontIcon } from '@fluentui/react';
import styled from 'styled-components';
import { defaultTheme } from 'src/styles/themes';

export const ActiveIcon = styled(FontIcon)`
  color: ${({ theme }) => theme.colors.custom.success ?? defaultTheme.custom.success};
  padding-left: 10px;
`;
export const InactiveIcon = styled(FontIcon)`
  color: ${({ theme }) => theme.colors.custom.error ?? defaultTheme.custom.error};
  padding-left: 10px;
`;

export const EllipsisTitle = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 187px;
`;

