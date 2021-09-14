/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';

import { useAmGroupsForOrgPLazyQuery } from '../../../../data/services/graphql';
import { StyledColumn } from './AccessManagementGroupsPage.styles';

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

  return [createColumn({ name: 'Name', key: 'name' }), createColumn({ name: 'Template', key: 'tmpl' })];
};

const onRenderItemColumn = (item, column) => {
  if (column.key === 'tmpl') return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;

  return item[column.key];
};

const _AccessManagementGroupsPage = () => {
  const { orgSid } = useOrgSid();
  const [groups, setGroups] = useState([]);
  const columns = generateColumns();

  const [apiAmGroupsForOrg, { data, loading }] = useAmGroupsForOrgPLazyQuery();

  useEffect(() => {
    apiAmGroupsForOrg({ variables: { orgSid } });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setGroups(data.amGroupsForOrg.nodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const renderList = () => {
    return groups.length > 0 ? (
      <DetailsList
        items={groups}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
    ) : (
      <MessageBar>No groups added</MessageBar>
    );
  };

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_GROUPS">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row>
              <Column lg="4">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Groups</Text>
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
                    <Spinner size="lg" label="Loading groups" />
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

const AccessManagementGroupsPage = React.memo(_AccessManagementGroupsPage);

export { AccessManagementGroupsPage };
