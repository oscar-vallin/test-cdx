import styled from 'styled-components';
import { DocumentCard } from '@fluentui/react';
import { ButtonAction } from 'src/components/buttons';
import { device } from 'src/styles/GlobalStyles';

export const CardStyled = styled(DocumentCard)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  min-height: 200px;
  width: 100%;
  margin-top: 90px;
  bottom: 70px;

  @media ${device.tablet} {
    margin-top: 0;    
  }

  .ms-DocumentCard {
    &:hover {
      &::after {
        border: none;
      }
    }
  }
`;

export const SetupStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerInput = styled.div`
  width: 270px;
  margin: 0 auto;
`;

export const StyledIconsComments = styled.div`
  display: flex;
  align-items: center;

  [data-icon-name*='Save'] {
    font-size: 0.9em;
    color: #0078d4;
  }
  [data-icon-name*='Cancel'] {
    font-size: 0.9em;
    color: #0078d4;
    padding-left: 10px;
  }
`;

export const CircleStyled = styled.div<CircleStyledProps>`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 2.5px 1px 7px 1px;
  background: ${({ theme }) => theme.colors.white};
  border: 1.5px solid ${({ color }) => color};
  color: ${({ color }) => color};
  text-align: center;
  font: 11px Arial, sans-serif;
  cursor: ${({ color }) => color === 'gray' ? 'default' : 'pointer'};
`;

type CircleStyledProps = {
  color: string;
};

export const StyledButtonAction = styled(ButtonAction)`
  font-size: 24px;
`;
