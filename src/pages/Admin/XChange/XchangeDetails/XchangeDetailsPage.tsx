import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DefaultButton,
  DirectionalHint,
  FontIcon,
  IButtonStyles,
  IconButton,
  ILinkStyles,
  IStackItemStyles,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import {
  useXchangeConfigLazyQuery,
  XchangeConfigForm,
  UiStringField,
  XchangeAlert,
  XchangeFileProcessForm,
  XchangeDiagram,
  useUpdateXchangeConfigCommentMutation,
  useDeleteXchangeConfigAlertMutation,
  XchangeSchedule,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useNotification } from 'src/hooks/useNotification';
import { PageBody } from 'src/components/layouts/Column';
import { UIInputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { prettyEnumValue } from 'src/utils/CDXUtils';
import { FileUploadDialog } from 'src/pages/Admin/XChange/XchangeDetails/FileUpload/FileUploadDialog';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { ROUTE_XCHANGE_DETAILS } from 'src/data/constants/RouteConstants';
import { ButtonLink } from 'src/components/buttons';
import { TaskCard } from 'src/components/cards';
import { CommentBubble } from 'src/components/inputs/Comment';
import { QualifierBadge } from 'src/components/badges/Qualifier';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { EmptyMessage } from 'src/containers/tables/TableCurrentActivity/TableActivity.styles';
import { useThemeStore } from 'src/store/ThemeStore';
import { Diagram } from './Diagram/Diagram';
import { XchangeAlertsPanel } from '../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { JobGroupPanel } from './JobGroupPanel/JobGroupPanel';
import { SchedulePanel } from '../SchedulePanel';
import { XchangeSetupWizardPanel } from '../Xchanges/XchangeSetupWizardPanel';
import { StyledAlertTypes } from '../XchangeAlerts/XchangeAlertsPage.style';
import {
  StyledButtonAction,
  StyledProcessValueText,
  EllipsisedStyled,
  CardFinishSetup,
  AlertRow,
  CardColumn,
} from './XchangeDetailsPage.styles';

const defaultDialogProps: DialogYesNoProps = {
  id: '__XchangeDetails_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const XchangeDetailsPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { userTheme } = useThemeStore();
  const { orgSid } = useOrgSid();
  const Toast = useNotification();

  const [xchangeDataDetails, setXchangeDataDetails] = useState<XchangeConfigForm>();
  const [coreFilenameData, setCoreFilenameData] = useState<UiStringField>();
  const [coreFilenamePatternData, setCoreFilenamePatternData] = useState<UiStringField>();
  const [coreFilenameValue, setCoreFilenameValue] = useState<string>('');
  const [coreFilenamePatternValue, setCoreFilenamePatternValue] = useState<string>('');
  const [xchangesAlerts, setXchangesAlerts] = useState<XchangeAlert[]>();
  const [fileProcesses, setFileProcesses] = useState<XchangeFileProcessForm[]>();
  const [fileProcess, setFileProcess] = useState<XchangeFileProcessForm>();
  const [dataDiagram, setDataDiagram] = useState<XchangeDiagram>();
  const [refreshXchangeDetails, setRefreshXchangeDetails] = useState(false);
  const [comments, setComments] = useState('');
  const [commands, setCommands] = useState<WebCommand[] | null>([]);
  const [createAlertCmd, setCreateAlertCmd] = useState<WebCommand | null>();
  const [updateScheduleCmd, setUpdateScheduleCmd] = useState<WebCommand | null>();
  const [createFileCmd, setCreateFileCmd] = useState<WebCommand | null>();
  const [sid, setSid] = useState('');
  const [configSid, setConfigSid] = useState('');
  const [typeSchedule, setTypeSchedule] = useState<boolean>();
  const [schedule, setSchedule] = useState<XchangeSchedule>();
  const [openAlertsPanel, setOpenAlertsPanel] = useState(false);
  const [openJobGroup, setOpenJobGroup] = useState(false);
  const [openSchedulePanel, setOpenSchedulePanel] = useState(false);
  const [isSetupNewXchangePanelOpen, setIsSetupNewXchangePanelOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [callXchangeDetails, { data: detailsData, loading: detailsLoading, error: detailsError },
  ] = useXchangeConfigLazyQuery();
  const [deleteXchangeConfigAlerts, { data: deleteConfigData, loading: deleteConfigLoading },
  ] = useDeleteXchangeConfigAlertMutation();

  const [updateXchangeComment] = useQueryHandler(useUpdateXchangeConfigCommentMutation);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(detailsError);
  }, [detailsError]);

  useEffect(() => {
    if (!deleteConfigLoading && deleteConfigData) {
      setRefreshXchangeDetails(true);
      Toast.success({ text: 'Alert has been deleted' });
    }
  }, [deleteConfigData, deleteConfigLoading]);

  const fetchData = () => {
    const coreFilename = urlParams.get('coreFilename');
    callXchangeDetails({
      variables: {
        orgSid,
        coreFilename: coreFilename ?? '',
      },
    });
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = (currentSid: string) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Alert';
    updatedDialog.message = 'Are you sure you want to delete this Alert?';

    updatedDialog.onYes = () => {
      hideDialog();
      deleteXchangeConfigAlerts({
        variables: {
          sid: currentSid,
        },
      }).then();
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showGenerateDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Generate the Xchange Steps';
    updatedDialog.message = 'Are you sure you want to generate the Xchange steps for this Xchange? The steps can be edited once generated';

    updatedDialog.onYes = () => {
      hideDialog();
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  }

  const typesAlertsRender = (alertTypes: string[]) => {
    const alerts = alertTypes ?? [];
    const typesAlert: string[] = [];
    for (let alert = 0; alert < alerts?.length; alert++) {
      typesAlert.push(prettyEnumValue(alerts[alert]));
    }

    if (typesAlert) {
      return (
        <Spacing margin={{ left: 'double' }}>
          <Stack horizontal>
            <Text variant="bold"> Alert on: &nbsp;</Text>
            {typesAlert.length > 1 ? (
              <StyledAlertTypes>
                ({typesAlert.length}) types
              </StyledAlertTypes>
            ) : (
              <StyledAlertTypes>
                {typesAlert[0]}
              </StyledAlertTypes>
            )}
          </Stack>
        </Spacing>
      );
    }
    return null;
  };

  const iconButtonStyles: IButtonStyles = {
    root: {
      color: userTheme.colors.themePrimary,
    },
    icon: {
      fontSize: userTheme.fontSizes.small,
    },
  };

  const userPermissionsIcons = (cmds: WebCommand[], currentSid: string) => {
    const _updateCmd = cmds?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
    const _deleteCmd = cmds?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);

    return (
      <Stack horizontal>
        {_updateCmd && (
          <IconButton
            iconProps={{ iconName: 'EditSolid12' }}
            styles={iconButtonStyles}
            title="Edit"
            onClick={() => {
              setSid(currentSid);
              setOpenAlertsPanel(true);
            }}
          />
        )}
        {_deleteCmd && (
          <IconButton
            iconProps={{ iconName: 'Trash' }}
            styles={iconButtonStyles}
            title="Delete"
            onClick={() => showUnsavedChangesDialog(currentSid)}
          />
        )}
      </Stack>
    );
  };

  const renderAddAlertIcon = () => {
    if (!createAlertCmd) {
      return null;
    }
    return (
      <TooltipHost content="Add Alert" directionalHint={DirectionalHint.topCenter}>
        <IconButton
          id="__Add_Alert"
          iconProps={{ iconName: 'Add' }}
          styles={iconButtonStyles}
          onClick={() => {
            setSid('');
            setOpenAlertsPanel(true)
          }}
        />
      </TooltipHost>
    );
  };

  const renderUpdateScheduleIcon = () => {
    if (!updateScheduleCmd) {
      return null;
    }
    return (
      <IconButton
        iconProps={{ iconName: 'EditSolid12' }}
        styles={iconButtonStyles}
        onClick={() => {
          setTypeSchedule(true);
          setOpenSchedulePanel(true);
        }}
      />
    );
  };

  const linkStyles: ILinkStyles = {
    root: {
      fontSize: userTheme.fontSizes.small,
      maxWidth: '130px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  const stackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      height: 30,
      overflow: 'hidden',
    },
  };

  const cardBox = () => {
    if (detailsLoading) {
      return null;
    }
    return (
      <CardColumn>
        <TaskCard
          id="__AlertsCard"
          title="Alerts (for this Xchange)"
          icon={<FontIcon iconName="Ringer" style={{ verticalAlign: 'middle' }} />}
          commands={renderAddAlertIcon()}
        >
          {xchangesAlerts?.map((alert, index) => (
            <AlertRow key={index}>
              <Stack horizontal tokens={{ childrenGap: 5 }} styles={stackItemStyles}>
                <Stack.Item>
                  <QualifierBadge
                    filenameQualifier={alert?.filenameQualifier}
                    coreFilename={alert?.coreFilename}
                  />
                </Stack.Item>
                <Stack.Item grow>
                  {typesAlertsRender(alert?.alertTypes ?? [])}
                </Stack.Item>
                <Stack.Item align="end">
                  {userPermissionsIcons(alert?.commands ?? [], alert?.sid ?? '')}
                </Stack.Item>
              </Stack>
              {alert?.subscribers
                && alert?.subscribers.map((subs, subsIndex: number) => (
                  <Spacing key={subsIndex}>
                    <Row>
                      {subsIndex < 2 && (
                        <>
                          <EllipsisedStyled lg="6">
                            <ButtonLink
                              underline
                              title={subs.firstNm ?? ''}
                              styles={linkStyles}
                            >
                              {subs.firstNm}
                            </ButtonLink>
                          </EllipsisedStyled>
                          <EllipsisedStyled lg="6">
                            <ButtonLink
                              underline
                              title={subs.email ?? ''}
                              styles={linkStyles}
                            >
                              {subs.email}
                            </ButtonLink>
                          </EllipsisedStyled>
                        </>
                      )}
                    </Row>
                  </Spacing>
                ))}
              <Row>
                {alert.subscribers && alert?.subscribers?.length > 2 && (
                  <Column lg="6">
                    <ButtonLink underline styles={linkStyles}>
                      ({alert.subscribers.length - 2}) more . . .
                    </ButtonLink>
                  </Column>
                )}
                <Spacing margin={{ bottom: 'normal' }} />
              </Row>
            </AlertRow>
          ))}
          {xchangesAlerts?.length === 0 && (
            <Row>
              <Column>
                <EmptyMessage size="normal">
                  {'<none>'}
                </EmptyMessage>
              </Column>
            </Row>
          )}
        </TaskCard>
        <TaskCard
          id="__ScheduleCard"
          title="Schedule"
          icon={<FontIcon iconName="CalendarAgenda" />}
          commands={renderUpdateScheduleIcon()}
        >
          {schedule?.scheduleType === 'NOT_SCHEDULED' ? (
            <Row>
              <Column>
                <EmptyMessage size="normal">
                  {'<none>'}
                </EmptyMessage>
              </Column>
            </Row>
          ) : (
            <>
              {!updateScheduleCmd && <Spacing margin={{ top: 'normal' }} />}
              <Stack horizontal horizontalAlign="space-between" styles={stackItemStyles}>
                <Stack.Item>
                  <FontIcon
                    iconName="ReminderTime"
                    style={{
                      fontSize: userTheme.fontSizes.small,
                      fontWeight: 600,
                      paddingRight: '8px',
                    }}
                  />
                </Stack.Item>
                <Stack.Item grow>
                  <Text size="small">Expected to run</Text>
                </Stack.Item>
              </Stack>
              <Text size="small">{schedule?.expectedRunSchedule}</Text>
              <Spacing margin={{ bottom: 'normal' }}>
                <Text size="small">{schedule?.expectedCompletionTime}</Text>
              </Spacing>
              <Row>
                <Column>
                  <ButtonLink
                    onClick={() => {
                      setTypeSchedule(false);
                      setOpenSchedulePanel(true);
                    }}
                  >
                    {schedule?.xchangeJobGroupName}
                  </ButtonLink>
                </Column>
              </Row>
            </>
          )}
        </TaskCard>
      </CardColumn>
    );
  };

  const renderBody = () => {
    if (detailsLoading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Xchange Details" />
        </Spacing>
      );
    }

    return (
      <>
        <Column lg="3" direction="row">
          <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
            <UIInputText
              id="coreFilename"
              value={coreFilenameValue}
              uiField={coreFilenameData}
              onChange={(event, newValue) => setCoreFilenameValue(newValue ?? '')}
            />
          </Spacing>
        </Column>
        <Column lg="3">
          <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
            <UIInputText
              id="coreFilenamePattern"
              value={coreFilenamePatternValue}
              uiField={coreFilenamePatternData}
              onChange={(event, newValue) => setCoreFilenamePatternValue(newValue ?? '')}
            />
          </Spacing>
        </Column>
      </>
    );
  };

  useEffect(() => {
    setRefreshXchangeDetails(false);
    fetchData();
  }, [refreshXchangeDetails]);

  useEffect(() => {
    if (detailsData?.xchangeConfig && !detailsLoading) {
      const { xchangeConfig } = detailsData;
      setXchangeDataDetails(xchangeConfig);

      if (xchangeConfig.coreFilename) {
        setCoreFilenameData(xchangeConfig.coreFilename);
        setCoreFilenameValue(xchangeConfig.coreFilename.value ?? '');
      }

      if (xchangeConfig.coreFilenamePattern) {
        setCoreFilenamePatternData(xchangeConfig.coreFilenamePattern);
        setCoreFilenamePatternValue(xchangeConfig.coreFilenamePattern.value ?? '');
      }

      if (xchangeConfig.processes) {
        setFileProcesses(xchangeConfig.processes);
        if (xchangeConfig.processes.length > 0) {
          setFileProcess(xchangeConfig.processes[0]);
          setDataDiagram(xchangeConfig.processes[0].diagram);
        }
      }

      if (xchangeConfig.alerts) {
        setXchangesAlerts(xchangeConfig?.alerts);
      }

      if (xchangeConfig.comments) {
        setComments(xchangeConfig.comments.value ?? '');
      }

      if (xchangeConfig.commands) {
        setCommands(xchangeConfig.commands);

        const pageCommands = xchangeConfig?.commands;
        const _createAlertCmd = pageCommands
          ?.find((cmd) => cmd.commandType === CdxWebCommandType.Add);
        setCreateAlertCmd(_createAlertCmd);
        const _updateScheduleCmd = pageCommands
          ?.find((cmd) => cmd.commandType === CdxWebCommandType.Update && cmd.endPoint === 'updateXchangeSchedule');
        setUpdateScheduleCmd(_updateScheduleCmd);
        const _createFileCmd = pageCommands
          ?.find((cmd) => cmd.endPoint === 'createXchangeFileTransmission');
        setCreateFileCmd(_createFileCmd);
      }

      if (xchangeConfig.schedule) {
        setSchedule(xchangeConfig.schedule);
      }
    }
  }, [detailsData, detailsLoading]);

  const updateCommentOnDismiss = () => {
    if (comments !== xchangeDataDetails?.comments.value) {
      updateXchangeComment({
        variables: {
          sid: xchangeDataDetails?.sid,
          comment: comments,
        },
      });
    }
  };

  const renderFileUploadDialog = () => {
    const xchangeConfigSid = xchangeDataDetails?.sid;
    if (!showFileUpload || !xchangeConfigSid) {
      return null;
    }

    return (
      <FileUploadDialog
        xchangeConfigSid={xchangeConfigSid}
        open={showFileUpload}
        onDismiss={() => setShowFileUpload(false)}
      />
    );
  };

  const renderUploadButton = () => {
    if (xchangeDataDetails?.commands?.find((cmd) => cmd.endPoint === 'xchangeFileUpload')) {
      return (
        <PrimaryButton
          id="__FileUploadButton"
          iconProps={{ iconName: 'Upload' }}
          onClick={() => setShowFileUpload(true)}
        >
          Upload
        </PrimaryButton>
      );
    }
    return null;
  };

  const renderDiagram = () => {
    if (xchangeDataDetails?.implementationPending) {
      return (
        <CardFinishSetup>
          <Spacing margin={{ top: 'double', bottom: 'normal' }}>
            <Stack>
              <Stack.Item align="center">
                <Text size="large" variant="bold">
                  Please Complete the implementation
                </Text>
              </Stack.Item>
            </Stack>
          </Spacing>
          <Spacing margin={{ bottom: 'normal' }}>
            <Stack>
              <Stack.Item align="center">
                <Text>
                  The implementation of the
                  <span style={{ fontWeight: 'bold' }}> Enrollment </span>
                  spec of the name must be <br />
                  &nbsp; &nbsp; complete before the Xchange steps can be configured
                </Text>
              </Stack.Item>
            </Stack>
          </Spacing>
          <Stack>
            <Stack.Item align="center">
              <Text>
                Once the implementation has been completed, click the Generate button below <br />
                &nbsp; &nbsp; to generate templated Xchange steps wich can be further configured
              </Text>
            </Stack.Item>
          </Stack>
          <Spacing margin={{ top: 'double' }}>
            <Stack>
              <Stack.Item align="center">
                <PrimaryButton
                  id="finishSetupWizard"
                  onClick={() => {
                    setConfigSid(xchangeDataDetails?.sid ?? '');
                    setIsSetupNewXchangePanelOpen(true);
                  }}
                >
                  Update setup wizard
                </PrimaryButton>
                <DefaultButton
                  style={{ marginLeft: '10px' }}
                  id="generateXchange"
                  text="Generate"
                  onClick={() => showGenerateDialog()}
                />
              </Stack.Item>
            </Stack>
          </Spacing>
        </CardFinishSetup>
      )
    }
    if (xchangeDataDetails?.incompleteSetup) {
      return (
        <CardFinishSetup>
          <Spacing margin={{ top: 'double', bottom: 'normal' }}>
            <Stack>
              <Stack.Item align="center">
                <Text variant="bold" size="large">Please Complete the setup</Text>
              </Stack.Item>
            </Stack>
          </Spacing>
          <Stack>
            <Stack.Item align="center">
              <Text>
                The xchange setup wizard has only been partially completed.
              </Text>
            </Stack.Item>
          </Stack>
          <Stack>
            <Stack.Item align="center">
              <Text>
                All Questions in the setup wizard must be answered before the Xchange
                steps can be configured
              </Text>
            </Stack.Item>
          </Stack>
          <Spacing margin={{ top: 'double' }}>
            <Stack>
              <Stack.Item align="center">
                <PrimaryButton
                  id="finishSetupWizard"
                  onClick={() => {
                    setConfigSid(xchangeDataDetails.sid ?? '');
                    setIsSetupNewXchangePanelOpen(true);
                  }}
                >
                  Finish setup wizard
                </PrimaryButton>
              </Stack.Item>
            </Stack>
          </Spacing>
        </CardFinishSetup>
      )
    }
    if (!detailsLoading && dataDiagram) {
      const xchangeFileProcessSid = xchangeDataDetails?.processes ? xchangeDataDetails?.processes[0].sid : '';
      return (
        <Diagram
          data={dataDiagram}
          refreshDetailsPage={setRefreshXchangeDetails}
          xchangeFileProcessSid={xchangeFileProcessSid ?? ''}
          commands={commands}
        />
      );
    }
    return null;
  };

  return (
    <LayoutDashboard id="XchangeDetailsPage" menuOptionSelected={ROUTE_XCHANGE_DETAILS.API_ID}>
      <PageHeader id="__XchangeDetailsPage">
        <Container>
          <Row>
            <Column lg="6">
              <Stack horizontal={true} horizontalAlign="space-between" tokens={{ childrenGap: 5 }}>
                <Stack.Item>
                  <PageTitle id="__Page__Title__Details" title="Xchange Details" />
                </Stack.Item>
                <Stack.Item>
                  <CommentBubble
                    id="__XchangeComments"
                    title={
                      comments ? 'This File Transmission has comments. Click to see them.'
                        : 'Click to add a comment'
                    }
                    value={comments}
                    uiField={xchangeDataDetails?.comments}
                    onChange={(_comments) => { setComments(_comments) }}
                    onDismiss={updateCommentOnDismiss}
                  />
                </Stack.Item>
              </Stack>
            </Column>
            <Column lg="6" right>
              {renderUploadButton()}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>{renderBody()}</Row>
          <Row>
            {fileProcesses
              && fileProcesses?.map((process, index) => (
                <Stack horizontal={true} horizontalAlign="space-between" key={index}>
                  <StyledProcessValueText
                    variant="large"
                    underlined={process?.specId?.value === fileProcess?.specId.value}
                    onClick={() => {
                      setFileProcess(process);
                      setDataDiagram(process.diagram);
                    }}
                  >
                    {process.vendor.value?.label}-{process.specId.value}
                  </StyledProcessValueText>
                  <StyledButtonAction
                    fontSize={100}
                    id="__Add_FileProcess"
                    iconName="add"
                    title={createFileCmd?.label ?? ''}
                    disableIcon={!!createFileCmd}
                    disabled={!createFileCmd}
                  />
                </Stack>
              ))}
          </Row>
          <Row>
            <Column lg="9">{renderDiagram()}</Column>
            <Column lg="2">{cardBox()}</Column>
          </Row>
        </Container>
        {renderFileUploadDialog()}
      </PageBody>
      <XchangeAlertsPanel
        isPanelOpen={openAlertsPanel}
        closePanel={setOpenAlertsPanel}
        sid={sid}
        refreshPage={setRefreshXchangeDetails}
        coreFilename={coreFilenameValue}
      />
      <JobGroupPanel
        isPanelOpen={openJobGroup}
        closePanel={setOpenJobGroup}
      />
      <SchedulePanel
        dataSchedule={xchangeDataDetails?.schedule}
        isPanelOpen={openSchedulePanel}
        closePanel={setOpenSchedulePanel}
        xchangeConfigSid={xchangeDataDetails?.sid ?? ''}
        xchangeJobGroupSid={schedule?.xchangeJobGroupSid ?? ''}
        refreshPage={setRefreshXchangeDetails}
        typeSchedule={typeSchedule}
      />
      {isSetupNewXchangePanelOpen && (
        <XchangeSetupWizardPanel
          isPanelOpen={isSetupNewXchangePanelOpen}
          closePanel={setIsSetupNewXchangePanelOpen}
          refreshPage={setRefreshXchangeDetails}
          configSid={configSid}
        />
      )}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  );
};

export { XchangeDetailsPage };
