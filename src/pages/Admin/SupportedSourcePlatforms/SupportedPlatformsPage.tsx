import React, { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
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
import { CardSupportedStyled } from './SupportedPlatforms.styes';
import { SupportedPlataformsPanel } from './SupportedPlatformsPanel';

const SupportedPlatformsPage = () => {
  const [supportedPlatforms, setSupportedPlatforms] = useState<SupportedPlatform[] | null>();
  const [incomingFormats, setIncomingFormats] = useState<IncomingFormat[] | null>();
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [isOpenPanel, setIsOpenPanel] = useState(false);
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

  useEffect(() => {
    if (!isLoadingSupportedPlataforms && supportedPlatformsData) {
      setSupportedPlatforms(supportedPlatformsData.supportedPlatforms?.nodes);

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
    }
  }, [incomingFormatData, isLoadingSupportedPlataforms]);

  const columnOptions: DataColumn[] = [
    {
      name: 'Platform Name',
      key: 'name',
      fieldName: 'name',
      minWidth: 100,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      name: 'Supported Incoming Formats',
      key: 'supportedIncomingFormats',
      fieldName: 'supportedIncomingFormats',
      minWidth: 500,
      isPadded: true,
      isSorted: true,
      isSortedDescending: false,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
  ];

  const tableFilters = useTableFilters('Platform Name, Supported Incoming Formats');
  const { columns } = useSortableColumns(tableFilters, columnOptions);

  useEffect(() => {
    setRefreshPage(false);
    fetchData();
  }, [tableFilters.pagingParams, refreshPage]);

  useEffect(() => {
    fetchIncomingData();
  }, []);

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
          <Text variant="bold">Incoming Formats</Text>
          <Spacing margin={{ top: 'normal' }}>
            {incomingFormats?.map((incoming, index) => (
              <Spacing margin={{ top: 'normal', bottom: 'normal' }} key={index}>
                <ButtonLink underline>
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
              <PageTitle id="__Page__Title_Supported_Platforms" title="Supported Source Plarfotms" />
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
    </LayoutDashboard>
  )
};

export { SupportedPlatformsPage };
