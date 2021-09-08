import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { URL_ROUTES } from '../../../../data/constants/RouteConstants';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';

import { useDirectOrganizationsFLazyQuery } from '../../../../data/services/graphql';
import { StyledColumn } from './ActiveOrgsPage.styles';
import { useOrgSid } from '../../../../hooks/useOrgSid';

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
    createColumn({ name: 'Name', key: 'name' }),
    createColumn({ name: 'Org ID', key: 'orgId' }),
    createColumn({ name: 'Org Type', key: 'orgType' }),
  ];
};

const _ActiveOrgsPage = () => {
  const { orgSid, setOrgSid, setUrlParams } = useOrgSid();
  const [orgs, setOrgs] = useState([]);
  const columns = generateColumns();
  const history = useHistory();

  const [directOrganizationsFQuery, { data, loading }] = useDirectOrganizationsFLazyQuery();

  useEffect(() => {
    directOrganizationsFQuery({
      variables: {
        orgSid: orgSid,
        orgFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [orgSid]);

  const changeActiveOrg = async ({ id, name, orgType }) => {
    directOrganizationsFQuery({
      variables: {
        orgSid: id,
        orgFilter: { activeFilter: 'ACTIVE' },
      },
    });

    await setOrgSid(id);
    await setUrlParams({ orgSid: id });

    const destination = orgType === 'INTEGRATION_SPONSOR' ? URL_ROUTES.FILE_STATUS : URL_ROUTES.CURRENT_ACTIVITY;

    history.replace(destination);
  };

  const onRenderItemColumn = (item, index, column) => {
    switch (column.key) {
      case 'name':
        return (
          <Link to={`/admin/organizations/active-orgs?orgSid=${item.id}`} onClick={() => changeActiveOrg(item)}>
            {item[column.key]}
          </Link>
        );
      default:
        return item[column.key];
    }
  };

  useEffect(() => {
    if (!loading && data) {
      setOrgs(data.directOrganizations.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageActiveOrgs" sidebarOptionSelected="ACTIVE_ORGS">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row>
              <Column lg="4">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Active orgs</Text>
                </Spacing>
              </Column>
            </Row>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <Row>
              <StyledColumn>
                {!loading ? (
                  orgs.length > 0 ? (
                    <DetailsList
                      items={orgs}
                      selectionMode={SelectionMode.none}
                      columns={columns}
                      layoutMode={DetailsListLayoutMode.justified}
                      onRenderItemColumn={onRenderItemColumn}
                      isHeaderVisible
                    />
                  ) : (
                    <MessageBar>No active orgs</MessageBar>
                  )
                ) : (
                  <Spacing margin={{ top: 'double' }}>
                    <Spinner size="lg" label="Loading active orgs" />
                  </Spacing>
                )}
              </StyledColumn>
            </Row>
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const ActiveOrgsPage = React.memo(_ActiveOrgsPage);

export { ActiveOrgsPage };
