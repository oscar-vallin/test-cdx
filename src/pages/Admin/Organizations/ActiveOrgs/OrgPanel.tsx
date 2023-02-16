import {
  DirectionalHint,
  MessageBar,
  MessageBarType,
  PanelType,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { LightSeparator } from 'src/components/separators/Separator';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import React, { useEffect, useState } from 'react';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import {
  CdxWebCommandType,
  ErrorSeverity,
  GqOperationResponse,
  OrganizationForm,
  OrgType,
  useCreateOrgMutation,
  useFindOrganizationLazyQuery,
  useOrganizationFormLazyQuery,
  useUpdateOrgMutation,
  useDeactivateOrgMutation,
  useActivateOrgMutation,
  WebCommand,
} from 'src/data/services/graphql';
import { Button } from 'src/components/buttons';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UIInputText } from 'src/components/inputs/InputText';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { UIInputMultiSelect, UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { getEnumByValue } from 'src/utils/CDXUtils';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { useNotification } from 'src/hooks/useNotification';
import { ActiveIcon, InactiveIcon } from '../../Users/UpdateUsers/UpdateUserPanel.styles';
import { StyledThemedCommandButton } from '../Orgs.styles';

type OrgPanelType = {
  isOpen: boolean;
  selectedOrgSid?: string | null;
  onDismiss: () => void;
  onSave: () => void;
};

type OrgStateType = {
  sid?: string;
  name?: string;
  orgId?: string;
  orgType?: OrgType;
  mv1Id?: string;
  mv1Folder?: string | null;
  supportedPlatforms?: string[],
};

const INITIAL_STATE: OrgStateType = {
  sid: undefined,
  name: '',
  orgId: '',
  orgType: undefined,
  supportedPlatforms: [],
};

const defaultDialogProps: DialogYesNoProps = {
  id: '__OrgPanel_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

export const OrgPanel = ({
  isOpen, selectedOrgSid, onDismiss, onSave,
}: OrgPanelType) => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const [orgState, setOrgState] = useState<OrgStateType>(INITIAL_STATE);
  const [orgForm, setOrgForm] = useState<OrganizationForm | null>();
  const [deactivateCmd, setDeactivateCmd] = useState<WebCommand | null>();
  const [activateCmd, setActivateCmd] = useState<WebCommand | null>();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [refreshDataXchange, setRefreshDataXchange] = useState(false);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [message, setMessage] = useState<string | undefined>();

  const [fetchOrgForm, {
    data: dataForm,
    loading: loadingForm,
    error: errorForm,
  }] = useOrganizationFormLazyQuery();
  const [fetchOrg, {
    data: dataOrg,
    loading: loadingOrg,
    error: errorOrg,
  }] = useFindOrganizationLazyQuery();
  const [createOrg, {
    data: dataCreateOrg,
    loading: loadingCreate,
    error: errorCreate,
  }] = useCreateOrgMutation();
  const [updateOrg, {
    data: dataUpdateOrg,
    loading: loadingUpdate,
    error: errorUpdate,
  }] = useUpdateOrgMutation();
  const [deactivateOrg, {
    data: dataDeactivateOrg,
    loading: loadingDeactivate,
    error: errorDeactivate,
  }] = useDeactivateOrgMutation();
  const [activateOrg, {
    data: dataActivateOrg,
    loading: loadingActivate,
    error: errorActivate,
  }] = useActivateOrgMutation();
  const Toast = useNotification();
  const handleError = ErrorHandler();

  const doClosePanel = () => {
    setOrgState({ ...INITIAL_STATE });

    // Reset the form
    setOrgForm(null);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  useEffect(() => {
    handleError(errorForm);
    handleError(errorOrg);
    handleError(errorCreate);
    handleError(errorUpdate);
  }, [errorForm, errorOrg, errorCreate, errorUpdate]);

  useEffect(() => {
    setRefreshDataXchange(false);
    if (selectedOrgSid) {
      fetchOrg({
        variables: {
          orgSid: selectedOrgSid,
        },
      });
    } else {
      fetchOrgForm({
        variables: {
          orgOwnerSid,
        },
      });
    }
  }, [selectedOrgSid, refreshDataXchange]);

  useEffect(() => {
    if (dataForm && !loadingForm) {
      setOrgForm(dataForm.organizationForm);
    }
  }, [dataForm, loadingForm]);

  useEffect(() => {
    if (dataOrg && !loadingOrg) {
      setOrgForm(dataOrg.findOrganization);

      if (dataOrg.findOrganization?.commands) {
        const pageCommands = dataOrg.findOrganization.commands;
        const _deactivateCmd = pageCommands
          ?.find((cmd) => cmd.commandType === CdxWebCommandType.Deactivate);
        setDeactivateCmd(_deactivateCmd);
        const _activateCmd = pageCommands
          ?.find((cmd) => cmd.commandType === CdxWebCommandType.Activate);
        setActivateCmd(_activateCmd);
      }
    }
  }, [dataOrg, loadingOrg]);

  useEffect(() => {
    if (dataCreateOrg && !loadingCreate) {
      const form = dataCreateOrg.createOrg;

      if (form?.response === GqOperationResponse.Fail) {
        setOrgForm(form);
        const errorMsg = form.errMsg ?? form.response ?? 'Error Saving Organization';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      } else if (form?.sid) {
        Toast.success({ text: `Organization ${form?.name?.value} created` });
        doClosePanel();
        onSave();
      }
    }
  }, [dataCreateOrg, loadingCreate]);

  useEffect(() => {
    if (dataUpdateOrg && !loadingUpdate) {
      const form = dataUpdateOrg.updateOrg;

      if (form?.response === GqOperationResponse.Fail) {
        setOrgForm(form);
        const errorMsg = form.errMsg ?? form.response ?? 'Error Saving Organization';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      } else if (form?.sid) {
        Toast.success({ text: `Organization ${form?.name?.value} saved` });
        doClosePanel();
        onSave();
      }
    }
  }, [dataUpdateOrg, loadingUpdate]);

  useEffect(() => {
    if (orgForm) {
      const _orgState: OrgStateType = {
        sid: orgForm?.sid ?? undefined,
        orgId: orgForm?.orgId?.value ?? '',
        name: orgForm?.name?.value ?? undefined,
        orgType: getEnumByValue(OrgType, orgForm?.orgType?.value?.value),
        mv1Id: orgForm?.mv1Id?.value?.toString(),
        mv1Folder: orgForm?.mv1Folder?.value,
        supportedPlatforms: orgForm.supportedPlatforms?.value?.map((supportedPlatform) => supportedPlatform.value),
      };

      setOrgState(_orgState);
    } else {
      setOrgState(INITIAL_STATE);
    }
  }, [orgForm]);

  useEffect(() => {
    if (!loadingDeactivate && dataDeactivateOrg) {
      const { orgId } = orgState;
      setRefreshDataXchange(true);
      doClosePanel();
      onSave();
      Toast.success({ text: `Organization ${orgId} has been deactivated` });
    }

    if (!loadingDeactivate && errorDeactivate) {
      Toast.error({ text: 'An error occurred deactivating this Organization' });
    }
  }, [dataDeactivateOrg, loadingDeactivate, errorDeactivate]);

  useEffect(() => {
    if (!loadingActivate && dataActivateOrg) {
      const { orgId } = orgState;
      setRefreshDataXchange(true);
      doClosePanel();
      onSave();
      Toast.success({ text: `Organization ${orgId} has been activated` });
    }

    if (!loadingDeactivate && errorActivate) {
      Toast.error({ text: 'An error occurred activating this Organization' });
    }
  }, [dataActivateOrg, loadingActivate, errorActivate]);

  const renderOrgId = () => {
    if (selectedOrgSid) {
      return <UIInputTextReadOnly id="__OrgID" uiField={orgForm?.orgId} />;
    }
    return (
      <UIInputText
        id="__OrgID"
        uiField={orgForm?.orgId}
        value={orgState.orgId}
        onChange={(event, newValue) => {
          setUnsavedChanges(true);
          setOrgState({ ...orgState, orgId: newValue ?? '' });
        }}
      />
    );
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const unsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'You are about lose all changes made to this Organization. Are you sure you want to continue?';

    updatedDialog.onYes = () => {
      hideDialog();
      doClosePanel();
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const deactivateDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    const status = deactivateCmd ? 'deactivate' : 'activate';
    updatedDialog.title = deactivateCmd ? 'Deactivate' : 'Activate';
    updatedDialog.message = `Are you sure you want to ${status} this Organization?'`

    updatedDialog.onYes = () => {
      hideDialog();
      const { sid } = orgState;
      if (deactivateCmd) {
        deactivateOrg({
          variables: {
            orgSid: sid ?? '',
          },
        })
      }
      if (activateCmd) {
        activateOrg({
          variables: {
            orgSid: sid ?? '',
          },
        })
      }
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      unsavedChangesDialog();
    } else {
      doClosePanel();
    }
  };

  const renderBody = () => (
    <>
      <FormRow>
        <Column lg="6">{renderOrgId()}</Column>
        <Column lg="6">
          <UIInputSelectOne
            id="__OrgType"
            uiField={orgForm?.orgType}
            value={orgState.orgType?.toString() ?? ''}
            options={orgForm?.options}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              const orgType = getEnumByValue(OrgType, newValue);
              setOrgState({ ...orgState, orgType });
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          <UIInputText
            id="__OrgName"
            uiField={orgForm?.name}
            value={orgState.name ?? ''}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, name: newValue });
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="6">
          <UIInputText
            id="__Mv1Id"
            uiField={orgForm?.mv1Id}
            value={orgState.mv1Id ?? ''}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, mv1Id: newValue });
            }}
          />
        </Column>
        <Column lg="6">
          <UIInputText
            id="__Mv1Folder"
            uiField={orgForm?.mv1Folder}
            value={orgState.mv1Folder ?? ''}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, mv1Folder: newValue });
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        {orgForm?.orgType?.value?.value === OrgType.IntegrationSponsor && (
        <Column lg="12">
          <UIInputMultiSelect
            id="__SupportedPlatforms"
            uiField={orgForm?.supportedPlatforms}
            options={orgForm.options}
            value={orgState.supportedPlatforms ?? []}
            onChange={(platformss) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, supportedPlatforms: platformss });
            }}
          />
        </Column>
        )}
      </FormRow>
    </>
  );

  const renderPanelHeader = () => (
    <PanelHeader id="__Org_PanelHeader">
      <Column lg="6">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__Org_Panel_Title" variant="bold" size="large">
            {!selectedOrgSid ? 'New Organization' : orgState.orgId}
            {orgForm?.active?.value ? (
              <TooltipHost content="This organization is active" directionalHint={DirectionalHint.rightCenter}>
                <ActiveIcon iconName="CompletedSolid" style={{ fontSize: '15px' }} />
              </TooltipHost>
            ) : (
              <TooltipHost content="This organization is inactive" directionalHint={DirectionalHint.rightCenter}>
                <InactiveIcon iconName="StatusErrorFull" />
              </TooltipHost>
            )}
          </PanelTitle>
        </Stack>
      </Column>
      <Column lg="6" right>
        {deactivateCmd && (
          <StyledThemedCommandButton
            id="__DeactivateOrg_Button"
            iconProps={{ iconName: 'StatusCircleErrorX' }}
            text="Deactivate"
            onClick={() => deactivateDialog()}
          />
        )}
        {activateCmd && (
          <StyledThemedCommandButton
            id="__ActivateOrg_Button"
            iconProps={{ iconName: 'HomeVerify' }}
            text="Activate"
            onClick={() => deactivateDialog()}
          />
        )}
      </Column>
    </PanelHeader>
  );

  const doSave = () => {
    const { orgType } = orgState;
    if (!orgType) {
      const form = JSON.parse(JSON.stringify(orgForm));
      if (form.orgType) {
        form.orgType.errSeverity = ErrorSeverity.Error;
        form.orgType.errCode = 'REQUIRED_FIELDS_MISSING';
        form.orgType.errMsg = `${form.orgType.label} is Required`;
        setMessageType(MessageBarType.error);
        setMessage('Please fill out all required* fields');
        setOrgForm(form);
      }
    } else {
      if (!selectedOrgSid) {
        createOrg({
          variables: {
            orgInfo: {
              orgId: orgState.orgId ?? '',
              name: orgState.name ?? '',
              orgType,
              mv1Id: orgState.mv1Id ? +orgState.mv1Id : undefined,
              mv1Folder: orgState.mv1Folder,
              orgOwnerSid,
            },
          },
        }).then();
      } else {
        updateOrg({
          variables: {
            orgInfo: {
              orgSid: selectedOrgSid,
              name: orgState.name ?? '',
              orgType,
              mv1Id: orgState.mv1Id ? +orgState.mv1Id : undefined,
              mv1Folder: orgState.mv1Folder,
              supportedPlatforms: orgState.supportedPlatforms,
            },
          },
        }).then();
      }
    }

    return null;
  };

  const renderPanelFooter = () => {
    const commands = orgForm?.commands;
    const command = commands?.find(
      (cmd) => cmd?.commandType === CdxWebCommandType.Create
        || cmd?.commandType === CdxWebCommandType.Update,
    );
    if (command) {
      return (
        <div>
          <Button
            id="__SaveOrganizationBtnId"
            variant="primary"
            disabled={loadingCreate || loadingUpdate}
            onClick={doSave}
          >
            {command.label}
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ThemedPanel
        id="org-panel"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={!selectedOrgSid ? 'New Organization' : orgState.orgId}
        onRenderHeader={renderPanelHeader}
        onRenderFooterContent={renderPanelFooter}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
      >
        <PanelBody>
          {message && (
            <MessageBar
              id="__OrgPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          )}
          {!orgForm || loadingForm || loadingOrg ? (
            <>
              <Spacing margin={{ top: 'normal', bottom: 'double' }}>
                <LightSeparator />
              </Spacing>

              <Spacing>
                <Spinner size={SpinnerSize.large} label="Loading..." />
              </Spacing>
            </>
          ) : (
            renderBody()
          )}
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};
