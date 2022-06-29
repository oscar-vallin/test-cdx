import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Link } from 'react-router-dom';
import {
  IColumn,
  DetailsList,
  Text,
  Spinner,
  SpinnerSize,
  SelectionMode,
  DetailsListLayoutMode,
  IconButton,
  TooltipHost,
  Stack,
  PrimaryButton,
  TextField,
  SearchBox,
  FontIcon,
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_LIST } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  useXchangeProfileLazyQuery,
  XchangeConfigSummary,
  useUpdateXchangeProfileCommentMutation,
} from 'src/data/services/graphql';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { PageBody } from 'src/components/layouts/Column';
import { PreviewConvertXchangePanel } from './PreviewConvertXchangePanel';
import {
  SetupStyled,
  CardStyled,
  ContainerInput,
  CircleStyled,
  StyledButtonAction,
  StyledIconsComments,
} from './XchangePage.styles';

type TooltipsProps = {
  hasAlerts: string;
  hasUnpublishedChanges: string;
  implementationPending: string;
  inactive: string;
  requiresConversion: string;
};

type XchangeAlertsProps = {
  coreFilename?: string;
  numSubscribers: number;
  hasUnpublishedChanges: boolean;
};

const XChangePage = () => {
  const { orgSid } = useOrgSid();

  const [xchangeProfile, { data: dataXchange, loading: loadingXchange }] = useQueryHandler(useXchangeProfileLazyQuery);

  // const [xchangeProfileComment, { data: dataComment, loading: loadingComment }] = useQueryHandler(useUpdateXchangeProfileCommentMutation);

  const [xchanges, setXchanges] = useState<XchangeConfigSummary[]>([]);
  const [searchXchanges, setSearchXchanges] = useState<string>('');
  const [filterXchange, setFilterXchange] = useState<XchangeConfigSummary[]>([]);
  const [tooltipContent, setTooltipContent] = useState<TooltipsProps>();
  const [globalXchangeAlerts, setGlobalXchangeAlerts] = useState<XchangeAlertsProps>();
  const [individualXchangeAlerts, setIndividualXchangeAlerts] = useState<XchangeAlertsProps[]>();
  const [requiresConversion, setRequiresConversion] = useState<boolean>();
  const [editComment, setEditComment] = useState(false);
  const [comment, setComment] = useState('');
  const [saveComment, setSaveComment] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);

  const fetchData = () => {
    xchangeProfile({
      variables: {
        orgSid,
      },
    });
  };

  const filterData = () => {
    setFilterXchange([]);
    const search = new RegExp(searchXchanges, 'i');
    xchanges.forEach((data: XchangeConfigSummary) => {
      const spec = data?.specIds ?? '';
      const vendor = data?.vendorIds ?? '';
      const coreFilename = data?.coreFilename ?? '';
      if (coreFilename || spec || vendor) {
        if (search.test(coreFilename) || search.test(spec[0]) || search.test(vendor[0])) {
          setFilterXchange((currentXchange) => currentXchange.concat(data));
        }
      }
    });
  };

  const updateDateFormat = (date: Date) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toDateString();
    let hour = currentDate.getHours();
    let minutes: string = currentDate.getMinutes().toString();
    const format = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    hour = hour || 12;
    minutes = minutes.length < 2 ? `0${minutes}` : minutes;
    return `${formattedDate} ${hour}:${minutes}${format}`;
  };

  const tooltipHostContent = (lastActivity: Date, type?: string, vendorName?: string[] | null) => {
    const error = type?.trim() !== '';
    const fromDate = new Date(lastActivity);
    const vendor = vendorName && vendorName[0];
    let currentColor: string;
    if (type === 'UAT') {
      currentColor = 'purple';
    } else if (type === 'PROD') {
      currentColor = 'blue';
    } else {
      currentColor = 'orange';
    }

    const currentDate = updateDateFormat(lastActivity);
    const startFormatted = yyyyMMdd(fromDate);

    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {error ? (
          <>
            <span style={{ color: currentColor, fontWeight: 'bold' }}> {} </span>
            {type} files have been processed in the last 30 days <br />
            <span style={{ marginLeft: '40px' }}>Last Run: {currentDate}</span> <br /> <br />
            <Link
              style={{ marginLeft: '88px' }}
              to={`/file-status?filter=${vendor}&orgSid=${orgSid}&startDate=${startFormatted}`}
            >
              {' '}
              Click for details
            </Link>
          </>
        ) : (
          <>
            <span>A file processed on {lastActivity} result in an error</span> <br /> <br />
            <Link
              to={`/file-status?filter=${vendor}&orgSid=${orgSid}&startDate=${startFormatted}`}
              style={{ marginLeft: '40px' }}
            >
              {' '}
              Click for details
            </Link>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, [useOrgSid]);

  useEffect(() => {
    if (!loadingXchange && dataXchange) {
      console.log(dataXchange)
      setXchanges(dataXchange.xchangeProfile.xchanges);
      setTooltipContent(dataXchange.xchangeProfile.tooltips);
      setGlobalXchangeAlerts(dataXchange.xchangeProfile.globalXchangeAlerts);
      setIndividualXchangeAlerts(dataXchange.xchangeProfile.individualXchangeAlerts);
      setRequiresConversion(dataXchange.xchangeProfile.requiresConversion);
    }
  }, [dataXchange, loadingXchange]);

  useEffect(() => {
    if (xchanges.length > 0) {
      filterData();
    }

    // if (saveComment) {
    //   console.log(orgSid, comment)
    //   xchangeProfileComment({
    //     variables: {
    //       orgSid,
    //       comment,
    //     },
    //   });
    // }
  }, [searchXchanges]);

  // useEffect(() => {
  //   console.log(dataComment)
  // }, [dataComment]);

  const onRenderItemColum = (node: XchangeConfigSummary, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'vendorIds') {
      columnVal = node?.vendorIds ? node?.vendorIds[0] : '';
    } else if (column?.key === 'specIds') {
      columnVal = node?.specIds ? node?.specIds[0] : '';
    } else if (column?.key === 'coreFilename') {
      columnVal = node?.coreFilename ?? '';
    }

    const coreFilename = node?.coreFilename;
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <Link to={`/xchange-details?orgSid=${orgSid}&coreFilename=${coreFilename}`}>{columnVal}</Link>
        <>
          {column?.key === 'active' && (
            <>
              {node?.uatActivity.filesProcessed > 0 ? (
                <TooltipHost content={tooltipHostContent(node?.uatActivity?.lastActivity, 'UAT', node?.vendorIds)}>
                  <CircleStyled color="purple">{node?.uatActivity.filesProcessed}</CircleStyled>
                </TooltipHost>
              ) : (
                <CircleStyled color="gray">0</CircleStyled>
              )}
              {node?.testActivity.filesProcessed > 0 ? (
                <TooltipHost content={tooltipHostContent(node?.testActivity.lastActivity, 'TEST', node?.vendorIds)}>
                  <CircleStyled color="orange">{node?.testActivity.filesProcessed}</CircleStyled>
                </TooltipHost>
              ) : (
                <CircleStyled color="gray">0</CircleStyled>
              )}
              {node?.prodActivity.filesProcessed > 0 ? (
                <TooltipHost content={tooltipHostContent(node?.prodActivity?.lastActivity, 'PROD', node?.vendorIds)}>
                  <CircleStyled color="blue">{node?.prodActivity.filesProcessed}</CircleStyled>
                </TooltipHost>
              ) : (
                <CircleStyled color="gray">0</CircleStyled>
              )}
              {node?.errorActivity && node?.errorActivity.filesProcessed > 0 && (
                <TooltipHost content={tooltipHostContent(node?.errorActivity?.lastActivity, '', node?.vendorIds)}>
                  <IconButton iconProps={{ iconName: 'FileBug' }} style={{ color: 'red' }} />
                </TooltipHost>
              )}
            </>
          )}
          {column?.key === 'vendorIds' && (
            <>
              {node?.hasAlerts && (
                <TooltipHost content={tooltipContent?.hasAlerts}>
                  <FontIcon
                    style={{ color: 'black', fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}
                    aria-describedby="XchangeSpecificAlerts-Icon"
                    iconName="Ringer"
                  />
                </TooltipHost>
              )}
              {node?.implementationPending && (
                <TooltipHost content={tooltipContent?.implementationPending}>
                  <FontIcon
                    style={{ color: 'orange', fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}
                    aria-describedby="XchangeImplementationPending-Icon"
                    iconName="Warning"
                  />
                </TooltipHost>
              )}
              {node?.hasUnpublishedChanges && (
                <TooltipHost content={tooltipContent?.hasUnpublishedChanges}>
                  <FontIcon
                    style={{ color: 'red', fontSize: '12px', cursor: 'pointer' }}
                    aria-describedby="XchangeUnpublishedChanges-Icon"
                    iconName="6PointStar"
                  />
                </TooltipHost>
              )}
            </>
          )}
        </>
      </Stack>
    );
  };

  const onRenderAction = () => {
    if (!requiresConversion) {
      return <IconButton iconProps={{ iconName: 'Trash' }} />;
    }
    return null;
  };

  const columns: IColumn[] = [
    {
      name: 'Vendor',
      key: 'vendorIds',
      fieldName: 'vendorIds',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 600,
      flexGrow: 1,
    },
    {
      name: 'Spec',
      key: 'specIds',
      fieldName: 'specIds',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Core Filename',
      key: 'coreFilename',
      fieldName: 'coreFilename',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Activity',
      key: 'active',
      fieldName: 'active',
      data: 'string',
      isPadded: true,
      minWidth: 150,
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

  const renderCreateButton = () => {
    if (dataXchange && !requiresConversion) {
      return (
        <PrimaryButton id="__Publish" iconProps={{ iconName: 'FileHTML' }}>
          Publish
        </PrimaryButton>
      );
    }
    if (dataXchange && requiresConversion) {
      return (
        <PrimaryButton id="__Convert-NewFormat" iconProps={{ iconName: 'Play' }} onClick={() => setOpenPanel(true)}>
          Convert to new Format
        </PrimaryButton>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (loadingXchange) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading active orgs" />
        </Spacing>
      );
    }

    if (!xchanges.length) {
      return <Text>Empty</Text>;
    }

    if (filterXchange.length || searchXchanges.trim() !== '') {
      return (
        <DetailsList
          items={filterXchange}
          columns={columns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColum}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      );
    }

    return (
      <DetailsList
        items={xchanges}
        columns={columns}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={onRenderItemColum}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
      />
    );
  };

  const cardBox = () => {
    return (
      <>
        <CardStyled>
          <Link to={`/xchange-alerts?orgSid=${orgSid}`}>
            <IconButton iconProps={{ iconName: 'Ringer' }} />
            Alerts
          </Link>
          <Spacing margin="normal">
            <Row>
              <Text style={{ fontWeight: 'bold' }}>Alert on all Xchanges</Text>
            </Row>
            <Spacing margin="normal" />
            <Link to={`/xchange-alerts?orgSid=${orgSid}`}>({globalXchangeAlerts?.numSubscribers}) Subscribers</Link>
          </Spacing>
          <Spacing margin="normal">
            <Row>
              <Text style={{ fontWeight: 'bold' }}>Individual Xchange Alerts</Text>
            </Row>
            <Spacing margin="normal" />
            {individualXchangeAlerts?.map((individualXchange: XchangeAlertsProps, index: number) => (
              <Spacing margin={{ bottom: 'normal' }} key={index}>
                <Row>
                  <Column lg="8">
                    <Link to={`/xchange-alerts?orgSid=${orgSid}`} style={{ fontSize: '12px' }}>
                      {' '}
                      {individualXchange.coreFilename}{' '}
                    </Link>
                  </Column>
                  <Column lg="4">
                    <Link to={`/xchange-alerts?orgSid=${orgSid}`} style={{ fontSize: '12px' }}>
                      {' '}
                      ({individualXchange.numSubscribers}) Subscriber
                    </Link>
                  </Column>
                </Row>
              </Spacing>
            ))}
          </Spacing>
        </CardStyled>
        <Spacing margin={{ top: 'normal' }}>
          <CardStyled>
            <ContainerInput>
              <Row>
                <Column lg="6">
                  <Text style={{ fontWeight: 'bold', marginTop: '10px' }}>Comments</Text>
                </Column>
                {!requiresConversion && editComment ? (
                  <>
                    <Column lg="3">
                      <StyledIconsComments>
                        <IconButton iconProps={{ iconName: 'Save' }} onClick={() => setSaveComment(true)} />
                        <Text variant="small">Save</Text>
                      </StyledIconsComments>
                    </Column>
                    <Column lg="3" right>
                      <StyledIconsComments>
                        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={() => setEditComment(false)} />
                        <Text variant="small">Cancel</Text>
                      </StyledIconsComments>
                    </Column>
                  </>
                ) : (
                  <Column lg="6" right>
                    <IconButton
                      iconProps={{ iconName: 'EditSolid12' }}
                      onClick={() => setEditComment(!requiresConversion && true)}
                    />
                  </Column>
                )}
              </Row>
              <TextField
                multiline
                borderless={true}
                readOnly={requiresConversion && !editComment}
                resizable={false}
                rows={7}
                onChange={(event, newValue) => setComment(newValue ?? '')}
              />
            </ContainerInput>
          </CardStyled>
        </Spacing>
      </>
    );
  };

  return (
    <LayoutDashboard id="XChangePage" menuOptionSelected={ROUTE_XCHANGE_LIST.API_ID}>
      <PageHeader id="__XChangeHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Xchange" title="Xchange Profile" />
              {requiresConversion && (
                <TooltipHost content={tooltipContent?.requiresConversion} id="requiresConversion">
                  <FontIcon
                    iconName="ReportWarning"
                    id="requiresConversion"
                    style={{
                      color: 'orange',
                      fontWeight: 700,
                      fontSize: '18px',
                      margin: '5px 0 0 8px',
                      cursor: 'pointer',
                    }}
                  />
                </TooltipHost>
              )}
            </Column>
            <Column lg="6" right>
              {renderCreateButton()}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__XchangeListBody">
        <Spacing margin={{ top: 'double' }}>
          <Container>
            <Row>
              <Column lg="7">
                <Text style={{ fontWeight: 'bold' }}>Xchanges</Text>
              </Column>
              {!requiresConversion && (
                <Column lg="2" right>
                  <SetupStyled>
                    <StyledButtonAction id="__SetupNewXchange">
                      + <Text style={{ paddingTop: '5px' }}>Setup new Xchange</Text>
                    </StyledButtonAction>
                  </SetupStyled>
                </Column>
              )}
            </Row>
            <Row>
              <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
                <Column lg="9">
                  <SearchBox
                    id="Xchange_Input-Search"
                    disabled={false}
                    styles={{ root: { width: '100%' } }}
                    value={searchXchanges}
                    onChange={(event, newValue) => setSearchXchanges(newValue ?? '')}
                    placeholder="Search"
                  />
                </Column>
              </Stack>
            </Row>
            <Row>
              <Column lg="9">{renderBody()}</Column>
              <Column lg="3">{cardBox()}</Column>
            </Row>
          </Container>
        </Spacing>
      </PageBody>
      <PreviewConvertXchangePanel isPanelOpen={openPanel} closePanel={setOpenPanel} />
    </LayoutDashboard>
  );
};

export { XChangePage };
