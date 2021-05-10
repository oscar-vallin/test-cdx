import React from 'react';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Spacing } from '../../components/spacings/Spacing';
import { RouteLink } from './AdminPage.styles';
import { NAV_ITEMS } from './SideMenu';

const _AdminPage = () => {
  return (
    <LayoutAdmin id="PageAdmin" sidebar={NAV_ITEMS}>
      <Spacing margin="double" />
    </LayoutAdmin>
  );
};

const AdminPage = React.memo(_AdminPage);

export { AdminPage };
