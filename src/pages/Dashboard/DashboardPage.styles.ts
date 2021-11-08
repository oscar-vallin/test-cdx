import styled from 'styled-components';
import { Row as LayoutRow } from '../../components/layouts';
import { Button } from '../../components/buttons/Button';
import { Text } from '../../components/typography/Text';

export const StyledRow = styled(LayoutRow)`
  transform: translateY(-25px);
`;

export const StyledRowDate = styled(StyledRow)``;

export const StyledButton = styled(Button)<StyledRowDateProps>`
  background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.infoBackground)};
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  transition: all 0.15s ease-out;

  width: 100%;
`;

type StyledRowDateProps = {
  selected?: boolean;
};

export const StyledSpinner = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
