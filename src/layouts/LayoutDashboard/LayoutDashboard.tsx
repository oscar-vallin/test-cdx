import {
  ReactElement, ReactNode, useEffect, useState,
} from 'react';
import { AppHeader } from 'src/containers/headers/AppHeader';

import { StyleConstants } from 'src/data/constants/StyleConstants';
import { LeftNav } from 'src/containers/menus/LeftNav';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { DashboardContainer, DashboardBody } from './LayoutDashboard.styles';
import { OrgBreadcrumbs } from './OrgBreadcrumbs';

const defaultProps = {
  id: '',
  menuOptionSelected: 'dashboard',
  showMenu: true,
};

type LayoutDashboardProps = {
  id?: string;
  menuOptionSelected?: string;
  children?: ReactNode | string;
} & typeof defaultProps;

export const LayoutDashboard = ({
  id,
  menuOptionSelected = 'dashboard',
  children,
}: LayoutDashboardProps): ReactElement => {
  const ActiveDomainStore = useActiveDomainStore();
  const [menuOpen, setMenuOpen] = useState<boolean>(ActiveDomainStore.nav.admin.length > 0);

  const isShowLeftMenu = ActiveDomainStore.nav.admin.length > 0;

  useEffect(() => {
    setMenuOpen(ActiveDomainStore.nav.admin.length > 0);
  }, []);

  const showLeftMenu = () => {
    if (isShowLeftMenu) {
      return <LeftNav menuOptionSelected={menuOptionSelected} isOpen={menuOpen} />;
    }
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

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
