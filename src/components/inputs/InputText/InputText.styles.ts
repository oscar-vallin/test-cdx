import styled from 'styled-components';
import { TextField } from '@fluentui/react';

type StyledTextFieldProps = {
  autofocus: boolean;
  value: string;
};

export const FieldValue = styled.div`
  padding: 0 0 5px 8px;
  font-size: 1em;
  font-weight: normal;
`;

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  width: 100%;
`;
