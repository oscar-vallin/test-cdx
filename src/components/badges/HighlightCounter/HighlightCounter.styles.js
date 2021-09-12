import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledSpan = styled.span`
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};
  display: flex;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  justify-content: center;
  border-color: ${({ type }) => {
    if (type === 0) return `red`;

    if (type === 1) return `yellow`;

    return 'blue';
  }};
  white-space: nowrap;
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme, type }) => {
    if (type === 0) return theme.colors.error;

    if (type === 1) return theme.colors.warning;

    return theme.colors.info;
  }};
  border-color: ${({ theme, type }) => {
    if (type === 0) return theme.colors.error;

    if (type === 1) return theme.colors.warning;

    return theme.colors.info;
  }};

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
