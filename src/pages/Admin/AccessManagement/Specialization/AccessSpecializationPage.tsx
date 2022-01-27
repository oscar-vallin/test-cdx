/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';

import {
  PrimaryButton,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Dialog,
  DialogType,
  DialogFooter,
  Spinner,
  SpinnerSize,
  Link,
} from '@fluentui/react';

import { EmptyState } from 'src/containers/states';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';

import {
  useAccessSpecializationsForOrgLazyQuery,
  useDeleteAccessSpecializationMutation,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { CreateAccessSpecializationPanel } from './CreateSpecialization';
import { StyledColumn, StyledCommandButton } from '../AccessManagement.styles';
import { Spacing } from '../../../../components/spacings/Spacing';
import { ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

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
  const Toast = useNotification();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedAccessId, setSelectedAccessId] = useState(0);

  const [specializations, setSpecializations] = useState<any[]>([]);
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
      case 'name':
        return (
          <Link
            id={`__AccessSpecialization__Name_Field_${index + 1}`}
            onClick={() => {
              setSelectedAccessId(item.sid);
              setIsPanelOpen(true);
            }}
          >
            {item.name}
          </Link>
        );
      case 'actions':
        return (
          <>
            &nbsp;
            <StyledCommandButton
              id={`DeleteBtn__${index + 1}`}
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

  const fetchData = () => {
    accessSpecializationForOrg({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [orgSid]);

  useEffect(() => {
    if (!isRemovingSpecialization && removeResponse) {
      const name = specializations.find(({ sid }) => selectedAccessId === sid)?.name || '';

      Toast.success({ text: `Access specialization "${name}" deleted successfully` });

      setSpecializations(specializations.filter(({ sid }) => sid !== selectedAccessId));
      setSelectedAccessId(0);
    }
  }, [isRemovingSpecialization, removeResponse]);

  useEffect(() => {
    if (data) {
      setSpecializations(data.accessSpecializationsForOrg.nodes);
    }
  }, [data]);

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION.API_ID}>
      {specializations.length > 0 && (
        <PageHeader id="__AccessSpecHeader">
          <Container>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle id="__Page_Title" title="Access Specializations" />
              </Column>
              <Column lg="6" right>
                <Button
                  id="create-access-specialization"
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                    return null;
                  }}>
                  Create specialization
                </Button>
              </Column>
            </Row>
          </Container>
        </PageHeader>
      )}
      <Container>
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
                    id="create-access-specialization"
                    variant="primary"
                    onClick={() => {
                      setIsPanelOpen(true);
                      return null;
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
      </Container>
      <CreateAccessSpecializationPanel
        isOpen={isPanelOpen}
        onCreateSpecialization={() => {
          fetchData();
        }}
        onUpdateSpecialization={() => {
          fetchData();
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
          title: 'Are you sure?',
          subText: `Do you really want to delete this Specialization?"${
            specializations.find(({ sid }) => selectedAccessId === sid)?.name || ''
          }"?`,
        }}
        modalProps={{ isBlocking: true }}
      >
        <DialogFooter>
          <PrimaryButton
            id="ConfirmationBtn"
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
    </LayoutDashboard>
  );
};

const AccessManagementSpecializationPage = memo(_AccessManagementSpecializationPage);

export { AccessManagementSpecializationPage };
