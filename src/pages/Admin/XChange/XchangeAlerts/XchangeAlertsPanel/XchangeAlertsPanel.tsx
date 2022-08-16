import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  PanelType,
  PrimaryButton,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  useXchangeProfileAlertFormLazyQuery,
  XchangeProfileAlertForm,
  useUpdateXchangeProfileAlertMutation,
} from 'src/data/services/graphql';
import { PanelBody, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useEffect, useState } from 'react';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Container, Row } from 'src/components/layouts';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { AddSubscriberModal } from 'src/containers/modals/AddSubsciberModal/AddSubscriberModal';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';

type XchangeAlertsPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  sid: string;
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

const XchangeAlertsPanel = ({ isPanelOpen, closePanel, sid, refreshXchangeDetails }: XchangeAlertsPanelProps) => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [xchangeProfileAlert, setXchangeProfileAlert] = useState<XchangeProfileAlertForm>();
  const [alertTypesValue, setAlertTypesValue] = useState<string[]>([]);
  const [addSubscriberModal, setAddSubscriberModal] = useState(false);
  const [firstSubscribers, setFirstSubscribers] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState<SubscriberOptionProps[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [xchangeAlertForm, { data: alertFormData, loading: alertFormLoading }] = useQueryHandler(
    useXchangeProfileAlertFormLazyQuery
  );
  const [updateXchangeProfileAlert, { data: updateAlertdata, loading: updateAlertLoading, error: updateAlertError }] =
    useQueryHandler(useUpdateXchangeProfileAlertMutation);

  const fetchDataAlertForm = () => {
    xchangeAlertForm({
      variables: {
        orgSid,
        sid,
      },
    });
  };

  const updateProfileAlert = () => {
    const subscriberSids = totalSubscribers.map((subSids) => subSids.sid);
    updateXchangeProfileAlert({
      variables: {
        alertInput: {
          sid,
          alertTypes: alertTypesValue,
          subscriberSids,
        },
      },
    });
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
    setTotalSubscribers(showSubs);
  };

  const removeSubscriber = (removeBySid: string) => {
    setUnsavedChanges(true);
    setTotalSubscribers(totalSubscribers.filter((subscriber: SubscriberOptionProps) => subscriber.sid !== removeBySid));
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
    if (unsavedChanges || firstSubscribers < totalSubscribers.length) {
      showUnsavedChangesDialog();
    } else {
      closePanel(false);
    }
  };

  useEffect(() => {
    if (isPanelOpen) {
      fetchDataAlertForm();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!alertFormLoading && alertFormData) {
      const { xchangeProfileAlertForm } = alertFormData;
      setXchangeProfileAlert(xchangeProfileAlertForm);
      if (xchangeProfileAlertForm.subscribers.value.length > 0) {
        subscribersList(xchangeProfileAlertForm.subscribers.value);
      }
    }
  }, [alertFormData, alertFormLoading]);

  useEffect(() => {
    if (!updateAlertLoading && updateAlertdata) {
      refreshXchangeDetails(true);
      Toast.success({ text: 'Alert updated' });
      closePanel(false);
    }

    if (!updateAlertLoading && updateAlertError) {
      Toast.error({ text: 'There was an error to updated alert' });
    }
  }, [updateAlertdata, updateAlertLoading, updateAlertError]);

  const onRenderAction = (item: any) => {
    return <IconButton iconProps={{ iconName: 'Trash' }} onClick={() => removeSubscriber(item.sid)} />;
  };

  const columns: IColumn[] = [
    {
      name: 'Subscribers',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 180,
      maxWidth: 600,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'email',
      fieldName: 'email',
      data: 'string',
      isPadded: true,
      minWidth: 180,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      onRender: onRenderAction,
    },
  ];

  const onRenderItemColum = (item, index, column) => {
    let columnVal: string | undefined;
    if (column?.key === 'name') {
      columnVal = item?.name;
    } else if (column?.key === 'email') {
      columnVal = item?.email;
    }
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <ButtonLink>{columnVal}</ButtonLink>
      </Stack>
    );
  };

  const renderBody = () => {
    if (alertFormLoading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading alert form" />
        </Spacing>
      );
    }

    return (
      <PanelBody>
        <Container>
          <Row>
            <Column lg="12">
              <UIInputMultiSelect
                id="__AlertTypes"
                value={alertTypesValue}
                uiField={xchangeProfileAlert?.alertTypes}
                options={xchangeProfileAlert?.options}
                onChange={(alertTypes) => {
                  setUnsavedChanges(true);
                  setAlertTypesValue(alertTypes ?? []);
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <DetailsList
                items={totalSubscribers ?? []}
                columns={columns}
                selectionMode={SelectionMode.none}
                onRenderItemColumn={onRenderItemColum}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible
              />
            </Column>
          </Row>
          <ButtonAction onClick={() => setAddSubscriberModal(true)}>+ Add Subscriber</ButtonAction>
          <Spacing margin={{ top: 'normal' }}>
            <PrimaryButton id="__Update__Alert" iconProps={{ iconName: 'Save' }} onClick={() => updateProfileAlert()}>
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
      headerText="Update Alert"
      isOpen={isPanelOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      {addSubscriberModal && (
        <AddSubscriberModal
          isOpen={setAddSubscriberModal}
          open={addSubscriberModal}
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
