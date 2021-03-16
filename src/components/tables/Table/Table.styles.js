import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../layouts';
import { Text } from '../../typography/Text';
import { ButtonAction } from '../../buttons/ButtonAction';

export const StyledContainer = styled.div`
  width: 100%;
`;

export const StyledBox = styled(LayoutBox)`
  width: 100%;
`;

export const StyledRow = styled(LayoutRow)`
  width: 100%;
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  border-bottom: gray;
  border-bottom-width: 2px;
  border-bottom-style: solid;
`;

export const StyledCell = styled(LayoutRow)`
  width: 100%;
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
`;

export const StyledColumn = styled(LayoutColumn)`
  width: 100%;
  padding-left: ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft}px` : '0px')};
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
`;

export const HeaderTable = styled(StyledRow)`
  height: 5vh;
  min-height: 38px;
`;

export const HeaderColumn = styled(LayoutColumn)`
  width: 100%;
`;

export const StyledText = styled(Text)`
  display: flex;
  width: 100%;
  font-size: 14px;
  font-weight: ${({ bold, theme }) => (bold ? theme.fontWeights.bold : theme.fontWeights.normal)};
  justify-content: ${({ left, right }) => (left ? 'flex-start' : right ? 'flex-end' : 'center')};
  align-items: center;
`;

export const StyledSpecs = styled(Text)`
  display: flex;
  width: 100%;
  margin-left: 5px;
  justify-content: 'flex-start';
  align-items: center;
  color: gray;
  font-size: 12px;
`;

export const StyledMenuButton = styled(ButtonAction)`
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledSublabel = styled.span`
  /* margin-left: 5px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 10px; */
`;

export const CellItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
