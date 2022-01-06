import { Row } from 'src/components/layouts';
import { Text } from 'src/components/typography';
import styled from 'styled-components';
import { FontIcon } from "@fluentui/react";

export const LabelRow = styled(Row)`
  margin: 0;
  padding: 5px 0 5px 0;
  align-items: center;
`;

export const Required = styled(Text)`
  color: ${({ theme }) => theme.colors.red ?? '#A4262C'};
  font-size: 14px;
  font-weight: 600;
  padding: 5px 0px;
`;

export const Label = styled(Text)`
  font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto,
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 600;
  color: rgb(50, 49, 48);
  box-sizing: border-box;
  box-shadow: none;
  margin: 0px;
  display: block;
  padding: 5px 0px;
  overflow-wrap: break-word;
`;

export const ErrorIcon = styled(FontIcon)`
  color: #a4262c;
  font-weight: bold;
`
