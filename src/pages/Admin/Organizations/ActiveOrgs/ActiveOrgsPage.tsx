/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import {
  PrimaryButton,
} from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';

import {
  CdxWebCommandType,
  OrganizationActivity,
  PaginationInfo,
  SortDirection,
  useSearchOrganizationsLazyQuery,
  WebCommand,
} from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_ACTIVE_ORGS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { OrgPanel } from 'src/pages/Admin/Organizations/ActiveOrgs/OrgPanel';
import { Paginator } from 'src/components/tables/Paginator';
import { PageBody } from 'src/components/layouts/Column';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { HideForMobile } from 'src/styles/GlobalStyles';
import { EmptyState } from 'src/containers/states';
import { OrgsTable } from '../OrgsTable';

const ActiveOrgsPage = () => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const [orgs, setOrgs] = useState<OrganizationActivity[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedOrgSid, setSelectedOrgSid] = useState<string>();
  const [searchAllOrgsFilter, setSearchAllOrgsFilter] = useState<boolean>(false);

  const [directSearchQuery, { data: dataSearch, loading: loadingSearch }] = useQueryHandler(
    useSearchOrganizationsLazyQuery,
  );
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();

  const tableFilters = useTableFilters('Search', [
    { property: 'name', direction: SortDirection.Asc },
    { property: 'orgId', direction: SortDirection.Asc },
  ]);

  const fetchData = () => {
    directSearchQuery({
      variables: {
        searchText: tableFilters.searchText.delayedValue,
        orgOwnerSid,
        orgFilter: { activeFilter: 'ACTIVE', searchAllOrgs: searchAllOrgsFilter },
        pageableInput: tableFilters.pagingParams,
      },
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

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  useEffect(() => {
    if (!loadingSearch && dataSearch) {
      setOrgs(dataSearch.searchOrganizations.nodes);
      if (dataSearch.searchOrganizations.nodes[0]) {
        const example = { ...dataSearch.searchOrganizations.nodes[0] };
        const uatActivity = { ...dataSearch.searchOrganizations.nodes[0].uatActivity };
        const prodActivity = { ...uatActivity };
        const testActivity = { ...uatActivity };
        uatActivity.filesProcessed = 0;
        prodActivity.filesProcessed = 0;
        testActivity.filesProcessed = 0;
        const vendors: string[] = []
        dataSearch.searchOrganizations.nodes.forEach((node: OrganizationActivity) => {
          if (node.vendorNames.length > 0) {
            vendors.push(...node.vendorNames);
          }
          uatActivity.filesProcessed += node.uatActivity.filesProcessed;
          prodActivity.filesProcessed += node.prodActivity.filesProcessed;
          testActivity.filesProcessed += node.testActivity.filesProcessed;
        });
        example.vendorNames = vendors;
        example.uatActivity = uatActivity;
        example.prodActivity = prodActivity;
        example.testActivity = testActivity;
        example.name = '';
        example.sid = '';
        example.orgId = '';
        example.orgTypeLabel = '';
        setOrgs((prevState) => prevState.concat(example));
      }

      // update the paging info
      const newPagingInfo = dataSearch?.searchOrganizations?.paginationInfo;
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }
      const newCreateCmd = dataSearch?.searchOrganizations?.listPageInfo?.pageCommands?.find(
        (cmd) => cmd?.commandType === CdxWebCommandType.Create,
      );
      setCreateCmd(newCreateCmd);
    }
  }, [dataSearch, loadingSearch]);

  const createOrgButton = () => {
    if (createCmd) {
      return (
        <PrimaryButton
          id="__CreateOrgButton"
          iconProps={{ iconName: 'AddHome' }}
          onClick={() => {
            setSelectedOrgSid(undefined);
            setIsPanelOpen(true);
          }}
          ariaLabel={createCmd.label ?? undefined}
          title={createCmd.label ?? undefined}
        >
          <HideForMobile>{createCmd.label}</HideForMobile>
        </PrimaryButton>
      );
    }
    return null;
  };

  const renderBody = () => {
    let emptyText;
    if (!orgs.length) {
      emptyText = createCmd
        ? 'There are no active Organizations in this Organization. Click the button below to create a new Organization.'
        : 'There are no active Organizations in this Organization.';
    }

    return (
      <>
        <OrgsTable
          orgs={orgs ?? []}
          loading={loadingSearch}
          tableFilters={tableFilters}
          searchAllOrgsFilter={searchAllOrgsFilter}
          setSearchAllOrgsFilter={setSearchAllOrgsFilter}
          type="ACTIVE"
          setSelectedOrgSid={setSelectedOrgSid}
          setIsPanelOpen={setIsPanelOpen}
        />
        {!orgs.length && !loadingSearch ? (
          <Container>
            <EmptyState
              title="No active orgs found"
              description={emptyText}
              actions={createOrgButton()}
            />
          </Container>
        ) : null}
        {!loadingSearch && <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />}
      </>
    )
  };

  return (
    <LayoutDashboard id="PageActiveOrgs" menuOptionSelected={ROUTE_ACTIVE_ORGS.API_ID}>
      <PageHeader id="__ActiveOrgsHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__Page_Title" title="Active Orgs" />
            </Column>
            <Column sm="6" right>
              {createOrgButton()}
            </Column>
          </Row>
        </Container>
      </PageHeader>

      <PageBody id="__ActiveOrgsBody">
        {renderBody()}
      </PageBody>

      {isPanelOpen && (
        <OrgPanel
          isOpen={isPanelOpen}
          selectedOrgSid={selectedOrgSid}
          onDismiss={() => setIsPanelOpen(false)}
          onSave={fetchData}
        />
      )}
    </LayoutDashboard>
  );
};

export { ActiveOrgsPage };
