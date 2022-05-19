/* tslint:disable */

import styled from 'styled-components';
import { Icon, IconButton } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

interface SelectableProps {
  selected?: boolean;
}

export const StyledHeader = styled.header`
  align-items: stretch;
  background: ${({ theme }) => theme.colors.themePrimary};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font: ${({ theme }) => theme.fontStyles.normal};
  left: 0;
  position: fixed;
  top: 0;
  white-space: nowrap;
  width: 100vw;
  z-index: 999;
`;

export const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.05);
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: flex;
  padding: ${({ theme }) => `0 ${theme.spacing.normal}`};
  text-align: left;
  transition: background 0.15s ease-out;
  width: 200px;

  .HeaderBtnText {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => `10px ${theme.spacing.normal}`};
    padding-right: 0;
    width: 200px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  @media ${device.mobileL} {
    width: 230px;
  }
`;

export const StyledNavIcon = styled(Icon)`
  margin: ${({ theme }) => `0 ${theme.spacing.small} 0 0`};
`;

export const StyledNav = styled.nav`
  display: none;

  @media all and ${device.laptop} {
    align-items: stretch;
    display: flex;
    font-size: 0.875rem;
  }
`;

export const StyledNavButton = styled.button<SelectableProps>`
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: flex;
  font-size: 0.875rem;
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
    height: 5px;
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

export const StyledMenuItem = styled.div<SelectableProps>`
  padding-left: 5px;
  padding-right: 5px;
  color: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.black)};
  font-weight: ${({ selected }) => (selected ? '700' : '400')};
`;

export const StyledOverFlow = styled.small`
  overflow: hidden;
  width: 506px;
`;