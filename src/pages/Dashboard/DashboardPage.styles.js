import styled from 'styled-components';
import { Row as LayoutRow, Column as LayoutColumn } from '../../components/layouts';
import { Button } from '../../components/buttons/Button';
import { Text } from '../../components/typography/Text';

export const StyledRow = styled(LayoutRow)`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};
    padding: 0px 8px;
  }
`;

export const StyledRowDate = styled(StyledRow)`
  && {
    margin-right: 8px;
  }
`;

export const StyledColumn = styled(LayoutColumn)`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};
    padding: 0px 8px;
  }
`;

export const StyledButton = styled(Button)`
  background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.infoBackground)};
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  /* background: ${({ selected, theme }) => (selected ? 'red' : 'yellow')}; */

  border: none;
`;

export const StyledSpinner = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
