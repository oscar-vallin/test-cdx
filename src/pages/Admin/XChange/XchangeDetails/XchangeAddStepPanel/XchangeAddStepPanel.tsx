import { PanelType, PrimaryButton, TextField } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { useXchangeStepFormLazyQuery, XchangeStepForm, useCreateXchangeStepMutation } from 'src/data/services/graphql';
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

const XchangeAddStepPanel = ({
  isPanelOpen,
  closePanel,
  refreshDetailsPage,
  xchangeFileProcessSid,
  xchangeStepSid,
}: XchangeAddStepPanelProps) => {
  const Toast = useNotification();
  const [xchangeStep, setChangeStep] = useState<XchangeStepForm>();
  const [editXmlData, setEditXmlData] = useState<string>();
  const [previousXmlData, setPreviousXmlDate] = useState<string>();
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

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message =
      'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setUnsavedChanges(false);
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
    createXchangeStepMutation({
      variables: {
        stepInput: {
          xchangeFileProcessSid,
          xml: editXmlData,
        },
      },
    });
  };
  useEffect(() => {
    getxmlData();
  }, []);

  useEffect(() => {
    if (!loadingAddStep && dataAddStep) {
      console.log(dataAddStep);
      setEditXmlData(dataAddStep.xchangeStepForm.xml.value);
      setPreviousXmlDate(dataAddStep.xchangeStepForm.xml.value);
      setChangeStep(dataAddStep.xchangeStepForm);
    }
  }, [dataAddStep, loadingAddStep]);

  useEffect(() => {
    if (editXmlData?.trim() !== previousXmlData?.trim()) {
      setUnsavedChanges(true);
      return;
    }

    setUnsavedChanges(false);
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
        title="New Xchange Step"
        isOpen={isPanelOpen}
        onDismiss={() => {
          onPanelClose();
        }}
      >
        <PanelBody>
          <WizardBody>
            {xchangeStep?.xml && (
              <TextField
                id="AddStepXml"
                label={xchangeStep.xml.label}
                value={editXmlData ?? ''}
                multiline={true}
                rows={20}
                resizable={false}
                onChange={(event, newValue) => setEditXmlData(newValue ?? '')}
              />
            )}
          </WizardBody>
          <WizardButtonRow>
            <PrimaryButton id="__Xchange_AddStep_Button" iconProps={{ iconName: 'Save' }} onClick={saveAddStep}>
              Save
            </PrimaryButton>
          </WizardButtonRow>
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export { XchangeAddStepPanel };
