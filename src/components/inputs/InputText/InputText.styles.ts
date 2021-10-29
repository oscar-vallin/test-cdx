import styled from 'styled-components';
import { TextField } from '@fluentui/react';

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  width: 100%;
`;

type StyledTextFieldProps = {
  autofocus: boolean;
  value: string;
};
