import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
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
  TextField
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_LIST } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useXchangeProfileLazyQuery, XchangeConfigSummary } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Link } from 'react-router-dom';
import { InputText } from 'src/components/inputs/InputText';
import { SetupStyled, CardStyled, ContainerInput, CircleStyled } from './XchangePage.styles';

const XChangePage = () => {
  const { orgSid } = useOrgSid();

  const [xchangeProfile, { data: dataXchange, loading: loadingXchange }] = useQueryHandler(useXchangeProfileLazyQuery);

  const [xchanges, setXchanges] = useState<XchangeConfigSummary[]>([]);
  const [searchXchanges, setSearchXchanges] = useState<string>('');
  const [filterXchange, setFilterXchange] = useState<XchangeConfigSummary[]>([]);

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

  const tooltipHostContent = (filesProcessed: number, type: string, date: null) => {
    let currentColor: string;
    if (type === 'UAT') {
      currentColor = 'purple';
    } else if (type === 'PROD') {
      currentColor = 'blue';
    } else {
      currentColor = 'orange';
    }
    return (
      <>
        <span style={{ color: currentColor, fontWeight: 'bold' }}> {filesProcessed} </span>
        {type} files have been processed in the last 30 days <br />
        <span style={{ marginLeft: '88px' }}>Last Run: {date}</span> <br /> <br />
        <Link style={{ marginLeft: '88px' }}> Click for details</Link>
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, [useOrgSid]);

  useEffect(() => {
    if (!loadingXchange && dataXchange) {
      setXchanges(dataXchange.xchangeProfile.xchanges);
    }
  }, [dataXchange, loadingXchange]);

  useEffect(() => {
    console.log(xchanges);
  }, [xchanges]);

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
        <Link>{columnVal}</Link>
        <>
          {column?.key === 'active' && (
            <>
              {node?.uatActivity.filesProcessed > 0 ? (
                <TooltipHost
                  content={tooltipHostContent(node?.uatActivity.filesProcessed, 'UAT', node?.uatActivity?.lastActivity)}
                >
                  <CircleStyled color="purple">{node?.uatActivity.filesProcessed}</CircleStyled>
                </TooltipHost>
              ) : (
                <CircleStyled color="gray">0</CircleStyled>
              )}
              {node?.testActivity.filesProcessed > 0 ? (
                <TooltipHost
                  content={tooltipHostContent(
                    node?.testActivity.filesProcessed,
                    'TEST',
                    node?.testActivity?.lastActivity
                  )}
                >
                  <CircleStyled color="orange">{node?.testActivity.filesProcessed}</CircleStyled>
                </TooltipHost>
              ) : (
                <CircleStyled color="gray">0</CircleStyled>
              )}
              {node?.prodActivity.filesProcessed > 0 ? (
                <TooltipHost
                  content={tooltipHostContent(
                    node?.prodActivity.filesProcessed,
                    'PROD',
                    node?.prodActivity?.lastActivity
                  )}
                >
                  <CircleStyled color="blue">{node?.testActivity.filesProcessed}</CircleStyled>
                </TooltipHost>
              ) : (
                <CircleStyled color="gray">0</CircleStyled>
              )}
            </>
          )}
          {column?.key === 'vendorIds' && (
            <>
              {node?.hasAlerts && (
                <TooltipHost id="index" content="Has Xchange specific Alerts">
                  <IconButton iconProps={{ iconName: 'Ringer' }} style={{ color: 'black' }} aria-describedby="index" />
                </TooltipHost>
              )}
              {node?.hasAlerts && (
                <TooltipHost
                  id="index"
                  content="This Xchange configuration is incomplete. Publishing the Xchange Profile will not include this Xchange"
                >
                  <IconButton
                    iconProps={{ iconName: 'Warning' }}
                    style={{ color: 'orange' }}
                    aria-describedby="index"
                  />
                </TooltipHost>
              )}
              {node?.implementationPending && (
                <TooltipHost id="index" content="Has unpublished changes">
                  <IconButton
                    iconProps={{ iconName: '6PointStar' }}
                    style={{ color: 'red' }}
                    aria-describedby="index"
                  />
                </TooltipHost>
              )}
            </>
        )}
        </>
      </Stack>
    );
  };

  const onRenderAction = () => <IconButton iconProps={{ iconName: 'Trash' }} title="View Org Details" />;

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
      onRender: onRenderAction
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
          <Column lg="3">
            <CardStyled />
            <Spacing margin={{ top: 'normal' }}>
              <CardStyled>
                <ContainerInput>
                  <TextField multiline borderless={true} label="Comments" resizable={false} rows={7} />
                </ContainerInput>
              </CardStyled>
            </Spacing>
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
};

export { XChangePage };
