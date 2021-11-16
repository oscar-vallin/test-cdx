/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { Link } from 'react-router-dom';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { SpinnerSize } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Text } from '../../../../components/typography';
import { Separator } from '../../../../components/separators/Separator';
import { TagPicker } from '../../../../components/pickers/TagPicker';

import { useDirectOrganizationsLazyQuery } from '../../../../data/services/graphql';
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
  const [asd, setAsd] = useState([]);
  const columns = generateColumns();

  const [directOrganizationsFQuery, { data, loading }] = useQueryHandler(useDirectOrganizationsLazyQuery);

  useEffect(() => {
    directOrganizationsFQuery({
      variables: {
        orgSid: ActiveDomainStore.domainOrg.current.orgSid,
        orgFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

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

const ActiveOrgsPage = memo(_ActiveOrgsPage);

export { ActiveOrgsPage };
