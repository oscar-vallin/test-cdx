import React, { useEffect, useState } from 'react';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Text } from 'src/components/typography/Text';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { ROUTE_XCHANGE_ALERTS } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  useXchangeProfileAlertsLazyQuery,
  XchangeProfileAlerts,
  useDeleteXchangeProfileAlertMutation,
  useDeleteXchangeConfigAlertMutation,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  IconButton, Spinner, SpinnerSize, Stack,
} from '@fluentui/react';
import { ButtonLink } from 'src/components/buttons';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import {
  StyledEnvironment, StyledAlertTypes, StyledButtonAction, StyledSeparator,
} from './XchangeAlertsPage.style';
import { StyledQualifier } from '../XchangeDetails/XchangeDetailsPage.styles';
import { XchangeAlertsPanel } from './XchangeAlertsPanel/XchangeAlertsPanel';

const defaultDialogProps: DialogYesNoProps = {
  id: '__XchangeAlert_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const XchangeAlertsPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [openAlertsPanel, setOpenAlertsPanel] = useState(false);
  const [sid, setSid] = useState('');
  const [coreFilenameValue, setCoreFilenameValue] = useState('');
  const [refreshXchangeAlert, setRefreshXchangeAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [xchangeProfileAlerts,
    { data: dataXchangeAlerts, loading: loadingXchangeAlerts },
  ] = useQueryHandler(
    useXchangeProfileAlertsLazyQuery,
  );
  const [deleteXchangeProfileAlerts, { data: deleteProfileData, loading: deleteProfileLoading },
  ] = useQueryHandler(
    useDeleteXchangeProfileAlertMutation,
  );

  const [deleteXchangeConfigAlerts, { data: deleteConfigData, loading: deleteConfigLoading },
  ] = useQueryHandler(
    useDeleteXchangeConfigAlertMutation,
  );

  const [xchangeAlerts, setXchangeAlerts] = useState<XchangeProfileAlerts>();

  const fetchData = () => {
    xchangeProfileAlerts({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    setRefreshXchangeAlert(false);
    fetchData();
  }, [refreshXchangeAlert]);

  useEffect(() => {
    if (!loadingXchangeAlerts && dataXchangeAlerts) {
      setXchangeAlerts(dataXchangeAlerts.xchangeProfileAlerts);
    }
  }, [dataXchangeAlerts, loadingXchangeAlerts]);

  useEffect(() => {
    if (!deleteProfileLoading && deleteProfileData) {
      setRefreshXchangeAlert(true);
      Toast.success({ text: 'Alert has been deleted' });
    }
  }, [deleteProfileData, deleteProfileLoading]);

  useEffect(() => {
    if (!deleteConfigLoading && deleteConfigData) {
      setRefreshXchangeAlert(true);
      Toast.success({ text: 'Alert has been deleted' });
    }
  }, [deleteConfigData, deleteConfigLoading]);

  const adaptWidth = (alertT: string) => {
    const width = alertT.length * 8;
    return `${width}px`;
  };

  const typesAlertsRender = (alertTypes: string[]) => {
    const alerts = alertTypes ?? [];
    const typesAlert: string[] = [];
    let typeAlert = '';
    for (let alert = 0; alert < alerts?.length; alert++) {
      const splitAlerts = alerts[alert].split('_');
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
        <Row>
          <Column lg="2">
            <Text variant="bold">Alert on: </Text>
          </Column>
          {typesAlert.map((type, typeAlertsIndex: number) => (
            <StyledAlertTypes width={adaptWidth(type)} key={typeAlertsIndex}>
              {type}
            </StyledAlertTypes>
          ))}
        </Row>
      );
    }
    return null;
  };

  const filenameQualifier = (qualifierType: string, coreFilename: string) => {
    const qualifier = qualifierType.replace(`${coreFilename}-`, '');
    if (qualifier) {
      let width = '48px';
      let color = 'blue';
      if (qualifier === 'TEST') {
        color = 'orange';
      } else if (qualifier === 'PROD-OE') {
        width = '60px';
      } else if (qualifier === 'TEST-OE') {
        width = '60px';
        color = 'orange';
      }

      return (
        <Row>
          <Spacing margin={{ bottom: 'normal' }}>
            <Column lg="2">
              <StyledQualifier width={width} color={color}>
                {qualifier}
              </StyledQualifier>
            </Column>
          </Spacing>
        </Row>
      );
    }

    return null;
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = (
    currentSid: string,
    xchangeTypeAlert: string,
  ) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Alert'
    updatedDialog.message = 'Are you sure you want to delete this Alert?';

    updatedDialog.onYes = () => {
      hideDialog();
      if (xchangeTypeAlert === 'profile') {
        deleteXchangeProfileAlerts({
          variables: {
            sid: currentSid,
          },
        });
      } else {
        deleteXchangeConfigAlerts({
          variables: {
            sid: currentSid,
          },
        });
      }
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const userPermissionsIcons = (
    commands: WebCommand[],
    currentSid: string,
    type: string,
    corefilename?: string,
  ) => {
    const _updateCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
    const _deleteCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);

    return (
      <>
        {_updateCmd && (
          <IconButton
            iconProps={{ iconName: 'EditSolid12' }}
            style={{ paddingBottom: '10px', marginLeft: '10px' }}
            onClick={() => {
              setSid(currentSid);
              setCoreFilenameValue(corefilename ?? '')
              setOpenAlertsPanel(true);
            }}
          />
        )}
        {_deleteCmd && (
          <IconButton
            iconProps={{ iconName: 'Trash' }}
            style={{ paddingBottom: '10px' }}
            onClick={() => {
              showUnsavedChangesDialog(currentSid, type);
            }}
          />
        )}
      </>
    );
  };

  const updateIndividualAlert = (
    commands: WebCommand[],
    currentSid: string,
    corefilename?: string,
  ) => {
    const _updateCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
    if (_updateCmd) {
      setSid(currentSid);
      setCoreFilenameValue(corefilename ?? '')
      setOpenAlertsPanel(true);
    }
    return null;
  };

  const renderAlerts = () => {
    if (loadingXchangeAlerts) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading xchanges alerts" />
        </Spacing>
      );
    }

    return (
      <Container>
        <Spacing margin={{ top: 'double' }}>
          <Row>
            <Column lg="6">
              <Stack horizontal horizontalAlign="space-between" style={{ width: '100%' }}>
                <Text variant="bold">Alerts on all Xchanges</Text>
                <StyledButtonAction
                  id="__AddAlert"
                  iconName="add"
                  onClick={() => {
                    setSid('');
                    setCoreFilenameValue('');
                    setOpenAlertsPanel(true);
                  }}
                >
                  Add Alert
                </StyledButtonAction>
              </Stack>
              <StyledSeparator color="#e6e6e6" />
              {xchangeAlerts?.globalXchangeAlerts && xchangeAlerts?.globalXchangeAlerts.length <= 0 
                && (
                <Text>There are no global alerts configured</Text>
                )}
              {xchangeAlerts?.globalXchangeAlerts?.map(
                (globalAlerts, globalAlertsIndex: number) => (
                  <Spacing key={globalAlertsIndex}>
                    <Row>
                      <Column lg="2">
                        {globalAlerts?.filenameQualifier && (
                          <StyledEnvironment>{globalAlerts?.filenameQualifier}</StyledEnvironment>
                        )}
                      </Column>
                      {userPermissionsIcons(globalAlerts?.commands ?? [], globalAlerts?.sid ?? '', 'profile')}
                    </Row>
                    {typesAlertsRender(globalAlerts?.alertTypes ?? [])}
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text variant="bold">Subscribers:</Text>
                    </Spacing>
                    <Spacing margin={{ bottom: 'double' }}>
                      {globalAlerts?.subscribers?.map((subscriber, globalSubsIndex: number) => (
                        <Row key={globalSubsIndex}>
                          <Column lg="6">
                            <ButtonLink>{subscriber.email}</ButtonLink>
                          </Column>
                          <Column lg="6">
                            <ButtonLink>{subscriber.firstNm}</ButtonLink>
                          </Column>
                        </Row>
                      ))}
                    </Spacing>
                  </Spacing>
                ),
              )}
            </Column>
            <Column lg="6">
              <Text variant="bold">Alerts on individual Xchanges</Text>
              <Spacing margin={{ top: 'normal' }}>
                <StyledSeparator color="#e6e6e6" />
              </Spacing>
              {xchangeAlerts?.individualXchangeAlerts
                && xchangeAlerts?.individualXchangeAlerts.length <= 0 && (
                <Text>There are no Xchange specific alerts configured</Text>
              )}
              {xchangeAlerts?.individualXchangeAlerts?.map(
                (individualAlerts, individualAlertsIndex: number) => (
                  <Spacing margin={{ bottom: 'normal' }} key={individualAlertsIndex}>
                    <Row>
                      <Column lg="12">
                        <Stack horizontal={true} horizontalAlign="space-between">
                          <Stack.Item align="center" disableShrink>
                            <ButtonLink
                              underline
                              style={{ fontWeight: 'bold', fontSize: '13.5px' }}
                              onClick={() => {
                                updateIndividualAlert(individualAlerts?.commands ?? [], individualAlerts.sid ?? '', individualAlerts.coreFilename ?? '');
                              }}
                            >
                              {individualAlerts.coreFilename}
                            </ButtonLink>
                            {userPermissionsIcons(individualAlerts?.commands ?? [], individualAlerts?.sid ?? '', 'config', individualAlerts.coreFilename ?? '')}
                          </Stack.Item>
                        </Stack>
                      </Column>
                    </Row>
                    {filenameQualifier(individualAlerts.filenameQualifier ?? '', individualAlerts?.coreFilename ?? '')}
                    {typesAlertsRender(individualAlerts?.alertTypes ?? [])}
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text variant="bold">Subscribers:</Text>
                    </Spacing>
                    {individualAlerts?.subscribers?.map(
                      (subscriber, individualSubsIndex: number) => (
                        <Row key={individualSubsIndex}>
                          <Column lg="6">
                            <ButtonLink
                              onClick={() => {
                                updateIndividualAlert(individualAlerts?.commands ?? [], individualAlerts.sid ?? '', individualAlerts.coreFilename ?? '');
                              }}
                            >
                              {subscriber.firstNm}
                            </ButtonLink>
                          </Column>
                          <Column lg="6">
                            <ButtonLink
                              onClick={() => {
                                updateIndividualAlert(individualAlerts?.commands ?? [], individualAlerts.sid ?? '', individualAlerts.coreFilename ?? '');
                              }}
                            >
                              {subscriber.email}
                            </ButtonLink>
                          </Column>
                        </Row>
                      ),
                    )}
                  </Spacing>
                ),
              )}
            </Column>
          </Row>
        </Spacing>
      </Container>
    );
  };

  return (
    <LayoutDashboard id="XchangeAlertsPage" menuOptionSelected={ROUTE_XCHANGE_ALERTS.API_ID}>
      <PageHeader id="__XchangeAlertsHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Alerts" title="Xchange Alerts" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>{renderAlerts()}</PageBody>
      <XchangeAlertsPanel
        isPanelOpen={openAlertsPanel}
        closePanel={setOpenAlertsPanel}
        sid={sid}
        refreshPage={setRefreshXchangeAlert}
        coreFilename={coreFilenameValue}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  );
};

export { XchangeAlertsPage };
