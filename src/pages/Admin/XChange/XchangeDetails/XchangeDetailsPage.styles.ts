import styled from 'styled-components';
import { DocumentCard } from '@fluentui/react';
import { Column } from 'src/components/layouts';

export const CardStyled = styled(DocumentCard)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  min-height: 100px;
  width: 100%;
  bottom: 70px;

  .ms-DocumentCard {
    &:hover {
      &::after {
        border: none;
      }
    }
  }
`;

export const SubsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

export const StyledColumTabs = styled(Column)`
  display: inline-block;
`;

export const StyledContainer = styled.div<DemoCanvasWidgetProps>`
  height: 550px;
  min-width: 1200px;
  width: 100%;
  background-color: #fff;
`;
type DemoCanvasWidgetProps = {
  color?: string;
  background?: string;
};
