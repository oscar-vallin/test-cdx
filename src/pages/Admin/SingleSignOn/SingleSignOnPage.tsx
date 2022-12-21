import React, { CSSProperties, useEffect, useState } from 'react';
import {
  useIdentityProvidersForOrgLazyQuery,
  useDeleteIdentityProviderMutation,
  IdentityProvider,
  CdxWebCommandType,
  WebCommand,
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
  DetailsList,
  DetailsListLayoutMode,
  IColumn, IconButton, PrimaryButton, SelectionMode,
  Spinner,
  SpinnerSize,
  TooltipHost,
} from '@fluentui/react';
import { People20Filled } from '@fluentui/react-icons';
import { EmptyState } from 'src/containers/states';
import { ButtonLink } from 'src/components/buttons';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { SingleSignOnPanel } from './SingleSignOnPanel';

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
  const Toast = useNotification();
  const [nodes, setNodes] = useState<IdentityProvider[] | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [refreshXchangeDetails, setRefreshXchangeDetails] = useState(false);
  const [identityProviderSid, setIdentityProviderSid] = useState<string | null>('');
  const [identityProviderName, setIdentityProviderName] = useState<string | null>('');
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [showDialog, setShowDialog] = useState(false);
  const [
    identityProvidersForOrg,
    {
      data: identityProvidersdata,
      loading: isLoadingIdentityProviders,
      error: identityProvidersdataError,
    },
  ] = useIdentityProvidersForOrgLazyQuery();
  const [
    deleteIdentityProvider,
    {
      data: deletedIdentityProvider,
      loading: isLoadingDeleted,
    },
  ] = useDeleteIdentityProviderMutation();

  const fetchData = () => {
    identityProvidersForOrg({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    setRefreshXchangeDetails(false);
    fetchData();
  }, [refreshXchangeDetails]);

  useEffect(() => {
    if (!isLoadingIdentityProviders && identityProvidersdata) {
      setNodes(identityProvidersdata?.identityProvidersForOrg?.nodes);

      const pageCommands = identityProvidersdata.identityProvidersForOrg.listPageInfo?.pageCommands;
      const _createCmd = pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
      const _deleteCmd = pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Delete);
      setDeleteCmd(_deleteCmd);
    }
  }, [identityProvidersdata, isLoadingIdentityProviders, identityProvidersdataError]);

  useEffect(() => {
    if (!isLoadingDeleted && deletedIdentityProvider) {
      setRefreshXchangeDetails(true);
      setIdentityProviderName('');
      Toast.success({ text: `Identity Provider ${identityProviderName} has been deleted` });
    }
  }, [deletedIdentityProvider, isLoadingDeleted]);

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showDeleteIdentityProviderDialog = (sid: string) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Identity Provider?';
    updatedDialog.message = 'Are you sure you want to delete this Identity Provider';

    updatedDialog.onYes = () => {
      hideDialog();
      deleteIdentityProvider({
        variables: {
          sid,
        },
      });
    };
    updatedDialog.onClose = () => {
      setIdentityProviderName('');
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
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
            setIdentityProviderName(item?.name ?? '');
            showDeleteIdentityProviderDialog(item?.sid);
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
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Id',
      key: 'idpId',
      fieldName: 'idpId',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'members',
      fieldName: 'members',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
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
      columnVal = item?.name ?? '';
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

    return (
      <>
        {column?.key === 'name' && (
        <>
        &nbsp;
          <ButtonLink
            id={`__identityProviderName${columnVal}`}
            onClick={() => {
              setIdentityProviderSid(item?.sid ?? '');
              setIsOpenPanel(true);
            }}
          >
            {columnVal}
          </ButtonLink>
        </>
        )}
        {column?.key === 'idpId' && (
        <Text>{columnVal}</Text>
        )}
      </>
    );
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
            {renderBody()}
          </Row>
        </Container>
      </PageBody>
      <SingleSignOnPanel
        isPanelOpen={isOpenPanel}
        closePanel={setIsOpenPanel}
        sid={identityProviderSid}
        refreshDetailsPage={setRefreshXchangeDetails}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  );
};
