import { useEffect, useState } from 'react';
import {
  MessageBar,
  MessageBarType,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  AlertType,
  CdxWebCommandType,
  UiOptions,
  UiSelectManyField,
  UiSelectOneField,
  useCreateXchangeConfigAlertMutation,
  useCreateXchangeProfileAlertMutation,
  useUpdateXchangeConfigAlertMutation,
  useUpdateXchangeProfileAlertMutation,
  useXchangeConfigAlertFormLazyQuery,
  useXchangeProfileAlertFormLazyQuery,
  WebCommand,
  XchangeConfigAlertForm,
  XchangeProfileAlertForm,
} from 'src/data/services/graphql';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { UIInputMultiSelect, UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { SubscribersList } from 'src/components/subscribers/SubscribersList';
import { AddSubscriberModal } from 'src/containers/modals/AddSubsciberModal/AddSubscriberModal';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { InputText } from 'src/components/inputs/InputText';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { getEnumByValue } from 'src/utils/CDXUtils';

type XchangeAlertsPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  sid?: string;
  coreFilename?: string;
  refreshPage: (data: boolean) => void;
};

export type SubscriberOptionProps = {
  name?: string;
  email?: string;
  sid: string;
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

const XchangeAlertsPanel = ({
  isPanelOpen,
  closePanel,
  sid,
  coreFilename,
  refreshPage,
}: XchangeAlertsPanelProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [xchangeProfileAlert, setXchangeProfileAlert] = useState<XchangeProfileAlertForm | null>();
  const [xchangeConfigAlert, setXchangeConfigAlert] = useState<XchangeConfigAlertForm | null>();
  const [filenameQualifier, setFilenameQualifier] = useState('');
  const [filenameQualifierUIField, setFilenameQualifierUIField] = useState<UiSelectOneField>();
  const [customQualifier, setCustomQualifier] = useState<boolean>();
  const [optionAlerts, setOptionAlerts] = useState<UiOptions[]>([]);
  const [alertTypes, setAlertTypes] = useState<UiSelectManyField>();
  const [alertTypesValue, setAlertTypesValue] = useState<string[]>();
  const [addSubscriberModal, setAddSubscriberModal] = useState(false);
  const [firstSubscribers, setFirstSubscribers] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState<SubscriberOptionProps[]>([]);
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const handleError = ErrorHandler();

  const [profileAlertForm,
    { data: alertProfileFormData, loading: alertProfileFormLoading, error: alertProfileFormError },
  ] = useXchangeProfileAlertFormLazyQuery();
  const [configAlertForm,
    { data: alertConfigFormData, loading: alertConfigFormLoading, error: configFormError },
  ] = useXchangeConfigAlertFormLazyQuery();

  const [createXchangeConfigAlert,
    { data: createConfigData, loading: createConfigLoading, error: createConfigError },
  ] = useCreateXchangeConfigAlertMutation();

  const [updateXchangeConfigAlert,
    { data: updateConfigData, loading: updateConfigLoading, error: updateConfigError },
  ] = useUpdateXchangeConfigAlertMutation();

  const [
    updateXchangeProfileAlert,
    { data: updateProfileData, loading: updateProfileLoading, error: updateProfileError },
  ] = useUpdateXchangeProfileAlertMutation();

  const [
    createXchangeProfileAlert,
    { data: createProfileData, loading: createProfileLoading, error: createProfileError },
  ] = useCreateXchangeProfileAlertMutation();

  useEffect(() => {
    handleError(alertProfileFormError);
  }, [alertProfileFormError]);
  useEffect(() => {
    handleError(configFormError);
  }, [configFormError]);
  useEffect(() => {
    handleError(createConfigError);
  }, [createConfigError]);
  useEffect(() => {
    handleError(updateConfigError);
  }, [updateConfigError]);
  useEffect(() => {
    handleError(updateProfileError);
  }, [updateProfileError]);
  useEffect(() => {
    handleError(createProfileError);
  }, [createProfileError]);

  const fetchDataAlertForm = () => {
    if (coreFilename) {
      configAlertForm({
        variables: {
          orgSid,
          coreFilename,
          sid,
        },
      });
    } else {
      profileAlertForm({
        variables: {
          orgSid,
          sid,
        },
      });
    }
  };

  const alertTypesEnums = (): AlertType[] | undefined => alertTypesValue
    ?.map((value) => (getEnumByValue(AlertType, value) as AlertType));

  const saveProfileAlert = () => {
    const subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
    if (updateCmd && sid != null) {
      updateXchangeProfileAlert({
        variables: {
          alertInput: {
            sid,
            alertTypes: alertTypesEnums(),
            subscriberSids,
          },
        },
      }).then();
    }

    if (createCmd) {
      createXchangeProfileAlert({
        variables: {
          alertInput: {
            orgSid,
            alertTypes: alertTypesEnums(),
            subscriberSids,
          },
        },
      }).then();
    }
  };

  const saveConfigAlert = () => {
    const subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
    if (createCmd && coreFilename) {
      createXchangeConfigAlert({
        variables: {
          alertInput: {
            orgSid,
            coreFilename,
            filenameQualifier,
            alertTypes: alertTypesEnums(),
            subscriberSids,
          },
        },
      }).then();
    }

    if (updateCmd && sid) {
      updateXchangeConfigAlert({
        variables: {
          alertInput: {
            sid,
            filenameQualifier,
            alertTypes: alertTypesEnums(),
            subscriberSids,
          },
        },
      }).then();
    }
  };

  const subscribersList = (subscribers) => {
    const showSubs: any[] = [];
    let sub = {};
    for (let subscriber = 0; subscriber < subscribers.length; subscriber++) {
      sub['name'] = subscribers[subscriber].name;
      sub['email'] = subscribers[subscriber].email;
      sub['sid'] = subscribers[subscriber].value;
      showSubs.push(sub);
      sub = {};
    }
    setFirstSubscribers(showSubs.length);
    setTotalSubscribers((prevValues) => prevValues.concat(showSubs));
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const hidePanel = () => {
    setTotalSubscribers([]);
    setXchangeConfigAlert(null);
    setAlertTypesValue(undefined);
    setXchangeProfileAlert(null);
    setUnsavedChanges(false);
    setFilenameQualifier('');
    setMessage(null);
    closePanel(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      hidePanel();
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const onPanelClose = () => {
    if (unsavedChanges || firstSubscribers < totalSubscribers.length) {
      showUnsavedChangesDialog();
    } else {
      hidePanel();
    }
  };

  useEffect(() => {
    if (isPanelOpen) {
      fetchDataAlertForm();
    }
  }, [isPanelOpen]);

  const updateFormFromProfileAlert = (form: XchangeProfileAlertForm) => {
    setXchangeProfileAlert(form);
    if (form?.alertTypes.value
      && form?.alertTypes.value.length > 0) {
      setAlertTypesValue(form?.alertTypes.value.map((alert) => alert.value));
    }
    if (form?.subscribers.value
      && form.subscribers.value.length > 0) {
      subscribersList(form.subscribers.value);
    }

    if (form?.options) {
      setOptionAlerts(form?.options ?? []);
    }

    if (form?.alertTypes) {
      setAlertTypes(form?.alertTypes);
    }

    if (form?.commands) {
      const pageCommands = form?.commands;
      const _updateCmd = pageCommands
        ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
      setUpdateCmd(_updateCmd);
      const _createCmd = pageCommands
        ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
    }
  };

  useEffect(() => {
    if (!alertProfileFormLoading && alertProfileFormData) {
      const { xchangeProfileAlertForm } = alertProfileFormData;
      if (xchangeProfileAlertForm) {
        updateFormFromProfileAlert(xchangeProfileAlertForm);
      }
    }
  }, [alertProfileFormData, alertProfileFormLoading]);

  const updateFormFromXchangeConfigAlert = (form: XchangeConfigAlertForm) => {
    setXchangeConfigAlert(form);
    if (form.alertTypes.value
      && form.alertTypes.value.length > 0) {
      setAlertTypesValue(form?.alertTypes.value.map((alert) => alert.value));
    } else {
      setAlertTypesValue([]);
    }
    if (form.subscribers.value
      && form.subscribers.value.length > 0) {
      subscribersList(form.subscribers.value);
    }

    if (form?.options) {
      setOptionAlerts(form?.options);
    }

    if (form.alertTypes) {
      setAlertTypes(form.alertTypes);
    }
    const qualifierField: UiSelectOneField = {
      ...form.filenameQualifier,
      label: form.filenameQualifier.label ?? '',
      required: form.filenameQualifier.required ?? true,
      visible: form.filenameQualifier?.visible ?? true,
    }
    qualifierField.label = 'Environment';
    qualifierField.info = null;
    setFilenameQualifierUIField(qualifierField);
    if (form.filenameQualifier.value
      && form.filenameQualifier.value.value) {
      setFilenameQualifier(form.filenameQualifier.value.value ?? '');
      form.filenameQualifier.label = 'Environment';
      const filenameQualifierValue = form.filenameQualifier.value.value;
      const customQualifierValue = form.options
        ?.find((opt) => opt.key === 'filenameQualifier')
        ?.values
        ?.find((val) => val.value === filenameQualifierValue);
      if (!customQualifierValue && filenameQualifierValue) {
        setCustomQualifier(true);
      }
    } else {
      setFilenameQualifier('')
    }

    if (form.commands) {
      const pageCommands = form.commands;
      const _updateCmd = pageCommands
        ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
      setUpdateCmd(_updateCmd);
      const _createCmd = pageCommands
        ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
    }
  };

  useEffect(() => {
    if (!alertConfigFormLoading && alertConfigFormData) {
      const { xchangeConfigAlertForm } = alertConfigFormData;
      if (xchangeConfigAlertForm) {
        updateFormFromXchangeConfigAlert(xchangeConfigAlertForm);
      }
    }
  }, [alertConfigFormData, alertConfigFormLoading]);

  useEffect(() => {
    if (!updateProfileLoading && updateProfileData) {
      if (updateProfileData.updateXchangeProfileAlert?.response === 'SUCCESS') {
        setUnsavedChanges(false);
        refreshPage(true);
        setTotalSubscribers([]);
        Toast.success({ text: 'Alert updated' });
        closePanel(false);
      } else {
        if (updateProfileData.updateXchangeProfileAlert) {
          updateFormFromProfileAlert(updateProfileData.updateXchangeProfileAlert);
          setMessage(updateProfileData.updateXchangeProfileAlert.errMsg);
        }
        setMessageType(MessageBarType.error);
      }
    }
  }, [updateProfileData, updateProfileLoading]);

  useEffect(() => {
    if (!createProfileLoading && createProfileData) {
      if (createProfileData.createXchangeProfileAlert?.response === 'SUCCESS') {
        setUnsavedChanges(false);
        refreshPage(true);
        setTotalSubscribers([]);
        Toast.success({ text: 'Alert Added' });
        closePanel(false);
      } else {
        if (createProfileData.createXchangeProfileAlert) {
          updateFormFromProfileAlert(createProfileData.createXchangeProfileAlert);
          setMessage(createProfileData.createXchangeProfileAlert.errMsg);
        }
        setMessageType(MessageBarType.error);
      }
    }
  }, [createProfileData, createProfileLoading]);

  useEffect(() => {
    if (!createConfigLoading && createConfigData) {
      if (createConfigData.createXchangeConfigAlert?.response === 'SUCCESS') {
        setUnsavedChanges(false);
        refreshPage(true);
        setTotalSubscribers([]);
        Toast.success({ text: 'Alert Added' });
        closePanel(false);
      } else {
        if (createConfigData.createXchangeConfigAlert) {
          updateFormFromXchangeConfigAlert(createConfigData.createXchangeConfigAlert);
          setMessage(createConfigData.createXchangeConfigAlert.errMsg);
        }
        setMessageType(MessageBarType.error);
      }
    }
  }, [createConfigData, createConfigLoading]);

  useEffect(() => {
    if (!updateConfigLoading && updateConfigData) {
      if (updateConfigData.updateXchangeConfigAlert?.response === 'SUCCESS') {
        setUnsavedChanges(false);
        refreshPage(true);
        setTotalSubscribers([]);
        Toast.success({ text: 'Alert updated' });
        closePanel(false);
      } else {
        if (updateConfigData.updateXchangeConfigAlert) {
          updateFormFromXchangeConfigAlert(updateConfigData.updateXchangeConfigAlert);
          setMessage(updateConfigData.updateXchangeConfigAlert.errMsg);
        }
        setMessageType(MessageBarType.error);
      }
    }
  }, [updateConfigData, updateConfigLoading]);

  const renderBody = () => {
    if (alertProfileFormLoading || alertConfigFormLoading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading alert form" />
        </Spacing>
      );
    }

    return (
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__TransmissionPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        <Container>
          {xchangeConfigAlert?.filenameQualifier.visible && (
            <Row>
              <Column lg="12">
                {!customQualifier ? (
                  <UIInputSelectOne
                    id="filenameQualifier"
                    value={filenameQualifier}
                    uiField={filenameQualifierUIField}
                    options={optionAlerts}
                    onChange={(newValue) => {
                      setUnsavedChanges(true);
                      setFilenameQualifier(newValue ?? '');
                    }}
                  />
                ) : (
                  <InputText
                    id="__filenameQualifier"
                    value={filenameQualifier}
                    label="Filename Qualifier"
                    info={xchangeConfigAlert.filenameQualifier.info ?? ''}
                    required={xchangeConfigAlert.filenameQualifier.required}
                    onChange={(_event, newValue) => {
                      setUnsavedChanges(true);
                      setFilenameQualifier(newValue ?? '');
                    }}
                  />
                )}
                <ButtonLink onClick={() => setCustomQualifier((prevState) => !prevState)}>
                  {!customQualifier ? 'use a custom qualifier' : 'use a standard environment-based qualifier'}
                </ButtonLink>
              </Column>
            </Row>
          )}
          <Row>
            <Column lg="12">
              <UIInputMultiSelect
                id="__AlertTypes"
                value={alertTypesValue}
                uiField={alertTypes}
                options={optionAlerts}
                onChange={(types) => {
                  setUnsavedChanges(true);
                  setAlertTypesValue(types ?? []);
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <SubscribersList
                currentSubscribers={totalSubscribers}
                totalSubscribers={setTotalSubscribers}
                title={true}
              />
            </Column>
          </Row>
          <ButtonAction onClick={() => setAddSubscriberModal(true)} iconName="add">
            Add person to be notified
          </ButtonAction>
          <Spacing margin={{ top: 'normal' }}>
            <PrimaryButton
              id="__Update__Alert"
              iconProps={{ iconName: 'Save' }}
              onClick={() => {
                if (xchangeProfileAlert) {
                  saveProfileAlert();
                }
                if (xchangeConfigAlert) {
                  saveConfigAlert();
                }
              }}
            >
              Save
            </PrimaryButton>
          </Spacing>
        </Container>
      </PanelBody>
    );
  };

  const renderPanelHeader = () => {
    const titleUpdate = coreFilename ? 'Update Alert' : 'Update Global Alert';
    const titleCreate = coreFilename ? 'Create Alert' : 'Global Alert';
    return (
      <PanelHeader id="__XchangeAlert_PanelHeader">
        <Container>
          <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
            <PanelTitle id="__AccessPolicyMembers_Panel_Title" variant="bold" size="large">
              {updateCmd ? `${titleUpdate} ${coreFilename}` : titleCreate}
            </PanelTitle>
          </Stack>
        </Container>
      </PanelHeader>
    );
  };

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      onRenderHeader={renderPanelHeader}
      isOpen={isPanelOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      {addSubscriberModal && (
        <AddSubscriberModal
          isOpen={setAddSubscriberModal}
          orgSid={orgSid}
          currentSubscribers={totalSubscribers}
          addSubscribers={setTotalSubscribers}
        />
      )}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  );
};

export { XchangeAlertsPanel };
