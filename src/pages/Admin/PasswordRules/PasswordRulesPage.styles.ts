import styled from 'styled-components';
import { ComboBox } from '@fluentui/react';

export const StyledComboBox = styled(ComboBox)`
  margin: 0 5px;
  width: 150px;
  .ms-ComboBox {
    background-color: ${({ theme }) => theme.colors.white};

    input {
      background-color: inherit;
      color: ${({ theme }) => theme.colors.neutralSecondary};
      &:hover {
        color: ${({ theme }) => theme.colors.neutralSecondary};
      }
    }

    .ms-ComboBox-CaretDown-button {
      background: none;
      color: ${({ theme }) => theme.colors.neutralSecondary};
      &:hover {
        background-color: ${({ theme }) => theme.colors.neutralLight};
      }
    }

    &.is-disabled {
      background-color: ${({ theme }) => theme.colors.neutralLight};
      .ms-ComboBox-CaretDown-button {
        display: none;
      }
    }
  }
`;

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  margin: 8px 0;

  .Text {
    margin-left: 5px;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    font-size: 0.875rem;
    white-space: nowrap;

    .ms-TextField {
      margin: 0 5px;
      width: 60px;
    }
  }

  & .ms-Checkbox-checkbox {
    border-color: ${({ theme }) => theme.colors.neutralPrimary};
    &:hover {
      border-color: ${({ theme }) => theme.colors.neutralTertiary};
    }
  }
`;
