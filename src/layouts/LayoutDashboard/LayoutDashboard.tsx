import {
  ReactElement, ReactNode, useEffect, useState,
} from 'react';
import { AppHeader } from 'src/containers/headers/AppHeader';

import { screenSize } from 'src/styles/GlobalStyles';
import { StyleConstants } from 'src/data/constants/StyleConstants';
import { LeftNav } from 'src/containers/menus/LeftNav';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { DashboardContainer, DashboardBody } from './LayoutDashboard.styles';
import { OrgBreadcrumbs } from './OrgBreadcrumbs';

type LayoutDashboardProps = {
  id?: string;
  menuOptionSelected?: string;
  children?: ReactNode | string;
};

export const LayoutDashboard = ({
  id,
  menuOptionSelected = 'dashboard',
  children,
}: LayoutDashboardProps): ReactElement => {
  const ActiveDomainStore = useActiveDomainStore();
  const isMobile = window.screen.width <= screenSize.mobileL
  const [menuOpen, setMenuOpen] = useState<boolean>(
    !isMobile && ActiveDomainStore.nav.admin.length > 0,
  );

  const isShowLeftMenu = ActiveDomainStore.nav.admin.length > 0;

  useEffect(() => {
    if (isMobile) {
      setMenuOpen(false);
    } else {
      setMenuOpen(ActiveDomainStore.nav.admin.length > 0);
    }
  }, []);

  const showLeftMenu = () => {
    if (isShowLeftMenu) {
      return (
        <LeftNav
          menuOptionSelected={menuOptionSelected}
          isOpen={menuOpen}
        />
      );
    }
    return null;
  };

  return (
    <DashboardContainer id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
      <AppHeader
        onMenuButtonClick={() => {
          if (ActiveDomainStore.nav.admin.length > 0) {
            setMenuOpen(!menuOpen);
          }
        }}
        hasLeftMenu={isShowLeftMenu}
      />
      {showLeftMenu()}
      <DashboardBody id="__DashboardBody" isMenuOpen={menuOpen && isShowLeftMenu}>
        <OrgBreadcrumbs />
        {children}
      </DashboardBody>
    </DashboardContainer>
  );
};

export default LayoutDashboard;
