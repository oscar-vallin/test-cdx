import React, { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  DirectionalHint,
  FontIcon,
  IColumn,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  TooltipHost,
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { ROUTE_FULL_SPEC_LIBRARY } from 'src/data/constants/RouteConstants';
import {
  CdxWebCommandType,
  useVendorSpecsLazyQuery,
  VendorSpecSummary,
  WebCommand,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useHistory } from 'react-router-dom';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import { useThemeStore } from 'src/store/ThemeStore';
import { ButtonLink } from 'src/components/buttons';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { SpecPanel } from './SpecPanel';
import { CardStyled, CircleStyled, ContainerInput } from '../Xchanges/XchangePage.styles';

const FullSpecLibraryPage = () => {
  const { orgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const history = useHistory();
  const ActiveDomain = useActiveDomainUseCase();
  const [vendors, setVendors] = useState<VendorSpecSummary[] | null>();
  const [searchFullSpec, setSearchFullSpec] = useState<string>('');
  const [filterFullSpec, setFilterFullSpec] = useState<VendorSpecSummary[]>([]);
  const [sid, setSid] = useState('');
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [refreshPage, setRefreshPage] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [increaseDelay, setIncreasedelay] = useState(1500);

  const [fullVendorsSpecs,
    {
      data: vendorsSpecsData,
      loading: isLoadingvendorsSpecs,
    },
  ] = useVendorSpecsLazyQuery();

  const fetchData = () => {
    fullVendorsSpecs({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    setRefreshPage(false);
    fetchData();
  }, [refreshPage]);

  const filterFullSpecData = () => {
    setFilterFullSpec([]);
    const search = new RegExp(searchFullSpec, 'i');
    vendors?.forEach((vendor: VendorSpecSummary) => {
      const name = vendor.name ?? '';
      if (name) {
        if (search.test(name)) {
          setFilterFullSpec((currentVendors) => currentVendors.concat(vendor));
        }
      }
    });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (vendors && vendors?.length > 0) {
      const timer = setTimeout(() => filterFullSpecData(), 500);
      return () => clearTimeout(timer);
    }
  }, [searchFullSpec]);

  useEffect(() => {
    if (!isLoadingvendorsSpecs && vendorsSpecsData) {
      const { vendorSpecs } = vendorsSpecsData;
      setVendors(vendorSpecs?.nodes);
      if (vendorSpecs?.listPageInfo?.pageCommands) {
        const pageCommands = vendorSpecs?.listPageInfo.pageCommands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
        const _deleteCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Delete);
        setDeleteCmd(_deleteCmd);
      }
    }
  }, [vendorsSpecsData, isLoadingvendorsSpecs]);

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

  const tooltipHostContent = (
    lastActivity: Date,
    activityType?: string,
    currentSid?: string,
    filesProcessed?: number,
  ) => {
    const error = activityType?.trim() !== '';
    const fromDate = new Date(lastActivity);
    let currentColor: string;
    if (activityType === 'UAT') {
      currentColor = 'purple';
    } else if (activityType === 'PROD') {
      currentColor = 'blue';
    } else {
      currentColor = 'orange';
    }

    const currentDate = updateDateFormat(lastActivity);
    const endDate = yyyyMMdd(fromDate);
    const endFormatted = new Date(endDate);
    endFormatted.setDate(endFormatted.getDate() - 29);
    const startDate = yyyyMMdd(endFormatted);
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {error && (
          <>
            <span style={{ color: currentColor, fontWeight: 'bold' }}> {filesProcessed} </span>
            {activityType} files have been processed in the last 30 days <br />
            <span style={{ marginLeft: '20px' }}>Last Run: {currentDate}</span> <br /> <br />
            <ButtonLink
              style={{ marginLeft: '70px' }}
              onClick={() => {
                ActiveDomain.setCurrentOrg(currentSid);
                history.push(`/file-status?endDate=${endDate}&orgSid=6&startDate=${startDate}`);
              }}
            >
              {' '}
              Click for details
            </ButtonLink>
          </>
        )}
      </>
    );
  };

  const onRenderItemColum = (item:VendorSpecSummary, itemIndex?: number, column?: IColumn) => {
    if (item && column?.key === 'name') {
      const value = item[column.key];
      return <ButtonLink>{value}</ButtonLink>;
    }

    const uatFilesProcessed = item?.uatActivity.filesProcessed;
    const testFilesProcessed = item?.testActivity.filesProcessed;
    const prodFilesProcessed = item?.prodActivity.filesProcessed;

    return (
      <Stack
        horizontal
        horizontalAlign="start"
        tokens={{
          childrenGap: 5.5,
          padding: '0px 0px 0px 10px',
        }}
      >
        {column?.key === 'integratedClients' && (
        <ButtonLink>{item.integratedClients.length}</ButtonLink>
        )}
        {column?.key === 'active' && (
          <>
            {uatFilesProcessed && uatFilesProcessed > 0 ? (
              <TooltipHost
                content={item.sid ? tooltipHostContent(
                  item?.uatActivity?.lastActivity,
                  'UAT',
                  item?.sid ?? '',
                  uatFilesProcessed,
                ) : undefined}
                directionalHint={DirectionalHint.topRightEdge}
                closeDelay={increaseDelay}
                onMouseOver={() => setIncreasedelay(2000)}
                onMouseLeave={() => setIncreasedelay(0)}
              >
                <CircleStyled total={!item.sid} color="purple">{uatFilesProcessed}</CircleStyled>
              </TooltipHost>
            ) : (
              <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
            )}
            {testFilesProcessed && testFilesProcessed > 0 ? (
              <TooltipHost
                content={item.sid ? tooltipHostContent(
                  item?.testActivity?.lastActivity,
                  'TEST',
                  item?.sid ?? '',
                  testFilesProcessed,
                ) : undefined}
                directionalHint={DirectionalHint.topRightEdge}
                closeDelay={increaseDelay}
                onMouseOver={() => setIncreasedelay(2000)}
                onMouseLeave={() => setIncreasedelay(0)}
              >
                <CircleStyled total={!item.sid} color="orange">{testFilesProcessed}</CircleStyled>
              </TooltipHost>
            ) : (
              <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
            )}
            {prodFilesProcessed && prodFilesProcessed > 0 ? (
              <TooltipHost
                content={item.sid ? tooltipHostContent(
                  item?.prodActivity?.lastActivity,
                  'PROD',
                  item?.sid ?? '',
                  prodFilesProcessed,
                ) : undefined}
                directionalHint={DirectionalHint.topRightEdge}
                closeDelay={increaseDelay}
                onMouseOver={() => setIncreasedelay(2000)}
                onMouseLeave={() => setIncreasedelay(0)}
              >
                <CircleStyled total={!item.sid} color="blue">{prodFilesProcessed}</CircleStyled>
              </TooltipHost>
            ) : (
              <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
            )}
          </>
        )}
      </Stack>
    )
  }

  const onRenderAction = (item) => {
    const styles = {
      cursor: 'pointer',
      color: ThemeStore.userTheme.colors.themePrimary,
    }
    const active = item.active ? 'Deactivate' : 'Inactive';
    if (deleteCmd) {
      return (
        <TooltipHost content={active} directionalHint={DirectionalHint.rightCenter}>
          <FontIcon
            iconName="Trash"
            style={styles}
          />
        </TooltipHost>
      )
    }
    return null;
  }

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '# Implementations',
      key: 'integratedClients',
      fieldName: 'integratedClients',
      data: 'string',
      isPadded: true,
      styles: {
        cellTitle: {
          paddingRight: '100px',
        },
      },
      minWidth: 250,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Activity',
      key: 'active',
      fieldName: 'active',
      data: 'string',
      isPadded: true,
      styles: {
        cellTitle: {
          paddingLeft: '30px',
        },
      },
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

  const cardBox = () => (
    <Spacing margin={{ top: 'double' }}>
      <CardStyled>
        <ContainerInput>
          <Row>
            <Column lg="6">
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Text variant="semiBold">Comments</Text>
              </Spacing>
            </Column>
          </Row>
          <TextField
            multiline
            borderless={true}
            resizable={false}
            rows={7}
          />
        </ContainerInput>
      </CardStyled>
    </Spacing>
  );

  const renderBody = () => {
    if (isLoadingvendorsSpecs) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Specification Page" />
        </Spacing>
      );
    }

    if (filterFullSpec.length || searchFullSpec.trim() !== '') {
      return (
        <DetailsList
          items={filterFullSpec ?? []}
          columns={columns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColum}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      )
    }

    return (
      <DetailsList
        items={vendors ?? []}
        columns={columns}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={onRenderItemColum}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
      />
    );
  };

  return (
    <LayoutDashboard id="FullSpecLibraryPage" menuOptionSelected={ROUTE_FULL_SPEC_LIBRARY.API_ID}>
      <PageHeader id="__FullSpecLibraryHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Spec_Library" title="Specification Library" />
            </Column>
            <Column lg="6" right>
              {createCmd && (
                <PrimaryButton
                  id="__CreateNewSpec"
                  iconProps={{ iconName: 'Add' }}
                  onClick={() => {
                    setSid('');
                    setIsOpenPanel(true);
                  }}
                >
                  Create new spec
                </PrimaryButton>
              )}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__FullSpecLibraryBody">
        <Spacing margin={{ top: 'double' }}>
          <Container>
            <Row>
              <Spacing margin={{ bottom: 'normal' }}>
                <Column lg="7">
                  <Text variant="semiBold">Core Specs</Text>
                </Column>
              </Spacing>
            </Row>
            <Row>
              <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
                <Column lg="9">
                  <SearchBox
                    id="FullSpec_Input-Search"
                    disabled={false}
                    styles={{ root: { width: '100%' } }}
                    value={searchFullSpec}
                    onChange={(event, newValue) => setSearchFullSpec(newValue ?? '')}
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
      <SpecPanel
        closePanel={setIsOpenPanel}
        refreshPage={setRefreshPage}
        isOpen={isOpenPanel}
        sid={sid}
      />
    </LayoutDashboard>
  )
};

export { FullSpecLibraryPage };
