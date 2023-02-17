import React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  TooltipHost,
  Link,
  SelectionMode,
  Stack,
  DirectionalHint,
  Spinner,
  SpinnerSize,
  IDetailsColumnProps,
} from '@fluentui/react';
import { Text } from 'src/components/typography';
import { ButtonLink } from 'src/components/buttons';
import { Column, Container, Row } from 'src/components/layouts';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { Organization, OrganizationActivity, UiBooleanField } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { Spacing } from 'src/components/spacings/Spacing';
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { ActivityBubbles } from 'src/components/badges/Activity';
import { InfoIcon } from 'src/components/badges/InfoIcon';

type OrgsTableType = {
    orgs?: OrganizationActivity[];
    tableFilters: TableFiltersType;
    searchAllOrgsFilter: boolean;
    setSearchAllOrgsFilter: (data: boolean) => void;
    loading?: boolean;
    type?: string;
    setSelectedOrgSid: (item: string | undefined) => void;
    setIsPanelOpen: (data: boolean) => void;
}

export const OrgsTable = ({
  orgs,
  tableFilters,
  loading,
  type,
  searchAllOrgsFilter,
  setSelectedOrgSid,
  setSearchAllOrgsFilter,
  setIsPanelOpen,
}: OrgsTableType) => {
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();

  const tooltipHostVendors = (title?: boolean, vendors?: string[]) => {
    if (vendors?.length === 0) {
      return (
        <Text size="small">
          No vendors are currently associated with this organization
        </Text>
      )
    }
    if (!vendors?.length) {
      if (title) {
        return (
          <Text size="small">
            Number of vendors this organizations has an integration with
          </Text>
        );
      }
      return (
        <Text size="small">
          This is the number of <Text size="small" variant="bold">distinct</Text> vendors across organizations shown here
        </Text>
      );
    }

    return (
      <Stack>
        {vendors
          && vendors.map((vendor, vendorIndex) => (
            <span key={vendorIndex}>{vendor}</span>
          ))}
      </Stack>
    )
  };
  const onRenderItemColumn = (item: OrganizationActivity, index?: number, column?: IColumn) => {
    if (item && column && column.key !== 'active' && column.key !== 'vendorNames') {
      const value = item[column.key];
      return <span title={value}>{value}</span>;
    }
    return null;
  };

  const renderActivityBubbles = (item: OrganizationActivity) => (
    <ActivityBubbles
      orgSid={item.sid}
      uat={item.uatActivity}
      test={item.testActivity}
      prod={item.prodActivity}
      total={!item.sid}
    />
  );

  const renderVendorCount = (item: OrganizationActivity) => {
    if (item.sid) {
      return (
        <Stack horizontal horizontalAlign="center">
          <Stack.Item>
            <TooltipHost
              content={tooltipHostVendors(false, item?.vendorNames)}
              directionalHint={DirectionalHint.rightCenter}
            >
              <ButtonLink underline>{item?.vendorNames?.length ?? 0}</ButtonLink>
            </TooltipHost>
          </Stack.Item>
        </Stack>
      );
    }
    return (
      <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 5 }}>
        <Stack.Item>
          <Text variant="bold" size="large">{item?.vendorNames?.length ?? 0}</Text>
        </Stack.Item>
        <Stack.Item>
          <InfoIcon
            id="__TotalVendors"
            tooltip={tooltipHostVendors(false)}
          />
        </Stack.Item>
      </Stack>
    )
  }

  const changeActiveOrg = (org?: Organization) => {
    ActiveDomain.setCurrentOrg(org?.sid);
  };

  const onRenderOrgName = (item?: Organization, index = 0) => {
    if (type === 'ACTIVE') {
      return (
        <Link
          id={`__ActiveOrg__Name_Field_${index + 1}`}
          className={item?.orgId}
          to={`/admin/organizations/active-orgs?orgSid=${item?.sid}`}
          onClick={() => changeActiveOrg(item)}
        >
          {item?.name}
        </Link>
      )
    }
    return <span>{item?.name}</span>;
  };

  const renderVendorColumnHeader = (props?: IDetailsColumnProps) => {
    const title = props?.column.name;
    return (
      <>
        <Text variant="semiBold">{title}</Text>
        <InfoIcon
          id="__VendorHeaderInfo"
          tooltip={tooltipHostVendors(true)}
        />
      </>
    );
  };

  const onRenderAction = (item?: Organization) => {
    if (item?.sid) {
      return (
        <IconButton
          iconProps={{ iconName: 'Edit' }}
          title="View Org Details"
          onClick={() => {
            setSelectedOrgSid(item?.sid ?? undefined);
            setIsPanelOpen(true);
          }}
        />
      );
    }
    return null;
  }

  const initColumns: DataColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      dataType: 'string',
      sortable: true,
      isSorted: true,
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 2,
      onRender: onRenderOrgName,
    },
    {
      name: 'Org ID',
      key: 'orgId',
      fieldName: 'orgId',
      data: 'string',
      dataType: 'string',
      sortable: true,
      isSorted: true,
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Org Type',
      key: 'orgTypeLabel',
      fieldName: 'orgType',
      data: 'string',
      dataType: 'enum',
      sortable: true,
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 2,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Activity',
      key: 'active',
      fieldName: 'active',
      data: 'string',
      dataType: 'string',
      isPadded: false,
      minWidth: 150,
      styles: {
        cellTitle: {
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      maxWidth: 400,
      flexGrow: 0,
      onRender: renderActivityBubbles,
    },
    {
      name: 'Vendors',
      key: 'vendorNames',
      fieldName: 'vendorNames',
      data: 'string',
      dataType: 'string',
      isPadded: false,
      styles: {
        cellTitle: {
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      minWidth: 150,
      maxWidth: 150,
      flexGrow: 0,
      onRenderHeader: renderVendorColumnHeader,
      onRender: renderVendorCount,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      dataType: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      flexGrow: 0,
      onRender: onRenderAction,
    },
  ];
  const { columns } = useSortableColumns(tableFilters, initColumns);

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
    const typeOrgs = type ? 'active' : 'inactive';
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label={`Loading ${typeOrgs} orgs`} />
        </Spacing>
      );
    }

    if (orgs?.length) {
      return (
        <DetailsList
          items={orgs ?? []}
          selectionMode={SelectionMode.none}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
          styles={{
            root: {
              overflow: 'unset',
            },
          }}
        />
      )
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
          <Column lg="6">
            <ThemedSearchBox
              autoComplete="off"
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
  )
};
