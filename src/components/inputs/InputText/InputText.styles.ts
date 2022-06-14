import styled from 'styled-components';
import { TextField } from '@fluentui/react';

type StyledTextFieldProps = {
  autofocus: boolean;
  value: string;
};

export const FieldValue = styled.div`
  padding: 0 0 5px 0;
  font: ${({ theme }) => theme.fontStyles.normal};
`;

export const EmptyValue = styled.span`
  font: ${({ theme }) => theme.fontStyles.normal};
  color: ${({ theme }) => theme.colors.neutralTertiary};
`;

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  width: 100%;
  FormLabel {
    padding-left: 0;
  }
  .ms-TextField-fieldGroup {
    background-color: ${({ theme }) => theme.colors.neutralLight};
    
    input {
      color: ${({ theme }) => theme.colors.neutralSecondary};
    }
  }
`;
