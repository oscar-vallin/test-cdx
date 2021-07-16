import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../layouts';
import { Text } from '../../typography/Text';
import { Link } from '../../buttons/Link';
import { ButtonAction } from '../../buttons/ButtonAction';

export const StyledBox = styled(LayoutBox)`
  width: 100%;
`;

export const StyledRow = styled(LayoutRow)`
  width: 100%;
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  border-bottom: gray;
  border-bottom-width: ${({ noBorder }) => (noBorder ? '0px' : '2px')};
  border-bottom-style: solid;
`;

export const StyledColumn = styled(LayoutColumn)`
  padding-left: ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft}px` : '0px')};
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
`;

export const StyledColumnTitle = styled(StyledColumn)`
  height: 100%;
`;

export const HeaderTable = styled(StyledRow)`
  height: 5vh;
  min-height: 38px;
`;

export const StyledText = styled(Text)`
  display: flex;
  width: 100%;
  font-weight: ${({ bold, theme }) => (bold ? theme.fontWeights.bold : theme.fontWeights.normal)};
  justify-content: ${({ left, right }) => (left ? 'flex-start' : right ? 'flex-end' : 'center')};
  align-items: center;
`;

export const StyledMenuButton = styled(ButtonAction)`
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledLink = styled(Link)`
  width: 100%;
`;

export const RouteLink = styled(Link)`
  text-decoration: inherit;
  color: inherit;
`;
