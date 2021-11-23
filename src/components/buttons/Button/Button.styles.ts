import styled from 'styled-components';
import { PrimaryButton } from '@fluentui/react';

const getBorderVariant = (theme, variant) => {
  return `1px solid ${variant === 'secondary' ? theme.colors.black : 'transparent'}`;
};

const getVariant = (theme, variant) => {
  const VARIANTS = {
    primary: { background: theme.colors.themePrimary, color: '#fff' },
    secondary: { background: theme.colors.white, color: theme.colors.themePrimary },
    navbar: { background: theme.colors.navbar, color: theme.colors.white },
    light: { background: 'transparent', color: theme.colors.themePrimary },
    danger: { background: 'transparent', color: theme.colors.custom.error },
    error: { background: theme.colors.custom.severeError, color: theme.colors.white },
  };

  return VARIANTS[variant] ?? VARIANTS.primary;
};

export const StyledButton = styled(PrimaryButton)<StyledButtonProps>`
  font-size: 0.875rem;
  width: ${({ block }) => (block ? '100%' : 'auto')};

  &,
  & + button {
    background: ${({ theme, variant }) => getVariant(theme, variant).background};
    border: ${({ theme, variant }) => getBorderVariant(theme, variant)};
    color: ${({ theme, variant }) => getVariant(theme, variant).color};
    white-space: nowrap;

    &:hover {
      background: ${({ theme, variant }) => getVariant(theme, variant).background};
      color: ${({ theme, variant }) => getVariant(theme, variant).color};
    }

    i {
      color: ${({ theme, variant }) => getVariant(theme, variant).color};
    }
  }

  & + button {
    & + span {
      background: ${({ theme, variant }) => getVariant(theme, variant).color};
      color: ${({ theme, variant }) => getVariant(theme, variant).color};
    }
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutralTertiaryAlt};
  }
`;

type StyledButtonProps = {
  variant?: string;
  block?: boolean;
};
