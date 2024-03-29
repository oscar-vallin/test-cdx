import styled from 'styled-components';
import { DocumentCard, Text } from '@fluentui/react';
import { Column } from 'src/components/layouts';
import { ButtonAction } from 'src/components/buttons';

export const CardColumn = styled.div`
  display: block;
  margin-top: -120px;
  z-index: 10;
`;

export const StyledContainer = styled.div<DemoCanvasWidgetProps>`
  height: ${({ height }) => (height ? `${height}px` : '750px')};
  min-width: ${({ width }) => (width ? `${width}px` : '107px')};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;
type DemoCanvasWidgetProps = {
  color?: string;
  height?: number;
  width?: number;
  background?: string;
};

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

export const StyledButtonAction = styled(ButtonAction)<StyledButtonActionProps>`
  font-size: ${({ fontSize }) => fontSize};

  .ms-Icon {
    margin-bottom: 10px;
    color: ${({ theme, disableIcon }) => (!disableIcon && theme.colors.white)}
  }
`;

type StyledButtonActionProps = {
  fontSize: number;
  disableIcon?: boolean;
};

export const StyledProcessValueText = styled(Text)<StyledProcessValueText>`
  font-weight: bold;
  text-decoration:${({ underlined }) => (underlined && 'underline')}  #0078d4 2px;
  cursor: pointer;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
  margin-right: 10px;
  margin-left: 10px;
`;

type StyledProcessValueText = {
  underlined?: boolean;
}

export const StyledSubTitleText = styled.div`
  margin-top: -5px;
  height: 22px;
  text-decoration: none !important;
`;

export const EllipsisedStyled = styled(Column)`
max-width: 140px;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
`;

export const CardFinishSetup = styled(DocumentCard)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: none;
  border-radius: ${({ theme }) => theme.radius.large};
  padding-right: 5px;
  min-width: 320px;
  max-width: 750px;
  min-height: 250px;
  width: 100%;
`;

export const AlertRow = styled.div`
  padding-top: 5px;
`;
