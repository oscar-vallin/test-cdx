/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import {
  PrimaryButton, Spinner, SpinnerSize, Stack,
} from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';

import {
  CdxWebCommandType,
  OrganizationActivity,
  PaginationInfo,
  SortDirection,
  UiBooleanField,
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
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { EmptyState } from 'src/containers/states';
import { Spacing } from 'src/components/spacings/Spacing';
import { OrgsTable } from '../OrgsTable';

const ActiveOrgsPage = () => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
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
          <Spinner size={SpinnerSize.large} label="Loading active orgs" />
        </Spacing>
      );
    }
    if (!orgs.length) {
      const emptyText = createCmd
        ? 'There are no active Organizations in this Organization. Click the button below to create a new Organization.'
        : 'There are no active Organizations in this Organization.';
      return <EmptyState title="No active orgs found" description={emptyText} actions={createOrgButton()} />;
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
        <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
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
