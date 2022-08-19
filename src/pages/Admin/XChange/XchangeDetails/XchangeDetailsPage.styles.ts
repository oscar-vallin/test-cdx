import styled from 'styled-components';
import { DocumentCard, Text } from '@fluentui/react';
import { Column } from 'src/components/layouts';
import { ButtonAction } from 'src/components/buttons';

export const CardStyled = styled(DocumentCard)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: none;
  z-index: 10;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  min-height: 100px;
  width: 100%;
  right: 40px;
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
  margin-left: 30px;
`;

export const StyledContainer = styled.div<DemoCanvasWidgetProps>`
  height: 650px;
  min-width: 1070px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;
type DemoCanvasWidgetProps = {
  color?: string;
  background?: string;
};

export const StyledContainerDiagram = styled.div`
  boder: 1px solid black;
  display: flex;
`

export const StyledSFTP = styled.div`
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
  height: 190px;
`;

export const StyledQualifier = styled.div<StyledQualifierProps>`
  width: ${({ width }) => width};
  height: 22px;
  border-top-left-radius: 5em 5em;
  border-top-right-radius: 5em 5em;
  border-bottom-right-radius: 5em 5em;
  border-bottom-left-radius: 5em 5em;
  border: solid 1px ${({ color }) => color};
  position: ${({ position }) => (position ? 'absolute' : null)};
  top: ${({ top }) => (top ? '43px' : null)};
  left: ${({ left }) => (left ? '180px' : null)};
  text-align: center;
  color: ${({ color }) => color};
  font-size: 11px;
  font-weight: 500;
`;

type StyledQualifierProps = {
  width?: string;
  color?: string;
  position?: boolean;
  top?: boolean;
  left?: boolean;
};

export const StyledButtonAction = styled(ButtonAction)<StyledButtonActionProps>`
  font-size: ${({ fontSize }) => fontSize};
`;

type StyledButtonActionProps = {
  fontSize: number;
};

export const StyledProcessValueText = styled(Text)`
  font-weight: bold;
  text-decoration: underline #0078d4 2px;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
  margin-right: 10px;
`;
