import React, { useEffect, useState } from 'react';
import {
  Dialog,
  PrimaryButton,
  DefaultButton,
  DialogFooter,
  Spinner,
  SpinnerSize,
  Stack,
  Checkbox,
} from '@fluentui/react';
import { Text } from 'src/components/typography/Text';
import {
  useFindAvailableAlertsLazyQuery,
  useSubscribeToAlertMutation,
  AvailableAlert,
  SubscriptionType,
} from 'src/data/services/graphql';
import { Spacing } from 'src/components/spacings/Spacing';
import { formatInfoTooltip } from 'src/components/inputs/CheckboxList';
import { InlineLabel } from 'src/components/inputs/InputCheck/UIInputCheck.styles';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { useNotification } from 'src/hooks/useNotification';

const defaultProps = {
  isOpen: (data: boolean) => {},
  refreshPage: (data: boolean) => {},
};

type ALertsModalProps = {
  isOpen: (data: boolean) => void;
  refreshPage: (data: boolean) => void;
} & typeof defaultProps;

export const AddAlertsModal = ({ isOpen, refreshPage }: ALertsModalProps) => {
  const Toast = useNotification();
  const [schedule, setSchedule] = useState<AvailableAlert[]| null>();
  const [processingAlerts, setProcessingAlerts] = useState<AvailableAlert[] | null>();
  const [sid, setSid] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [findAlerts,
    {
      data: findAlertsdata,
      loading: isLoadingAlerts,
    },
  ] = useFindAvailableAlertsLazyQuery();
  const [subscribeToAlert,
    {
      data: subscribeToAlertData,
    },
  ] = useSubscribeToAlertMutation()

  const fetchData = () => {
    findAlerts({
      variables: {},
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoadingAlerts && findAlertsdata) {
      const { findAvailableAlerts } = findAlertsdata;
      setSchedule(findAvailableAlerts?.schedules);
      setProcessingAlerts(findAvailableAlerts?.processingAlerts);
    }
  }, [findAlertsdata, isLoadingAlerts]);

  useEffect(() => {
    const response = subscribeToAlertData?.subscribeToAlert;
    if (subscribeToAlertData) {
      const responseCode = response?.response;
      if (responseCode === 'SUCCESS') {
        isOpen(false);
        refreshPage(true);
        Toast.success({ text: 'Alerts have been updated' });
      }
    }
  }, [subscribeToAlertData])

  const renderBody = () => {
    if (isLoadingAlerts) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading alerts" />
        </Spacing>
      );
    }

    const renderLabel = (alert: AvailableAlert) => (
      <span>
        <InlineLabel>{alert?.name}</InlineLabel>
        <InfoIcon id="$_Info" tooltip={formatInfoTooltip(alert?.info ?? '')} />
      </span>
    );

    return (
      <Stack style={{ height: '300px', overflowY: 'scroll' }}>
        <Spacing margin={{ bottom: 'normal' }}>
          <Text variant="bold">Xchange Processing Alerts</Text>
        </Spacing>
        {processingAlerts?.map((alert, indexAlert) => (
          <Checkbox
            key={indexAlert}
            label={alert.name}
            onRenderLabel={() => renderLabel(alert)}
            onChange={() => {
              setSid(alert.sid ?? '');
              setSubscriptionType(alert.subscriptionType ?? '');
            }}
          />
        ))}
        <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
          <Text variant="bold">Missed Schedule Alerts</Text>
        </Spacing>
        {schedule?.map((alert, indexAlert) => (
          <Checkbox
            key={indexAlert}
            label={alert.name}
            onRenderLabel={() => renderLabel(alert)}
            onChange={() => {
              setSid(alert.sid ?? '');
              setSubscriptionType(alert.subscriptionType ?? '');
            }}
          />
        ))}
      </Stack>
    )
  };

  const saveAlert = () => {
    let subsType = '';
    if (subscriptionType === 'XCHANGE_PROFILE') {
      subsType = 'XchangeProfile';
    } else if (subscriptionType === 'XCHANGE_CONFIG') {
      subsType = 'XchangeConfig';
    } else if (subscriptionType === 'XCHANGE_SCHEDULE') {
      subsType = 'XchangeSchedule';
    } else if (subscriptionType === 'JOB_GROUP_SCHEDULE') {
      subsType = 'JobGroupSchedule';
    }
    if (sid && subscriptionType) {
      subscribeToAlert({
        variables: {
          alertInput: {
            sid,
            subscriptionType: SubscriptionType[subsType],
          },
        },
      })
    }
  }

  const renderButtons = () => (
    <>
      <PrimaryButton
        id="__AddAlerts_add_button"
        text="Add"
        onClick={() => {
          saveAlert();
        }}
      />
      <DefaultButton
        id="__AddAlerts_cancel_button"
        style={{ marginLeft: '10px' }}
        text="Cancel"
        onClick={() => isOpen(false)}
      />
    </>
  );
  return (
    <Dialog
      hidden={false}
      dialogContentProps={{ title: 'Add person to be notified' }}
      minWidth="500px"
    >
      {renderBody()}
      <DialogFooter>{renderButtons()}</DialogFooter>
    </Dialog>
  )
}
