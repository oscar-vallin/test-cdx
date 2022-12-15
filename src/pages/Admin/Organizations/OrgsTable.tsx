import React, { useState } from 'react';
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
  FontIcon,
  Spinner,
  SpinnerSize,
} from '@fluentui/react';
import { Text } from 'src/components/typography';
import { ButtonLink } from 'src/components/buttons';
import { Column, Container, Row } from 'src/components/layouts';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { Organization, OrganizationActivity, UiBooleanField } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { useThemeStore } from 'src/store/ThemeStore';
import { useHistory } from 'react-router-dom';
import { Spacing } from 'src/components/spacings/Spacing';
import { IDetailsColumnProps } from '@fluentui/react/lib/components/DetailsList/DetailsColumn.types';
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { CircleStyled } from '../XChange/Xchanges/XchangePage.styles';

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
  const ThemeStore = useThemeStore();
  const history = useHistory();
  const [increaseDelay, setIncreasedelay] = useState(1500);
  const updateDateFormat = (date: Date) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toDateString();
    let hour = currentDate.getHours();
    let minutes: string = currentDate.getMinutes().toString();
    const format = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    hour = hour || 12;
    minutes = minutes.length < 2 ? `0${minutes}` : minutes;
    return `${formattedDate} ${hour}:${minutes}${format}`;
  };

  const tooltipHostContent = (
    lastActivity: Date,
    activityType?: string,
    sid?: string,
    filesProcessed?: number,
  ) => {
    const error = activityType?.trim() !== '';
    const fromDate = new Date(lastActivity);
    let currentColor: string;
    if (activityType === 'UAT') {
      currentColor = 'purple';
    } else if (activityType === 'PROD') {
      currentColor = 'blue';
    } else {
      currentColor = 'orange';
    }

    const currentDate = updateDateFormat(lastActivity);
    const endDate = yyyyMMdd(fromDate);
    const endFormatted = new Date(endDate);
    endFormatted.setDate(endFormatted.getDate() - 30);
    const startDate = yyyyMMdd(endFormatted);
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {error && (
          <>
            <span style={{ color: currentColor, fontWeight: 'bold' }}> {filesProcessed} </span>
            {activityType} files processed in the last 30 days <br />
            <span style={{ marginLeft: '20px' }}>Last Run: {currentDate}</span> <br /> <br />
            <ButtonLink
              style={{ marginLeft: '70px' }}
              onClick={() => {
                ActiveDomain.setCurrentOrg(sid);
                history.push(`/file-status?endDate=${endDate}&orgSid=6&startDate=${startDate}`);
              }}
            >
              {' '}
              Click for details
            </ButtonLink>
          </>
        )}
      </>
    );
  };

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
            Number of vendors this organizations <br />
            &nbsp; &nbsp;  has an integration with
          </Text>
        );
      }
      return (
        <Text size="small">
          This is the number of <Text variant="bold">distinct</Text> vendors  <br />
          &nbsp;across organizations shown here
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
  const onRenderItemColumn = (item?: OrganizationActivity, index?: number, column?: IColumn) => {
    let columnVal: number | undefined;
    let paddingLeft: number | undefined;
    if (column?.key === 'vendorNames' && item?.sid) {
      columnVal = item?.vendorNames.length;
      paddingLeft = 50;
    } else if (column?.key === 'vendorNames' && !item?.sid) {
      columnVal = item?.vendorNames.length;
      paddingLeft = 40;
    }
    const uatFilesProcessed = item?.uatActivity.filesProcessed;
    const testFilesProcessed = item?.testActivity.filesProcessed;
    const prodFilesProcessed = item?.prodActivity.filesProcessed;

    if (item && column && column.key !== 'active' && column.key !== 'vendorNames') {
      const value = item[column.key];
      return <span title={value}>{value}</span>;
    }

    return (
      <Stack
        horizontal
        horizontalAlign="start"
        tokens={{
          childrenGap: 5.5,
          padding: `0px 0px 0px ${paddingLeft}px`,
        }}
      >
        {item?.sid && column?.key === 'vendorNames' && (
          <TooltipHost
            content={tooltipHostVendors(false, item?.vendorNames)}
            directionalHint={DirectionalHint.rightCenter}
          >
            <ButtonLink underline>{columnVal}</ButtonLink>
          </TooltipHost>
        )}
        {!item?.sid && column?.key === 'vendorNames' && (
          <Stack horizontal>
            <Text variant="bold" size="large">{columnVal}</Text>
            <Spacing margin={{ right: 'normal' }} />
            <TooltipHost
              content={tooltipHostVendors(false)}
            >
              <FontIcon
                iconName="Info"
                style={{
                  fontSize: '11px',
                  color: ThemeStore.userTheme.colors.black,
                  fontWeight: ThemeStore.userTheme.fontWeights.bold,
                }}
              />
            </TooltipHost>
          </Stack>
        )}
        {column?.key === 'active' && (
        <>
          {uatFilesProcessed && uatFilesProcessed > 0 ? (
            <TooltipHost
              content={item.sid ? tooltipHostContent(
                item?.uatActivity?.lastActivity,
                'UAT',
                item?.sid ?? '',
                uatFilesProcessed,
              ) : undefined}
              directionalHint={DirectionalHint.topRightEdge}
              closeDelay={increaseDelay}
              onMouseOver={() => setIncreasedelay(2000)}
              onMouseLeave={() => setIncreasedelay(0)}
            >
              <CircleStyled total={!item.sid} color="purple">{uatFilesProcessed}</CircleStyled>
            </TooltipHost>
          ) : (
            <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
          )}
          {testFilesProcessed && testFilesProcessed > 0 ? (
            <TooltipHost
              content={item.sid ? tooltipHostContent(
                item?.testActivity?.lastActivity,
                'TEST',
                item?.sid ?? '',
                testFilesProcessed,
              ) : undefined}
              directionalHint={DirectionalHint.topRightEdge}
              closeDelay={increaseDelay}
              onMouseOver={() => setIncreasedelay(2000)}
              onMouseLeave={() => setIncreasedelay(0)}
            >
              <CircleStyled total={!item.sid} color="orange">{testFilesProcessed}</CircleStyled>
            </TooltipHost>
          ) : (
            <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
          )}
          {prodFilesProcessed && prodFilesProcessed > 0 ? (
            <TooltipHost
              content={item.sid ? tooltipHostContent(
                item?.prodActivity?.lastActivity,
                'PROD',
                item?.sid ?? '',
                prodFilesProcessed,
              ) : undefined}
              directionalHint={DirectionalHint.topRightEdge}
              closeDelay={increaseDelay}
              onMouseOver={() => setIncreasedelay(2000)}
              onMouseLeave={() => setIncreasedelay(0)}
            >
              <CircleStyled total={!item.sid} color="blue">{prodFilesProcessed}</CircleStyled>
            </TooltipHost>
          ) : (
            <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
          )}
        </>
        )}
      </Stack>
    )
  };

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
    return null;
  };

  const renderColumnHeader = (props?: IDetailsColumnProps) => {
    const title = props?.column.name;
    return (
      <TooltipHost
        content={tooltipHostVendors(true)}
      >
        <Text variant="semiBold">{title}</Text>
        <FontIcon
          iconName="Info"
          style={{
            fontSize: '11px',
            color: ThemeStore.userTheme.colors.black,
            marginLeft: '10px',
            fontWeight: ThemeStore.userTheme.fontWeights.bold,
          }}
        />
      </TooltipHost>
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
      flexGrow: 1,
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
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Activity',
      key: 'active',
      fieldName: 'active',
      data: 'string',
      dataType: 'string',
      isPadded: true,
      minWidth: 150,
      styles: {
        cellTitle: {
          paddingLeft: '22px',
        },
      },
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Vendors',
      key: 'vendorNames',
      fieldName: 'vendorNames',
      data: 'string',
      dataType: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRenderHeader: renderColumnHeader,
      onRender: onRenderItemColumn,
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
