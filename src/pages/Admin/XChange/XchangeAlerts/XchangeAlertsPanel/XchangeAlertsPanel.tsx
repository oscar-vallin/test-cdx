import { useEffect, useState } from 'react';
import {
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  useXchangeProfileAlertFormLazyQuery,
  useXchangeConfigAlertFormLazyQuery,
  XchangeProfileAlertForm,
  useUpdateXchangeProfileAlertMutation,
  useCreateXchangeProfileAlertMutation,
  XchangeConfigAlertForm,
  useCreateXchangeConfigAlertMutation,
  useUpdateXchangeConfigAlertMutation,
  WebCommand,
  CdxWebCommandType,
  UiSelectManyField,
  UiSelectOneField,
} from 'src/data/services/graphql';
import {
  PanelBody,
  PanelHeader,
  PanelTitle,
  ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { UIInputMultiSelect, UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { SubscribersList } from 'src/components/subscribers/SubscribersList';
import { AddSubscriberModal } from 'src/containers/modals/AddSubsciberModal/AddSubscriberModal';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { InputText } from 'src/components/inputs/InputText';

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
  const [filenameQualifieruiField, setFilenameQualifieruiField] = useState<UiSelectOneField>()
  const [customQualifier, setCustomQualifier] = useState<boolean>();
  const [optionAlerts, setOptionAlerts] = useState([]);
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

  const [profileAlertForm,
    { data: alertProfileFormData, loading: alertProfileFormLoading },
  ] = useQueryHandler(
    useXchangeProfileAlertFormLazyQuery,
  );
  const [configAlertForm,
    { data: alertConfigFormData, loading: alertConfigFormLoading },
  ] = useQueryHandler(
    useXchangeConfigAlertFormLazyQuery,
  );
  const [createXchangeConfigAlert,
    { data: createConfigData, loading: createConfigloading, error: createConfigError },
  ] = useQueryHandler(useCreateXchangeConfigAlertMutation);

  const [updateXchangeConfigAlert,
    { data: updateConfigData, loading: updateConfigLoading, error: updateConfigerror },
  ] = useQueryHandler(useUpdateXchangeConfigAlertMutation);

  const [
    updateXchangeProfileAlert,
    { data: updateProfiledata, loading: updateProfileLoading, error: updateProfileError },
  ] = useQueryHandler(useUpdateXchangeProfileAlertMutation);

  const [
    createXchangeProfileAlert,
    { data: createProfileData, loading: createProfileLoading, error: createProfileError },
  ] = useQueryHandler(useCreateXchangeProfileAlertMutation);

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

  const saveProfileAlert = () => {
    const subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
    if (updateCmd) {
      updateXchangeProfileAlert({
        variables: {
          alertInput: {
            sid,
            alertTypes: alertTypesValue,
            subscriberSids,
          },
        },
      });
    }

    if (createCmd) {
      createXchangeProfileAlert({
        variables: {
          alertInput: {
            orgSid,
            alertTypes: alertTypesValue,
            subscriberSids,
          },
        },
      });
    }
  };

  const saveConfigAlert = () => {
    const subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
    if (createCmd) {
      createXchangeConfigAlert({
        variables: {
          alertInput: {
            orgSid,
            coreFilename,
            filenameQualifier,
            alertTypes: alertTypesValue,
            subscriberSids,
          },
        },
      });
    }

    if (updateCmd) {
      updateXchangeConfigAlert({
        variables: {
          alertInput: {
            sid,
            filenameQualifier,
            alertTypes: alertTypesValue,
            subscriberSids,
          },
        },
      });
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

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made to this Xchange step will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      setMessage(null);
      closePanel(false);
      setTotalSubscribers([]);
      setUnsavedChanges(false);
      setAlertTypesValue(undefined);
      setXchangeConfigAlert(null);
      setXchangeProfileAlert(null);
      setFilenameQualifier('');
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
      setTotalSubscribers([]);
      setXchangeConfigAlert(null);
      setAlertTypesValue(undefined);
      setXchangeProfileAlert(null);
      setUnsavedChanges(false);
      setFilenameQualifier('');
      setMessage(null);
      closePanel(false);
    }
  };

  useEffect(() => {
    if (isPanelOpen) {
      fetchDataAlertForm();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!alertProfileFormLoading && alertProfileFormData) {
      const { xchangeProfileAlertForm } = alertProfileFormData;
      setUnsavedChanges(false);
      setXchangeProfileAlert(xchangeProfileAlertForm);
      if (xchangeProfileAlertForm?.alertTypes.value
        && xchangeProfileAlertForm?.alertTypes.value.length > 0) {
        setAlertTypesValue(xchangeProfileAlertForm?.alertTypes.value.map((alert) => alert.value));
      }
      if (xchangeProfileAlertForm.subscribers.value
        && xchangeProfileAlertForm.subscribers.value.length > 0) {
        subscribersList(xchangeProfileAlertForm.subscribers.value);
      }

      if (xchangeProfileAlertForm?.options) {
        setOptionAlerts(xchangeProfileAlertForm?.options);
      }

      if (xchangeProfileAlertForm?.alertTypes) {
        setAlertTypes(xchangeProfileAlertForm?.alertTypes);
      }

      if (xchangeProfileAlertForm?.commands) {
        const pageCommands = xchangeProfileAlertForm?.commands;
        const _updateCmd = pageCommands
          ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        const _createCmd = pageCommands
          ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
      }
    }
  }, [alertProfileFormData, alertProfileFormLoading]);

  useEffect(() => {
    if (!alertConfigFormLoading && alertConfigFormData) {
      const { xchangeConfigAlertForm } = alertConfigFormData;
      setUnsavedChanges(false);
      setXchangeConfigAlert(xchangeConfigAlertForm);
      if (xchangeConfigAlertForm?.alertTypes.value
        && xchangeConfigAlertForm?.alertTypes.value.length > 0) {
        setAlertTypesValue(xchangeConfigAlertForm?.alertTypes.value.map((alert) => alert.value));
      } else {
        setAlertTypesValue([]);
      }
      if (xchangeConfigAlertForm.subscribers.value
        && xchangeConfigAlertForm.subscribers.value.length > 0) {
        subscribersList(xchangeConfigAlertForm.subscribers.value);
      }

      if (xchangeConfigAlertForm?.options) {
        setOptionAlerts(xchangeConfigAlertForm?.options);
      }

      if (xchangeConfigAlertForm?.alertTypes) {
        setAlertTypes(xchangeConfigAlertForm?.alertTypes);
      }
      const filename = { ...xchangeConfigAlertForm?.filenameQualifier }
      filename.label = 'Enviroment';
      filename.info = null;
      setFilenameQualifieruiField(filename);
      if (xchangeConfigAlertForm?.filenameQualifier.value
        && xchangeConfigAlertForm?.filenameQualifier.value.value) {
        setFilenameQualifier(xchangeConfigAlertForm?.filenameQualifier.value.value ?? '');
        xchangeConfigAlertForm.filenameQualifier.label = 'Enviroment';
        const filenameQualifierValue = xchangeConfigAlertForm?.filenameQualifier.value.value;
        const customQualifierValue = xchangeConfigAlertForm.options
          .find((opt) => opt.key === 'filenameQualifier').values.find((val) => val.value === filenameQualifierValue);
        if (!customQualifierValue && filenameQualifierValue) {
          setCustomQualifier(true);
        }
      } else {
        setFilenameQualifier('')
      }

      if (xchangeConfigAlertForm?.commands) {
        const pageCommands = xchangeConfigAlertForm?.commands;
        const _updateCmd = pageCommands
          ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        const _createCmd = pageCommands
          ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
      }
    }
  }, [alertConfigFormData, alertConfigFormLoading]);

  useEffect(() => {
    if (!updateProfileLoading && updateProfiledata) {
      refreshPage(true);
      setMessage(null);
      setTotalSubscribers([]);
      Toast.success({ text: 'Alert updated' });
      closePanel(false);
    }

    if (!updateProfileLoading && updateProfileError) {
      Toast.error({ text: 'There was an error to updated alert' });
    }
  }, [updateProfiledata, updateProfileLoading, updateProfileError]);

  useEffect(() => {
    if (!createProfileLoading && createProfileData) {
      refreshPage(true);
      setMessage(null);
      setTotalSubscribers([]);
      Toast.success({ text: 'Alert Added' });
      closePanel(false);
    }

    if (!createProfileLoading && createProfileError) {
      Toast.error({ text: 'There was an error to add alert' });
    }
  }, [createProfileData, createProfileLoading, createProfileError]);

  useEffect(() => {
    if (!createConfigloading && createConfigData) {
      refreshPage(true);
      setMessage(null);
      setTotalSubscribers([]);
      Toast.success({ text: 'Alert Added' });
      closePanel(false);
    }

    if (!createConfigloading && createConfigError) {
      Toast.error({ text: 'There was an error to add alert' });
    }
  }, [createConfigData, createConfigloading, createConfigError]);

  useEffect(() => {
    if (!updateConfigLoading && updateConfigData) {
      refreshPage(true);
      setMessage(null);
      setTotalSubscribers([]);
      Toast.success({ text: 'Alert updated' });
      closePanel(false);
    }

    if (!updateConfigLoading && updateConfigerror) {
      Toast.error({ text: 'There was an error to updated alert' });
    }
  }, [updateConfigData, updateConfigLoading, updateConfigerror]);

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
                    uiField={filenameQualifieruiField}
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
                  {!customQualifier ? 'use a custom qualifier' : 'use a standar enviroment-based qualifier'}
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
                if (!alertTypesValue?.length || !filenameQualifier) {
                  setMessageType(MessageBarType.error);
                  setMessage('Complete the required fields');
                  return;
                }
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
