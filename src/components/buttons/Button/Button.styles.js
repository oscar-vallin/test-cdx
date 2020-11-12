import styled from 'styled-components';
import { PrimaryButton } from '@fluentui/react';

const getVariant = (theme, variant) => {
  const VARIANTS = {
    primary: { background: theme.colors.themePrimary, color: theme.colors.white },
    secondary: { background: theme.colors.white, color: theme.colors.black },
    light: { background: 'transparent', color: theme.colors.themePrimary },
    danger: { background: 'transparent', color: theme.colors.error },
    error: { background: theme.colors.severe, color: theme.colors.white },
  }

  return VARIANTS[variant];
}

export const StyledButton = styled(PrimaryButton)`
  width: ${({ block }) => block ? '100%' : 'auto'};
  
  &,
  & + button {
    background: ${({ theme, variant }) => getVariant(theme, variant).background};
    border ${({ theme, variant }) => `1px solid ${variant === 'secondary'
      ? theme.colors.black
      : 'transparent'} !important
    `};
    color: ${({ theme, variant }) => getVariant(theme, variant).color} !important;
    
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
    }
  }
`;
