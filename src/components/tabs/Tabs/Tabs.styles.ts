import styled from 'styled-components';
import { Pivot } from '@fluentui/react';

export const StyledPivot = styled(Pivot)`
  width: 100%;

  [role='tablist'] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutralLight};
    margin: ${({ theme }) => `0 0 0 ${theme.spacing.normal}`};
  }

  .ms-Pivot-link:hover {
    background-color: ${({ theme }) => theme.colors.neutralLight};
  }
`;

export const StyledSpan = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.colors.neutralPrimary};

  & .cdx-badge {
    margin-left: 0.5em;
    height: 1.5em;
  }
`;
