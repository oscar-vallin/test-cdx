import React from 'react';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Spacing } from '../../components/spacings/Spacing';

const _AdminPage = () => {
  return (
    <LayoutAdmin id="PageAdmin">
      <Spacing margin="double" />
    </LayoutAdmin>
  );
};

const AdminPage = React.memo(_AdminPage);

export { AdminPage };
