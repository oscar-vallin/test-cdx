import styled from 'styled-components';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Box, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { ButtonAction } from '../../../components/buttons/ButtonAction';
import { Text } from '../../../components/typography/Text';

export const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.themePrimary};
  height: 48px;
`;

export const StyledDropdown = styled(IconButton)`
  background: ${({ theme }) => theme.colors.themePrimary};
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledRow = styled(LayoutRow)<StyledRowProps>`
  && {
    align-items: center;
    display: flex;
    padding: 0px 8px;
    @media (max-width: 1400px) {
      padding: 0px 8px 0px 0px;
    }
  }
`;

type StyledRowProps = {
  left?: boolean;
  right?: boolean;
  sm?: number;
};

export const StyledColumn = styled(LayoutColumn)<StyledColumnProps>`
  && {
    align-items: center;
    display: flex;
    padding: ${({ noPadding }) => (noPadding ? '0px' : '0px 8px')};
    @media (max-width: 1400px) {
      padding: 0;
    }
  }
`;

type StyledColumnProps = {
  noPadding?: boolean;
};

export const StyledColumnCont = styled(LayoutColumn)<StyledColumnContProps>`
  @media (max-width: 1400px) {
    width: 50%;
  }
`;

type StyledColumnContProps = {
  sm?: number;
  left?: boolean;
  right?: boolean;
  container?: boolean;
};

export const StyledColumnNav = styled(StyledColumn)<StyledColumnNavProps>`
  @media (max-width: 1400px) {
    width: 15%;
  }

  @media (max-width: 600px) {
    width: 20%;
  }
  @media (max-width: 480px) {
    width: 25%;
  }
  @media (max-width: 400px) {
    width: 27%;
  }
  @media (max-width: 375px) {
    width: 29%;
  }
`;

type StyledColumnNavProps = {
  sm?: number;
};

export const StyledColumnLogoL = styled(StyledColumn)<StyledColumnLogoLProps>`
  && {
    display: inline-block;

    @media (max-width: 1400px) {
      display: none;
    }
  }
`;

type StyledColumnLogoLProps = {
  sm?: number;
  noPadding?: boolean;
};

export const StyledColumnLogoR = styled(StyledColumn)<StyledColumnLogoRProps>`
  && {
    align-items: flex-start;
    display: none;

    @media (max-width: 1400px) {
      width: 70%;
      display: ${({ collapse }) => (collapse ? 'inline-block' : 'none')};
    }
  }
`;

type StyledColumnLogoRProps = {
  sm?: number;
  collapse?: boolean;
};

export const StyledTitle = styled(Text)`
  font: ${({ theme }) => theme.fontStyles.headerTitle};
  color: ${({ theme }) => theme.colors.white};

  @media all and (min-width: 1400px) {
    font-size: 1.25rem;
  }
`;

export const StyledButtonProfile = styled(ButtonAction)<StyledButtonProfileProps>`
  && {
    width: 45vw;
    max-width: 500px;
    min-width: 300px;
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};
    padding: 0px 8px;
  }
`;

type StyledButtonProfileProps = {
  marginBottom?: string;
};

export const StyledIconButton = styled(IconButton)`
  && {
    border: none !important;
    color: ${({ theme }) => theme.colors.white};
    padding: 0px 8px;
    min-width: 0px;

    &:hover,
    &.is-expanded {
      background: ${({ theme }) => theme.colors.white} !important;
      color: ${({ theme }) => theme.colors.themePrimary} !important;
    }
  }
`;

export const StyledChoiceGroup = styled(ChoiceGroup)`
  .ms-ChoiceFieldGroup-flexContainer {
    align-items: flex-start;
    display: flex;
    margin: 0 0 7px;

    button {
      align-items: center;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      margin: ${({ theme }) => `0 ${theme.spacing.normal} 0 0`};
      transition: background 0.15s ease-out;
      user-select: none;

      i {
        padding: 6px 10px;
        transform: translateY(2px);
      }

      div.ms-Spinner {
        padding: 6px 15px;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.white};
      }

      &::before {
        visibility: hidden;
      }

      &.selected {
        background: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const StyledButtonOrg = styled(DefaultButton)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 5px 0 0;
  transition: all 0.15s ease-out;

  &:hover {
    background: none;
    color: #e4e4e4;
  }
`;

export const StyledButton = styled.button``;

// export const StyledButtonProfile = styled(ButtonProfile)`
//   && {
//     padding: 0px 8px;
//   }
// `;
