import styled from 'styled-components';

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const StyledLi = styled.li<StyledLiProps>`
  display: flex;
  padding: ${({ theme }) => `${theme.spacing.normal}`};
  position: relative;
  z-index: 1;
  background-color: ${({ theme, active }) => (active ? theme.colors.neutralLighter : 'inherit')};

  .item__status {
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    min-height: 35px;
    max-height: 35px;
    min-width: 35px;
    max-width: 35px;

    & .success {
      color: ${({ theme }) => theme.colors.custom.success};
    }
    & .error {
      color: ${({ theme }) => theme.colors.custom.error};
    }
    & .info {
      color: ${({ theme }) => theme.colors.custom.info};
    }
    & .warn {
      color: ${({ theme }) => theme.colors.custom.warning};
    }
  }

  .item__content {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
    margin: ${({ theme }) => `0 0 0 ${theme.spacing.normal}`};

    .title {
      color: ${({ theme }) => theme.colors.black};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      margin: ${({ theme }) => `0 0 ${theme.spacing.small} 0`};
    }

    .description {
      color: ${({ theme }) => theme.colors.themeTertiary};
      font-size: ${({ theme }) => theme.fontSizes.normal};
    }
  }

  &:not(:last-child) {
    &::before {
      border: 1px solid ${({ theme }) => theme.colors.neutralLight};
      content: '';
      display: block;
      height: 100%;
      left: ${({ theme }) => theme.spacing.double};
      position: absolute;
      top: ${({ theme }) => theme.spacing.normal};
      transform: translateX(1px);
      z-index: -1;
    }
  }
`;

type StyledLiProps = {
  active: boolean;
};
