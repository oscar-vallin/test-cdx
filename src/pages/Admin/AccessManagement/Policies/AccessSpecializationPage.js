/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { EmptyState } from 'src/containers/states';
import { SpinnerSize } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography';
import { CreateAccessSpecializationPanel } from './CreateSpecialization';

import {
  useAccessSpecializationsForOrgLazyQuery,
  useDeleteAccessSpecializationMutation,
} from '../../../../data/services/graphql';

import { StyledColumn, StyledCommandButton } from './AccessManagementPoliciesPage.styles';
import { useOrgSid } from '../../../../hooks/useOrgSid';
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

  return [createColumn({ name: 'Name', key: 'name' }), createColumn({ name: '', key: 'actions' })];
};

const _AccessManagementSpecializationPage = () => {
  const { orgSid } = useOrgSid();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedAccessId, setSelectedAccessId] = useState(0);

  const [specializations, setSpecializations] = useState([]);
  const [accessSpecializationForOrg, { data, loading }] = useQueryHandler(useAccessSpecializationsForOrgLazyQuery);
  const [removeSpecialization, { data: removeResponse, loading: isRemovingSpecialization }] = useQueryHandler(
    useDeleteAccessSpecializationMutation
  );

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedAccessId(0);
  };

  const onRenderItemColumn = (item, index, column) => {
    switch (column.key) {
      case 'actions':
        return (
          <>
            &nbsp;
            <StyledCommandButton
              iconProps={{ iconName: 'Delete' }}
              onClick={() => {
                setSelectedAccessId(item.sid);
                setIsConfirmationHidden(false);
              }}
            />
          </>
        );
      default:
        return item[column.key];
    }
  };

  useEffect(() => {
    accessSpecializationForOrg({
      variables: {
        orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!isRemovingSpecialization && removeResponse) {
      setSpecializations(specializations.filter(({ sid }) => sid !== selectedAccessId));
    }
  }, [isRemovingSpecialization, removeResponse]);

  useEffect(() => {
    if (data) {
      setSpecializations(data.accessSpecializationsForOrg.nodes);
    }
  }, [data]);

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_SPECIALIZATION">
      <Spacing margin="double">
        {specializations.length > 0 && (
          <Row center>
            <Column lg="6">
              <Spacing margin={{ top: 'small' }}>
                <Text variant="bold">Access Specializations</Text>
              </Spacing>
            </Column>

            <Column lg="6" right>
              <Button
                variant="primary"
                onClick={() => {
                  setIsPanelOpen(true);
                }}
              >
                Create specialization
              </Button>
            </Column>
          </Row>
        )}

        {specializations.length > 0 && (
          <Row>
            <Column lg="12">
              <Spacing margin={{ top: 'normal' }}>
                <Separator />
              </Spacing>
            </Column>
          </Row>
        )}

        <Row>
          <StyledColumn lg="12">
            {loading ? (
              <Spacing margin={{ top: 'double' }}>
                <Spinner size={SpinnerSize.large} label="Loading access specializations" />
              </Spacing>
            ) : !specializations.length ? (
              <EmptyState
                title="No access specializations found"
                description="You haven't created an access specialization yet. Click the button below to create a new specialization."
                actions={
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsPanelOpen(true);
                    }}
                  >
                    Create specialization
                  </Button>
                }
              />
            ) : (
              <DetailsList
                items={specializations}
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

      <CreateAccessSpecializationPanel
        isOpen={isPanelOpen}
        onCreateSpecialization={({ name, sid }) => {
          setSpecializations([
            ...specializations,
            {
              name: name?.value || '',
              sid: sid || null,
            },
          ]);
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
          setSelectedAccessId(0);
        }}
        selectedAccessId={selectedAccessId}
      />

      <Dialog
        hidden={isConfirmationHidden}
        onDismiss={hideConfirmation}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Remove policy',
          subText: `Do you really want to remove "${
            specializations.find(({ sid }) => selectedAccessId === sid)?.name || ''
          }"?`,
        }}
        modalProps={{ isBlocking: true, isDraggable: false }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              removeSpecialization({
                variables: {
                  specializationSid: selectedAccessId,
                },
              });

              setIsConfirmationHidden(true);
            }}
            text="Remove"
          />
          <DefaultButton onClick={hideConfirmation} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </LayoutAdmin>
  );
};

const AccessManagementSpecializationPage = memo(_AccessManagementSpecializationPage);

export { AccessManagementSpecializationPage };