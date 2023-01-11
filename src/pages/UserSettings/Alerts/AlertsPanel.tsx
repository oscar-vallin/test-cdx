import React, { useEffect, useState } from 'react';
import { PanelBody, ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import {
  MyAlert,
  useMyAlertsLazyQuery,
  WebCommand,
  useDeleteMyAlertMutation,
  GqOperationResponse,
} from 'src/data/services/graphql';
import {
  DetailsList,
  DetailsListLayoutMode,
  FontIcon,
  IColumn,
  PanelType,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import { EmptyMessage } from 'src/containers/tables/TableCurrentActivity/TableActivity.styles';
import { ButtonAction } from 'src/components/buttons';
import { AddAlertsModal } from 'src/containers/modals/AddAlertsModal';
import { StyledAlertTypes } from 'src/pages/Admin/XChange/XchangeAlerts/XchangeAlertsPage.style';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';

type AlertsPanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
};

const defaultDialogProps: DialogYesNoProps = {
  id: '__myAlerts_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};
const AlertsPanel = ({ isOpen, closePanel }: AlertsPanelProps) => {
  const Toast = useNotification();
  const [alerts, setAlerts] = useState<MyAlert[] | null>();
  const [addAlertsModal, setAddAlertsModal] = useState(false);
  const [deleteAlertCmd, setDeleteAlertCmd] = useState<WebCommand | null>();
  const [refreshPage, setRefreshPage] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [showDialog, setShowDialog] = useState(false);
  const [useMyAlerts, { data, loading }] = useMyAlertsLazyQuery();
  const [deleteMyAlert,
    {
      data: alertDeleted,
    },
  ] = useDeleteMyAlertMutation();
  const fetchData = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMyAlerts({
      variables: {},
    })
  };

  useEffect(() => {
    setRefreshPage(false);
    fetchData()
  }, [refreshPage]);

  useEffect(() => {
    if (!loading && data) {
      const { myAlerts } = data;
      setAlerts(myAlerts?.alerts);

      if (myAlerts?.commands) {
        const pageCommands = myAlerts.commands;
        const _deleteCmd = pageCommands.find((cmd) => cmd.endPoint === 'deleteMyAlert');
        setDeleteAlertCmd(_deleteCmd);
      }
    }
  }, [data, loading]);

  useEffect(() => {
    const response = alertDeleted?.deleteMyAlert;
    if (alertDeleted) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Success) {
        setRefreshPage(true);
        setShowDialog(false);
        Toast.success({ text: 'You will no longer be notified for this Alert' });
      }
    }
  }, [alertDeleted])

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showDeleteStepDialog = (item) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Remove from notification?';
    updatedDialog.message = 'Are you sure you want to be removed from this Alert?';

    updatedDialog.onYes = () => {
      hideDialog();
      deleteMyAlert({
        variables: {
          alertInput: {
            sid: item.sid,
            subscriptionType: item.subscriptionType,
          },
        },
      });
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const adaptWidth = (alertT: string) => {
    const width = alertT.length * 7;
    return `${width}px`;
  };

  const typesAlertsRender = (alertTypes: string[]) => {
    const types = alertTypes ?? [];
    const typesAlert: string[] = [];
    let typeAlert = '';
    for (let alert = 0; alert < types?.length; alert++) {
      const splitAlerts = types[alert].split('_');
      if (splitAlerts.length > 1) {
        for (let j = 0; j < splitAlerts.length; j++) {
          let type = splitAlerts[j].toLocaleLowerCase()[0].toUpperCase();
          type += splitAlerts[j].substring(1).toLocaleLowerCase();
          typeAlert += j === splitAlerts.length - 1 ? `${type}` : `${type} `;
        }
        typesAlert.push(typeAlert);
        typeAlert = '';
      } else {
        let type = splitAlerts[0].toLocaleLowerCase()[0].toUpperCase();
        type += splitAlerts[0].substring(1).toLocaleLowerCase();
        typesAlert.push(type);
      }
    }

    if (typesAlert) {
      return (
        <>
          {typesAlert.map((type, typeAlertsIndex: number) => (
            <StyledAlertTypes width={adaptWidth(type)} key={typeAlertsIndex}>
              {type}
            </StyledAlertTypes>
          ))}
        </>
      );
    }
    return null;
  };

  const onRenderAction = (item: MyAlert) => {
    if (deleteAlertCmd) {
      return (
        <TooltipHost content={deleteAlertCmd?.label ?? ''}>
          <FontIcon
            iconName="Trash"
            style={{ cursor: 'pointer' }}
            onClick={() => showDeleteStepDialog(item)}
          />
        </TooltipHost>
      )
    }
    return null;
  };

  const onRenderItemColum = (item: MyAlert, itemIndex, column?: IColumn) => {
    if (column?.key === 'alertTypes') {
      return (
        <Stack horizontal>
          {typesAlertsRender(item.alertTypes ?? [])}
        </Stack>
      );
    }

    if (column?.key === 'name') {
      return item[column.key]
    }

    return null;
  }

  const columns: IColumn[] = [
    {
      name: 'Xchange',
      key: 'name',
      fieldName: 'name',
      isPadded: true,
      minWidth: 150,
      maxWidth: 300,
      flexGrow: 1,
    },
    {
      name: 'Alert on',
      key: 'alertTypes',
      fieldName: 'alertTypes',
      isPadded: true,
      minWidth: 250,
      maxWidth: 600,
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
  ]

  const renderBody = () => {
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading My Alerts" />
        </Spacing>
      );
    }

    if (!alerts?.length) {
      return (
        <EmptyMessage size="normal">
          {'<none>'}
        </EmptyMessage>
      )
    }

    return (
      <DetailsList
        items={alerts}
        columns={columns}
        onRenderItemColumn={onRenderItemColum}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
      />
    );
  };

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText="My Alerts"
      type={PanelType.medium}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      <PanelBody>{renderBody()}</PanelBody>
      <WizardButtonRow>
        <ButtonAction
          id="__AddAlert"
          iconName="add"
          onClick={() => setAddAlertsModal(true)}
        >
          Add Alert
        </ButtonAction>
      </WizardButtonRow>
      {addAlertsModal && (
        <AddAlertsModal
          isOpen={setAddAlertsModal}
          refreshPage={setRefreshPage}
        />
      )}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  )
};

export { AlertsPanel };
