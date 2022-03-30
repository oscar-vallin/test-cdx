import styled from 'styled-components';
import { Link } from '@fluentui/react';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from 'src/components/layouts';

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
