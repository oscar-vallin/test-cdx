/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  CSSProperties,
} from 'react';

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
  IColumn,
} from '@fluentui/react';
import { People20Filled, PeopleAudience20Filled } from '@fluentui/react-icons';
import { ThemeStore } from 'src/store/ThemeStore';
import { EmptyState } from 'src/containers/states';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
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
import { HideForMobile } from 'src/styles/GlobalStyles';
import {
  AccessSpecializationPanel,
  AccessSpecializationMembersPanel,
  AccessSpecializationUsagePanel,
} from './AccessSpecializationPanel';
import { StyledCommandButton } from '../AccessManagement.styles';

const generateColumns = (): IColumn[] => {
  return [
    {
      name: 'Name',
      fieldName: 'name',
      key: 'name',
      data: 'string',
      minWidth: 100,
      maxWidth: 500,
      isPadded: true,
      flexGrow: 1,
    },
    {
      name: '',
      fieldName: 'members',
      key: 'members',
      data: 'string',
      minWidth: 90,
      maxWidth: 90,
      isPadded: false,
    },
    {
      name: '',
      fieldName: 'groupUsages',
      key: 'groupUsages',
      data: 'string',
      minWidth: 90,
      maxWidth: 90,
      isPadded: false,
    },
    {
      name: '',
      fieldName: 'actions',
      key: 'actions',
      data: 'string',
      minWidth: 50,
      isPadded: false,
      flexGrow: 2,
    },
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
    let tooltip: string;
    let style: CSSProperties;
    const memberCount = item?.members ?? 0;
    const groupCount = item?.groupUsages ?? 0;

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
        if (memberCount === 0) {
          tooltip = '0 Users are assigned to this specialization';
          style = {
            color: ThemeStore.userTheme.colors.neutralTertiary,
          };
        } else {
          if (memberCount === 1) {
            tooltip = '1 User is assigned to this specialization';
          } else {
            tooltip = `${memberCount} Users are assigned to this specialization`;
          }
          style = {
            color: ThemeStore.userTheme.colors.themePrimary,
            cursor: 'pointer',
          };
        }
        return (
          <TooltipHost content={tooltip}>
            <People20Filled
              id={`__${item?.name?.split(' ').join('_')}_Members`}
              style={style}
              onClick={() => {
                if (memberCount > 0) {
                  setSelectedAccessId(item.sid);
                  setCurrentName(item?.name ?? '');
                  setIsPanelMembersOpen(true);
                }
              }}
            />
            <span style={{ position: 'relative', bottom: '4px' }}>&nbsp;( {item?.members} )</span>
          </TooltipHost>
        );
      case 'groupUsages':
        if (groupCount === 0) {
          tooltip = 'This specialization is not used in any Access Policy Groups';
          style = {
            color: ThemeStore.userTheme.colors.neutralTertiary,
          };
        } else {
          if (groupCount === 1) {
            tooltip = 'This specialization is used in 1 Access Policy Group';
          } else {
            tooltip = `This specialization is used in ${item?.groupUsages} Access Policy Groups`;
          }
          style = {
            color: ThemeStore.userTheme.colors.themePrimary,
            cursor: 'pointer',
          };
        }
        return (
          <TooltipHost content={tooltip}>
            <PeopleAudience20Filled
              id={`__${item?.name?.split(' ').join('_')}_Usages`}
              style={style}
              onClick={() => {
                if (groupCount > 0) {
                  setSelectedAccessId(item.sid);
                  setCurrentName(item?.name ?? '');
                  setIsPanelUsageOpen(true);
                }
              }}
            />
            <span style={{ position: 'relative', bottom: '6px' }}>&nbsp;( {item?.groupUsages} )</span>
          </TooltipHost>
        );
      case 'actions':
        if (deleteCmd) {
          return (
            <Column right>
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
            </Column>
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
        <PrimaryButton
          id="create-access-specialization"
          iconProps={{ iconName: 'Add' }}
          aria-label={createCmd.label ?? undefined}
          title={createCmd.label ?? undefined}
          onClick={() => {
            setIsPanelOpen(true);
          }}
        >
          <HideForMobile>{createCmd.label}</HideForMobile>
        </PrimaryButton>
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
              <Column lg="6" sm="8" direction="row">
                <PageTitle id="__Page_Title" title="Access Specializations" />
              </Column>
              <Column lg="6" sm="4" right>
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
