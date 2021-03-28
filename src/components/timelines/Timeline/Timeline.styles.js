import styled from 'styled-components';

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const StyledLi = styled.li`
  display: flex;
  padding: ${({ theme }) => `${theme.spacing.normal} 0`};
  position: relative;
  z-index: 1;

  .item__status {
    align-items: center;
    background: ${({ theme, status }) => status === 'DONE' 
      ? theme.colors.custom.success 
      : status === 'PROGRESS'
        ? theme.colors.white
        : '#eee'
    };
    border-radius: 50%;
    color: ${({ theme, status }) => status === 'DONE' ? theme.colors.white : theme.colors.black};
    display: flex;
    justify-content: center;
    min-height: 35px;
    max-height: 35px;
    min-width: 35px;
    max-width: 35px;
  }

  .item__content {
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'auto'};
    margin: ${({ theme }) => `0 0 0 ${theme.spacing.normal}`};

    .title {
      color: ${({ theme, active }) => active ? theme.colors.themePrimary : theme.colors.black};
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
      border: 1px solid #edebe9;
      content: '';
      display: block;
      height: 100%;
      left: ${({ theme }) =>  theme.spacing.normal};
      position: absolute;
      top: ${({ theme }) =>  theme.spacing.normal};
      transform: translateX(1px);
      z-index: -1;
    }
  }
`;