import styled from 'styled-components';
import { Checkbox, Dropdown, Stack } from '@fluentui/react';

export const StyledCheckbox = styled(Checkbox)<CheckboxProps>`
    margin-left: 50px;
    padding-left: 20px;
    span {
        color: ${({ color, checked }) => (checked ? color : 'rgb(50, 49, 48)')};
    }
`;

type CheckboxProps = {
    color?: string;
};

export const StyledTooltip = styled.div`
    pointer-events: auto;
    width: 200px;
    height: 80px;
    background-color: ${(({ theme }) => theme.colors.white)};
    padding: 15px 2px;
    box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
    text-align: center;

    button {
      text-align: center;
      padding-top: 10px;
    }
`;

export const StyledTotal = styled(Stack)<StyledTotalProps>`
  width: ${(({ lineChart }) => (lineChart ? '93%' : '90%'))};
  text-align: center;
  padding: ${(({ background }) => (background ? '7px 0' : null))};
  padding-left: ${(({ lineChart }) => (lineChart ? '15px' : '50px'))};
  padding-right: ${(({ lineChart }) => (lineChart ? '40px' : '45px'))};
  background-color: ${(({ background, theme }) => (background ? theme.colors.neutralLighter : null))};

  span {
    font-weight: ${(({ background }) => (background ? 500 : null))};
    ;
  }
`;

type StyledTotalProps = {
  background?: boolean;
  lineChart?: boolean;
};

export const StyledTransmissionsType = styled(Dropdown)`
.ms-Dropdown {
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.white};
  outline: none;

  & span: first-child {
    border-color: ${({ theme }) => theme.colors.white};
    border-width: 2px;
    padding-right: 58px;
    font-size: 1.15em;
    font-weight: 500;
  }
  &::after {
    border-color: ${({ theme }) => theme.colors.white};
    border-width: 2px;
  }
  [data-icon-name='ChevronDown'] {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 0.85em;
  }

}
`
