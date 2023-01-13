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
import {
  useIncomingFormatFormLazyQuery,
  useCreateIncomingFormatMutation,
  useUpdateIncomingFormatMutation,
  useDeleteIncomingFormatMutation,
  useActivateIncomingFormatMutation,
  IncomingFormatForm,
  WebCommand,
  CdxWebCommandType,
  GqOperationResponse,
} from 'src/data/services/graphql';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputText } from 'src/components/inputs/InputText';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Column } from 'src/components/layouts';
import { ErrorHandler } from 'src/utils/ErrorHandler';

const defaultDialogProps: DialogYesNoProps = {
  id: '__IncomingFormat_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

type IncomingFormatPanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
    refreshPage: (data: boolean) => void;
    sid?: string;
};

const IncomingFormatPanel = ({
  closePanel, isOpen, refreshPage, sid,
}: IncomingFormatPanelProps) => {
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const [incomingFormat, setIncomingFormat] = useState<IncomingFormatForm | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [activateCmd, setActivateCmd] = useState<WebCommand | null>();
  const [incomingName, setIncomingName] = useState('');
  const [incomingNotes, setIncomingNotes] = useState('');
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [
    incomingFormats,
    {
      data: incomingFormatsData,
      loading: isLoadingIncomingFormats,
      error: incomingFormatsError,
    },
  ] = useIncomingFormatFormLazyQuery();
  const [
    createIncoming,
    {
      data: createIncomingFormatData,
      loading: isLoadIngcreateIncomingFormat,
      error: createIncomingFormatError,
    },
  ] = useCreateIncomingFormatMutation();
  const [
    updateIncoming,
    {
      data: updateIncomingFormatData,
      loading: isLoadIngUpdateIncomingFormat,
      error: updateIncomingFormatError,
    },
  ] = useUpdateIncomingFormatMutation();
  const [
    deleteIncoming,
    {
      data: deleteIncomingFormatData,
      loading: isLoadIngDeleteIncomingFormat,
      error: deleteIncomingFormatError,
    },
  ] = useDeleteIncomingFormatMutation();
  const [
    activateIncoming,
    {
      data: activateIncomingFormatData,
      loading: isLoadIngActivateIncomingFormat,
      error: activateIncomingFormatError,
    },
  ] = useActivateIncomingFormatMutation();

  useEffect(() => {
    handleError(incomingFormatsError);
  }, [incomingFormatsError]);
  useEffect(() => {
    handleError(createIncomingFormatError);
  }, [createIncomingFormatError]);
  useEffect(() => {
    handleError(updateIncomingFormatError);
  }, [updateIncomingFormatError]);
  useEffect(() => {
    handleError(deleteIncomingFormatError);
  }, [deleteIncomingFormatError]);
  useEffect(() => {
    handleError(activateIncomingFormatError);
  }, [activateIncomingFormatError]);

  const fetchData = () => {
    incomingFormats({
      variables: {
        sid,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoadingIncomingFormats && incomingFormatsData) {
      setIncomingFormat(incomingFormatsData.incomingFormatForm);
      const incomingData = incomingFormatsData.incomingFormatForm;
      setIncomingName(incomingData?.name.value ?? '');
      setIncomingNotes(incomingData?.notes.value ?? '');
      if (incomingFormatsData.incomingFormatForm?.commands) {
        const pageCommands = incomingFormatsData.incomingFormatForm.commands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        const _deleteCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Delete);
        setDeleteCmd(_deleteCmd);
        const _activateCmd = pageCommands
          .find((cmd) => cmd.commandType === CdxWebCommandType.Activate);
        setActivateCmd(_activateCmd);
      }
    }
  }, [incomingFormatsData, isLoadingIncomingFormats]);

  useEffect(() => {
    const response = createIncomingFormatData?.createIncomingFormat;

    if (createIncomingFormatData) {
      const responseCode = response?.response;
      const { createIncomingFormat } = createIncomingFormatData;
      setIncomingFormat(createIncomingFormat);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = createIncomingFormat?.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Incoming Format Saved' });
      }
    }
  }, [createIncomingFormatData, isLoadIngcreateIncomingFormat]);

  useEffect(() => {
    const response = updateIncomingFormatData?.updateIncomingFormat;

    if (updateIncomingFormatData) {
      const responseCode = response?.response;
      const { updateIncomingFormat } = updateIncomingFormatData;
      setIncomingFormat(updateIncomingFormat);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateIncomingFormat?.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        closePanel(false);
        refreshPage(true);
        Toast.success({ text: 'Incoming Format Saved' });
      }
    }
  }, [updateIncomingFormatData, isLoadIngUpdateIncomingFormat]);

  useEffect(() => {
    if (!isLoadIngDeleteIncomingFormat && deleteIncomingFormatData) {
      closePanel(false);
      refreshPage(true);
      Toast.error({ text: `${incomingName} has been deleted` });
    }
  }, [deleteIncomingFormatData, isLoadIngDeleteIncomingFormat]);

  useEffect(() => {
    if (!isLoadIngActivateIncomingFormat && activateIncomingFormatData) {
      closePanel(false);
      refreshPage(true);
      Toast.success({ text: `${incomingName} has been activated` });
    }
  }, [activateIncomingFormatData, isLoadIngActivateIncomingFormat]);

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
      setIncomingName('');
      setUnsavedChanges(false);
      setMessage(null);
      setIncomingNotes('');
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showDeleteIncomingFormatDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Icoming Format';
    updatedDialog.message = 'Are you sure want to delete this Incoming Format? New Xchanges will not be able to use this format once deleted';

    updatedDialog.onYes = () => {
      hideDialog();
      deleteIncoming({
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

  const showActivateIncomingFormatDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Activate Icoming Format';
    updatedDialog.message = 'Are you sure want to activate this Incoming Format? This option will be made available when creating new xchanges once activate';

    updatedDialog.onYes = () => {
      hideDialog();
      activateIncoming({
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
      setIncomingName('');
      setUnsavedChanges(false);
      setMessage(null);
      setIncomingNotes('');
    }
  };

  const saveIncomingFormat = () => {
    if (sid) {
      updateIncoming({
        variables: {
          incomingFormatInput: {
            sid,
            name: incomingName,
            notes: incomingNotes,
          },
        },
      });
      return;
    }
    createIncoming({
      variables: {
        incomingFormatInput: {
          name: incomingName,
          notes: incomingNotes,
        },
      },
    });
  };

  const renderBody = () => {
    if (isLoadingIncomingFormats) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Incoming Format Panel" />
        </Spacing>
      );
    }

    return (
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__IncomingFormatPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        <FormRow>
          {incomingFormat?.name.visible && (
            <Column lg="12">
              <UIInputText
                id="__IncomingFormatName"
                uiField={incomingFormat.name}
                value={incomingName}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setIncomingName(newValue ?? '');
                }}
              />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {incomingFormat?.notes.visible && (
            <Column lg="12">
              <UIInputTextArea
                id="__incomingFormatNotes"
                uiField={incomingFormat.notes}
                value={incomingNotes}
                resizable={false}
                multiline={true}
                rows={10}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setIncomingNotes(newValue ?? '');
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
                iconProps={{ iconName: 'save' }}
                id="__saveIncomingFormat"
                onClick={() => saveIncomingFormat()}
              >
                Save
              </PrimaryButton>
              )}
              {deleteCmd && (
                <DefaultButton
                  iconProps={{ iconName: 'trash' }}
                  style={{ marginLeft: '20px' }}
                  id="deleteIncomingFormat"
                  text="Delete"
                  onClick={() => showDeleteIncomingFormatDialog()}
                />
              )}
              {activateCmd && (
                <DefaultButton
                  iconProps={{ iconName: 'CompletedSolid' }}
                  style={{ marginLeft: '20px' }}
                  id="deleteSupportedPlatform"
                  text="Activate"
                  onClick={() => showActivateIncomingFormatDialog()}
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
      headerText={updateCmd ? `${incomingFormatsData?.incomingFormatForm?.name.value}` : 'Create Incoming Format'}
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

export { IncomingFormatPanel };
