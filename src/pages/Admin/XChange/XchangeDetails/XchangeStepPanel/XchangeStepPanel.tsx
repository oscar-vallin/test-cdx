import { useEffect, useState } from 'react';
import {
  FontIcon,
  MessageBar,
  MessageBarType,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import format from 'xml-formatter';
import {
  CdxWebCommandType,
  GqOperationResponse,
  UiStringField,
  useCopyXchangeStepLazyQuery,
  useCreateXchangeStepMutation,
  useUpdateXchangeStepMutation,
  useXchangeStepFormLazyQuery,
  WebCommand,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
  WizardBody,
  WizardButtonRow,
} from 'src/layouts/Panels/Panels.styles';
import { Spacing } from 'src/components/spacings/Spacing';
import { theme } from 'src/styles/themes/theme';
import { UIInputCode } from 'src/components/inputs/InputCode';

type XchangeStepPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshDetailsPage: (data: boolean) => void;
  setShowIcons: (data: boolean) => void;
  setOptionXchangeStep: (data: string) => void;
  optionXchangeStep?: string;
  xchangeFileProcessSid?: string;
  xchangeStepSid?: string;
  xchangeStepTitle?: string;
};

const defaultDialogProps: DialogYesNoProps = {
  id: '__XchangeStep_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const XchangeStepPanel = ({
  isPanelOpen,
  closePanel,
  refreshDetailsPage,
  setShowIcons,
  setOptionXchangeStep,
  optionXchangeStep,
  xchangeFileProcessSid,
  xchangeStepSid,
  xchangeStepTitle,
}: XchangeStepPanelProps) => {
  const Toast = useNotification();
  const [editXmlData, setEditXmlData] = useState<string>();
  const [previousXmlData, setPreviousXmlDate] = useState<string>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [infoMessage, setInfoMessage] = useState('');
  const [xmlField, setXmlField] = useState<UiStringField>();

  const [xchangeStepForm,
    { data: dataAddStep, loading: loadingAddStep }] = useQueryHandler(useXchangeStepFormLazyQuery);

  const [xchangeCopyStepForm,
    { data: dataCopyStep, loading: loadingCopyStep },
  ] = useQueryHandler(useCopyXchangeStepLazyQuery);

  const [updateXchangeStep,
    { data: dataUpdateStep, loading: loadingUpdateXchange, error: errorUpdateXchange },
  ] = useQueryHandler(useUpdateXchangeStepMutation);

  const [createXchangeStep,
    { data: dataCreateStep, loading: loadingCreateStep, error: errorCreateStep },
  ] = useQueryHandler(useCreateXchangeStepMutation);

  const getXmlData = () => {
    if (isPanelOpen) {
      if (optionXchangeStep === 'add' || optionXchangeStep === 'update') {
        xchangeStepForm({
          variables: {
            xchangeFileProcessSid,
            sid: xchangeStepSid,
          },
        });
      } else if (optionXchangeStep === 'copy') {
        xchangeCopyStepForm({
          variables: {
            xchangeFileProcessSid,
            sid: xchangeStepSid,
          },
        });
      }
    }
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setMessage(null);
      setUnsavedChanges(false);
      setShowIcons(false);
      setEditXmlData('');
      setOptionXchangeStep('');
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
      setMessage(null);
      setShowIcons(false);
      setOptionXchangeStep('');
    }
  };

  const saveStep = () => {
    if (optionXchangeStep === 'update') {
      updateXchangeStep({
        variables: {
          stepInput: {
            sid: xchangeStepSid,
            xml: editXmlData,
          },
        },
      });
    } else if (optionXchangeStep === 'add' || optionXchangeStep === 'copy') {
      createXchangeStep({
        variables: {
          stepInput: {
            xchangeFileProcessSid,
            xml: editXmlData,
          },
        },
      });
    }
  };

  const addFormatToXml = (xmlValue: string) => {
    return format(xmlValue, {
      indentation: '  ',
      collapseContent: true,
      lineSeparator: '\n',
    });
  };

  const comparePreviousXml = (editXml: string, preXml: string) => {
    if (editXml !== preXml) {
      setUnsavedChanges(true);
      return;
    }
    setUnsavedChanges(false);
  };

  const renderBody = () => {
    if (loadingAddStep || loadingCopyStep) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading xml file" />
        </Spacing>
      );
    }

    if (optionXchangeStep === 'add' && createCmd) {
      return (
        <PanelBody>
          {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__StepPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
          )}
          <WizardBody>
            <UIInputCode
              id="__xchangeStepXML"
              uiField={xmlField}
              value={editXmlData}
              mode="xml"
              onChange={(_, value) => {
                setEditXmlData(value);
              }}
            />
          </WizardBody>
          <WizardButtonRow>
            <PrimaryButton id="__Xchange_AddStep_Button" iconProps={{ iconName: 'Save' }} onClick={saveStep}>
              Save
            </PrimaryButton>
          </WizardButtonRow>
        </PanelBody>
      )
    }

    if (editXmlData) {
      return (
        <PanelBody>
          <WizardBody>
            <UIInputCode
              id="__xchangeStepXML"
              uiField={xmlField}
              value={editXmlData}
              mode="xml"
              onChange={(_, value) => {
                setEditXmlData(value);
              }}
            />
          </WizardBody>
          {(updateCmd || createCmd) && (
            <WizardButtonRow>
              <PrimaryButton id="__Xchange_AddStep_Button" iconProps={{ iconName: 'Save' }} onClick={saveStep}>
                Save
              </PrimaryButton>
            </WizardButtonRow>
          )}
        </PanelBody>
      );
    }
    return null;
  };

  const renderPanelHeaderText = () => {
    let title = xchangeStepTitle;
    if (!updateCmd && optionXchangeStep !== 'add') {
      title = `Copy of ${xchangeStepTitle}`
    }

    if (loadingAddStep || loadingCopyStep) return null;
    return (
      <PanelHeader>
        <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
          <PanelTitle id="__XchangeStep_Panel_Title" variant="bold" size="large">
            {title}
            {message && (
              <TooltipHost content={infoMessage}>
                <FontIcon
                  iconName="Warning12"
                  style={{
                    color: theme.colors.custom.error,
                    fontSize: '16px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                />
              </TooltipHost>
            )}
          </PanelTitle>
        </Stack>
      </PanelHeader>
    )
  };

  useEffect(() => {
    getXmlData();
  }, [isPanelOpen]);

  useEffect(() => {
    if (!loadingAddStep && dataAddStep) {
      if (dataAddStep.xchangeStepForm.xml.value) {
        const xmlValue = addFormatToXml(dataAddStep.xchangeStepForm.xml.value);
        setEditXmlData(xmlValue);
        setPreviousXmlDate(xmlValue);
      }
    }

    if (dataAddStep?.xchangeStepForm) {
      setXmlField(dataAddStep.xchangeStepForm.xml)
      const pageCommands = dataAddStep?.xchangeStepForm?.commands;
      const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
      setUpdateCmd(_updateCmd);
      const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
    }
  }, [dataAddStep, loadingAddStep]);

  useEffect(() => {
    if (!loadingCopyStep && dataCopyStep) {
      const xmlValue = addFormatToXml(dataCopyStep.copyXchangeStep.xml.value);
      setEditXmlData(xmlValue);
      setPreviousXmlDate(xmlValue);
      setOptionXchangeStep('copy');
    }

    if (dataCopyStep?.copyXchangeStep) {
      setXmlField(dataCopyStep.copyXchangeStep.xml)
      const pageCommands = dataCopyStep?.copyXchangeStep?.commands;
      const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
      setUpdateCmd(null);
    }
  }, [dataCopyStep, loadingCopyStep]);

  useEffect(() => {
    comparePreviousXml(editXmlData ?? '', previousXmlData ?? '');
  }, [editXmlData]);

  useEffect(() => {
    let stepMessage = '';
    if (optionXchangeStep === 'add') {
      stepMessage = 'added';
    } else if (optionXchangeStep === 'copy') {
      stepMessage = 'copied';
    } else {
      stepMessage = 'updated';
    }
    const response = dataCreateStep?.createXchangeStep;

    if (dataCreateStep) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        setXmlField(dataCreateStep?.createXchangeStep.xml)

        const errorMsg = dataCreateStep?.createXchangeStep?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
        const info = dataCreateStep?.createXchangeStep?.xml.info;
        setInfoMessage(info);
      }
      if (responseCode === GqOperationResponse.Success) {
        refreshDetailsPage(true);
        Toast.success({ text: `Xchange step ${stepMessage}` });
        closePanel(false);
      }
    }

    if (!loadingCreateStep && errorCreateStep) {
      Toast.error({ text: `There was an error to ${stepMessage} step` });
    }
  }, [dataCreateStep, loadingCreateStep, errorCreateStep]);

  useEffect(() => {
    if (!loadingUpdateXchange && dataUpdateStep) {
      refreshDetailsPage(true);
      Toast.success({ text: 'Xchange step updated' });
      closePanel(false);
    }

    if (!loadingUpdateXchange && errorUpdateXchange) {
      setXmlField(dataUpdateStep.updateXchangeStep.xml)
      Toast.error({ text: 'There was an error to update step' });
    }
  }, [dataUpdateStep, loadingUpdateXchange, errorUpdateXchange]);

  useEffect(() => {
    setOptionXchangeStep(optionXchangeStep ?? '')
  }, [optionXchangeStep])

  return (
    <>
      <ThemedPanel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        onRenderHeader={renderPanelHeaderText}
        isOpen={isPanelOpen}
        onDismiss={() => {
          onPanelClose();
        }}
      >
        {renderBody()}
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export { XchangeStepPanel };
