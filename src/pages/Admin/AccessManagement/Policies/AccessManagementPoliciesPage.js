import React, { useState, useEffect } from 'react';

import { MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography/Text';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

import { CreatePoliciesPanel } from './CreatePolicy';

import { useAuthContext } from '../../../../contexts/AuthContext';
import { useAmPoliciesForOrgPLazyQuery } from '../../../../data/services/graphql';

import { StyledColumn } from './AccessManagementPoliciesPage.styles';

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
    createColumn({ name: 'Template', key: 'tmpl' }),
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

const _AccessManagementPoliciesPage = () => {
  const columns = generateColumns();
  const { token } = useAuthContext();
  const { orgId } = JSON.parse(token.AUTH_DATA); 
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [policies, setPolicies] = useState([]);
  const [amPoliciesForOrg, { data, loading }] = useAmPoliciesForOrgPLazyQuery();
  
  useEffect(() => {
    amPoliciesForOrg({
      variables: {
        orgSid: orgId,
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      setPolicies(data.amPoliciesForOrg.nodes);
    }
  }, [data]);

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_POLICIES">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row center>
              <Column lg="4">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Policies</Text>
                </Spacing>
              </Column>

              <Column lg="8" right>
                <Button variant="primary" onClick={() => {
                  setIsPanelOpen(true);
                }}>
                  Create policy
                </Button>
              </Column>
            </Row>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <Row>
              <StyledColumn lg="12">
                {!loading ? (
                  policies.length ? (
                    <DetailsList
                      items={policies}
                      selectionMode={SelectionMode.none}
                      columns={columns}
                      layoutMode={DetailsListLayoutMode.justified}
                      onRenderItemColumn={onRenderItemColumn}
                      isHeaderVisible
                    />
                  ) : (
                    <MessageBar>No policies found</MessageBar>
                  )
                ) : (
                  (
                    <Spacing margin={{ top: 'double' }}>
                      <Spinner size="lg" label="Loading policies"/>
                    </Spacing>
                  )
                )}
              </StyledColumn>
            </Row>
          </Column>
        </Row>
      </Spacing>

      <CreatePoliciesPanel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
      />
    </LayoutAdmin>
  );
};

const AccessManagementPoliciesPage = React.memo(_AccessManagementPoliciesPage);

export { AccessManagementPoliciesPage };
