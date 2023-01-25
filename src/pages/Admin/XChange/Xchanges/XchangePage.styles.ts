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
  width: ${({ total }) => (total ? '1.5rem' : '1.25rem')};
  height: ${({ total }) => (total ? '1.5rem' : '1.25rem')};;
  background: ${({ theme }) => theme.colors.white};
  border: ${({ total, color }) => (total ? `2px solid ${color}` : `1.5px solid ${color}`)};
  color: ${({ color }) => color};
  text-align: center;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  font-size: 0.75rem;
  cursor: ${({ color }) => (color === 'gray' ? 'default' : 'pointer')};
`;

type CircleStyledProps = {
  color: string;
  total?: boolean;
};

export const StyledButtonAction = styled(ButtonAction)`
  font-size: 24px;
`;
