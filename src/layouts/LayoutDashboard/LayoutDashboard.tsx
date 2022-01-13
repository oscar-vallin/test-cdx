import { ReactElement, ReactNode } from 'react';
import { AppHeader } from 'src/containers/headers/AppHeader';

import { StyleConstants } from 'src/data/constants/StyleConstants';
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

export const LayoutDashboard = ({
  id,
  menuOptionSelected = 'dashboard',
  showMenu = true,
  children,
}: LayoutDashboardProps): ReactElement => {
  return (
    <>
      <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
        <AppHeader menuOptionSelected={menuOptionSelected} />

        {children}
      </BoxStyled>
    </>
  );
};

LayoutDashboard.defaultProps = defaultProps;

export default LayoutDashboard;
