import { ReactElement, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { AppHeader } from 'src/containers/headers/AppHeader';
import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

import { NavBar } from '../../containers/bars/NavBar';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutDashboard.styles';
import { useSessionStore } from '../../store/SessionStore';

const defaultProps = {
  id: '',
  menuOptionSelected: 'dashboard',
  showMenu: true,
};

type LayoutDashboardProps = {
  id?: string;
  menuOptionSelected?: string;
  showMenu?: boolean;
  children?: ReactNode | string;
} & typeof defaultProps;

export const LayoutDashboard = ({
  id,
  menuOptionSelected = 'dashboard',
  showMenu = true,
  children,
}: LayoutDashboardProps): ReactElement => {
  const { user } = useSessionStore();
  const history = useHistory();

  return (
    <>
      <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
        <AppHeader />
        {/* <NavBar
          id="__NavBar"
          visible={showMenu}
          menuOptionSelected={menuOptionSelected}
          onUserSettings={() => history.push(`${ROUTE_USER_SETTINGS.URL}?orgSid=${user.orgSid}`)}
        /> */}

        {children}
      </BoxStyled>
    </>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
