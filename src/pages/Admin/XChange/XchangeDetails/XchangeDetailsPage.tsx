import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
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
import { UIInputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  DirectionalHint,
  FontIcon,
  IconButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  TextField,
  TooltipHost,
} from '@fluentui/react';
import { useNotification } from 'src/hooks/useNotification';
import { PageBody } from 'src/components/layouts/Column';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { FileUploadDialog } from 'src/pages/Admin/XChange/XchangeDetails/FileUpload/FileUploadDialog';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { ROUTE_XCHANGE_DETAILS } from 'src/data/constants/RouteConstants';
import { Comment20Filled } from '@fluentui/react-icons';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { EmptyMessage } from 'src/containers/tables/TableCurrentActivity/TableActivity.styles';
import { ThemeStore } from 'src/store/ThemeStore';
import { Diagram } from './Diagram/Diagram';
import { XchangeAlertsPanel } from '../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { JobGroupPanel } from './JobGroupPanel/JobGroupPanel';
import { SchedulePanel } from '../SchedulePanel';
import { StyledAlertTypes } from '../XchangeAlerts/XchangeAlertsPage.style';
import {
  CardStyled,
  StyledColumTabs,
  StyledButtonAction,
  StyledProcessValueText,
  StyledQualifier,
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
  const [allowedCommands, setAllowedCommands] = useState(false);
  const [refreshXchangeDetails, setRefreshXchangeDetails] = useState(false);
  const [comments, setComments] = useState('');
  const [commands, setCommands] = useState<WebCommand[] | null>([]);
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [openUpdateComments, setOpenUpdateComments] = useState(false);
  const [closeTooltipHost, setCloseTooltipHost] = useState(true);
  const [sid, setSid] = useState('');
  const [schedule, setSchedule] = useState<XchangeSchedule>();
  const [openAlertsPanel, setOpenAlertsPanel] = useState(false);
  const [openJobGroup, setOpenJobGroup] = useState(false);
  const [openSchedulePanel, setOpenSchedulePanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [callXchangeDetails, { data: detailsData, loading: detailsLoading, error: detailsError },
  ] = useXchangeConfigLazyQuery();
  const [deleteXchangeConfigAlerts, { data: deleteConfigData, loading: deleteConfigLoading },
  ] = useDeleteXchangeConfigAlertMutation();

  const [updateXchangeComment, { data: commentData, loading: isLoadingComment },
  ] = useQueryHandler(useUpdateXchangeConfigCommentMutation);
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
      });
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

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
          <Column lg="3">
            <Text>Alert on: </Text>
          </Column>
          {typesAlert.map((type, index) => (
            <StyledAlertTypes width={adaptWidth(type)} key={index} paddingTop={true}>
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
      let width: number | string = qualifier.length * 8;
      width = `${width}px`;
      let color = 'blue';
      if (qualifier === 'TEST' || qualifier === 'TEST-OE') {
        color = 'orange';
        width = '50px';
      }
      if (qualifier === 'PROD') {
        width = '50px';
      }

      return (
        <StyledQualifier width={width} color={color} paddingTop={true}>
          {qualifier}
        </StyledQualifier>
      );
    }

    return null;
  };

  const userPermissionsIcons = (cmds: WebCommand[], currentSid: string) => {
    const _updateCmd = cmds?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
    const _deleteCmd = cmds?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);

    return (
      <>
        {_updateCmd && (
          <Column lg="1">
            <IconButton
              iconProps={{ iconName: 'EditSolid12' }}
              style={{
                paddingBottom: '10px',
                position: 'relative',
                right: '5px',
                top: '1px',
              }}
              onClick={() => {
                setSid(currentSid);
                setOpenAlertsPanel(true);
              }}
            />
          </Column>
        )}
        {_deleteCmd && (
          <Column lg="1">
            <IconButton
              iconProps={{ iconName: 'Trash' }}
              style={{ paddingBottom: '10px' }}
              onClick={() => showUnsavedChangesDialog(currentSid)}
            />
          </Column>
        )}
      </>
    );
  };

  const cardBox = () => {
    if (!detailsLoading) {
      return (
        <>
          <CardStyled>
            <Text style={{ fontWeight: 'bold' }}>
              <IconButton iconProps={{ iconName: 'Ringer' }} style={{ color: 'black', fontWeight: 'bold' }} />
              Alerts
            </Text>
            {xchangesAlerts?.map((alert, index) => (
              <Spacing margin="normal" key={index}>
                <Row>
                  {filenameQualifier(alert.filenameQualifier ?? '', alert?.coreFilename ?? '')}
                  {userPermissionsIcons(alert?.commands ?? [], alert?.sid ?? '')}
                </Row>
                {typesAlertsRender(alert?.alertTypes ?? [])}
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row>
                    <Column lg="2">
                      <Text style={{ fontWeight: 'bold' }}>Notify:</Text>
                    </Column>
                  </Row>
                </Spacing>
                {alert?.subscribers
                  && alert?.subscribers.map((subs, subsIndex: number) => (
                    <Spacing margin={{ bottom: 'normal' }} key={subsIndex}>
                      <Row>
                        <Column lg="6">
                          <ButtonLink style={{ fontSize: '12px', maxWidth: '130px', wordWrap: 'break-word' }}>
                            {subs.firstNm}
                          </ButtonLink>
                        </Column>
                        <Column lg="6">
                          <ButtonLink style={{ fontSize: '12px', maxWidth: '150px', wordWrap: 'break-word' }}>
                            {subs.email}
                          </ButtonLink>
                        </Column>
                      </Row>
                    </Spacing>
                  ))}
              </Spacing>
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
            {allowedCommands && (
            <ButtonAction
              id="__Add_Alert"
              iconName="add"
              onClick={() => {
                setSid('');
                setOpenAlertsPanel(true)
              }}
            >
              Add alert
            </ButtonAction>
            )}
          </CardStyled>
          <Spacing margin={{ top: 'normal' }}>
            <CardStyled>
              <Container>
                <Row>
                  <Stack horizontal={true} horizontalAlign="space-between">
                    <Text style={{ fontWeight: 'bold', marginTop: '8px' }}>
                      <FontIcon iconName="CalendarAgenda" style={{ fontSize: '10px', fontWeight: 500, paddingRight: '8px' }} />
                      Schedule
                    </Text>
                    <IconButton
                      iconProps={{ iconName: 'EditSolid12' }}
                      style={{ fontSize: '0.675rem' }}
                      onClick={() => {
                        setOpenSchedulePanel(true);
                      }}
                    />
                  </Stack>
                </Row>
                {schedule?.scheduleType === 'NOT_SCHEDULED' ? (
                  <Row>
                    <EmptyMessage size="normal">
                      {'<none>'}
                    </EmptyMessage>
                  </Row>
                ) : (
                  <>
                    <Row>
                      <Stack horizontal={true} horizontalAlign="space-between">
                        <FontIcon
                          iconName="ReminderTime"
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            paddingRight: '8px',
                          }}
                        />
                        <Text style={{ fontSize: '12px' }}>Expected to run</Text>
                      </Stack>
                    </Row>
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text style={{ fontSize: '12px' }}>{schedule?.expectedRunSchedule}</Text>
                    </Spacing>
                    <Spacing margin={{ bottom: 'normal' }}>
                      <Text style={{ fontSize: '12px' }}>{schedule?.expectedCompletionTime}</Text>
                    </Spacing>
                    <Row>
                      <Column>
                        <ButtonLink
                          onClick={() => setOpenJobGroup(true)}
                        >
                          {schedule?.xchangeJobGroupName}
                        </ButtonLink>
                      </Column>
                    </Row>
                  </>
                )}
              </Container>
            </CardStyled>
          </Spacing>
        </>
      );
    }
    return null;
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
        const pageCommands = xchangeConfig?.commands;
        const _updateCmd = pageCommands
          ?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update && cmd.endPoint === 'updateXchangeConfigComment');
        setUpdateCmd(_updateCmd);
      }

      if (xchangeConfig.commands) {
        setAllowedCommands(true);
        setCommands(xchangeConfig.commands);
      }

      if (xchangeConfig.schedule) {
        setSchedule(xchangeConfig.schedule);
      }
    }
  }, [detailsData, detailsLoading]);

  function useOutsideAlerter(ref, comment: string, currentSid: string, currentComment: string) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (openUpdateComments && comment !== currentComment) {
            updateXchangeComment({
              variables: {
                sid: currentSid,
                comment,
              },
            });
          }
          setOpenUpdateComments(false);
          setCloseTooltipHost(false);
          setCloseTooltipHost(true);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, openUpdateComments, comments]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, comments, xchangeDataDetails?.sid ?? '', xchangeDataDetails?.comments.value ?? '');

  useEffect(() => {
    if (!isLoadingComment && commentData) {
      setOpenUpdateComments(false);
    }
  }, [isLoadingComment, commentData]);

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
    if (!detailsLoading && dataDiagram) {
      // console.log(dataDiagram)
      const xchangeFileProcessSid = xchangeDataDetails?.processes ? xchangeDataDetails?.processes[0].sid : '';
      return (
        <Diagram
          data={dataDiagram}
          refreshDetailsPage={setRefreshXchangeDetails}
          xchangeFileProcessSid={xchangeFileProcessSid ?? ''}
          allowedCommands={allowedCommands}
          commands={commands}
        />
      );
    }
    return null;
  };

  const tooltipHostComments = () => {
    const styles = {
      cursor: 'pointer',
      marginLeft: '10px',
      color: '',
    };
    if (comments) {
      styles.color = ThemeStore.userTheme.colors.yellow;
    } else {
      styles.color = ThemeStore.userTheme.colors.neutralTertiaryAlt;
    }
    if (!openUpdateComments && detailsData) {
      return (
        <>
          {closeTooltipHost && (
            <TooltipHost
              directionalHint={DirectionalHint['topCenter']}
              content={comments ? 'This File Transmission has comments. Click to see them.' : 'Click to add a comment'}
            >
              <Comment20Filled
                style={styles}
                onClick={() => {
                  setOpenUpdateComments(true);
                }}
              />
            </TooltipHost>
          )}
          {!closeTooltipHost && (
            <Comment20Filled
              style={styles}
              onClick={() => {
                setOpenUpdateComments(true);
              }}
            />
          )}
        </>
      );
    }

    const updatingComments = () => {
      if (!updateCmd) {
        return (
          <TextField
            id="FileTransmissionComment"
            readOnly
            value={comments}
            label="Comments"
            resizable={false}
            multiline
            rows={12}
          />
        )
      }

      return (
        <UIInputTextArea
          id="FileTransmissionComment"
          uiField={detailsData?.xchangeConfig?.comments}
          value={comments}
          onChange={(event, newValue: any) => {
            setComments(newValue ?? '');
          }}
          resizable={false}
          rows={12}
        />
      )
    };

    if (openUpdateComments) {
      return (
        <TooltipHost
          directionalHintForRTL={DirectionalHint['bottomCenter']}
          closeDelay={5000000}
          style={{ background: ThemeStore.userTheme.colors.yellow, width: '400px', padding: '0 10px 10px 10px' }}
          tooltipProps={{
            calloutProps: {
              styles: {
                beak: { background: ThemeStore.userTheme.colors.yellow },
                beakCurtain: { background: ThemeStore.userTheme.colors.yellow },
                calloutMain: { background: ThemeStore.userTheme.colors.yellow },
              },
            },
          }}
          content={updatingComments()}
        >
          <Comment20Filled style={styles} />
        </TooltipHost>
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
              <Stack horizontal={true} horizontalAlign="space-between">
                <PageTitle id="__Page__Title__Details" title="Xchange Details" />
                <div ref={wrapperRef}>{!detailsLoading && tooltipHostComments()}</div>
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
                <StyledColumTabs lg="9" key={index}>
                  <StyledProcessValueText variant="large">
                    {process.vendor.value?.name}-{process.specId.value}
                  </StyledProcessValueText>
                  <StyledButtonAction fontSize={24} id="__Add_FileProcess" iconName="add" title="Add File Process" />
                </StyledColumTabs>
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
        refreshPage={setRefreshXchangeDetails}
        typeSchedule={true}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  );
};

export { XchangeDetailsPage };
