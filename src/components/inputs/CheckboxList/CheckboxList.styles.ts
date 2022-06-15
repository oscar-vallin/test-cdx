import styled from 'styled-components';
import { FontIcon } from '@fluentui/react';

export const OptionRow = styled.div`
  padding: 8px 0 8px;

  .ms-Checkbox-checkbox {
    border-color: ${({ theme }) => theme.colors.neutralPrimary};
    &:hover {
      border-color: ${({ theme }) => theme.colors.neutralTertiary};
    }
  }
`;

export const PaddedIcon = styled(FontIcon)`
  margin-right: 10px;
`;
