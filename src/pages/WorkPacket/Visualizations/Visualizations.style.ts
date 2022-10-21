import styled from 'styled-components';
import { Checkbox, Stack } from '@fluentui/react';

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
    background-color: rgb(254, 254, 254);
    padding: 15px 2px;
    box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
    text-align: center;

    button {
      text-align: center;
      padding-top: 10px;
    }
`;

export const StyledTotal = styled(Stack)`
  width: 91%;
  background-color: #f3f2f1;
  padding: 4px;
`;
