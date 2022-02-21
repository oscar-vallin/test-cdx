/* tslint:disable */

import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';

interface ToggableProps {
  open?: boolean;
}

interface NavListItemProps {
  selected: boolean;
}

export const AdminNavPanel = styled.div<ToggableProps>`
  background: ${({ theme }) => theme.colors.neutralLighter} !important;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  font: ${({ theme }) => theme.fontStyles.normal};
  height: calc(100% - 58px);
  justify-content: flex-start;
  left: 0;
  overflow-y: auto;
  padding: ${({ theme }) => `0 ${theme.spacing.small}`};
  position: fixed;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.25s ease-out;
  top: 58px;
  width: 100vh;
  z-index: 998;
  padding-top: 10px;

  @media ${device.mobileL} {
    width: 230px;
  }
`;

export const NavList = styled.ul`
  list-style: none;
`;

export const NavListItem = styled.li<NavListItemProps>`
  padding-left: ${({ selected }) => (selected ? '18px' : '21px')};
  background: ${({ selected }) => (selected ? 'rgb(237, 235, 233)' : 'none')};
  border-left: ${({ theme, selected }) => (selected ? `${theme.colors.themePrimary} solid 3px` : 'none')};

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }

  &.return-home button {
    border-top: 1px solid lightgray;
  }

  & button {
    width: 192px;
  }

  & button span span {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: left;
    height: 1.5rem;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }

  @media ${device.mobileL} {
    & button span span {
      width: 166px;
    }
  }
`;

export const MobileTopNav = styled.div`
  display: block;

  & ul li:last-child {
    border-bottom: 1px solid lightgray;
  }

  @media all and ${device.laptop} {
    display: none;
  }
`;
