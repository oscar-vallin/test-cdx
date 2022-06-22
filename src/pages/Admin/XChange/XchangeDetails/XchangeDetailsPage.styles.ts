import styled from 'styled-components';
import { DocumentCard, Text } from '@fluentui/react';
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
  height: 650px;
  min-width: 1200px;
  width: 100%;
  background-color: #fff;
`;
type DemoCanvasWidgetProps = {
  color?: string;
  background?: string;
};

export const StyledSFTP = styled.rect`
  x: 10;
  y: 10;
  width: 40px;
  height: 25px;
  rx: 10;
  ry: 10;
  border: 2px solid #666666;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

export const StyledHorizontalButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 600px;
  width: 100%;
`;

export const StyledText = styled(Text)`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  height: 190px;
`;

export const StyledQualifier = styled.div<StyledQualifierProps>`
  background-color: #fff;
  width: ${({ width }) => width};
  height: 22px;
  border-top-left-radius: 5em 5em;
  border-top-right-radius: 5em 5em;
  border-bottom-right-radius: 5em 5em;
  border-bottom-left-radius: 5em 5em;
  border: solid 1px ${({ color }) => color};
  position: absolute;
  top: 43px;
  left: 180px;
  text-align: center;
  color: ${({ color }) => color};
  font-size: 12px;
  font-weight: 500;
`;

type StyledQualifierProps = {
  width?: string;
  color?: string;
};
