import { memo } from 'react';
// import { useHistory } from 'react-router-dom';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Spacing } from '../../components/spacings/Spacing';

const _AdminPage = () => {
  // const history = useHistory();

  return (
    <LayoutAdmin id="PageAdmin">
      <Spacing margin="double" />
    </LayoutAdmin>
  );
};

const AdminPage = memo(_AdminPage);

export { AdminPage };
export default AdminPage;
