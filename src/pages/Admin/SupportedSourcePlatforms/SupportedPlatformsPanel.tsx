import React, { useEffect, useState } from 'react';
import {
  DefaultButton,
  DirectionalHint,
  MessageBar,
  MessageBarType,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  TooltipHost,
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
import { PanelBody, PanelHeader, PanelTitle, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { UIInputText } from 'src/components/inputs/InputText';
import { useNotification } from 'src/hooks/useNotification';
import { ThemeStore } from 'src/store/ThemeStore';
import { UIInputMultiSelect, UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Column, Row } from 'src/components/layouts';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { UIInputCode } from 'src/components/inputs/InputCode';
import { Comment20Filled } from '@fluentui/react-icons';

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
  const [includedStepXML, setIncludedStepXML] = useState('');
  const [semanticMap, setSemanticMap] = useState('');
  const [supportedIncomingFormats, setSupportedIncomingFormats] = useState<string[]>([]);
  const [openUpdateComments, setOpenUpdateComments] = useState(false);
  const [closeTooltipHost, setCloseTooltipHost] = useState(true);
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
      setIncludedStepXML('');
      setSemanticMap('');
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
      setIncludedStepXML('');
      setSemanticMap('');
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
            includedStepXML,
            semanticMap,
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
          includedStepXML,
          semanticMap,
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
        <FormRow>
          <Column lg="12">
            {supportedPlatform?.semanticMap.visible && (
              <UIInputSelectOne 
                id="__supportedSemanticMap"
                uiField={supportedPlatform.semanticMap}
                options={supportedPlatform.options}
                onChange={(_newString) => {
                  setSemanticMap(_newString ?? '');
                  setUnsavedChanges(true);
                }}
              />
            )}
          </Column>
        </FormRow>
        <FormRow>
          {supportedPlatform?.notes.visible && (
            <Column lg="12">
              <UIInputCode
                id="__supportedIncludedStepXML"
                mode="xml"
                uiField={supportedPlatform.includedStepXML}
                value={includedStepXML}
                onChange={(event, newValue) => {
                  setUnsavedChanges(true);
                  setIncludedStepXML(newValue ?? '');
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
  };

  const tooltipHostComments = () => {
    if (!openUpdateComments) {
      return (
        <>
          {closeTooltipHost && (
            <TooltipHost
              directionalHint={DirectionalHint['rightBottomEdge']}
              content={supportedNotes ? 'This supported platform has comments. Click to see them.' : 'Click to add a comment'}
            >
              <Comment20Filled
                style={supportedNotes ? {
                  color: ThemeStore.userTheme.colors.yellow, cursor: 'pointer',
                  marginLeft: '15px',
    
                } : {
                  color: ThemeStore.userTheme.colors.neutralTertiaryAlt, cursor: 'pointer',
                  marginLeft: '15px',
   
                }}
                onClick={() => {
                  setOpenUpdateComments((prevState) => !prevState);
                }}
              />
            </TooltipHost>
          )}
          {!closeTooltipHost && (
            <Comment20Filled
              style={supportedNotes ? {
                color: ThemeStore.userTheme.colors.yellow, cursor: 'pointer',
                marginLeft: '15px',
               } : {
                color: ThemeStore.userTheme.colors.neutralTertiaryAlt, cursor: 'pointer',
                marginLeft: '15px',
               }}
              onClick={() => {
                setOpenUpdateComments(true);
              }}
            />
          )}
        </>
      );
    }

    const readOnly = () => {
      if (updateCmd || createCmd) {
        if (!supportedPlatform?.notes.readOnly) {
          return false
        }
        return true;
      }
      return true;
    }

    const updateComment = () => (
      <TextField
        id="SupportedPlatformsComment"
        label='Comments'
        readOnly={readOnly()}
        value={supportedNotes}
        onChange={(event, newValue: any) => {
          setSupportedNotes(newValue ?? '');
          if (!supportedPlatform?.notes.value) {
            if (newValue.trim() !== '') {
              setUnsavedChanges(true);
            } else {
              setUnsavedChanges(false);
            }
          } else if (supportedPlatform?.notes.value?.trim() !== newValue?.trim()) {
            setUnsavedChanges(true);
          } else {
            setUnsavedChanges(false);
          }
        }}
        multiline={true}
        resizable={false}
        rows={12}
      />
    );

    if (openUpdateComments) {
      return (
        <TooltipHost
          directionalHintForRTL={DirectionalHint['bottomAutoEdge']}
          closeDelay={5000000}
          style={{ background: ThemeStore.userTheme.colors.yellow, width: '400px', padding: '0 10px 10px 10px' }}
          tooltipProps={{
            calloutProps: {
              styles: {
                beak: { background: ThemeStore.userTheme.colors.yellow },
                beakCurtain: { background: ThemeStore.userTheme.colors.yellow },
                calloutMain: { background: ThemeStore.userTheme.colors.yellow },
              },
            },
          }}
          content={updateComment()}
        >
          <Comment20Filled
            style={supportedNotes ? {
              color: ThemeStore.userTheme.colors.yellow, cursor: 'pointer',
              marginLeft: '15px',
            } : {
              color: ThemeStore.userTheme.colors.neutralTertiaryAlt, cursor: 'pointer',
              marginLeft: '15px',
            }}
          />
        </TooltipHost>
      );
    }
    return null;
  };

  const renderPanelHeader = () => (
    <PanelHeader id="___SupportedPlatformsPanelHeader">
      <Row>
        <Column lg="12">
          <Stack horizontal>
            <PanelTitle id="__SupportedPlatforms_Panel_Title" variant="bold" size="large">
              {!updateCmd ? 'Create Supported Source Platform' : supportedPlatform?.name.value}
              <>{tooltipHostComments()}</>
            </PanelTitle>
          </Stack>
        </Column>
      </Row>
    </PanelHeader>
  );

  return (
    <ThemedPanel
      onClick={() => {
        if (openUpdateComments) {
          setOpenUpdateComments(false);
          setCloseTooltipHost(false);
          setTimeout(() => {
            setCloseTooltipHost(true);
          }, 0.001);
        }
      }}
      closeButtonAriaLabel="Close"
      onRenderHeader={renderPanelHeader}
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
