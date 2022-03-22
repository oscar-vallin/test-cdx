import styled from 'styled-components';

export const StyledLogMessageDiv = styled.div`
  padding: ${({ theme }) => `${theme.spacing.small} 0`};
  width: 100%;

  background: none;
  
  border-top: 1px solid ${({ theme }) => theme.colors.neutralLighter};
  color: ${({ theme }) => theme.colors.black};
  display: block;
  font: ${({ theme }) => theme.fontStyles.normal};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  outline: none;
  text-align: left;
  width: 100%;

  [data-icon-name*='Chevron'] {
    font-size: 0.75em;
    transform: translateY(2px);   
    color: ${({ theme }) => theme.colors.black};
  }

  .ms-Button--icon {
    &:hover { 
      background: none;
    }
  }

`;

