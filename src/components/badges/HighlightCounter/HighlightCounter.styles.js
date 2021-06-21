import styled from 'styled-components';
// import { Link } from 'office-ui-fabric-react/lib/Link';
import { Link } from 'react-router-dom';

const getVariant = ({ colors }, variant) => {
  const Variants = {
    primary: { background: colors.themePrimary, color: colors.white },
    // light: { background: colors.themeLight, color: colors. },
    success: { background: colors.successBackground, color: colors.success },
    error: { background: colors.errorBackground, color: colors.error },
    severe: { background: colors.severeError, color: colors.white },
    warning: { background: colors.warningBackground, color: colors.warning },
    info: { background: colors.infoBackground, color: colors.info },
  };

  return Variants[variant];
};

export const StyledSpan = styled.span`
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};
  display: flex;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  justify-content: center;
  border-color: ${({ theme, type }) => (type === 0 ? `red` : type === 1 ? `yellow` : 'blue')};
  white-space: nowrap;
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme, type }) =>
    type === 0 ? theme.colors.error : type === 1 ? theme.colors.warning : theme.colors.info};
  border-color: ${({ theme, type }) =>
    type === 0 ? theme.colors.error : type === 1 ? theme.colors.warning : theme.colors.info};

  margin-left: 5px;
  border-width: 1px;
  border-style: solid;
  padding: 0px 2px;
  border-radius: 3px;
  font-size: 0.625rem;
  min-width: 12px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
