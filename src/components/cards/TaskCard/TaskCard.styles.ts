import styled from 'styled-components';

export const GrayRoundDiv = styled.div`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: none;
  padding: 10px;

  margin-bottom: ${({ theme }) => theme.spacing.normal};
  border-radius: ${({ theme }) => theme.radius.medium};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: 320px;
  width: 100%;
  
  [data-icon-name*='Chevron'] {
    font-size: 0.75em;
    cursor: pointer;
    font-weight:${({ theme }) => theme.fontWeights.bold};
  }
`;
