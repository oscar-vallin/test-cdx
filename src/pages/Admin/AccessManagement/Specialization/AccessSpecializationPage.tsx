/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import {
  PrimaryButton,
  DefaultButton,
  DetailsListLayoutMode,
  SelectionMode,
  Dialog,
  DialogType,
  DialogFooter,
  Spinner,
  SpinnerSize,
  Link,
  DetailsList,
  TooltipHost,
} from '@fluentui/react';
import { People20Filled, PeopleAudience20Filled } from '@fluentui/react-icons';
import { ThemeStore } from 'src/store/ThemeStore';
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
import { Spacing } from 'src/components/spacings/Spacing';
import { ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { PageBody } from 'src/components/layouts/Column';
import {
  AccessSpecializationPanel,
  AccessSpecializationMembersPanel,
  AccessSpecializationUsagePanel,
} from './AccessSpecializationPanel';
import { StyledCommandButton } from '../AccessManagement.styles';

const generateColumns = () => {
  const createColumn = ({ name, key, minWidth }) => ({
    name,
    key,
    fieldName: key,
    data: 'string',
    isPadded: true,
    minWidth,
  });

  return [
    createColumn({ name: 'Name', key: 'name', minWidth: 100 }),
    createColumn({ name: '', key: 'members', minWidth: 110 }),
    createColumn({ name: '', key: 'groupUsages', minWidth: 250 }),
    createColumn({ name: '', key: 'actions', minWidth: 225 }),
  ];
};

const AccessManagementSpecializationPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedAccessId, setSelectedAccessId] = useState<string | null>();
  const [isPanelMembersOpen, setIsPanelMembersOpen] = useState(false);
  const [isPanelUsageOpen, setIsPanelUsageOpen] = useState(false);
  const [currentName, setCurrentName] = useState('');

  const [specializations, setSpecializations] = useState<Maybe<AccessSpecialization>[] | null>();
  const [
    accessSpecializationForOrg,
    { data, loading, error },
  ] = useAccessSpecializationsForOrgLazyQuery();
  const [
    removeSpecialization,
    { data: removeResponse, loading: isRemovingSpecialization },
  ] = useQueryHandler(useDeleteAccessSpecializationMutation);

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
            id={`__${item?.name?.split(' ').join('_')}_Link`}
            onClick={() => {
              setSelectedAccessId(item.sid);
              setIsPanelOpen(true);
            }}
          >
            {item.name}
          </Link>
        );
      case 'members':
        return (
          <TooltipHost content={`${item?.members} Users are assigned to this specialization`}>
            <People20Filled
              id={`__${item?.name?.split(' ').join('_')}_Members`}
              style={{ color: ThemeStore.userTheme.colors.themePrimary, cursor: 'pointer' }}
              onClick={() => {
                setSelectedAccessId(item.sid);
                setCurrentName(item?.name ?? '');
                setIsPanelMembersOpen(true);
              }}
            />
            <span style={{ position: 'relative', bottom: '4px' }}>&nbsp;( {item?.members} )</span>
          </TooltipHost>
        );
      case 'groupUsages':
        return (
          <TooltipHost content={`This specialization is used in  ${item?.groupUsages} Access Policy Group(s)`}>
            <PeopleAudience20Filled
              id={`__${item?.name?.split(' ').join('_')}_Usages`}
              style={{ color: ThemeStore.userTheme.colors.themePrimary, cursor: 'pointer' }}
              onClick={() => {
                setSelectedAccessId(item.sid);
                setCurrentName(item?.name ?? '');
                setIsPanelUsageOpen(true);
              }}
            />
            <span style={{ position: 'relative', bottom: '6px' }}>&nbsp;( {item?.groupUsages} )</span>
          </TooltipHost>
        );
      case 'actions':
        if (deleteCmd) {
          return (
            <StyledCommandButton
              id={`__${item?.name?.split(' ').join('_')}_Delete`}
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
      const _createCmd = data?.accessSpecializationsForOrg?.listPageInfo?.pageCommands?.find(
        (cmd) => cmd?.commandType === CdxWebCommandType.Create,
      );
      setCreateCmd(_createCmd);
      const _deleteCmd = data?.accessSpecializationsForOrg?.listPageInfo?.listItemCommands?.find(
        (cmd) => cmd?.commandType === CdxWebCommandType.Delete,
      );
      setDeleteCmd(_deleteCmd);
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
          }}
        >
          {createCmd.label}
        </Button>
      );
    }
    return null;
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
      <PageBody id="__AccessSpecBody">
        <Container>
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>

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

      <AccessSpecializationMembersPanel
        isOpen={isPanelMembersOpen}
        closePanel={setIsPanelMembersOpen}
        selectedAccessId={selectedAccessId ?? ''}
        currentName={currentName}
      />

      <AccessSpecializationUsagePanel
        isOpen={isPanelUsageOpen}
        closePanel={setIsPanelUsageOpen}
        selectedAccessId={selectedAccessId ?? ''}
        currentName={currentName}
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
