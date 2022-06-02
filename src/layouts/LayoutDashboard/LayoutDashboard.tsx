import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { AppHeader } from 'src/containers/headers/AppHeader';

import { StyleConstants } from 'src/data/constants/StyleConstants';
import { ROUTE_EXTERNAL_ORGS } from 'src/data/constants/RouteConstants';
import { LeftNav } from 'src/containers/menus/LeftNav';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { BoxStyled, DashboardBody } from './LayoutDashboard.styles';

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

  const notShowLeftMenu = ActiveDomainStore.domainOrg.origin.destination !== ROUTE_EXTERNAL_ORGS.API_ID;

  useEffect(() => {
    setMenuOpen(ActiveDomainStore.nav.admin.length > 0);
  }, []);

  const showLeftMenu = () => {
    if (notShowLeftMenu) {
      return <LeftNav menuOptionSelected={menuOptionSelected} isOpen={menuOpen} />;
    }
  };

  return (
    <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
      <AppHeader
        onMenuButtonClick={() => {
          if (ActiveDomainStore.nav.admin.length > 0) {
            setMenuOpen(!menuOpen);
          }
        }}
      />
      {showLeftMenu()}
      <DashboardBody id="__DashboardBody" isMenuOpen={menuOpen && notShowLeftMenu}>
        {children}
      </DashboardBody>
    </BoxStyled>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
