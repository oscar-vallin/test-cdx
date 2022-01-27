import { ReactElement, ReactNode, useState } from 'react';
import { AppHeader } from 'src/containers/headers/AppHeader';

import { StyleConstants } from 'src/data/constants/StyleConstants';
import { BoxStyled, DashboardBody } from './LayoutDashboard.styles';
import { LeftNav } from 'src/containers/menus/LeftNav';

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

  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
        <AppHeader onMenuButtonClick={() => { setMenuOpen(!menuOpen) }}/>
        <LeftNav menuOptionSelected={menuOptionSelected}
                 isOpen={menuOpen}
                 onMenuClick={() => {}}/>
        <DashboardBody id='__DashboardBody' isMenuOpen={menuOpen}>
          {children}
        </DashboardBody>
      </BoxStyled>
    </>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
