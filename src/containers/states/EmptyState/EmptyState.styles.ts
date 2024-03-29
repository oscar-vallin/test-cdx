import styled from 'styled-components';

interface StyledDivProps {
  filled;
}

export const StyledDiv = styled.div<StyledDivProps>`
  align-items: center;
  background: ${({ theme, filled }) => (filled ? theme.colors.neutralLighterAlt : 'none')};
  border-radius: ${({ theme }) => theme.radius.normal};
  display: flex;
  flex-direction: column;
  font: ${({ theme }) => theme.fontStyles.normal};
  font-size: 0.875em;
  justify-content: center;
  margin: ${({ theme }) => `${theme.spacing.small} 0`};
  padding: ${({ theme }) => theme.spacing.triple};
  width: 100%;
`;

export const StyledImg = styled.img``;

export const StyledTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.normal};
  color: ${({ theme }) => theme.colors.neutralSecondary};
`;

export const StyledText = styled.p`
  margin: ${({ theme }) => `${theme.spacing.normal} 0`};
  color: ${({ theme }) => theme.colors.neutralSecondary};
`;

export const StyledActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.small};
`;
