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
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { UIInputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  DirectionalHint,
  IconButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  TooltipHost,
} from '@fluentui/react';
import { useNotification } from 'src/hooks/useNotification';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown';
import { PageBody } from 'src/components/layouts/Column';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { FileUploadDialog } from 'src/pages/Admin/XChange/XchangeDetails/FileUpload/FileUploadDialog';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { ROUTE_XCHANGE_DETAILS } from 'src/data/constants/RouteConstants';
import { Comment20Filled } from '@fluentui/react-icons';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { ButtonAction, ButtonLink } from 'src/components/buttons';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import {
  CardStyled,
  StyledColumTabs,
  SubsStyled,
  StyledButtonAction,
  StyledProcessValueText,
  StyledContainerDiagram,
  StyledQualifier,
} from './XchangeDetailsPage.styles';
import { Diagram } from './Diagram/Diagram';
import { XchangeAlertsPanel } from '../XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { StyledAlertTypes } from '../XchangeAlerts/XchangeAlertsPage.style';

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
  const [refreshXchangeDetails, setRefreshXchangeDetails] = useState(false);
  const [comments, setComments] = useState('');
  const [openUpdateComments, setOpenUpdateComments] = useState(false);
  const [closeTooltipHost, setCloseTooltipHost] = useState(true);
  const [sid, setSid] = useState('');
  const [openAlertsPanel, setOpenAlertsPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [callXchangeDetails, { data: detailsData, loading: detailsLoading, error: detailsError }] =
    useXchangeConfigLazyQuery();
  const [deleteXchangeConfigAlerts, { data: deleteConfigData, loading: deleteConfigLoading }] =
    useDeleteXchangeConfigAlertMutation();

  const [updateXchangeComment, { data: commentData }] = useUpdateXchangeConfigCommentMutation();
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

  const updateComments = () => {
    setCloseTooltipHost(false);
    updateXchangeComment({
      variables: {
        sid: xchangeDataDetails?.sid ?? '',
        comment: comments,
      },
    });
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = (currentSid: string) => {
    const updatedDialog = { ...defaultDialogProps };
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
            <StyledAlertTypes width="130px" key={index}>
              <Column lg="2">{type}</Column>
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
      let width = '40px';
      let color = 'blue';
      if (qualifier === 'TEST') {
        color = 'orange';
      } else if (qualifier === 'PROD-OE') {
        width = '60px';
      }

      return (
        <StyledQualifier width={width} color={color}>
          {qualifier}
        </StyledQualifier>
      );
    }

    return null;
  };

  const userPermissionsIcons = (commands: WebCommand[], currentSid: string) => {
    const _updateCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
    const _deleteCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);

    return (
      <>
        {_updateCmd && (
          <Column lg="1">
            <IconButton
              iconProps={{ iconName: 'EditSolid12' }}
              style={{ paddingBottom: '10px' }}
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
                  <Column lg="2">{filenameQualifier(alert.filenameQualifier ?? '', alert?.coreFilename ?? '')}</Column>
                  {userPermissionsIcons(alert?.commands ?? [], alert?.sid ?? '')}
                </Row>
                {typesAlertsRender(alert?.alertTypes ?? [])}
                <Spacing margin={{ top: 'normal' }}>
                  <Row>
                    <Column lg="2">
                      <Text style={{ fontWeight: 'bold' }}>Subscribers:</Text>
                    </Column>
                  </Row>
                </Spacing>
                {alert?.subscribers &&
                  alert?.subscribers.map((subs) => (
                    <Spacing margin="normal">
                      <Row>
                        <SubsStyled>
                          <ButtonLink style={{ fontSize: '12px' }}>{subs.firstNm}</ButtonLink>
                          <ButtonLink style={{ fontSize: '12px' }}> {subs.email}</ButtonLink>
                        </SubsStyled>
                      </Row>
                    </Spacing>
                  ))}
              </Spacing>
            ))}
            <ButtonAction id="__Add_Alert" iconName="add" onClick={() => setOpenAlertsPanel(true)}>
              Add alert
            </ButtonAction>
          </CardStyled>
          <Spacing margin={{ top: 'normal' }}>
            <CardStyled>
              <Container>
                <Row>
                  {fileProcesses?.map((process: XchangeFileProcessForm, index: number) => (
                    <UIInputMultiSelect
                      key={index}
                      id="__applicableOrgTypes"
                      uiField={process.filenameQualifiers}
                      options={process.options ?? []}
                    />
                  ))}
                </Row>
              </Container>
              <StyledButtonAction fontSize={18} id="__Add_FilenameQualifer" iconName="add">
                Add Filename Qualifier
              </StyledButtonAction>
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
      console.log(xchangeConfig);
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
    }
  }, [detailsData, detailsLoading]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (!openUpdateComments) {
            setOpenUpdateComments(false);
            setCloseTooltipHost(false);
            setTimeout(() => {
              setCloseTooltipHost(true);
            }, 0.001);
          }
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (!commentData && xchangeDataDetails) {
      updateComments();
    }
  }, [closeTooltipHost, commentData]);

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
      const xchangeFileProcessSid = xchangeDataDetails?.processes ? xchangeDataDetails?.processes[0].sid : '';
      return (
        <Diagram
          data={dataDiagram}
          refreshDetailsPage={setRefreshXchangeDetails}
          xchangeFileProcessSid={xchangeFileProcessSid ?? ''}
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
      styles.color = '#cdcd00';
    } else {
      styles.color = 'gray';
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

    const updateComment = () => (
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
    );

    if (openUpdateComments) {
      return (
        <TooltipHost
          directionalHintForRTL={DirectionalHint['bottomAutoEdge']}
          closeDelay={5000000}
          style={{ background: '#cdcd00', width: '400px', padding: '0 10px 10px 10px' }}
          tooltipProps={{
            calloutProps: {
              styles: {
                beak: { background: '#cdcd00' },
                beakCurtain: { background: '#cdcd00' },
                calloutMain: { background: '#cdcd00' },
              },
            },
          }}
          content={updateComment()}
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
                <div ref={wrapperRef}>{tooltipHostComments()}</div>
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
            {fileProcesses &&
              fileProcesses?.map((process, index) => (
                <StyledColumTabs lg="9" key={index}>
                  <StyledProcessValueText variant="large">
                    {process.vendor.value?.name}-{process.specId.value}
                  </StyledProcessValueText>
                  <StyledButtonAction fontSize={28} id="__Add_FileProcess" iconName="add">
                    <Text variant="large" style={{ fontWeight: 'bold' }}>
                      Add File Process
                    </Text>
                  </StyledButtonAction>
                </StyledColumTabs>
              ))}
          </Row>
          <Row>
            <StyledContainerDiagram>
              <Column lg="9">{renderDiagram()}</Column>
              <Column lg="3">{cardBox()}</Column>
            </StyledContainerDiagram>
          </Row>
        </Container>
        {renderFileUploadDialog()}
      </PageBody>
      <XchangeAlertsPanel
        isPanelOpen={openAlertsPanel}
        closePanel={setOpenAlertsPanel}
        sid={sid}
        refreshXchangeDetails={setRefreshXchangeDetails}
        coreFilename={coreFilenameValue}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  );
};

export { XchangeDetailsPage };
