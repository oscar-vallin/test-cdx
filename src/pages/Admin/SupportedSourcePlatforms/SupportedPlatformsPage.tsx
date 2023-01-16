import React, { useEffect, useState, useRef } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  FontIcon,
  IColumn,
  PrimaryButton,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { ROUTE_SUPPORTED_PLATFORMS } from 'src/data/constants/RouteConstants';
import {
  useSupportedPlatformsLazyQuery,
  useIncomingFormatsLazyQuery,
  SupportedPlatform,
  WebCommand,
  IncomingFormat,
  CdxWebCommandType,
} from 'src/data/services/graphql';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { ButtonLink } from 'src/components/buttons';
import { useThemeStore } from 'src/store/ThemeStore';
import { CardSupportedStyled } from './SupportedPlatforms.styes';
import { SupportedPlataformsPanel } from './SupportedPlatformsPanel';
import { IncomingFormatPanel } from './IncomingFormatPanel';

const SupportedPlatformsPage = () => {
  const ThemeStore = useThemeStore();
  const [supportedPlatforms, setSupportedPlatforms] = useState<SupportedPlatform[] | null>();
  const refItems = useRef(supportedPlatforms);
  const [isSorted, setIsSorted] = useState(0);
  const [incomingFormats, setIncomingFormats] = useState<IncomingFormat[] | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [createIncomingCmd, setCreateIncomingCmd] = useState<WebCommand | null>();
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenIncomingPanel, setIsOpenIncomingPanel] = useState(false);
  const [sid, setSid] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);
  const [supportedPlatform,
    { data: supportedPlatformsData, loading: isLoadingSupportedPlataforms },
  ] = useSupportedPlatformsLazyQuery();
  const [incomingFormat,
    { data: incomingFormatData, loading: isLoadingIncomingFormat },
  ] = useIncomingFormatsLazyQuery();

  const fetchData = () => {
    supportedPlatform({
      variables: {},
    });
  };

  const fetchIncomingData = () => {
    incomingFormat({
      variables: {},
    });
  }

  const updateItems = (newItems) => {
    refItems.current = newItems;
    setSupportedPlatforms(newItems);
  }
  useEffect(() => {
    if (!isLoadingSupportedPlataforms && supportedPlatformsData) {
      setSupportedPlatforms(supportedPlatformsData.supportedPlatforms?.nodes);
      updateItems(supportedPlatformsData.supportedPlatforms?.nodes)

      if (supportedPlatformsData.supportedPlatforms?.listPageInfo?.pageCommands) {
        const pageCommands = supportedPlatformsData.supportedPlatforms?.listPageInfo?.pageCommands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
      }
    }
  }, [supportedPlatformsData, isLoadingSupportedPlataforms]);

  useEffect(() => {
    if (!isLoadingSupportedPlataforms && incomingFormatData) {
      setIncomingFormats(incomingFormatData.incomingFormats?.nodes);

      if (incomingFormatData.incomingFormats?.listPageInfo?.pageCommands) {
        const { pageCommands } = incomingFormatData.incomingFormats.listPageInfo;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateIncomingCmd(_createCmd);
      }
    }
  }, [incomingFormatData, isLoadingSupportedPlataforms]);

  function copyAndSort <T>(items:T[], columnKey?: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    const itemsSorted = items.slice(0)
      .sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    return itemsSorted;
  }

  const columnClick = (event, column: IColumn) => {
    let { isSortedDescending } = column;
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }
    const suppPlatforms: SupportedPlatform[] = copyAndSort(refItems.current ?? [], column.fieldName ?? '', isSortedDescending);
    setSupportedPlatforms(suppPlatforms);
    setIsSorted((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (isSorted === 2) {
      setSupportedPlatforms(refItems.current);
      setIsSorted(0);
    }
  }, [isSorted]);

  const columnOptions: DataColumn[] = [
    {
      name: 'Platform Name',
      key: 'name',
      fieldName: 'name',
      minWidth: 100,
      dataType: 'string',
      isSorted: true,
      onColumnClick: columnClick,
      isSortedDescending: false,
    },
    {
      name: 'Supported Incoming Formats',
      key: 'supportedIncomingFormats',
      fieldName: 'supportedIncomingFormats',
      minWidth: 500,
      isPadded: true,
      isSorted: false,
      isSortedDescending: false,
      dataType: 'string',
      sortable: false,
      filterable: false,
    },
  ];

  const tableFilters = useTableFilters('Platform Name, Supported Incoming Formats');
  const { columns } = useSortableColumns(tableFilters, columnOptions);

  useEffect(() => {
    setRefreshPage(false);
    fetchData();
  }, [refreshPage]);

  useEffect(() => {
    setRefreshPage(false);
    fetchIncomingData();
  }, [refreshPage]);

  const onRenderItemColumn = (item: SupportedPlatform, index?: number, column?: IColumn) => {
    if (column?.key === 'supportedIncomingFormats') {
      return (
        <Stack>
          {item.supportedIncomingFormats?.map((incoming, incomingIndex: number) => (
            <ButtonLink underline key={incomingIndex}>
              {incoming}
            </ButtonLink>
          ))}
        </Stack>
      )
    }

    if (column?.key === 'name') {
      return (
        <ButtonLink
          underline
          onClick={() => {
            setSid(item.sid ?? '');
            setIsOpenPanel(true);
          }}
        >
          {item.name}
        </ButtonLink>
      )
    }

    return null;
  }

  const renderBody = () => {
    if (isLoadingSupportedPlataforms) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Supported Source Platforms" />
        </Spacing>
      );
    }

    return (
      <DetailsList
        items={supportedPlatforms ?? []}
        columns={columns}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={onRenderItemColumn}
        layoutMode={DetailsListLayoutMode.justified}
      />
    )
  };

  const cardBox = () => {
    if (isLoadingIncomingFormat || isLoadingSupportedPlataforms) return null;

    return (
      <CardSupportedStyled>
        <Spacing margin="normal">
          <Row>
            <Column lg="9">
              <Text variant="bold">Incoming Formats</Text>
            </Column>
            <Column lg="2" right>
              {createIncomingCmd && (
                <FontIcon
                  id="__Add_IncomingFormat"
                  style={{
                    color: ThemeStore.userTheme.colors.themePrimary,
                    cursor: 'pointer',
                  }}
                  iconName="add"
                  onClick={() => {
                    setSid('');
                    setIsOpenIncomingPanel(true);
                  }}
                />
              )}
            </Column>
          </Row>
          <Spacing margin={{ top: 'normal' }}>
            {incomingFormats?.map((incoming, index) => (
              <Spacing margin={{ top: 'normal', bottom: 'normal' }} key={index}>
                <ButtonLink
                  underline
                  style={(!incoming.active)
                    ? { color: ThemeStore.userTheme.colors.neutralSecondary }
                    : { color: ThemeStore.userTheme.colors.themePrimary }}
                  onClick={() => {
                    setSid(incoming.sid ?? '');
                    setIsOpenIncomingPanel(true);
                  }}
                >
                  {incoming.name}
                </ButtonLink>
              </Spacing>
            ))}
          </Spacing>
        </Spacing>
      </CardSupportedStyled>
    )
  }
  return (
    <LayoutDashboard id="SupportedPlatformsPage" menuOptionSelected={ROUTE_SUPPORTED_PLATFORMS.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Supported_Platforms" title="Supported Source Platforms" />
            </Column>
            {createCmd && (
            <Column sm="6" right>
              <PrimaryButton
                id="__CreateSupportedSourcePlarform"
                iconProps={{ iconName: 'Add' }}
                onClick={() => {
                  setSid('');
                  setIsOpenPanel(true);
                }}
              >
                Create Supported Source Platform
              </PrimaryButton>
            </Column>
            )}
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>
            <Column lg="9">
              {renderBody()}
            </Column>
            <Column lg="3">
              {cardBox()}
            </Column>
          </Row>
        </Container>
      </PageBody>
      <SupportedPlataformsPanel
        isOpen={isOpenPanel}
        closePanel={setIsOpenPanel}
        refreshPage={setRefreshPage}
        sid={sid}
      />
      <IncomingFormatPanel
        isOpen={isOpenIncomingPanel}
        closePanel={setIsOpenIncomingPanel}
        refreshPage={setRefreshPage}
        sid={sid}
      />
    </LayoutDashboard>
  )
};

export { SupportedPlatformsPage };
