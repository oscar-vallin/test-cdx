import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
