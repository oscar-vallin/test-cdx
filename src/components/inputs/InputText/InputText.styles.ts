import styled from 'styled-components';
import { TextField } from '@fluentui/react';
import { Row } from 'src/components/layouts';
import { Text } from 'src/components/typography';

type StyledTextFieldProps = {
  autofocus: boolean;
  value: string;
};

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  width: 100%;
`;
