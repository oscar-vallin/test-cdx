import React from 'react';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Spacing } from '../../components/spacings/Spacing';
import { ADMIN_NAV } from '../../data/constants/AdminConstants';

const _AdminPage = () => {
  return (
    <LayoutAdmin id="PageAdmin" sidebar={ADMIN_NAV}>
      <Spacing margin="double" />
    </LayoutAdmin>
  );
};

const AdminPage = React.memo(_AdminPage);

export { AdminPage };
