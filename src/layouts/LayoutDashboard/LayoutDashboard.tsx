import { ReactElement, ReactNode, useState } from 'react';
import { AppHeader } from 'src/containers/headers/AppHeader';

import { StyleConstants } from 'src/data/constants/StyleConstants';
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

  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
        <AppHeader menuOptionSelected={menuOptionSelected}
                   onMenuOpen={() => {setMenuOpen(true)}}
                   onMenuClose={() => {setMenuOpen(false)}} />
        <DashboardBody id='__DashboardBody' isMenuOpen={menuOpen}>
          {children}
        </DashboardBody>
      </BoxStyled>
    </>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
