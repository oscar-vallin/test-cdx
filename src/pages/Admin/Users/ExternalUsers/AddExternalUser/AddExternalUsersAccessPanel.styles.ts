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

export const MenuSeparator = styled.hr`
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutralTertiaryAlt};
  margin: 10px 0;
  width: 100%;
`;
