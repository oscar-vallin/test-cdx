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
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_LIST } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useXchangeProfileLazyQuery, XchangeConfigSummary } from 'src/data/services/graphql';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { InputText } from 'src/components/inputs/InputText';
import { SetupStyled, CardStyled, ContainerInput, CircleStyled } from './XchangePage.styles';

type TooltipsProps = {
  hasAlerts: string;
  hasUnpublishedChanges: string;
  implementationPending: string;
  inactive: string;
  requiresConversion: string;
};

type GlobalXchangeAlertsProps = {
  coreFilename?: string;
  numSubscribers: number;
  hasUnpublishedChanges: boolean;
};

const XChangePage = () => {
  const { orgSid } = useOrgSid();

  const [xchangeProfile, { data: dataXchange, loading: loadingXchange }] = useQueryHandler(useXchangeProfileLazyQuery);

  const [xchanges, setXchanges] = useState<XchangeConfigSummary[]>([]);
  const [searchXchanges, setSearchXchanges] = useState<string>('');
  const [filterXchange, setFilterXchange] = useState<XchangeConfigSummary[]>([]);
  const [tooltipContent, setTooltipContent] = useState<TooltipsProps>();
  const [globalXchangeAlerts, setGlobalXchangeAlerts] = useState<GlobalXchangeAlertsProps>();
  const [individualXchangeAlerts, setIndividualXchangeAlerts] = useState<GlobalXchangeAlertsProps[]>();

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
    let minutes = currentDate.getMinutes();

    const format = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    hour = hour || 12;
    minutes = minutes < 10 ? minutes : minutes;
    const newHour = `${formattedDate} ${hour}:${minutes}${format}`;

    return newHour;
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
      setXchanges(dataXchange.xchangeProfile.xchanges);
      setTooltipContent(dataXchange.xchangeProfile.tooltips);
      setGlobalXchangeAlerts(dataXchange.xchangeProfile.globalXchangeAlerts);
      setIndividualXchangeAlerts(dataXchange.xchangeProfile.individualXchangeAlerts);
    }
  }, [dataXchange, loadingXchange]);

  useEffect(() => {
    if (xchanges.length > 0) {
      filterData();
    }
  }, [searchXchanges]);

  const onRenderItemColum = (node: XchangeConfigSummary, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'vendorIds') {
      columnVal = node?.vendorIds ? node?.vendorIds[0] : '';
    } else if (column?.key === 'specIds') {
      columnVal = node?.specIds ? node?.specIds[0] : '';
    } else if (column?.key === 'coreFilename') {
      columnVal = node?.coreFilename ?? '';
    }

    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <Link to={`/xchange-list?orgSid=${orgSid}`}>{columnVal}</Link>
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
                  <IconButton iconProps={{ iconName: 'Ringer' }} style={{ color: 'black' }} />
                </TooltipHost>
              )}
              {node?.implementationPending && (
                <TooltipHost content={tooltipContent?.implementationPending}>
                  <IconButton iconProps={{ iconName: 'Warning' }} style={{ color: 'orange' }} />
                </TooltipHost>
              )}
              {node?.hasUnpublishedChanges && (
                <TooltipHost content={tooltipContent?.hasUnpublishedChanges}>
                  <IconButton iconProps={{ iconName: '6PointStar' }} style={{ color: 'red' }} />
                </TooltipHost>
              )}
            </>
          )}
        </>
      </Stack>
    );
  };

  const onRenderAction = () => <IconButton iconProps={{ iconName: 'Trash' }} />;

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
    return (
      <PrimaryButton id="__Create-User" iconProps={{ iconName: 'FileHTML' }}>
        Publish
      </PrimaryButton>
    );
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
            {individualXchangeAlerts?.map((individualXchange: GlobalXchangeAlertsProps, index: number) => (
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
                <Column lg="8">
                  <Text style={{ fontWeight: 'bold', marginTop: '10px' }}>Comments</Text>
                </Column>
                <Column lg="4" right>
                  <IconButton iconProps={{ iconName: 'PencilReply' }} />
                </Column>
              </Row>
              <TextField multiline borderless={true} resizable={false} rows={7} />
            </ContainerInput>
          </CardStyled>
        </Spacing>
      </>
    );
  };

  return (
    <LayoutDashboard id="PageXChangePage" menuOptionSelected={ROUTE_XCHANGE_LIST.API_ID}>
      <PageHeader id="__XChangeHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Xchange" title="Xchange Profile" />
            </Column>
            <Column lg="6" right>
              {renderCreateButton()}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <Spacing margin={{ top: 'double' }}>
        <Container>
          <Row>
            <Column lg="6">
              <Text style={{ fontWeight: 'bold' }}>Xchanges</Text>
            </Column>
            <Column lg="2" right>
              <SetupStyled>
                <IconButton iconProps={{ iconName: 'Add' }} />
                <Text>Setup new Xchange</Text>
              </SetupStyled>
            </Column>
          </Row>
        </Container>
      </Spacing>
      <Container>
        <Row>
          <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
            <Column lg="8">
              <InputText
                id="Xchange_Input-Search"
                autofocus
                disabled={false}
                placeholder="Search"
                value={searchXchanges}
                onChange={(event, newValue) => setSearchXchanges(newValue ?? '')}
              />
            </Column>
          </Stack>
        </Row>
      </Container>
      <Container>
        <Row>
          <Column lg="9">{renderBody()}</Column>
          <Column lg="3">{cardBox()}</Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
};

export { XChangePage };
