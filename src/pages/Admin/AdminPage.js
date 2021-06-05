import React from 'react';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Spacing } from '../../components/spacings/Spacing';
import { useHistory } from 'react-router-dom';

const _AdminPage = () => {
  const history = useHistory();

  return (
    <LayoutAdmin id="PageAdmin" onRender={(route) => history.replace(route)}>
      <Spacing margin="double" />
    </LayoutAdmin>
  );
};

const AdminPage = React.memo(_AdminPage);

export { AdminPage };
