import styled from 'styled-components';
import { Row as LayoutRow } from 'src/components/layouts/Row';
import { Button } from 'src/components/buttons';
import { Text } from 'src/components/typography';
import { Link } from 'react-router-dom';

export const StyledRow = styled(LayoutRow)`
  transform: translateY(-25px);
`;

export const DateRangeButton = styled(Button)<DateRangeButtonProps>`
  background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.infoBackground)};
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  transition: all 0.15s ease-out;

  width: 100%;
`;

export const DashboardTableWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const HeaderLink = styled(Link)`
  font: ${({ theme }) => (theme.fontStyles.headerTitle )};
  color: ${({ theme }) => (theme.colors.themePrimary )};
  text-decoration: none;
  font-size: ${({ theme }) => (theme.fontSizes.normal )};
  line-height: 2.5em;
  margin: 10px;
  
  &:hover {
    color: ${({ theme }) => (theme.colors.themeDark )};
    text-decoration:underline;
  }
`;

export const CellLink = styled(Link)`
  color: ${({ theme }) => (theme.colors.themePrimary )};
  text-decoration: none;
  font-size: ${({ theme }) => (theme.fontSizes.small )};
  
  &:hover {
    color: ${({ theme }) => (theme.colors.themeDark )};
    text-decoration:underline;
  }
`;

export const SpecText = styled(Text)`
  display: flex;
  margin-left: 5px;
  justify-content: 'flex-start';
  align-items: center;
  color: ${({ theme }) => (theme.colors.neutralSecondary)};
  font-size: ${({ theme }) => (theme.fontSizes.small)};
`;

export const CellTotal = styled(Text)`
  font-size: ${({ theme }) => (theme.fontSizes.small )};
  width: 100%;
  text-align: end;
`

export const EmptyTable = styled(Text)`
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 40px;
`

type DateRangeButtonProps = {
  selected?: boolean;
};

