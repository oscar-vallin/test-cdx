import React, { useState, useEffect } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { ROUTE_DELETED_ORGS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import {
  useSearchOrganizationsLazyQuery,
  SortDirection,
  Organization,
  PaginationInfo,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageBody } from 'src/components/layouts/Column';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { EmptyState } from 'src/containers/states';
import { Paginator } from 'src/components/tables/Paginator';
import { OrgsTable } from '../OrgsTable';

const InactiveOrgsPage = () => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const [orgs, setOrgs] = useState<Organization[]>([]);
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

  const renderBody = () => {
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
        {renderBody()}
      </PageBody>
    </LayoutDashboard>
  )
};

export { InactiveOrgsPage };
