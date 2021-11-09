import { ReactElement, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_ACTIVITY_CURRENT, ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

import { NavBar } from '../../containers/bars/NavBar';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutDashboard.styles';

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

const LayoutDashboard = ({
  id,
  menuOptionSelected = 'dashboard',
  showMenu = true,
  children,
}: LayoutDashboardProps): ReactElement => {
  const history = useHistory();

  return (
    <>
      <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
        <NavBar
          id="__NavBar"
          visible={showMenu}
          menuOptionSelected={menuOptionSelected}
          onUserSettings={() => history.push(ROUTE_USER_SETTINGS.URL)}
        />

        {children}
      </BoxStyled>
    </>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export { LayoutDashboard };