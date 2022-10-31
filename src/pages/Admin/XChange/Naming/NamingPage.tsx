import React, { useEffect, useState } from 'react';
import {
  DetailsListLayoutMode,
  IColumn,
  SearchBox,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
  FontIcon,
  Icon,
} from '@fluentui/react';
import { Lightbulb20Filled, Notepad16Regular } from '@fluentui/react-icons';
import { Column, Container, Row } from 'src/components/layouts';
import { Text, PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_NAMING } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  CdxWebCommandType,
  useXchangeNamingConventionsLazyQuery,
  WebCommand,
  XchangeConfigNamingConvention,
} from 'src/data/services/graphql';
import { HideForMobile } from 'src/styles/GlobalStyles';
import { PageBody } from 'src/components/layouts/Column';
import { ButtonLink } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ThemeStore } from 'src/store/ThemeStore';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import { NamingConventionsPanel, WherePlaceExtractsPanel, SpecialInstructionPanel } from './NamingPanel';
import { StyledNamingList } from './Naming.styles';

const NamingPage = () => {
  const { orgSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
  const [conventions, setConventions] = useState<XchangeConfigNamingConvention[]>([]);
  const [searchConventions, setSearchConventions] = useState<string>('');
  const [specialInstructionIcon, setSpecialInstructionIcon] = useState<string | null>('');
  const [sid, setSid] = useState('');
  const [count, setCount] = useState(0);
  const [increaseDelay, setIncreasedelay] = useState<number | undefined>(0);
  const [delay, setDelay] = useState(false);
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [filterConventions, setFilterConventions] = useState<XchangeConfigNamingConvention[]>([]);
  const [refreshNamingPage, setRefreshNamingPage] = useState(false);
  const [isOpenConventionsPanel, setIsOpenConventionsPanel] = useState(false);
  const [isOpenWherePlaceExtracts, setIsOpenWherePlaceExtracts] = useState(false);
  const [isOpenSpecialInstructionPanel, setIsOpenSpecialInstructionPanel] = useState(false);
  const [namingConventions, { data: namingConventionsData, loading: isLoadingNaming },
  ] = useXchangeNamingConventionsLazyQuery();

  const fetchData = () => {
    namingConventions({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    setRefreshNamingPage(false);
    fetchData();
  }, [orgSid, refreshNamingPage]);

  const filterConventionData = () => {
    setFilterConventions([]);
    const search = new RegExp(searchConventions, 'i');
    conventions?.forEach((convention: XchangeConfigNamingConvention) => {
      const vendor = convention.vendor ?? '';
      const extractType = convention.extractType ?? '';
      const prodFilename = convention.prodFilename ?? '';
      const testFilename = convention.testFilename ?? '';
      const uatFilename = convention.uatFilename ?? '';
      if (vendor || extractType || prodFilename || testFilename || uatFilename) {
        if (search.test(vendor)
            || search.test(extractType)
                || search.test(prodFilename)
                    || search.test(testFilename) || search.test(uatFilename)) {
          setFilterConventions((currentConvention) => currentConvention.concat(convention));
        }
      }
    });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (conventions && conventions?.length > 0) {
      const timer = setTimeout(() => filterConventionData(), 500);
      return () => clearTimeout(timer);
    }
  }, [searchConventions]);

  useEffect(() => {
    if (!isLoadingNaming && namingConventionsData) {
      setConventions(namingConventionsData.xchangeNamingConventions?.conventions ?? []);

      if (namingConventionsData.xchangeNamingConventions?.commands) {
        const pageCommands = namingConventionsData.xchangeNamingConventions?.commands;
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
      }
    }
  }, [namingConventions, isLoadingNaming]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!delay) {
        setIncreasedelay(undefined);
      } else {
        setIncreasedelay(1000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [delay])

  const tooltipGetSpecialInstruction = (instruction: string, conventionSid: string) => (
    <Spacing margin="normal">
      <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
        <Text variant="bold">Special Instructions/Notes</Text>
      </Spacing>
      <Text>{instruction}</Text>
      <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
        {updateCmd && (
        <ButtonLink onClick={() => {
          setSid(conventionSid);
          setSpecialInstruction(instruction);
          setSpecialInstructionIcon(null);
          setIsOpenSpecialInstructionPanel(true);
        }}
        >edit
        </ButtonLink>
        )}
      </Spacing>
    </Spacing>
  );

  const onRenderItemColumn = (item, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'vendor') {
      columnVal = item.vendor ?? '';
    } else if (column?.key === 'prodFilename') {
      columnVal = item.prodFilename ?? '';
    } else if (column?.key === 'testFilename') {
      columnVal = item.testFilename;
    } else if (column?.key === 'uatFilename') {
      columnVal = item.uatFilename ?? '';
    } else if (column?.key === 'extractType') {
      columnVal = item.extractType ?? '';
    }

    return (
      <Stack
        horizontal
        horizontalAlign="start"
        tokens={{ childrenGap: 10 }}
      >
        { column?.key === 'vendor' && item?.sid === specialInstructionIcon ? (
          <Stack.Item align="center" disableShrink>
            <Text ellipsis title={columnVal}>{columnVal}</Text>
            <div style={{
              display: 'flex',
              position: 'absolute',
              bottom: '10px',
              left: '220px',
            }}
            >
              <TooltipHost content="Add special instruction">
                <Notepad16Regular
                  style={{
                    color: ThemeStore.userTheme.colors.themePrimary,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSid(item.sid);
                    setSpecialInstructionIcon(null)
                    setSpecialInstruction('');
                    setIsOpenSpecialInstructionPanel(true);
                  }}
                />
              </TooltipHost>
            </div>
          </Stack.Item>
        ) : (
          <Text ellipsis title={columnVal}>{columnVal}</Text>
        )}
        {column?.key !== 'extractType' && column?.key !== 'vendor' && item.specialInstructions && (
          <TooltipHost
            content={tooltipGetSpecialInstruction(
              item.specialInstructions,
              item.sid,
            )}
            closeDelay={increaseDelay}
            onMouseLeave={() => setIncreasedelay(1000)}
          >
            <FontIcon
              iconName="Info"
              style={{ cursor: 'pointer', color: 'blue' }}
              onMouseOver={() => setIncreasedelay(3000)}
              onMouseLeave={() => {
                setDelay(true);
              }}
            />
          </TooltipHost>
        )}
      </Stack>
    );
  }

  const columns: IColumn[] = [
    {
      name: 'Vendor',
      key: 'vendor',
      fieldName: 'vendor',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1,
      className: 'vendor-name',
    },
    {
      name: 'Extract Type',
      key: 'extractType',
      fieldName: 'extractType',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1,
      headerClassName: 'hide-for-mobile',
      className: 'hide-for-mobile',
    },
    {
      name: 'UAT / Internal Testing',
      key: 'uatFilename',
      fieldName: 'uatFilename',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1,
    },
    {
      name: 'Test with Vendor',
      key: 'testFilename',
      fieldName: 'testFilename',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1,
    },
    {
      name: 'Production',
      key: 'prodFilename',
      fieldName: 'prodFilename',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1,
    },
  ];

  const renderLightbulb = () => (
    <Lightbulb20Filled
      style={{
        position: 'relative',
        top: '5px',
        right: '5px',
        color: ThemeStore.userTheme.colors.yellow,
      }}
    />
  );

  const onItemInvoked = (item) => {
    if (!updateCmd) {
      setSpecialInstructionIcon(null);
      return;
    }
    if (count === 0) {
      setSpecialInstructionIcon(item.sid);
    }
    setCount(0);
  };

  const renderBody = () => {
    if (isLoadingNaming) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Convention List" />
        </Spacing>
      );
    }

    const conventionList = () => {
      if (filterConventions.length || searchConventions.trim() !== '') {
        return (
          <StyledNamingList
            items={filterConventions}
            columns={columns}
            selectionMode={SelectionMode.none}
            onRenderItemColumn={onRenderItemColumn}
            layoutMode={DetailsListLayoutMode.justified}
            onActiveItemChanged={onItemInvoked}
          />
        )
      }

      return (
        <StyledNamingList
          items={conventions}
          columns={columns}
          onRenderItemColumn={onRenderItemColumn}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          onActiveItemChanged={onItemInvoked}
        />
      )
    };

    return (
      <Stack>
        <Row>
          <Column lg="5">
            <SearchBox
              id="Xchange_Input-Search"
              disabled={false}
              styles={{ root: { width: '100%' } }}
              value={searchConventions}
              onChange={(event, newValue) => setSearchConventions(newValue ?? '')}
              placeholder="Search"
            />
          </Column>
          <Column lg="1" right>
            {renderLightbulb()}
          </Column>
          <Column lg="6">
            <div id="__NamingConvention_Instruction" dangerouslySetInnerHTML={{ __html: namingConventionsData?.xchangeNamingConventions?.instruction ?? '' }} />
          </Column>
        </Row>
        <Row>
          <Column lg="12">
            {conventionList()}
          </Column>
        </Row>
      </Stack>

    )
  };
  const graphQLUrl = process.env.REACT_APP_API_SERVER;
  const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

  return (
    <LayoutDashboard id="NamingConventionsPage" menuOptionSelected={ROUTE_XCHANGE_NAMING.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column lg="6" sm="10" direction="row">
              <PageTitle id="__Page__Title_Naming_Conventions" title="Xchange Naming Conventions" />
            </Column>
            <Column lg="6" sm="2" right>
              <Text size="large" right>
                <DownloadLink
                  target="_new"
                  href={`${serverUrl}docx/namingConventions?orgSid=${orgSid}`}
                  title="Download naming conventions as an MS Word document"
                >
                  <Icon iconName="WordDocument" style={{ paddingRight: '5px' }} />
                  <HideForMobile>Download</HideForMobile>
                </DownloadLink>
              </Text>
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          {!isLoadingNaming && (
            <Spacing margin={{ top: 'double' }}>
              <Row>
                <Column lg="3">
                  <Stack.Item>
                    Client ID: <Text variant="semiBold">{ActiveDomainStore.domainOrg.current.orgId}</Text>
                  </Stack.Item>
                </Column>
                <Column lg="3">
                  <Stack.Item>
                    {renderLightbulb()}
                    <ButtonLink onClick={() => setIsOpenConventionsPanel(true)}>
                      Extract Naming Convention
                    </ButtonLink>
                  </Stack.Item>
                </Column>
                <Column lg="3">
                  <Stack.Item>
                    {renderLightbulb()}
                    <ButtonLink onClick={() => setIsOpenWherePlaceExtracts(true)}>
                      Where to Place your Extracts
                    </ButtonLink>
                  </Stack.Item>
                </Column>
              </Row>
            </Spacing>
          )}
          <Spacing margin={{ top: 'double', bottom: 'double' }}>
            {renderBody()}
          </Spacing>
        </Container>
      </PageBody>
      <NamingConventionsPanel
        isOpen={isOpenConventionsPanel}
        closePanel={setIsOpenConventionsPanel}
      />
      <WherePlaceExtractsPanel
        isOpen={isOpenWherePlaceExtracts}
        closePanel={setIsOpenWherePlaceExtracts}
      />
      <SpecialInstructionPanel
        isOpen={isOpenSpecialInstructionPanel}
        closePanel={setIsOpenSpecialInstructionPanel}
        onCount={setCount}
        sid={sid}
        specialInstruction={specialInstruction}
        hideIcon={setSpecialInstructionIcon}
        refreshNamingPage={setRefreshNamingPage}
      />
    </LayoutDashboard>
  );
};

export { NamingPage };
