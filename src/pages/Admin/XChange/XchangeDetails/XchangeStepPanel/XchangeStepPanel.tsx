import { useEffect, useState } from 'react';
import {
  IconButton, PanelType, PrimaryButton, Spinner, SpinnerSize, Text,
} from '@fluentui/react';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import format from 'xml-formatter';
import {
  useXchangeStepFormLazyQuery,
  useCreateXchangeStepMutation,
  useCopyXchangeStepLazyQuery,
  useUpdateXchangeStepMutation,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import {
  ThemedPanel, PanelBody, WizardButtonRow, WizardBody,
} from 'src/layouts/Panels/Panels.styles';
import { Spacing } from 'src/components/spacings/Spacing';
import { theme } from 'src/styles/themes/theme';

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

const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: 'black',
    lineHighlight: '#fff',
    gutterBackground: '#fff',
    gutterBorder: '#fff',
  },
  styles: [
    { tag: t.typeName, color: '#0078D4' },
    { tag: t.angleBracket, color: '#0078D4' },
  ],
});

const setupOption: BasicSetupOptions = {
  lineNumbers: false,
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

  const getxmlData = () => {
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
    const formattedXml = format(xmlValue, {
      indentation: '  ',
      collapseContent: true,
      lineSeparator: '\n',
    });
    return formattedXml;
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
          <WizardBody>
            <CodeMirror
              height="400px"
              style={{ border: '1px solid gray', fontWeight: 'bold', fontSize: '14px' }}
              theme={myTheme}
              basicSetup={setupOption}
              extensions={[javascript({ jsx: true })]}
              value={editXmlData ?? ''}
              onChange={(value) => setEditXmlData(value)}
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
            <>
              {dataAddStep ? (
                <>
                  <Text>{dataAddStep.xchangeStepForm.xml.label}</Text>
                  <IconButton
                    title={dataAddStep.xchangeStepForm.xml.info}
                    iconProps={{ iconName: 'Info' }}
                    style={{ color: theme.colors.black }}
                  />
                </>
              ) : (
                <>
                  <Text>{dataCopyStep.copyXchangeStep.xml.label}</Text>
                  <IconButton
                    title={dataCopyStep.copyXchangeStep.xml.info}
                    iconProps={{ iconName: 'Info' }}
                    style={{ color: theme.colors.black }}
                  />
                </>
              )}
              <CodeMirror
                height="400px"
                style={{ border: '1px solid gray', fontWeight: 'bold', fontSize: '14px' }}
                theme={myTheme}
                readOnly={!updateCmd}
                basicSetup={setupOption}
                extensions={[javascript({ jsx: true })]}
                value={editXmlData ?? ''}
                onChange={(value) => setEditXmlData(value)}
              />
            </>
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
    if (!loadingAddStep && !loadingCopyStep) {
      if (optionXchangeStep === 'add') {
        return xchangeStepTitle;
      }

      return `${!createCmd ? xchangeStepTitle : `Copy of ${xchangeStepTitle}`}`;
    }
    return undefined;
  };

  useEffect(() => {
    getxmlData();
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
    }

    if (dataCopyStep?.copyXchangeStep) {
      const pageCommands = dataCopyStep?.copyXchangeStep?.commands;
      const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
    }
  }, [dataCopyStep, loadingCopyStep]);

  useEffect(() => {
    comparePreviousXml(editXmlData ?? '', previousXmlData ?? '');
  }, [editXmlData]);

  useEffect(() => {
    const message = optionXchangeStep === 'add' ? 'added' : 'updated';
    if (!loadingCreateStep && dataCreateStep) {
      refreshDetailsPage(true);
      Toast.success({ text: `Xchange step ${message}` });
      closePanel(false);
    }

    if (!loadingCreateStep && errorCreateStep) {
      Toast.error({ text: `There was an error to ${message} step` });
    }
  }, [dataCreateStep, loadingCreateStep, errorCreateStep]);

  useEffect(() => {
    if (!loadingUpdateXchange && dataUpdateStep) {
      refreshDetailsPage(true);
      Toast.success({ text: 'Xchange step updated' });
      closePanel(false);
    }

    if (!loadingUpdateXchange && errorUpdateXchange) {
      Toast.error({ text: 'There was an error to update step' });
    }
  }, [dataUpdateStep, loadingUpdateXchange, errorUpdateXchange]);

  return (
    <>
      <ThemedPanel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={renderPanelHeaderText()}
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
