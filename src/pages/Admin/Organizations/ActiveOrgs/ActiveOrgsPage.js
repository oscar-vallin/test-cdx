/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { Link } from 'react-router-dom';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';

import { useDirectOrganizationsFLazyQuery } from '../../../../data/services/graphql';
import { StyledColumn } from './ActiveOrgsPage.styles';
import { useActiveDomainStore } from '../../../../store/ActiveDomainStore';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';

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
  const ActiveDomainStore = useActiveDomainStore();
  const [orgs, setOrgs] = useState([]);
  const columns = generateColumns();

  const [directOrganizationsFQuery, { data, loading }] = useQueryHandler(useDirectOrganizationsFLazyQuery);

  useEffect(() => {
    directOrganizationsFQuery({
      variables: {
        orgSid: ActiveDomainStore.domainOrg.current.orgSid,
        orgFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

  const changeActiveOrg = ({ id, orgType }) => {
    directOrganizationsFQuery({
      variables: {
        orgSid: id,
        orgFilter: { activeFilter: 'ACTIVE' },
      },
    });

    ActiveDomainStore.setCurrentOrg({
      orgSid: id,
      destination: orgType === 'INTEGRATION_SPONSOR' ? 'FILE_STATUS' : 'CURRENT_ACTIVITY',
    });
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

  const renderList = () => {
    return orgs.length > 0 ? (
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
    );
  };

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
                  renderList()
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

const ActiveOrgsPage = memo(_ActiveOrgsPage);

export { ActiveOrgsPage };
