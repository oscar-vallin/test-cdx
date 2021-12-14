import { ReactElement, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { AppHeader } from 'src/containers/headers/AppHeader';
import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

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

        {children}
      </BoxStyled>
    </>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
