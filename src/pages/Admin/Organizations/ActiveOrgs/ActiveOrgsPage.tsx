/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { DetailsList, DetailsListLayoutMode, SelectionMode, Spinner, SpinnerSize } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';

import { useDirectOrganizationsLazyQuery } from 'src/data/services/graphql';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { StyledColumn } from './ActiveOrgsPage.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';

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

const ActiveOrgsPage = () => {
  const { orgSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
  const [orgs, setOrgs] = useState([]);
  const columns = generateColumns();

  const [directOrganizationsFQuery, { data, loading }] = useQueryHandler(useDirectOrganizationsLazyQuery);

  useEffect(() => {
    directOrganizationsFQuery({
      variables: {
        orgSid: orgSid,
        orgFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [orgSid]);

  const changeActiveOrg = ({ sid, orgType }) => {
    ActiveDomainStore.setCurrentOrg({
      orgSid: sid,
      destination: orgType === 'INTEGRATION_SPONSOR' ? 'FILE_STATUS' : 'CURRENT_ACTIVITY',
    });
  };

  const onRenderItemColumn = (item, index, column) => {
    if (column.key === 'name') {
      return (
        <Link
          id={`__ActiveOrg__Name_Field_${index + 1}`}
          className={item.orgId}
          to={`/admin/organizations/active-orgs?orgSid=${item.sid}`}
          onClick={() => changeActiveOrg(item)}
        >
          {item[column.key]}
        </Link>
      );
    }
    return item[column.key];
  };

  useEffect(() => {
    if (!loading && data) {
      setOrgs(data.directOrganizations.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageActiveOrgs" sidebarOptionSelected="ACTIVE_ORGS">
      <Spacing margin="double">
        {orgs.length > 0 && (
          <Row>
            <Column lg="4">
              <Spacing margin={{ top: 'small' }}>
                <Text id="__Page-Title" variant="bold">
                  Active orgs
                </Text>
              </Spacing>
            </Column>
          </Row>
        )}

        {orgs.length > 0 && (
          <Row>
            <Column lg="12">
              <Spacing margin={{ top: 'normal' }}>
                <Separator />
              </Spacing>
            </Column>
          </Row>
        )}

        <Row>
          <StyledColumn>
            {loading ? (
              <Spacing margin={{ top: 'double' }}>
                <Spinner size={SpinnerSize.large} label="Loading active orgs" />
              </Spacing>
            ) : !orgs.length ? (
              <EmptyState description="No active orgs found" />
            ) : (
              <DetailsList
                items={orgs}
                selectionMode={SelectionMode.none}
                columns={columns}
                layoutMode={DetailsListLayoutMode.justified}
                onRenderItemColumn={onRenderItemColumn}
                isHeaderVisible
              />
            )}
          </StyledColumn>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

export { ActiveOrgsPage };
