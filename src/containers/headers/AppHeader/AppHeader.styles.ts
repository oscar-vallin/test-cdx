/* tslint:disable */

import styled, { StyledComponent } from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib-commonjs/Icon';
import { IconButton } from '@fluentui/react/lib-commonjs/Button';

interface StyledNavButtonProps {
  selected?: boolean;
}

export const StyledContainer = styled.div`
  align-items: stretch;
  background: ${({ theme }) => theme.colors.themePrimary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font: ${({ theme }) => theme.fontStyles.normal};
  white-space: nowrap;
  width: 100vw;

  @media all and (min-width: 1400px) {
  }
`;

export const StyledButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: flex;
  padding: ${({ theme }) => `0 ${theme.spacing.normal}`};
  text-align: left;
  transition: background 0.15s ease-out;

  .HeaderBtnText {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => `10px ${theme.spacing.normal}`};
    padding-right: 0;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const StyledNavIcon = styled(Icon)`
  margin: ${({ theme }) => `0 ${theme.spacing.normal} 0 0`};
`;

export const StyledChevronDown = styled(Icon)`
  margin: ${({ theme }) => `0 0 0 ${theme.spacing.double}`};
`;

export const StyledLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: ${({ theme }) => `0 ${theme.spacing.double}`};
  text-decoration: none;
  transition: background 0.15s ease-out;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const StyledNav = styled.nav`
  display: none;

  @media all and (min-width: 1400px) {
    align-items: stretch;
    display: flex;
    font-size: 0.875rem;
  }
`;

export const StyledNavButton = styled.button<StyledNavButtonProps>`
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: flex;
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  opacity: ${({ selected }) => (selected ? '1' : '.75')};
  padding: ${({ theme }) => `0 ${theme.spacing.normal}`};
  position: relative;
  text-decoration: none;
  transition: background 0.15s ease-out;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  &::after {
    background: ${({ theme }) => theme.colors.white};
    bottom: 0;
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    height: 3px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    border: none !important;
    color: ${({ theme }) => theme.colors.white};
    padding: 0px 8px;
    min-width: 0px;

    &:hover,
    &.is-expanded {
      background: ${({ theme }) => theme.colors.white} !important;
      color: ${({ theme }) => theme.colors.themePrimary} !important;
    }
  }
`;

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `0 ${theme.spacing.normal} 0 0`};
  width: 100%;
`;
