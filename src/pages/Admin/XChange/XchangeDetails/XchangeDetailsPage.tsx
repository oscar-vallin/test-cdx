import React, { useEffect, useState } from 'react';
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
} from 'src/data/services/graphql';
import { UIInputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { IconButton, PrimaryButton, Spinner, SpinnerSize, Text } from '@fluentui/react';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown';
import { PageBody } from 'src/components/layouts/Column';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { FileUploadDialog } from 'src/pages/Admin/XChange/XchangeDetails/FileUpload/FileUploadDialog';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import {
  CardStyled,
  StyledColumTabs,
  SubsStyled,
  StyledButtonAction,
  StyledProcessValueText,
} from './XchangeDetailsPage.styles';
import { Diagram } from './Diagram/Diagram';

const XchangeDetailsPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { orgSid } = useOrgSid();

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

  const [callXchangeDetails, { data: detailsData, loading: detailsLoading, error: detailsError }] =
    useXchangeConfigLazyQuery();
  const [showFileUpload, setShowFileUpload] = useState(false);
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(detailsError);
  }, [detailsError]);

  const fetchData = () => {
    const coreFilename = urlParams.get('coreFilename');
    callXchangeDetails({
      variables: {
        orgSid,
        coreFilename: coreFilename ?? '',
      },
    });
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
            <Spacing margin="normal">
              <Row>
                <Text style={{ fontWeight: 'bold' }}>Alert on all Xchanges</Text>
              </Row>
              <Spacing margin="normal" />
              <Text>Subscribers</Text>
            </Spacing>
            <Spacing margin="normal">
              <Row>
                <Text style={{ fontWeight: 'bold' }}>Subscribers:</Text>
              </Row>
              <Spacing margin="normal" />
              {xchangesAlerts?.map((xchangeData: XchangeAlert) =>
                xchangeData.subscribers?.map((subs, index: number) => (
                  <Spacing margin={{ bottom: 'normal' }} key={index}>
                    <Row>
                      <SubsStyled>
                        <Text style={{ fontSize: '12px' }}>Alicia </Text>
                        <Text style={{ fontSize: '12px' }}> {subs.email}</Text>
                      </SubsStyled>
                    </Row>
                  </Spacing>
                ))
              )}
            </Spacing>
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
                <Row>
                  <StyledButtonAction fontSize={18} id="__Add_FilenameQualifer">
                    + Add Filename Qualifier
                  </StyledButtonAction>
                </Row>
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
    }
  }, [detailsData, detailsLoading]);

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
      return (
        <Diagram
          data={dataDiagram}
          refreshDetailsPage={setRefreshXchangeDetails}
          xchangeFileProcessSid={xchangeDataDetails?.sid ?? ''}
        />
      );
    }
    return null;
  };

  return (
    <LayoutDashboard id="XchangeDetailsPage">
      <PageHeader id="__XchangeDetailsPage">
        <Container>
          <Row>
            <Column lg="6">
              <PageTitle id="__Page__Title__Details" title="Xchange Details" />
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
                  <StyledButtonAction fontSize={28} id="__Add_FileProcess">
                    <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>{' '}
                    <Text variant="large">Add File Process</Text>
                  </StyledButtonAction>
                </StyledColumTabs>
              ))}
          </Row>
          <Row>
            <Column lg="9">{renderDiagram()}</Column>
            <Column lg="3">{cardBox()}</Column>
          </Row>
        </Container>
        {renderFileUploadDialog()}
      </PageBody>
    </LayoutDashboard>
  );
};

export { XchangeDetailsPage };
