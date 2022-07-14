import { IconButton, PanelType, PrimaryButton, Spinner, SpinnerSize, Text } from '@fluentui/react';
import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
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
import { ThemedPanel, PanelBody, WizardButtonRow, WizardBody } from 'src/layouts/Panels/Panels.styles';
import { Spacing } from 'src/components/spacings/Spacing';

type XchangeStepPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshDetailsPage: (data: boolean) => void;
  hiddeIconCopyStep: (data: boolean) => void;
  setOptionXchangeStep: (data: string) => void;
  optionXchangeStep?: string;
  xchangeFileProcessSid?: string;
  xchangeStepSid?: string;
  xchangeStepTitle?: string;
};

const defaultDialogProps: DialogYesNoProps = {
  open: false,
  title: '',
  message: '',
  messageYes: 'Yes',
  messageNo: 'No',
  onYesNo: () => null,
  onYes: () => {},
  onNo: () => {},
  closeOnNo: true,
  closeOnYes: true,
  highlightNo: true,
  highlightYes: false,
  onClose: () => null,
};

const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: 'black',
    lineHighlight: '#fff',
    gutterBackground: '#fff',
    gutterForeground: '#fff',
    gutterBorder: '#fff',
  },
  styles: [
    { tag: t.typeName, color: '#0078D4' },
    { tag: t.angleBracket, color: '#0078D4' },
  ],
});

const XchangeStepPanel = ({
  isPanelOpen,
  closePanel,
  refreshDetailsPage,
  hiddeIconCopyStep,
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

  const [xchangeStepForm, { data: dataAddStep, loading: loadingAddStep }] =
    useQueryHandler(useXchangeStepFormLazyQuery);

  const [xchangeCopyStepForm, { data: dataCopyStep, loading: loadingCopyStep }] =
    useQueryHandler(useCopyXchangeStepLazyQuery);

  const [updateXchangeStep, { data: dataUpdateStep, loading: loadingUpdateXchange, error: errorUpdateXchange }] =
    useQueryHandler(useUpdateXchangeStepMutation);

  const [createXchangeStep, { data: dataCreateStep, loading: loadingCreateStep, error: errorCreateStep }] =
    useQueryHandler(useCreateXchangeStepMutation);

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
    updatedDialog.message =
      'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setUnsavedChanges(false);
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
      setOptionXchangeStep('');
    }
  };

  const removeLineBreakXml = (xmlValue: string) => xmlValue.split('\n').toString().replace(/,/g, '');

  const saveStep = () => {
    const xml = removeLineBreakXml(editXmlData ?? '');

    if (optionXchangeStep === 'update') {
      updateXchangeStep({
        variables: {
          stepInput: {
            sid: xchangeStepSid,
            xml,
          },
        },
      });
    } else if (optionXchangeStep === 'add' || optionXchangeStep === 'copy') {
      createXchangeStep({
        variables: {
          stepInput: {
            xchangeFileProcessSid,
            xml,
          },
        },
      });
    }
  };

  const addlineBreakeXml = (xmlValue: string) => {
    let xml = '';
    const xmlLen = xmlValue?.length ?? 0;
    if (xmlValue) {
      for (let i = 0; i < xmlLen; i++) {
        if (xmlValue[i] === '>' && xmlValue[i + 1] === '<') {
          xml += `${xmlValue[i]}\n`;
        } else {
          xml += `${xmlValue[i]}`;
        }
      }
    }
    return xml;
  };

  const comparePreviousXml = (editXml: string, preXml: string) => {
    const currentXmlValue = removeLineBreakXml(editXml);
    if (currentXmlValue.trim() !== preXml.trim()) {
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

    if (updateCmd || createCmd) {
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
                    style={{ color: 'black' }}
                  />
                </>
              ) : (
                <>
                  <Text>{dataCopyStep.copyXchangeStep.xml.label}</Text>
                  <IconButton
                    title={dataCopyStep.copyXchangeStep.xml.info}
                    iconProps={{ iconName: 'Info' }}
                    style={{ color: 'black' }}
                  />
                </>
              )}
              <CodeMirror
                height="400px"
                style={{ border: '1px solid gray', fontWeight: 'bold', fontSize: '16px' }}
                theme={myTheme}
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
      return `${updateCmd ? 'New Xchange Step' : 'Copy of'}-${xchangeStepTitle}`;
    }
    return undefined;
  };

  useEffect(() => {
    getxmlData();
  }, [isPanelOpen]);

  useEffect(() => {
    if (!loadingAddStep && dataAddStep) {
      const xmlValue = addlineBreakeXml(dataAddStep.xchangeStepForm.xml.value);
      setEditXmlData(xmlValue);
      setPreviousXmlDate(dataAddStep.xchangeStepForm.xml.value);
    }

    if (dataAddStep?.xchangeStepForm) {
      const pageCommands = dataAddStep?.xchangeStepForm?.commands;
      const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
      setUpdateCmd(_updateCmd);
      setCreateCmd(null);
    }
  }, [dataAddStep, loadingAddStep]);

  useEffect(() => {
    if (!loadingCopyStep && dataCopyStep) {
      const xmlValue = addlineBreakeXml(dataCopyStep.copyXchangeStep.xml.value);
      setEditXmlData(xmlValue);
      setPreviousXmlDate(dataCopyStep.copyXchangeStep.xml.value);
    }

    if (dataCopyStep?.copyXchangeStep) {
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
      Toast.success({ text: `Xchange step updated` });
      closePanel(false);
    }

    if (!loadingUpdateXchange && errorUpdateXchange) {
      Toast.error({ text: `There was an error to update step` });
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
          hiddeIconCopyStep(true);
        }}
      >
        {renderBody()}
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export { XchangeStepPanel };
