import { ComboBox, Dropdown } from '@fluentui/react';
import styled from 'styled-components';

export const ThemedComboBox = styled(ComboBox)`
  .ms-ComboBox {
    background-color: ${({ theme }) => theme.colors.white};

    input {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.neutralSecondary};
    }
  }
`;

export const ThemeDropdown = styled(Dropdown)`
  min-width: 80px;
  .ms-Dropdown {
    background-color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.white};
    outline: none;

    & span: first-child {
      border-color: ${({ theme }) => theme.colors.white};
      border-bottom-color: ${({ theme }) => theme.colors.themePrimary}; 
      border-width: 2px;
      padding: 0px 28px 0px 0px;

    }
    &::after {
      border-color: ${({ theme }) => theme.colors.white};
      border-bottom-color: ${({ theme }) => theme.colors.themePrimary}; 
      border-width: 2px;
    }
    [data-icon-name='ChevronDown'] {
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      font-size: 0.75em;
    }
    & span: {
      outline: none;
    }
  }
  .ms-Icon {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  .ms-Dropdown-items {
    height: 100px;
  }

`;

export const StyledError = styled.div`
  position: relative;
  right: 12px;
`
