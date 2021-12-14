/* tslint:disable */

import styled, { StyledComponent } from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib-commonjs/Icon';
import { IconButton } from '@fluentui/react/lib-commonjs/Button';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

interface ToggableProps {
  open?: boolean;
}
interface StyledNavButtonProps {
  selected?: boolean;
}

type StyledSubNavProps = {
  onLinkClick?: any | null;
  highlight?: boolean;
};

export const StyledContainer = styled.div<ToggableProps>`
  position: relative;
  z-index: 100;

  &::before {
    background: rgba(0, 0, 0, 0.25);
    content: '';
    height: 100vh;
    left: 0;
    opacity: ${({ open }) => (open ? '1' : '0')};
    position: fixed;
    top: 0;
    transition: all 0.25s ease-out;
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    width: 100vw;
    z-index: -1;
  }
`;

export const StyledHeader = styled.header`
  align-items: stretch;
  background: ${({ theme }) => theme.colors.themePrimary};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font: ${({ theme }) => theme.fontStyles.normal};
  white-space: nowrap;
  width: 100vw;
`;

export const StyledButton = styled.button<ToggableProps>`
  background: ${({ open }) => (open ? 'rgba(0, 0, 0, 0.05)' : 'none')};
  align-items: center;
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
  margin: ${({ theme }) => `0 ${theme.spacing.small} 0 0`};
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

  @media all and (min-width: 1024px) {
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

export const StyledPanel = styled.div<ToggableProps>`
  background: ${({ theme }) => theme.colors.neutralLighter} !important;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  font: ${({ theme }) => theme.fontStyles.normal};
  height: calc(100% - 58px);
  justify-content: flex-start;
  padding: ${({ theme }) => `0 ${theme.spacing.small}`};
  position: fixed;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.25s ease-out;
  top: 58px;
  width: 100vw;
  z-index: -1;

  @media all and (min-width: 768px) {
    width: auto;
  }
`;

export const StyledSubNav = styled(Nav)<StyledSubNavProps>`
  height: auto;
  overflow-x: hidden;

  &.AppHeader__MobileNav {
    display: block;
  }

  .ms-Nav-groupContent {
    margin: 0;
  }

  .ms-Nav-compositeLink {
    .ms-Button {
      font-size: 0.75rem;

      &:hover {
        background: ${({ theme }) => theme.colors.neutralLighter};
      }
    }

    .ms-Nav-chevronButton {
      position: absolute;
      width: 100%;
      z-index: 2;

      & + .ms-Button {
        font-size: 0.75rem;
        font-weight: ${({ highlight }) => (highlight ? 700 : 400)};
        pointer-events: none;
      }
    }
  }

  @media all and (min-width: 1024px) {
    &.AppHeader__MobileNav {
      display: none;
    }
  }
`;
