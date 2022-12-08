import React, { useState, useEffect } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { ROUTE_DELETED_ORGS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import {
  useSearchOrganizationsLazyQuery,
  SortDirection,
  Organization,
  PaginationInfo,
  UiBooleanField,
  OrganizationActivity,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageBody } from 'src/components/layouts/Column';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { EmptyState } from 'src/containers/states';
import { Paginator } from 'src/components/tables/Paginator';
import { Spinner, SpinnerSize, Stack } from '@fluentui/react';
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { Spacing } from 'src/components/spacings/Spacing';
import { OrgsTable } from '../OrgsTable';

const InactiveOrgsPage = () => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
  const [orgs, setOrgs] = useState<OrganizationActivity[]>([]);
  const [searchAllOrgsFilter, setSearchAllOrgsFilter] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedOrgSid, setSelectedOrgSid] = useState<string>();
  const [directSearchQuery, { data: dataSearch, loading: loadingSearch }] = useQueryHandler(
    useSearchOrganizationsLazyQuery,
  );

  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const tableFilters = useTableFilters('Search', [
    { property: 'name', direction: SortDirection.Asc },
    { property: 'orgId', direction: SortDirection.Asc },
  ]);

  const fetchData = () => {
    directSearchQuery({
      variables: {
        searchText: tableFilters.searchText.delayedValue,
        orgOwnerSid,
        orgFilter: { activeFilter: 'INACTIVE', searchAllOrgs: searchAllOrgsFilter },
        pageableInput: tableFilters.pagingParams,
      },
    });
  };

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  useEffect(() => {
    fetchData();
  }, [
    orgOwnerSid,
    tableFilters.searchText.delayedValue,
    searchAllOrgsFilter,
    tableFilters.pagingParams,
  ]);

  useEffect(() => {
    if (!loadingSearch && dataSearch) {
      setOrgs(dataSearch.searchOrganizations.nodes);

      const newPagingInfo = dataSearch?.searchOrganizations?.paginationInfo;
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }
    }
  }, [dataSearch, loadingSearch]);

  const searchAllField: UiBooleanField = {
    label: 'Search all organizations',
    value: searchAllOrgsFilter,
    visible: true,
    required: false,
  };

  const showCheckbox = () => {
    if (ActiveDomainStore.domainOrg.current.orgId === 'CDX') {
      return (
        <UIInputCheck
          id="__SearchAllOrgs__Orgs-Checkbox"
          uiField={searchAllField}
          onChange={(_event, _searchAllOrgsFilter: any) => {
            setSearchAllOrgsFilter(_searchAllOrgsFilter);
          }}
        />
      );
    }
    return null;
  };

  const renderBody = () => {
    if (loadingSearch) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading inactive orgs" />
        </Spacing>
      );
    }

    if (!orgs.length) {
      const emptyText = 'No inactive organizations shows';
      return <EmptyState title="No inactive orgs found" description={emptyText} />;
    }

    return (
      <>
        <OrgsTable
          orgs={orgs ?? []}
          loading={loadingSearch}
          tableFilters={tableFilters}
          searchAllOrgsFilter={searchAllOrgsFilter}
          setSearchAllOrgsFilter={setSearchAllOrgsFilter}
          setSelectedOrgSid={setSelectedOrgSid}
          setIsPanelOpen={setIsPanelOpen}
        />
        <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
      </>
    )
  };

  return (
    <LayoutDashboard id="PageInactiveOrgs" menuOptionSelected={ROUTE_DELETED_ORGS.API_ID}>
      <PageHeader id="__InactiveOrgsHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__Page_Title" title="Inactive Orgs" />
            </Column>
          </Row>
        </Container>
      </PageHeader>

      <PageBody id="__InactiveOrgsBody">
        <Container>
          <Row>
            <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
              <Column lg="6">
                <ThemedSearchBox
                  id="Orgs_Input-Search"
                  disabled={false}
                  value={tableFilters.searchText.value}
                  styles={{ root: { width: '100%' } }}
                  onChange={tableFilters.searchText.onChange}
                  placeholder="Search"
                />
              </Column>
              <Column lg="6">
                {showCheckbox()}
              </Column>
            </Stack>
          </Row>
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>
    </LayoutDashboard>
  )
};

export { InactiveOrgsPage };
