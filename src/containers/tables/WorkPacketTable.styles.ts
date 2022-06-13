import styled from 'styled-components';
import { Link } from '@fluentui/react';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from 'src/components/layouts';
import { Text as ComponentText } from 'src/components/typography/Text';

type RowProps = {
  left?: boolean;
  marginH?: boolean;
  paddingLeft?: boolean;
};

export const Container = styled(LayoutBox)`
  padding: 0 20px;
  width: 100%;
`;

export const Box = styled(LayoutBox)`
  align-items: flex-start;
  justify-content: flex-start;
  transform: translateY(-15px);
  width: 100%;
`;

export const FilterSection = styled(LayoutRow)`
  margin: 15px 0;
`;

export const StyledRow = styled(LayoutRow)`
  // padding: 15px;
  .ms-ComboBox-container {
    width: 100%;
    label {
      padding: 12px 0 13px;
    }
  }
`;

export const Column = styled(LayoutColumn)``;

export const RightColumn = styled(LayoutColumn)``;

export const DownloadLink = styled(Link)`
  padding-right: 10px;
`;

export const Text = styled(ComponentText)`
  color: gray;
  font-size: 0.7rem;
`;

export const CellItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const StyledCell = styled(LayoutRow)<RowProps>`
  font-size: 0.75rem;
  width: 100%;
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
`;

export const StyledColumn = styled(LayoutColumn)<RowProps>`
  width: 100%;
  padding-left: ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft}px` : '0px')};
  margin-left: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
  margin-right: ${({ marginH }) => (marginH ? `${marginH}px` : '0px')};
`;
