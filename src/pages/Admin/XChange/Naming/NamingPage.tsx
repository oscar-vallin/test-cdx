import { useEffect, useState } from 'react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_NAMING } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useXchangeNamingConventionsLazyQuery, XchangeConfigNamingConvention } from 'src/data/services/graphql';
import { PageBody } from 'src/components/layouts/Column';
import { ButtonLink } from 'src/components/buttons';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SearchBox,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
  Text,
  FontIcon,
} from '@fluentui/react';
import { Lightbulb20Filled, Notepad16Regular } from '@fluentui/react-icons';
import { Spacing } from 'src/components/spacings/Spacing';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { NamingConventionsPanel, WherePlaceExtractsPanel, SpecialInstructionPanel } from './NamingPanel';

const NamingPage = () => {
  const { orgSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
  const [conventions, setConventions] = useState<XchangeConfigNamingConvention[]>([]);
  const [searchConventions, setSearchConventions] = useState<string>('');
  const [specialInstructionIcon, setSpecialInstructionIcon] = useState<number | null>(0);
  const [sid, setSid] = useState('');
  const [count, setCount] = useState(0);
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [filterConventions, setFilterConventions] = useState<XchangeConfigNamingConvention[]>([]);
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
    fetchData();
  }, [orgSid]);

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
      console.log(namingConventionsData)
      setConventions(namingConventionsData.xchangeNamingConventions?.conventions ?? []);
    }
  }, [namingConventions, isLoadingNaming]);

  const tooltipGostSpecialInstruction = (instruction: string, conventionSid: string) => (
    <Spacing margin="normal">
      <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
        <Text variant="large">Special Instructions/Notes</Text>
      </Spacing>
      <Text variant="small">{instruction}</Text>
      <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
        <ButtonLink onClick={() => {
          setSid(conventionSid);
          setSpecialInstruction(instruction);
          setSpecialInstructionIcon(null);
          setIsOpenSpecialInstructionPanel(true);
        }}
        >edit
        </ButtonLink>
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
    let index = 0;
    if (itemIndex === 0 || itemIndex) {
      index = itemIndex + 1;
    }
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        { column?.key === 'vendor' && index === specialInstructionIcon ? (
          <Stack.Item align="center" disableShrink>
            <Text>{columnVal}</Text>
            <div style={{
              display: 'flex',
              position: 'absolute',
              bottom: '10px',
              left: '240px',
            }}
            >
              <TooltipHost content="Add special instruction">
                <Notepad16Regular
                  style={{ color: '#0078D4', cursor: 'pointer' }}
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
          <Text>{columnVal}</Text>
        )}
        {column?.key !== 'extractType' && column?.key !== 'vendor' && item.specialInstructions && (
          <TooltipHost content={tooltipGostSpecialInstruction(
            item.specialInstructions,
            item.sid,
          )}
          >
            <FontIcon iconName="Info" style={{ cursor: 'pointer', color: 'blue' }} />
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
      maxWidth: 250,
      flexGrow: 1,
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
        color: '#cdcd00',
      }}
    />
  );

  const onItemInvoked = (item, itemIndex?: number) => {
    let index = 0;
    if (itemIndex === 0 || itemIndex) {
      index = itemIndex + 1;
    }
    if (count === 0) {
      setSpecialInstructionIcon(index);
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
          <DetailsList
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
        <DetailsList
          items={conventions}
          columns={columns}
          onRenderItemColumn={onRenderItemColumn}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          onActiveItemChanged={onItemInvoked}
        />
      )
    }
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
  return (
    <LayoutDashboard id="NamingConventionsPage" menuOptionSelected={ROUTE_XCHANGE_NAMING.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Naming_Conventions" title="Xchange Naming Conventions" />
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
                    Client id: <Text>{ActiveDomainStore.domainOrg.current.label}</Text>
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
          <Spacing margin={{ top: 'double' }}>
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
      />
    </LayoutDashboard>
  );
};

export { NamingPage };
