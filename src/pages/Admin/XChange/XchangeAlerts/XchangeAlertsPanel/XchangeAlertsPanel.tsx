import { useEffect, useState } from 'react';
import {
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
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
} from 'src/data/services/graphql';
import { PanelBody, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { UIInputMultiSelect, UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { AddSubscriberModal } from 'src/containers/modals/AddSubsciberModal/AddSubscriberModal';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { InputText } from 'src/components/inputs/InputText';
import { SubscribersList } from 'src/components/subscribers';

type XchangeAlertsPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  sid?: string;
  coreFilename?: string;
  refreshXchangeDetails: (data: boolean) => void;
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
  refreshXchangeDetails,
}: XchangeAlertsPanelProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [xchangeProfileAlert, setXchangeProfileAlert] = useState<XchangeProfileAlertForm | null>();
  const [xchangeConfigAlert, setXchangeConfigAlert] = useState<XchangeConfigAlertForm | null>();
  const [filenameQualifier, setFilenameQualifier] = useState('');
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
      closePanel(false);
      setTotalSubscribers([]);
      setUnsavedChanges(false);
      setAlertTypesValue([]);
      setXchangeConfigAlert(null);
      setXchangeProfileAlert(null);
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
      setAlertTypesValue([]);
      setXchangeConfigAlert(null);
      setXchangeProfileAlert(null);
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
      setXchangeProfileAlert(xchangeProfileAlertForm);
      if (xchangeProfileAlertForm?.alertTypes.value && xchangeProfileAlertForm?.alertTypes.value.length > 0) {
        setAlertTypesValue(xchangeProfileAlertForm?.alertTypes.value.map((alert) => alert.value));
      }
      if (xchangeProfileAlertForm.subscribers.value && xchangeProfileAlertForm.subscribers.value.length > 0) {
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
        const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
      }
    }
  }, [alertProfileFormData, alertProfileFormLoading]);

  useEffect(() => {
    if (!alertConfigFormLoading && alertConfigFormData) {
      const { xchangeConfigAlertForm } = alertConfigFormData;
      setXchangeConfigAlert(xchangeConfigAlertForm);
      if (xchangeConfigAlertForm?.alertTypes.value && xchangeConfigAlertForm?.alertTypes.value.length > 0) {
        setAlertTypesValue(xchangeConfigAlertForm?.alertTypes.value.map((alert) => alert.value));
      }
      if (xchangeConfigAlertForm.subscribers.value && xchangeConfigAlertForm.subscribers.value.length > 0) {
        subscribersList(xchangeConfigAlertForm.subscribers.value);
      }

      if (xchangeConfigAlertForm?.options) {
        setOptionAlerts(xchangeConfigAlertForm?.options);
      }

      if (xchangeConfigAlertForm?.alertTypes) {
        setAlertTypes(xchangeConfigAlertForm?.alertTypes);
      }

      if (xchangeConfigAlertForm?.filenameQualifier.value.value) {
        setFilenameQualifier(xchangeConfigAlertForm?.filenameQualifier.value.value ?? '');
      }

      if (xchangeConfigAlertForm?.commands) {
        const pageCommands = xchangeConfigAlertForm?.commands;
        const _updateCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
        const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
      }
    }
  }, [alertConfigFormData, alertConfigFormLoading]);

  useEffect(() => {
    if (!updateProfileLoading && updateProfiledata) {
      refreshXchangeDetails(true);
      Toast.success({ text: 'Alert updated' });
      closePanel(false);
    }

    if (!updateProfileLoading && updateProfileError) {
      Toast.error({ text: 'There was an error to updated alert' });
    }
  }, [updateProfiledata, updateProfileLoading, updateProfileError]);

  useEffect(() => {
    if (!createProfileLoading && createProfileData) {
      refreshXchangeDetails(true);
      Toast.success({ text: 'Alert Added' });
      closePanel(false);
    }

    if (!createProfileLoading && createProfileError) {
      Toast.error({ text: 'There was an error to add alert' });
    }
  }, [createProfileData, createProfileLoading, createProfileError]);

  useEffect(() => {
    if (!createConfigloading && createConfigData) {
      refreshXchangeDetails(true);
      Toast.success({ text: 'Alert Added' });
      closePanel(false);
    }

    if (!createConfigloading && createConfigError) {
      Toast.error({ text: 'There was an error to add alert' });
    }
  }, [createConfigData, createConfigloading, createConfigError]);

  useEffect(() => {
    if (!updateConfigLoading && updateConfigData) {
      refreshXchangeDetails(true);
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
        <Container>
          {xchangeConfigAlert?.filenameQualifier.visible && (
            <Row>
              <Column lg="12">
                {!customQualifier ? (
                  <UIInputSelectOne
                    id="filenameQualifier"
                    value={filenameQualifier}
                    uiField={xchangeConfigAlert.filenameQualifier}
                    options={optionAlerts}
                    onChange={(newValue) => setFilenameQualifier(newValue ?? '')}
                  />
                ) : (
                  <InputText
                    id="__filenameQualifier"
                    value={filenameQualifier}
                    label="Enviroment"
                    required={xchangeConfigAlert.filenameQualifier.required}
                    onChange={(_event, newValue) => setFilenameQualifier(newValue ?? '')}
                  />
                )}
                <ButtonLink onClick={() => setCustomQualifier((prevState) => !prevState)}>
                  use a custom qualifier
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
              />
            </Column>
          </Row>
          <ButtonAction onClick={() => setAddSubscriberModal(true)} iconName="add">
            Add Subscriber
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

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText={updateCmd ? 'Update Alert' : 'Create Alert'}
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
