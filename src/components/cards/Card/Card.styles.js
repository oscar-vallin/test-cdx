import styled from 'styled-components';
import { Card as uiFabricCard } from '@uifabric/react-cards';

export const CardStyled = styled(uiFabricCard)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  box-shadow: ${({ theme, elevation }) => theme.boxShadows[elevation]};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
  min-width: unset;
  max-width: unset;
  padding: ${({ theme, spacing }) => theme.spacing[spacing]};
  width: 100%;
`;

export const Stylesheet = {
  CardSection: {
    width: '100%',
  },
};
