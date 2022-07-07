import { IconButton, PanelType, PrimaryButton, Text } from '@fluentui/react';
import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import {
  useXchangeStepFormLazyQuery,
  XchangeStepForm,
  useCreateXchangeStepMutation,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { ThemedPanel, PanelBody, WizardButtonRow, WizardBody } from 'src/layouts/Panels/Panels.styles';

type XchangeAddStepPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  refreshDetailsPage: (data: boolean) => void;
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

const XchangeAddStepPanel = ({
  isPanelOpen,
  closePanel,
  refreshDetailsPage,
  xchangeFileProcessSid,
  xchangeStepSid,
  xchangeStepTitle,
}: XchangeAddStepPanelProps) => {
  const Toast = useNotification();
  const [xchangeStep, setChangeStep] = useState<XchangeStepForm>();
  const [editXmlData, setEditXmlData] = useState<string>();
  const [previousXmlData, setPreviousXmlDate] = useState<string>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [xchangeStepForm, { data: dataAddStep, loading: loadingAddStep }] =
    useQueryHandler(useXchangeStepFormLazyQuery);

  const [createXchangeStepMutation, { data: dataCreateStep, loading: loadingCreateStep, error: errorCreateStep }] =
    useQueryHandler(useCreateXchangeStepMutation);

  const getxmlData = () => {
    xchangeStepForm({
      variables: {
        xchangeFileProcessSid,
        sid: xchangeStepSid,
      },
    });
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const removeLineBreakXml = (xmlValue: string) => xmlValue.split('\n').toString().replace(/,/g, '');

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message =
      'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setUnsavedChanges(false);
      getxmlData();
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
    }
  };

  const saveAddStep = () => {
    const xml = removeLineBreakXml(editXmlData ?? '');
    createXchangeStepMutation({
      variables: {
        stepInput: {
          xchangeFileProcessSid,
          xml,
        },
      },
    });
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
    if (currentXmlValue !== preXml) {
      setUnsavedChanges(true);
      return;
    }
    setUnsavedChanges(false);
  };

  useEffect(() => {
    getxmlData();
  }, []);

  useEffect(() => {
    if (!loadingAddStep && dataAddStep) {
      console.log(dataAddStep);
      const xmlValue = addlineBreakeXml(dataAddStep.xchangeStepForm.xml.value);
      setEditXmlData(xmlValue);
      setPreviousXmlDate(dataAddStep.xchangeStepForm.xml.value);
      setChangeStep(dataAddStep.xchangeStepForm);
    }

    if (dataAddStep?.xchangeStepForm) {
      const pageCommands = dataAddStep?.xchangeStepForm?.commands;
      const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
      setUpdateCmd(_updateCmd);
    }
  }, [dataAddStep, loadingAddStep]);

  useEffect(() => {
    comparePreviousXml(editXmlData ?? '', previousXmlData ?? '');
  }, [editXmlData]);

  useEffect(() => {
    if (!loadingCreateStep && dataCreateStep) {
      Toast.success({ text: 'Xchange step added' });
      refreshDetailsPage(true);
      closePanel(false);
    }

    if (!loadingCreateStep && errorCreateStep) {
      Toast.error({ text: 'There was an error to Create Step' });
    }
  }, [dataCreateStep, loadingCreateStep, errorCreateStep]);

  return (
    <>
      <ThemedPanel
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={xchangeStepTitle ? `Xchange Step-${xchangeStepTitle}` : 'Xchange Step'}
        isOpen={isPanelOpen}
        onDismiss={() => {
          onPanelClose();
        }}
      >
        <PanelBody>
          <WizardBody>
            {updateCmd && xchangeStep?.xml && (
              <>
                {dataAddStep && (
                  <>
                    <Text>{dataAddStep.xchangeStepForm.xml.label}</Text>
                    <IconButton
                      title={dataAddStep.xchangeStepForm.xml.info}
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
            )}
          </WizardBody>
          {updateCmd && (
            <WizardButtonRow>
              <PrimaryButton id="__Xchange_AddStep_Button" iconProps={{ iconName: 'Save' }} onClick={saveAddStep}>
                Save
              </PrimaryButton>
            </WizardButtonRow>
          )}
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export { XchangeAddStepPanel };
