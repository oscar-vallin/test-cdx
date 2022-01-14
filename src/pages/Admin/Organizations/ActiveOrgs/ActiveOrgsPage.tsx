/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Spinner, SpinnerSize } from '@fluentui/react';
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

const columns: IColumn[] = [
  {
    name: 'Name',
    key: 'name',
    fieldName: 'name',
    data: 'string',
    isPadded: true,
    minWidth: 50,
    maxWidth: 600,
  },
  {
    name: 'Org ID',
    key: 'orgId',
    fieldName: 'orgId',
    data: 'string',
    isPadded: true,
    minWidth: 50,
    maxWidth: 400,
  },
  {
    name: 'Org Type',
    key: 'orgType',
    fieldName: 'orgType',
    data: 'string',
    isPadded: true,
    minWidth: 50,
    maxWidth: 400,
  }
];

const ActiveOrgsPage = () => {
  const { orgSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
  const [orgs, setOrgs] = useState([]);

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
      destination: orgType === 'INTEGRATION_SPONSOR' ? 'FILE_STATUS' : 'ORG_ACTIVITY',
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

  const renderBody = () => {
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading active orgs" />
        </Spacing>
      );
    } else if (!orgs.length) {
      return <EmptyState description="No active orgs found" />;
    } else {
      return (
        <DetailsList
          items={orgs}
          selectionMode={SelectionMode.none}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          onRenderItemColumn={onRenderItemColumn}
          isHeaderVisible
        />
      );
    }
  };

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
            {renderBody()}
          </StyledColumn>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

export { ActiveOrgsPage };
