/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

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
  AccessSpecialization,
  CdxWebCommandType,
  Maybe,
  useAccessSpecializationsForOrgLazyQuery,
  useDeleteAccessSpecializationMutation,
  WebCommand,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { AccessSpecializationPanel } from './AccessSpecializationPanel';
import { StyledColumn, StyledCommandButton } from '../AccessManagement.styles';
import { Spacing } from '../../../../components/spacings/Spacing';
import { ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ErrorHandler } from 'src/utils/ErrorHandler';

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

const AccessManagementSpecializationPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedAccessId, setSelectedAccessId] = useState<string | null>();

  const [specializations, setSpecializations] = useState<Maybe<AccessSpecialization>[] | null>();
  const [accessSpecializationForOrg, { data, loading, error }] = useAccessSpecializationsForOrgLazyQuery();
  const [removeSpecialization, { data: removeResponse, loading: isRemovingSpecialization }] = useQueryHandler(
    useDeleteAccessSpecializationMutation
  );

  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();

  const handleError = ErrorHandler();

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedAccessId(null);
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
        if (deleteCmd) {
          return (
            <StyledCommandButton
              id={`DeleteBtn__${index + 1}`}
              title={deleteCmd.label ?? undefined}
              ariaLabel={deleteCmd.label ?? undefined}
              iconProps={{ iconName: 'Delete' }}
              onClick={() => {
                setSelectedAccessId(item.sid);
                setIsConfirmationHidden(false);
              }}
            />
          );
        }
        return <span />;
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
    if (error) {
      handleError(error);
    }
  }, [error]);

  useEffect(() => {
    if (!isRemovingSpecialization && removeResponse) {
      const name = specializations?.find((spec) => selectedAccessId === spec?.sid)?.name || '';

      Toast.success({ text: `Access specialization "${name}" deleted successfully` });

      setSpecializations(specializations?.filter((spec) => spec?.sid !== selectedAccessId));
      setSelectedAccessId(null);
    }
  }, [isRemovingSpecialization, removeResponse]);

  useEffect(() => {
    if (data) {
      setSpecializations(data?.accessSpecializationsForOrg?.nodes);
      const createCmd = data?.accessSpecializationsForOrg?.listPageInfo?.pageCommands?.find(
        (cmd) => cmd?.commandType === CdxWebCommandType.Create
      );
      setCreateCmd(createCmd);
      const deleteCmd = data?.accessSpecializationsForOrg?.listPageInfo?.listItemCommands?.find(
        (cmd) => cmd?.commandType === CdxWebCommandType.Delete
      );
      setDeleteCmd(deleteCmd);
    }
  }, [data]);

  const renderCreateButton = () => {
    if (createCmd) {
      return (
        <Button
          id="create-access-specialization"
          variant="primary"
          aria-label={createCmd.label}
          onClick={() => {
            setIsPanelOpen(true);
            return null;
          }}
        >
          {createCmd.label}
        </Button>
      );
    }
  };

  const renderBody = () => {
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading access specializations" />
        </Spacing>
      );
    }

    if (!specializations?.length) {
      const emptyText = createCmd
        ? 'There are no Access Specializations configured in this Organization. Click the button below to create a new specialization.'
        : 'There are no Access Specializations configured in this Organization.';
      return (
        <EmptyState title="No access specializations found" description={emptyText} actions={renderCreateButton()} />
      );
    }

    return (
      <DetailsList
        items={specializations}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
    );
  };

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION.API_ID}>
      {(specializations?.length ?? 0) > 0 && (
        <PageHeader id="__AccessSpecHeader">
          <Container>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle id="__Page_Title" title="Access Specializations" />
              </Column>
              <Column lg="6" right>
                {renderCreateButton()}
              </Column>
            </Row>
          </Container>
        </PageHeader>
      )}
      <Container>
        <Row>
          <StyledColumn lg="12">{renderBody()}</StyledColumn>
        </Row>
      </Container>
      <AccessSpecializationPanel
        isOpen={isPanelOpen}
        onCreateSpecialization={() => {
          fetchData();
        }}
        onUpdateSpecialization={() => {
          fetchData();
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
          setSelectedAccessId(null);
        }}
        selectedAccessId={selectedAccessId}
      />

      <Dialog
        hidden={isConfirmationHidden}
        onDismiss={hideConfirmation}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Are you sure?',
          subText: `Do you really want to delete this Specialization "${
            specializations?.find((spec) => selectedAccessId === spec?.sid)?.name || ''
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

export { AccessManagementSpecializationPage };
