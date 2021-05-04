import React, { useState, useEffect }  from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
// import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';

import { useDirectOrganizationsFQuery } from '../../../../data/services/graphql';
import { ADMIN_NAV } from '../../../../data/constants/AdminConstants';

const generateColumns = () => {
  const createColumn = ({ name, key }) => ({
    name,
    key,
    fieldName: key,
    data: 'string',
    isPadded: true,
    minWidth: 225,
  });

  return [
    createColumn({ name: 'ID', key: 'id' }),
    createColumn({ name: 'Name', key: 'name' }),
    createColumn({ name: 'Org ID', key: 'orgId' }),
    createColumn({ name: 'Org Type', key: 'orgType' }),
  ];
};

const onRenderItemColumn = (item, index, column) => {
  switch (column.key) {
    case 'tmpl':
      return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;
    default:
      return item[column.key];
  }
};

const _ActiveOrgsPage = () => {
  const [orgs, setOrgs] = useState([]);
  const columns = generateColumns();

  const { data, loading } = useDirectOrganizationsFQuery({
    variables: {
      orgSid: 1,
      orgFilter: { activeFilter: 'ACTIVE' },
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setOrgs(data.directOrganizations.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageActiveOrgs" sidebar={ADMIN_NAV} sidebarOptionSelected="activeOrgs">
      <Spacing margin="double">Active Orgs</Spacing>
    </LayoutAdmin>
  );
};

const ActiveOrgsPage = React.memo(_ActiveOrgsPage);

export { ActiveOrgsPage };
