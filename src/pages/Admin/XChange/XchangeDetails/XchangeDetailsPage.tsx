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
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { InputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { IconButton, Spinner, SpinnerSize, Text } from '@fluentui/react';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown';
import { PageBody } from 'src/components/layouts/Column';
import { Diagram } from './Diagram/Diagram';
import {
  CardStyled,
  StyledColumTabs,
  SubsStyled,
  StyledButtonAction,
  StyledProcessValueText,
} from './XchangeDetailsPage.styles';

const XchangeDetailsPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [xchangeDataDetails, setXchangeDataDetails] = useState<XchangeConfigForm>();
  const [coreFilenameData, setCoreFilenameData] = useState<UiStringField>();
  const [coreFilenamePatternData, setCoreFilenamePatternData] = useState<UiStringField>();
  const [coreFilenameValue, setCoreFilenameValue] = useState<string>('');
  const [coreFilenamePatternValue, setCoreFilenamePatternValue] = useState<string>('');
  const [xchangesAlerts, setXchangesAlerts] = useState<XchangeAlert[]>();
  const [fileProcess, setFileProcess] = useState<XchangeFileProcessForm[]>();
  const [dataDiagram, setDataDiagram] = useState<XchangeDiagram>();

  const [xchangeDetails, { data: detailsData, loading: detailsLoading }] = useQueryHandler(useXchangeConfigLazyQuery);

  const fetchData = () => {
    const orgSid = urlParams.get('orgSid');
    const coreFilename = urlParams.get('coreFilename');
    xchangeDetails({
      variables: {
        orgSid,
        coreFilename,
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
                  {fileProcess?.map((process: XchangeFileProcessForm, index: number) => (
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
                    + Add Filename Qualifer
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
          <Spinner size={SpinnerSize.large} label="Loading active orgs" />
        </Spacing>
      );
    }

    return (
      <>
        <Column lg="3" direction="row">
          <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
            <InputText
              id="coreFilename"
              type="text"
              value={coreFilenameValue}
              disabled={coreFilenameData?.readOnly ?? false}
              label={coreFilenameData?.label}
              info={coreFilenameData?.info ?? undefined}
              minLength={coreFilenameData?.min ?? undefined}
              maxLength={coreFilenameData?.max ?? undefined}
              onChange={(event, newValue) => setCoreFilenameValue(newValue ?? '')}
            />
          </Spacing>
        </Column>
        <Column lg="3">
          <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
            <InputText
              id="coreFilenamePattern"
              type="text"
              value={coreFilenamePatternValue}
              disabled={coreFilenamePatternData?.readOnly ?? false}
              label={coreFilenamePatternData?.label}
              info={coreFilenamePatternData?.info ?? undefined}
              minLength={coreFilenamePatternData?.min ?? undefined}
              maxLength={coreFilenamePatternData?.max ?? undefined}
              onChange={(event, newValue) => setCoreFilenamePatternValue(newValue ?? '')}
            />
          </Spacing>
        </Column>
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (detailsData && !detailsLoading) {
      setXchangeDataDetails(detailsData.xchangeConfig);
      setXchangesAlerts(detailsData.xchangeConfig.alerts);
    }
  }, [detailsData, detailsLoading]);

  useEffect(() => {
    if (xchangeDataDetails?.coreFilename) {
      setCoreFilenameData(xchangeDataDetails?.coreFilename);
      setCoreFilenameValue(xchangeDataDetails?.coreFilename.value ?? '');
      if (xchangeDataDetails?.processes && xchangeDataDetails?.processes[0]) {
        setDataDiagram(xchangeDataDetails?.processes[0]?.diagram);
      }
    }

    if (xchangeDataDetails?.coreFilenamePattern) {
      setCoreFilenamePatternData(xchangeDataDetails?.coreFilenamePattern);
      setCoreFilenamePatternValue(xchangeDataDetails?.coreFilenamePattern.value ?? '');
    }

    if (xchangeDataDetails?.processes) {
      setFileProcess(xchangeDataDetails?.processes);
    }
  }, [xchangeDataDetails]);

  return (
    <LayoutDashboard id="XchangeDetailsPage">
      <PageHeader id="__XchangeDetailsPage">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title__Details" title="Xchange Details" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>{renderBody()}</Row>
          <Row>
            {fileProcess &&
              fileProcess?.map((process, index) => (
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
            <Column lg="9">{dataDiagram && <Diagram data={dataDiagram} />}</Column>
            <Column lg="3">{cardBox()}</Column>
          </Row>
        </Container>
      </PageBody>
    </LayoutDashboard>
  );
};

export { XchangeDetailsPage };
