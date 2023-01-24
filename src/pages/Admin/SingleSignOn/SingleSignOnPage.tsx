import React, { CSSProperties, useEffect, useState } from 'react';
import {
  useIdentityProvidersForOrgLazyQuery,
  useDeleteIdentityProviderMutation,
  useDisablePasswordLoginMutation,
  useEnablePasswordLoginMutation,
  IdentityProvider,
  CdxWebCommandType,
  WebCommand,
  GqOperationResponse,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { useThemeStore } from 'src/store/ThemeStore';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_SSO_CONFIG } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  IColumn, IconButton, PrimaryButton, SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { People20Filled } from '@fluentui/react-icons';
import { EmptyState } from 'src/containers/states';
import { ButtonLink } from 'src/components/buttons';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { SingleSignOnPanel } from './SingleSignOnPanel';
import { ConnectionInformationPanel } from './ConnectionInformationPanel';

const defaultDialogProps: DialogYesNoProps = {
  id: '__DiagramStep_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

export const SingleSignOnPage = () => {
  const { orgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const ActiveDomainStore = useActiveDomainStore();
  const Toast = useNotification();
  const [nodes, setNodes] = useState<IdentityProvider[] | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [refreshSinglePage, setRefreshSinglePage] = useState(false);
  const [identityProviderSid, setIdentityProviderSid] = useState<string | null>('');
  const [identityProviderName, setIdentityProviderName] = useState('');
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [showDialog, setShowDialog] = useState(false);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isOpenConnectionInfoPanel, setIsOpenConnectionInfo] = useState(false);
  const handleError = ErrorHandler();
  const [
    identityProvidersForOrg,
    {
      data: identityProvidersData,
      loading: isLoadingIdentityProviders,
      error: identityProvidersDataError,
    },
  ] = useIdentityProvidersForOrgLazyQuery();
  const [
    deleteIdentityProvider,
    {
      data: deletedIdentityProvider,
      loading: isLoadingDeleted,
    },
  ] = useDeleteIdentityProviderMutation();
  const [
    disablePasswordLogin,
    {
      data: disablePasswordLoginData,
      error: disablePasswordLoginError,
    },
  ] = useDisablePasswordLoginMutation();
  const [
    enablePasswordLogin,
    {
      data: enablePasswordLoginData,
      error: enablePasswordLoginError,
    },
  ] = useEnablePasswordLoginMutation();

  useEffect(() => {
    handleError(disablePasswordLoginError);
  }, [disablePasswordLoginError]);
  useEffect(() => {
    handleError(enablePasswordLoginError);
  }, [enablePasswordLoginError]);

  const fetchData = () => {
    identityProvidersForOrg({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    setRefreshSinglePage(false);
    fetchData();
  }, [refreshSinglePage]);

  useEffect(() => {
    if (!isLoadingIdentityProviders && identityProvidersData) {
      setNodes(identityProvidersData?.identityProvidersForOrg?.nodes);

      const pageCommands = identityProvidersData.identityProvidersForOrg.listPageInfo?.pageCommands;
      const _createCmd = pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
      const _updateCmd = pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
      setUpdateCmd(_updateCmd);
      setDisable(true);
      if (_updateCmd?.endPoint === 'enablePasswordLogin') {
        setDisable(false);
      }
    }
  }, [identityProvidersData, isLoadingIdentityProviders, identityProvidersDataError]);

  useEffect(() => {
    if (!isLoadingDeleted && deletedIdentityProvider) {
      setRefreshSinglePage(true);
      Toast.success({ text: `Identity Provider ${identityProviderName} has been deleted` });
    }
  }, [deletedIdentityProvider, isLoadingDeleted]);

  useEffect(() => {
    const response = disablePasswordLoginData?.disablePasswordLogin;

    if (disablePasswordLoginData) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Success) {
        setRefreshSinglePage(true);
        Toast.success({ text: `"Password based login has been disabled for ${ActiveDomainStore.domainOrg.current.orgId}` });
      }
    }
  }, [disablePasswordLoginData]);

  useEffect(() => {
    const response = enablePasswordLoginData?.enablePasswordLogin;

    if (enablePasswordLoginData) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Success) {
        setRefreshSinglePage(true);
        Toast.success({ text: `"Password based login has been enabled for ${ActiveDomainStore.domainOrg.current.orgId}` });
      }
    }
  }, [enablePasswordLoginData]);

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showDeleteIdentityProviderDialog = (sid: string, name: string) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Identity Provider?';
    updatedDialog.message = 'Are you sure you want to delete this Identity Provider';

    updatedDialog.onYes = () => {
      hideDialog();
      setIdentityProviderName(name);
      deleteIdentityProvider({
        variables: {
          sid,
        },
      });
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const renderDialogBody = () => {
    const org = ActiveDomainStore.domainOrg.current.orgId;
    let message = ` This will require all users of ${org} to login through Single Sign On.`;
    if (updateCmd?.endPoint === 'enablePasswordLogin') {
      message = 'This will allow users to be created or updated with the ability to login with a CDX managed password.';
    }

    return (
      <Spacing>
        <Text>Are you sure want to {disable ? 'disable' : 'enable'} Password based login for {org}?</Text>
        <Spacing margin={{ top: 'normal' }} />
        <Text>{message}</Text>
      </Spacing>
    )
  };

  const createIdenProviderButton = () => {
    if (createCmd) {
      return (
        <PrimaryButton
          id="__CreateIdentityProvidersButton"
          iconProps={{ iconName: 'Add' }}
          ariaLabel={createCmd.label ?? undefined}
          title={createCmd.label ?? undefined}
          onClick={() => {
            setIdentityProviderSid(null);
            setIsOpenPanel(true);
          }}
        >
          {createCmd.label}
        </PrimaryButton>
      );
    }
    return null;
  };

  const onRenderAction = (item:IdentityProvider) => {
    const pageCommands = item.commands;
    const deleteCmd = pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Delete)
    if (item?.sid && deleteCmd) {
      let disabled;
      if (typeof item.members === 'number') {
        disabled = item.members;
      }
      return (
        <IconButton
          iconProps={{ iconName: 'Trash' }}
          disabled={disabled > 0}
          onClick={() => {
            showDeleteIdentityProviderDialog(item?.sid, item.name ?? '');
          }}
        />
      );
    }
    return null;
  }

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 250,
      flexGrow: 1,
    },
    {
      name: 'Id',
      key: 'idpId',
      fieldName: 'idpId',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 250,
      flexGrow: 1,
    },
    {
      name: 'Type',
      key: 'type',
      fieldName: 'type',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 250,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'members',
      fieldName: 'members',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 250,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'connection',
      fieldName: 'connection',
      data: 'string',
      isPadded: true,
      minWidth: 250,
      maxWidth: 250,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      onRender: onRenderAction,
    },
  ];

  const onRenderItemColumn = (item?: IdentityProvider, index?: number, column?: IColumn) => {
    let tooltip: string;
    let style: CSSProperties;
    let columnVal: string | undefined;
    if (column?.key === 'name') {
      columnVal = item?.name ?? '';
    } else if (column?.key === 'idpId') {
      columnVal = item?.idpId ?? '';
    } else if (column?.key === 'type') {
      columnVal = item?.type ?? '';
    } else if (column?.key === 'connection') {
      columnVal = 'Connection Information'
    }

    if (column?.key === 'connection') {
      return (
        <ButtonLink
          underline
          id={`__identityProviderConnectionInfo${item?.idpId}`}
          onClick={() => {
            setIdentityProviderSid(item?.sid ?? '');
            setIsOpenConnectionInfo(true);
          }}
        >
          {columnVal}
        </ButtonLink>
      );
    }

    if (column?.key === 'members') {
      if (item?.members === 0) {
        tooltip = '0 Users are assigned to this IdP';
        style = {
          color: ThemeStore.userTheme.colors.neutralTertiary,
        };
      } else {
        if (item?.members === 1) {
          tooltip = '1 Users are assigned to this IdP';
        } else {
          tooltip = `${item?.members} Users are assigned to this IdP`;
        }
        style = {
          color: ThemeStore.userTheme.colors.themePrimary,
          cursor: 'pointer',
        };
      }
      return (
        <TooltipHost content={tooltip}>
          <People20Filled
            style={style}
          />
          <span style={{ position: 'relative', bottom: '4px' }}>&nbsp;( {item?.members} )</span>
        </TooltipHost>
      )
    }

    if (column?.key === 'name') {
      return (
        <>
          &nbsp;
          <ButtonLink
            id={`__identityProviderName${item?.idpId}`}
            onClick={() => {
              setIdentityProviderSid(item?.sid ?? '');
              setIsOpenPanel(true);
            }}
          >
            {columnVal}
          </ButtonLink>
        </>
      );
    }

    return <Text>{columnVal}</Text>;
  };

  const renderBody = () => {
    if (isLoadingIdentityProviders) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Single Sign on Page" />
        </Spacing>
      );
    }

    if (!nodes?.length) {
      return (
        <EmptyState
          title="No identity Providers found"
          description="There are no configured Identity Providers for this Organization"
        />
      )
    }

    return (
      <DetailsList
        items={nodes ?? []}
        columns={columns}
        onRenderItemColumn={onRenderItemColumn}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
      />
    );
  }

  return (
    <LayoutDashboard id="SingleSignOne" menuOptionSelected={ROUTE_SSO_CONFIG.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Single_Config" title="Single Sign On" />
            </Column>
            <Column sm="6" right>
              {createIdenProviderButton()}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>
            <Spacing margin={{ bottom: 'double' }}>{renderBody()}</Spacing>
          </Row>
        </Container>
        <Container>
          <Row>
            <Spacing margin={{ top: 'double' }}>
              {updateCmd && (
                <Stack>
                  <Text variant="semiBold">Password based login enabled</Text>
                  <Spacing padding={{ top: 'normal' }}>
                    <ButtonLink
                      underline
                      onClick={() => setShowDisableDialog(true)}
                    >
                      {updateCmd.label}
                    </ButtonLink>
                  </Spacing>
                </Stack>
              )}
            </Spacing>
          </Row>
        </Container>
      </PageBody>
      <SingleSignOnPanel
        isPanelOpen={isOpenPanel}
        closePanel={setIsOpenPanel}
        sid={identityProviderSid}
        refreshDetailsPage={setRefreshSinglePage}
      />
      <ConnectionInformationPanel
        isOpen={isOpenConnectionInfoPanel}
        closePanel={setIsOpenConnectionInfo}
        indetityProviderSid={identityProviderSid ?? ''}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
      <Dialog hidden={!showDisableDialog} dialogContentProps={{ title: `${disable ? 'Disable' : 'Enable'} Password based login` }} minWidth="500px">
        <>
          {renderDialogBody()}
          <DialogFooter>
            <PrimaryButton
              id="__ForgotPassword_confirm_ok"
              text="Yes"
              onClick={() => {
                setShowDisableDialog(false)
                if (disable) {
                  disablePasswordLogin({
                    variables: {
                      orgSid,
                    },
                  });
                  return;
                }
                enablePasswordLogin({
                  variables: {
                    orgSid,
                  },
                });
              }}
            />
            <DefaultButton
              text="No"
              onClick={() => setShowDisableDialog(false)}
            />
          </DialogFooter>
        </>
      </Dialog>
    </LayoutDashboard>
  );
};
