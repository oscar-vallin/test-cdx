import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin: ${({ theme }) => `${theme.spacing.normal} 0 0`};
  width: 100%;

  .collapse__trigger {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.themeTertiary};
    display: block;
    font: ${({ theme }) => theme.fontStyles.normal};
    font-size: ${({ theme }) => theme.fontSizes.normal};
    outline: none;
    text-align: center;
    width: 100%;

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.themePrimary};
      cursor: pointer;
    }
  }
`;

export const StyledButton = styled.button``;
