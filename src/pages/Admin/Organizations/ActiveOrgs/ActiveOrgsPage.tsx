/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import {
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  PrimaryButton,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  Link,
  DetailsList,
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';

import {
  CdxWebCommandType,
  Organization,
  PaginationInfo,
  SortDirection,
  useSearchOrganizationsLazyQuery,
  WebCommand,
  OrgType,
  UiBooleanField,
} from 'src/data/services/graphql';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_ACTIVE_ORGS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { OrgPanel } from 'src/pages/Admin/Organizations/ActiveOrgs/OrgPanel';
import { Paginator } from 'src/components/tables/Paginator';
import { PageBody } from 'src/components/layouts/Column';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';

const ActiveOrgsPage = () => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedOrgSid, setSelectedOrgSid] = useState<string>();
  const [searchText, setSearchText] = useState<string>('');
  const [searchAllOrgsFilter, setSearchAllOrgsFilter] = useState<boolean>(false);

  const [directSearchQuery, { data: dataSearch, loading: loadingSearch }] = useQueryHandler(
    useSearchOrganizationsLazyQuery
  );
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();

  const fetchData = (pageNumber = 0) => {
    directSearchQuery({
      variables: {
        searchText,
        orgOwnerSid,
        orgFilter: { activeFilter: 'ACTIVE', searchAllOrgs: searchAllOrgsFilter },
        pageableInput: {
          sort: [
            { property: 'name', direction: SortDirection.Asc },
            { property: 'orgId', direction: SortDirection.Asc },
          ],
          pageSize: 100,
          pageNumber,
        },
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [orgOwnerSid, searchText, searchAllOrgsFilter]);

  const onPageChange = (pageNumber: number) => {
    fetchData(pageNumber);
  };

  const changeActiveOrg = (org?: Organization) => {
    let destination: string;
    if (org?.orgType && [OrgType.IntegrationSponsor, OrgType.IntegrationAdminCombined].includes(org?.orgType)) {
      destination = 'FILE_STATUS';
    } else {
      destination = 'ORG_ACTIVITY';
    }
    ActiveDomainStore.setCurrentOrg({
      orgSid: org?.sid,
      destination,
    });
  };

  const onRenderItemColumn = (item?: Organization, index?: number, column?: IColumn) => {
    if (item && column) {
      const value = item[column.key];
      return <span title={value}>{value}</span>;
    }
    return '';
  };

  const onRenderOrgName = (item?: Organization, index = 0) => (
    <Link
      id={`__ActiveOrg__Name_Field_${index + 1}`}
      className={item?.orgId}
      to={`/admin/organizations/active-orgs?orgSid=${item?.sid}`}
      onClick={() => changeActiveOrg(item)}
    >
      {item?.name}
    </Link>
  );

  const onRenderAction = (item?: Organization) => (
    <IconButton
      iconProps={{ iconName: 'Edit' }}
      title="View Org Details"
      onClick={() => {
        setSelectedOrgSid(item?.sid ?? undefined);
        setIsPanelOpen(true);
      }}
    />
  );

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 600,
      flexGrow: 1,
      onRender: onRenderOrgName,
    },
    {
      name: 'Org ID',
      key: 'orgId',
      fieldName: 'orgId',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Org Type',
      key: 'orgTypeLabel',
      fieldName: 'orgTypeLabel',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
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

  useEffect(() => {
    if (!loadingSearch && dataSearch) {
      setOrgs(dataSearch.searchOrganizations.nodes);

      // update the paging info
      const newPagingInfo = dataSearch?.searchOrganizations?.paginationInfo;
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }
      const newCreateCmd = dataSearch?.searchOrganizations?.listPageInfo?.pageCommands?.find(
        (cmd) => cmd?.commandType === CdxWebCommandType.Create
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
        >
          {createCmd.label}
        </PrimaryButton>
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
        <DetailsList
          items={orgs}
          selectionMode={SelectionMode.none}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
        <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
      </>
    );
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

  return (
    <LayoutDashboard id="PageActiveOrgs" menuOptionSelected={ROUTE_ACTIVE_ORGS.API_ID}>
      <PageHeader id="__ActiveOrgsHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Active orgs" />
            </Column>
            <Column lg="6" right>
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
                  id="Active_Orgs_Input-Search"
                  disabled={false}
                  value={searchText}
                  styles={{ root: { width: '100%' } }}
                  onChange={(event, newValue) => setSearchText(newValue ?? '')}
                  placeholder="Search"
                />
              </Column>
              {showCheckbox()}
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
