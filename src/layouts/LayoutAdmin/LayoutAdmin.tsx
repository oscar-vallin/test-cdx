import { ReactElement } from 'react';
import { SpinnerSize } from '@fluentui/react';
import { Spinner } from 'src/components/spinners/Spinner';
import { Spacing } from 'src/components/spacings/Spacing';
import { LayoutDashboard } from '../LayoutDashboard';
import { StyledBox } from './LayoutAdmin.styles';

const defaultProps = {
  id: '',
  // menuOptionSelected: 'admin',
  // sidebarOptionSelected: '',
  // children: '',
};

type LayoutAdminProps = {
  id?: string;
  menuOptionSelected?: string;
  sidebarOptionSelected?: string;
  children?: ReactElement | string;
} & typeof defaultProps;

export const LayoutAdmin = ({ id, menuOptionSelected = 'admin', children }: LayoutAdminProps): ReactElement => {
  const isFetchingOrgNav = false;

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected}>
      {isFetchingOrgNav ? (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading admin domain" />
        </Spacing>
      ) : (
        <StyledBox>
          <StyledBox>{children}</StyledBox>
        </StyledBox>
      )}
    </LayoutDashboard>
  );
};

LayoutAdmin.defaultProps = defaultProps;

export default LayoutAdmin;
