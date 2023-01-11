import React, { useEffect, useState } from 'react';
import {
  DefaultButton,
  MessageBar,
  MessageBarType,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
} from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  useSupportedPlatformFormLazyQuery,
  useCreateSupportedPlatformMutation,
  useUpdateSupportedPlatformMutation,
  useDeleteSupportedPlatformMutation,
  SupportedPlatformForm,
  WebCommand,
  CdxWebCommandType,
  GqOperationResponse,
} from 'src/data/services/graphql';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { UIInputText } from 'src/components/inputs/InputText';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Column } from 'src/components/layouts';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { ErrorHandler } from 'src/utils/ErrorHandler';

const defaultDialogProps: DialogYesNoProps = {
  id: '__SupportedPlatform_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

type SupportedPlataformsPanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
    refreshPage: (data: boolean) => void;
    sid?: string;
};

const SupportedPlataformsPanel = ({
  closePanel, isOpen, sid, refreshPage,
}: SupportedPlataformsPanelProps) => {
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const [supportedPlatform, setSupportedPlatform] = useState<SupportedPlatformForm | null>();
  const [supportedName, setSupportedName] = useState('');
  const [supportedNotes, setSupportedNotes] = useState('');
  const [supportedIncomingFormats, setSupportedIncomingFormats] = useState<string[]>([]);
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [
    supportedPlatformForm,
    {
      data: supportedPlatformFormData,
      loading: isLoadingSupportedPlatform,
      error: supportedPlatformError,
    },
  ] = useSupportedPlatformFormLazyQuery();
  const [
    createSupported,
    {
      data: createSupportedPlatformData,
      loading: isLoadingCreateSupportedPlatform,
      error: createSupportedPlatformError,
    },
  ] = useCreateSupportedPlatformMutation();
  const [
    updateSupported,
    {
      data: updateSupportedPlatformData,
      loading: isLoadingUpdateSupportedPlatform,
      error: updateSupportedPlatformError,
    },
  ] = useUpdateSupportedPlatformMutation();
  const [
    deleteSupported,
    {
      data: deleteSupportedPlatformData,
      loading: isLoadingDeleteSupportedPlatform,
      error: deleteSupportedPlatformError,
    },
  ] = useDeleteSupportedPlatformMutation();

  useEffect(() => {
    handleError(supportedPlatformError);
  }, [supportedPlatformError]);
  useEffect(() => {
    handleError(createSupportedPlatformError);
  }, [createSupportedPlatformError]);
  useEffect(() => {
    handleError(updateSupportedPlatformError);
  }, [updateSupportedPlatformError]);
  useEffect(() => {
    handleError(deleteSupportedPlatformError);
  }, [deleteSupportedPlatformError]);

  const fetchData = () => {
    supportedPlatformForm({
      variables: {
        sid,
      },
    })
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoadingSupportedPlatform && supportedPlatformFormData) {
      setSupportedPlatform(supportedPlatformFormData.supportedPlatformForm);
      const supportedPlatformdata = supportedPlatformFormData.supportedPlatformForm;
      setSupportedName(supportedPlatformdata?.name.value ?? '');
      setSupportedNotes(supportedPlatformdata?.notes.value ?? '');
      if (supportedPlatformdata?.supportedIncomingFormats.value
          && supportedPlatformdata.supportedIncomingFormats.value.length > 0) {
        setSupportedIncomingFormats(supportedPlatformdata.supportedIncomingFormats
          .value.map((incoming) => incoming.value));
      }
      if (supportedPlatformFormData.supportedPlatformForm?.commands) {
        const pageCommands = supportedPlatformFormData.supportedPlatformForm.commands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        const _deleteCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Delete);
        setDeleteCmd(_deleteCmd);
      }
    }
  }, [supportedPlatformFormData, isLoadingSupportedPlatform]);

  useEffect(() => {
    const response = createSupportedPlatformData?.createSupportedPlatform;

    if (createSupportedPlatformData) {
      const responseCode = response?.response;
      const { createSupportedPlatform } = createSupportedPlatformData;
      setSupportedPlatform(createSupportedPlatform);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = createSupportedPlatform?.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Supported Source Platform Saved' });
      }
    }
  }, [createSupportedPlatformData, isLoadingCreateSupportedPlatform]);

  useEffect(() => {
    const response = updateSupportedPlatformData?.updateSupportedPlatform;

    if (updateSupportedPlatformData) {
      const responseCode = response?.response;
      const { updateSupportedPlatform } = updateSupportedPlatformData;
      setSupportedPlatform(updateSupportedPlatform);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateSupportedPlatform?.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Supported Source Platform Saved' });
      }
    }
  }, [updateSupportedPlatformData, isLoadingUpdateSupportedPlatform]);

  useEffect(() => {
    if (!isLoadingDeleteSupportedPlatform && deleteSupportedPlatformData) {
      closePanel(false);
      refreshPage(true);
      Toast.error({ text: `${supportedName} has been deleted` });
    }
  }, [deleteSupportedPlatformData, isLoadingDeleteSupportedPlatform])

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setSupportedName('');
      setUnsavedChanges(false);
      setMessage(null);
      setSupportedNotes('');
      setSupportedIncomingFormats([]);
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showDeleteSupportedPlatformDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Supported Source Platform';
    updatedDialog.message = 'Are you sure want to delete this Supported Source Platform? New Xchanges will not be able to choose this as a Source platform once deleted';

    updatedDialog.onYes = () => {
      hideDialog();
      deleteSupported({
        variables: {
          sid: sid ?? '',
        },
      });
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      showUnsavedChangesDialog();
    } else {
      closePanel(false);
      setSupportedName('');
      setUnsavedChanges(false);
      setMessage(null);
      setSupportedNotes('');
      setSupportedIncomingFormats([]);
    }
  };

  const saveSupportedPlatform = () => {
    if (sid) {
      updateSupported({
        variables: {
          supportedPlatformInput: {
            sid,
            name: supportedName,
            notes: supportedNotes,
            supportedIncomingFormats,
          },
        },
      });
      return;
    }
    createSupported({
      variables: {
        supportedPlatformInput: {
          name: supportedName,
          notes: supportedNotes,
          supportedIncomingFormats,
        },
      },
    });
  };

  const renderBody = () => {
    if (isLoadingSupportedPlatform) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Supported Platform Panel" />
        </Spacing>
      );
    }

    return (
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__SupportedPlatformPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        <FormRow>
          {supportedPlatform?.name.visible && (
            <Column lg="12">
              <UIInputText
                id="__supportedPlatformName"
                uiField={supportedPlatform.name}
                value={supportedName}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setSupportedName(newValue ?? '');
                }}
              />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {supportedPlatform?.notes.visible && (
            <Column lg="12">
              <UIInputTextArea
                id="__supportedPlatformNotes"
                uiField={supportedPlatform.notes}
                value={supportedNotes}
                resizable={false}
                multiline={true}
                rows={10}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setSupportedNotes(newValue ?? '');
                }}
              />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {supportedPlatform?.supportedIncomingFormats.visible && (
            <Column lg="12">
              <UIInputMultiSelect
                id="__supportedPlatformIncomingFormats"
                uiField={supportedPlatform.supportedIncomingFormats}
                options={supportedPlatform.options}
                value={supportedIncomingFormats}
                onChange={(incomingFormats) => {
                  setUnsavedChanges(true);
                  setSupportedIncomingFormats(incomingFormats ?? []);
                }}
              />
            </Column>
          )}
        </FormRow>
        <WizardButtonRow>
          <Spacing margin={{ top: 'double' }}>
            <>
              {(createCmd || updateCmd) && (
                <PrimaryButton
                  id="__saveSupportedPlatform"
                  onClick={() => saveSupportedPlatform()}
                >
                  Save
                </PrimaryButton>
              )}
              {deleteCmd && (
                <DefaultButton
                  iconProps={{ iconName: 'trash' }}
                  style={{ marginLeft: '20px' }}
                  id="deleteSupportedPlatform"
                  text="Delete"
                  onClick={() => showDeleteSupportedPlatformDialog()}
                />
              )}
            </>
          </Spacing>
        </WizardButtonRow>
      </PanelBody>
    )
  }

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText={updateCmd ? `${supportedPlatformFormData?.supportedPlatformForm?.name.value}` : 'Create Supported Source Platform'}
      type={PanelType.medium}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  )
};

export { SupportedPlataformsPanel };
