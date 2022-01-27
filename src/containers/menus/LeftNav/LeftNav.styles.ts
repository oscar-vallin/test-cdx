/* tslint:disable */

import styled from 'styled-components';
import { Nav } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

interface ToggableProps {
  open?: boolean;
}

type StyledSubNavProps = {
  onLinkClick?: any | null;
  highlight?: boolean;
};

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

  @media ${device.mobileL} {
    width: 230px;
  }
`;

export const SubNav = styled(Nav)<StyledSubNavProps>`
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

  @media all and ${device.laptop} {
    &.AppHeader__MobileNav {
      display: none;
    }
  }
`;
