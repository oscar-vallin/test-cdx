import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ErrorSeverity, Maybe } from 'src/data/services/graphql';

export const HighlightBubble = styled.div<StyledContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background: ${({ theme, type }) => {
    if (type === 'ERROR' || type === 0) return `${theme.colors.custom.errorAlt}`;

    if (type === 'WARNING' || type === 1) return `${theme.colors.custom.warningAlt}`;

    return `${theme.colors.custom.infoAlt}`;
  }};

  color: ${({ theme, type }) => {
    if (type === 'ERROR' || type === 0) return theme.colors.custom.error;

    if (type === 'WARNING' || type === 1) return theme.colors.custom.warning;

    return theme.colors.custom.info;
  }};
  border-color: ${({ theme, type }) => {
    if (type === 'ERROR'|| type === 0) return theme.colors.custom.error;

    if (type === 'WARNING'|| type === 1) return theme.colors.custom.warning;

    return theme.colors.custom.info;
  }};

  margin-left: 5px;
  border-width: 1px;
  border-style: solid;
  padding: 0px 2px;
  border-radius: 3px;
  font-size: 0.625rem;
  min-width: 16px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

type StyledContainerProps = {
  type: number | Maybe<ErrorSeverity> | undefined;
};
