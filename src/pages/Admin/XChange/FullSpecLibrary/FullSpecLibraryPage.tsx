import React, { useState, useEffect } from 'react';
import {
  Stack,
  SearchBox,
  Spinner,
  SpinnerSize,
  SelectionMode,
  DetailsListLayoutMode,
  IColumn,
  IGroup,
  TooltipHost,
  DirectionalHint,
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_FULL_SPEC_LIBRARY } from 'src/data/constants/RouteConstants';
import { useTableFilters } from 'src/hooks/useTableFilters';
import {
  PaginationInfo,
  SortDirection,
  useFullVendorSpecLibraryLazyQuery,
  VendorLink,
} from 'src/data/services/graphql';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { useThemeStore } from 'src/store/ThemeStore';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { ButtonLink } from 'src/components/buttons';
import { FullSpecList } from './FullSpecLibrary.styles';
import { SpecPanel } from './SpecPanel';
import { Paginator } from 'src/components/tables/Paginator';

const FullSpecLibraryPage = () => {
  const ThemeStore = useThemeStore();
  const [fullVendorNodes, setFullVendorNodes] = useState<VendorLink[] | null>();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [searchTextFullSpecVendor, setSearchTextFullSpecVendor] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [sid, setSid] = useState('');
  const [orgSid, setOrgSid] = useState('');
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const [vendorSpec,
    {
      data: vendorSpecData,
      loading: isLoadingvendoSpec,
    },
  ] = useFullVendorSpecLibraryLazyQuery();

  useEffect(() => {
    if (!isLoadingvendoSpec && vendorSpecData) {
      setFullVendorNodes(vendorSpecData.fullVendorSpecLibrary?.nodes);
      vendorSpecData.fullVendorSpecLibrary?.nodes?.forEach((node, nodeIndex) => {
        const foundGroup = groups.find((g) => g.key === node.orgSid);
        if (!foundGroup) {
          const group: IGroup = {
            key: node.orgSid ?? '',
            name: node.name ?? '',
            startIndex: nodeIndex,
            count: 1,
          }
          setGroups((prevState) => prevState.concat(group));
        }
      })
    }
    if (!vendorSpecData) {
      setGroups([]);
      setFullVendorNodes([]);
    }

    const newPaginInfo = vendorSpecData?.fullVendorSpecLibrary?.paginationInfo;
    if (newPaginInfo) {
      setPagingInfo(newPaginInfo);
    }

  }, [vendorSpecData, isLoadingvendoSpec]);

  const tableFilters = useTableFilters('Search', [
    { property: 'name', direction: SortDirection.Asc },
  ]);

  const columnOptions: DataColumn[] = [
    {
      name: 'Vendor/Spec',
      key: 'name',
      fieldName: 'name',
      minWidth: 350,
      maxWidth: 300,
      isPadded: true,
      dataType: 'string',
      isSorted: true,
      isSortedDescending: false,
      sortable: true,
      filterable: false,
    },
    {
      name: '# Implementation',
      key: 'integratedClients',
      fieldName: 'integratedClients',
      minWidth: 100,
      maxWidth: 100,
      isPadded: true,
      dataType: 'string',
      filterable: false,
    },
  ];

  const { columns } = useSortableColumns(tableFilters, columnOptions);

  const filterVendors = (search: string) => {
    setRefreshPage(false);
    vendorSpec({
      variables: {
        searchText: search,
        pageableInput: tableFilters.pagingParams,
      },
    });
  };

  useEffect(() => {
    if (searchTextFullSpecVendor.trim() !== '') {
      const timer = setTimeout(() =>  filterVendors(searchTextFullSpecVendor), 300);
      return () => clearTimeout(timer);
    } else {
      vendorSpec({
        variables: {
          searchText: searchTextFullSpecVendor,
          pageableInput: tableFilters.pagingParams,
        },
      });
    }
  }, [searchTextFullSpecVendor, refreshPage, tableFilters.pagingParams]);

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  const tooltipHostVendors = (clients: string[]) => {
    if (clients?.length === 0) {
      return (
        <Text size="small">
          No vendors are currently associated with this organization
        </Text>
      )
    }

    return (
      <Stack>
        {clients
          && clients.map((client, clientIndex) => (
            <span key={clientIndex}>{client}</span>
          ))}
      </Stack>
    )
  }

  const onRenderItemColum = (item: VendorLink, itemIndex?: number, column?: IColumn) => {
    if (column?.key === 'name') {
      return (
        <Stack tokens={{ childrenGap: 5.5 }}>
          {item.specs?.map((spec, specIndex) => (
            <ButtonLink
              id={`vendorname_${specIndex}`}
              underline
              key={specIndex}
              style={{
                fontSize: '12px',
                color: spec.active ? '' : ThemeStore.userTheme.colors.neutralQuaternary,
                overflow: 'hidden',
              }}
              onClick={() => {
                setOrgSid(item.orgSid ?? '');
                setSid(spec.sid ?? '');
                setIsOpenPanel(true);
              }}
            >{spec.name}
            </ButtonLink>
          ))}
        </Stack>
      )
    }

    if (column?.key === 'integratedClients') {
      return (
        <Stack tokens={{ childrenGap: 5.5, padding: '0px 100px 0px 0px' }}>
          {item.specs?.map((spec, specIndex) => (
            <TooltipHost
              id={`totalVendors_${specIndex}`}
              key={specIndex}
              content={tooltipHostVendors(spec.integratedClients)}
              directionalHint={DirectionalHint.rightCenter}
            >
              <ButtonLink 
                style={{
                  fontSize: '12px',
                  color: spec.active ? '' : ThemeStore.userTheme.colors.neutralQuaternary,
                }}
              >
                {spec.integratedClients.length}
              </ButtonLink>
            </TooltipHost>
          ))}
        </Stack>
      )
    }
    return null;
  };

  const renderBody = () => {
    if (isLoadingvendoSpec) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Full Spec" />
        </Spacing>
      );
    }

    return (
      <>
        <FullSpecList
          items={fullVendorNodes ?? []}
          columns={columns}
          groups={groups}
          onRenderItemColumn={onRenderItemColum}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
        <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
      </>
    )
  }

  return (
    <LayoutDashboard id="FullSpecLibraryPage" menuOptionSelected={ROUTE_FULL_SPEC_LIBRARY.API_ID}>
      <PageHeader id="FullSpecLibraryHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Full_Spec_Library" title="Full Spec Library" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Spacing>
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
                <Column lg="6">
                  <SearchBox
                    id="Spec_Input-Search"
                    disabled={false}
                    styles={{ root: { width: '100%' } }}
                    onChange={(event, newValue) => {
                      setSearchTextFullSpecVendor(newValue ?? '');
                    }}
                    placeholder="Search"
                  />
                </Column>
              </Stack>
            </Row>
            <Row>
              <Column lg="7">{renderBody()}</Column>
            </Row>
          </Container>
        </Spacing>
      </PageBody>
      <SpecPanel
        isOpen={isOpenPanel}
        closePanel={setIsOpenPanel}
        sid={sid}
        orgSid={orgSid}
        refreshPage={setRefreshPage}
      />
    </LayoutDashboard>
  )
};

export { FullSpecLibraryPage };
