import { useEffect, useState } from 'react';
import {
  MonthCount,
  Organization,
  useWpTransmissionCountByVendorLazyQuery,
  useWpTransmissionCountBySponsorLazyQuery,
  useWpTransmissionsLazyQuery,
  WpTransmission,
} from 'src/data/services/graphql';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PanelType,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { Spacing } from 'src/components/spacings/Spacing';
import { shortMonths } from '../VisualizationsPage';

type VisualizationPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  orgName?: string;
  orgId?: string;
  currentMonth: number;
  typeTransmissions?: string | number;
};

type TotalTransmissionProps = {
  name?: string;
  totalCount?: number;
  monthCounts?: MonthCount[];
  organizations?: Organization;
}

const VisualizationPanel = ({
  isPanelOpen, closePanel, orgName, orgId, currentMonth, typeTransmissions,
}: VisualizationPanelProps) => {
  const { orgSid } = useOrgSid();
  const [transmissionsVendor, setTransmissionsVendor] = useState<TotalTransmissionProps[]>([]);
  const [nodes, setNodes] = useState<WpTransmission[]>();
  const [transmissionVendor,
    { data: transmissionVendorData, loading: isLoadingTransmissionVendor },
  ] = useQueryHandler(useWpTransmissionCountByVendorLazyQuery);

  const [transmissionSponsor,
    { data: transmissionSponsorData, loading: isLoadingTransmissionSponsor },
  ] = useQueryHandler(useWpTransmissionCountBySponsorLazyQuery);

  const [transmissionTable,
    { data: transmissionTableData, loading: isLoadingTransmissionTable },
  ] = useWpTransmissionsLazyQuery();

  const currentdate = new Date();
  const start = new Date(currentdate.getFullYear(), currentMonth);
  const end = new Date(currentdate.getFullYear(), currentMonth + 1);

  const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#AF19FF'];

  const vendor: DataColumn = {
    name: 'Vendor',
    key: 'vendorId',
    fieldName: 'vendorId',
    minWidth: 60,
    isPadded: true,
    dataType: 'string',
    sortable: true,
    filterable: false,
  };
  const sponsor: DataColumn = {
    name: 'Sponsor',
    key: 'planSponsorId',
    fieldName: 'planSponsorId',
    minWidth: 60,
    isPadded: true,
    dataType: 'string',
    sortable: true,
    filterable: false,
  };

  const columnOptions: DataColumn[] = [
    {
      name: 'Delivered On',
      key: 'deliveredOn',
      fieldName: 'deliveredOn',
      minWidth: 60,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    typeTransmissions === 'sponsor' ? vendor : sponsor,
    {
      name: 'Spec',
      key: 'specId',
      fieldName: 'specId',
      minWidth: 60,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      name: 'Billing Units',
      key: 'billingCount',
      fieldName: 'billingCount',
      minWidth: 60,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      name: 'Total Records',
      key: 'totalRecords',
      fieldName: 'totalRecords',
      minWidth: 60,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
  ];

  const tableFilters = useTableFilters(
    `Delivered On, 
    ${typeTransmissions === 'sponsor' && 'Vendor'}, 
    ${typeTransmissions === 'vendor' && 'Sponsor'}, 
    Spec, 
    Billing Units, 
    Total Records`,
  );
  const { columns } = useSortableColumns(tableFilters, columnOptions);
  const fetchData = () => {
    if (typeTransmissions === 'sponsor') {
      transmissionVendor({
        variables: {
          orgSid,
          dateRange: {
            rangeStart: start,
            rangeEnd: end,
          },
        },
      });
      return;
    }

    transmissionSponsor({
      variables: {
        orgSid,
        dateRange: {
          rangeStart: start,
          rangeEnd: end,
        },
      },
    });
  };

  const fetchDataTable = () => {
    const planSponsorId = typeTransmissions === 'sponsor' ? orgId : null;
    const vendorId = typeTransmissions === 'vendor' ? orgId : null;
    transmissionTable({
      variables: {
        orgSid,
        filter: {
          searchText: null,
          dateRange: {
            rangeStart: start,
            rangeEnd: end,
          },
          planSponsorId,
          vendorId,
          inboundFilename: null,
          outboundFilename: null,
          specId: null,
          implementation: null,
        },
        pageableInput: tableFilters.pagingParams,
      },
    })
  }

  useEffect(() => {
    if (isPanelOpen) {
      setTransmissionsVendor([]);
      fetchData();
      fetchDataTable();
    }
  }, [isPanelOpen, tableFilters.searchText.delayedValue, tableFilters.pagingParams]);

  const getTransmissionVendorData = (data) => {
    for (let organization = 0; organization < data.length; organization++) {
      const orgVendorData: TotalTransmissionProps = {};
      orgVendorData.monthCounts = data[organization].monthCounts;
      orgVendorData.name = data[organization]['organization'].name;
      let total = 0;
      data[organization].monthCounts.forEach(({ count }) => { total += count });
      orgVendorData.totalCount = total;
      orgVendorData.organizations = data[organization]['organization'];
      setTransmissionsVendor((prevState) => prevState.concat(orgVendorData));
    }
  };

  useEffect(() => {
    if (!isLoadingTransmissionVendor && transmissionVendorData) {
      const { wpTransmissionCountByVendor } = transmissionVendorData;
      getTransmissionVendorData(wpTransmissionCountByVendor);
    }
  }, [transmissionVendorData, isLoadingTransmissionVendor]);

  useEffect(() => {
    if (!isLoadingTransmissionSponsor && transmissionSponsorData) {
      const { wpTransmissionCountBySponsor } = transmissionSponsorData;
      getTransmissionVendorData(wpTransmissionCountBySponsor);
    }
  }, [transmissionSponsorData, isLoadingTransmissionSponsor])

  useEffect(() => {
    if (!isLoadingTransmissionTable && transmissionTableData) {
      const { wpTransmissions } = transmissionTableData;
      if (wpTransmissions?.nodes && wpTransmissions.nodes.length > 0) {
        setNodes(wpTransmissions?.nodes);
      }
    }
  }, [transmissionTableData, isLoadingTransmissionTable]);

  const updateDateFormat = (date: Date) => {
    const currentDate = new Date(date);
    let hour = currentDate.getHours();
    let minutes: string = currentDate.getMinutes().toString();
    const format = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    hour = hour || 12;
    minutes = minutes.length < 2 ? `0${minutes}` : minutes;
    return `${hour}:${minutes}${format}`;
  };

  const onRenderItemColum = (node: WpTransmission, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | number = '';

    if (column?.key === 'deliveredOn') {
      const delivered = node.deliveredOn;
      const currentTime = updateDateFormat(delivered);
      const currentDate = new Date(delivered).toLocaleDateString();
      columnVal = `${currentDate} ${currentTime}`;
    } else if (column?.key === 'vendorId') {
      columnVal = node.vendorId ?? '';
    } else if (column?.key === 'specId') {
      columnVal = node.specId ?? '';
    } else if (column?.key === 'billingCount') {
      columnVal = node.billingCount ?? 0;
    } else if (column?.key === 'totalRecords') {
      columnVal = node.totalRecords ?? 0;
    } else if (column?.key === 'planSponsorId') {
      columnVal = node.planSponsorId ?? '';
    }
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <span>{columnVal}</span>
      </Stack>
    )
  }

  const renderBody = () => {
    if (isLoadingTransmissionVendor || isLoadingTransmissionSponsor) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading visualization panel" />
        </Spacing>
      );
    }

    return (
      <>
        <PieChart width={500} height={250}>
          <Pie
            data={transmissionsVendor}
            color="#000000"
            dataKey="totalCount"
            nameKey="totalCount"
            cx="17%"
            cy="40%"
            outerRadius={80}
            fill="#8884d8"
          >
            {transmissionsVendor?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            value="name"
            verticalAlign="center"
            align="center"
            wrapperStyle={{
              marginTop: '45px',
              fontSize: '12px',
              maxWidth: '150px',
              marginLeft: '25px',
              paddingBottom: '8px',
              width: '100%',
            }}
          />
        </PieChart>
        <DetailsList
          items={nodes ?? []}
          columns={columns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColum}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      </>
    )
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Stack horizontal styles={{ root: { height: 44 } }}>
        <PanelTitle id="__CreateGroup_Panel_Title" variant="bold" size="large">
          {`${shortMonths[currentMonth]} ${new Date().getFullYear()} ${typeTransmissions === 'sponsor' ? 'Transmissions for' : 'sent to'} ${orgName}`}
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      onRenderHeader={renderPanelHeader}
      isOpen={isPanelOpen}
      onDismiss={() => {
        setTransmissionsVendor([]);
        closePanel(false);
      }}
    >
      {renderBody()}
    </ThemedPanel>
  )
};

export { VisualizationPanel };
