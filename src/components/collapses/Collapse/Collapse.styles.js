import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin: ${({ theme }) => `${theme.spacing.normal} 0 0`};
  width: 100%;

  .collapse__trigger {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.black};
    display: block;
    font: ${({ theme }) => theme.fontStyles.normal};
    font-size: ${({ theme }) => theme.fontSizes.normal};
    outline: none;
    text-align: left;
    width: 100%;

    &:hover {
      color: ${({ theme }) => theme.colors.themePrimary};
      cursor: pointer;
    }

    [data-icon-name*='Chevron'] {
      font-size: 0.75em;
      transform: translateY(2px);
    }
  }
`;

export const StyledButton = styled.button``;
