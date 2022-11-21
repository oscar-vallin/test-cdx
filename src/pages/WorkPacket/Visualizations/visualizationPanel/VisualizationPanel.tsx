import { useEffect, useState } from 'react';
import chroma from 'chroma-js';
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
  Sector,
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
  Text,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { useThemeStore } from 'src/store/ThemeStore';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { Spacing } from 'src/components/spacings/Spacing';
import { ButtonLink } from 'src/components/buttons';
import { shortMonths } from '../VisualizationsPage';

type VisualizationPanelProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
  orgSid: string;
  orgName?: string;
  orgId?: string;
  vendorId?: string;
  currentMonth: number;
  currentYear: number;
  typeTransmissions?: string | number;
};

type TotalTransmissionProps = {
  name?: string;
  totalCount?: number;
  monthCounts?: MonthCount[];
  organizations?: Organization;
}

const VisualizationPanel = ({
  isPanelOpen,
  closePanel,
  orgSid,
  orgName,
  orgId,
  vendorId,
  currentMonth,
  currentYear,
  typeTransmissions,
}: VisualizationPanelProps) => {
  const ThemeStore = useThemeStore();
  const handleError = ErrorHandler();
  const [transmissionsVendor, setTransmissionsVendor] = useState<TotalTransmissionProps[]>([]);
  const [nodes, setNodes] = useState<WpTransmission[]>();
  const [totalTransmissions, setTotalTransmissions] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number>();

  const onMouseOver = (slice, index) => {
    setActiveIndex(index);
  };

  const onMouseLeave = () => {
    setActiveIndex(undefined);
  };

  const [callTransmissionsByVendor,
    {
      data: transmissionVendorData,
      loading: isLoadingTransmissionVendor,
      error: errorTransmissionByVendor,
    },
  ] = useWpTransmissionCountByVendorLazyQuery();

  const [callTransmissionsBySponsor,
    {
      data: transmissionSponsorData,
      loading: isLoadingTransmissionSponsor,
      error: errorTransmissionsBySponsor,
    },
  ] = useWpTransmissionCountBySponsorLazyQuery();

  const [callTransmissionsTableData,
    {
      data: transmissionTableData,
      loading: isLoadingTransmissionTable,
      error: errorTransmissionsTableData,
    },
  ] = useWpTransmissionsLazyQuery();

  useEffect(() => {
    handleError(errorTransmissionsTableData);
  }, [errorTransmissionsTableData]);

  useEffect(() => {
    handleError(errorTransmissionByVendor);
  }, [errorTransmissionByVendor]);

  useEffect(() => {
    handleError(errorTransmissionsBySponsor);
  }, [errorTransmissionsBySponsor]);

  const start = new Date(currentYear, currentMonth);
  const end = new Date(currentYear, currentMonth + 1);

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
    Spec, 
    Billing Units, 
    Total Records`,
  );
  const { columns } = useSortableColumns(tableFilters, columnOptions);
  const fetchData = () => {
    if (typeTransmissions === 'sponsor') {
      callTransmissionsByVendor({
        variables: {
          orgSid,
          filter: {
            dateRange: {
              rangeStart: start,
              rangeEnd: end,
            },
            planSponsorId: orgId,
            vendorId,
          },
        },
      });
      return;
    }

    callTransmissionsBySponsor({
      variables: {
        orgSid,
        filter: {
          dateRange: {
            rangeStart: start,
            rangeEnd: end,
          },
          planSponsorId: orgId,
          vendorId,
        },
      },
    });
  };

  const fetchDataTable = () => {
    callTransmissionsTableData({
      variables: {
        orgSid,
        filter: {
          searchText: null,
          dateRange: {
            rangeStart: start,
            rangeEnd: end,
          },
          planSponsorId: orgId,
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

  const loadTransmissionVendorData = (data) => {
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
      loadTransmissionVendorData(wpTransmissionCountByVendor);
    }
  }, [transmissionVendorData, isLoadingTransmissionVendor]);

  useEffect(() => {
    if (!isLoadingTransmissionSponsor && transmissionSponsorData) {
      const { wpTransmissionCountBySponsor } = transmissionSponsorData;
      loadTransmissionVendorData(wpTransmissionCountBySponsor);
    }
  }, [transmissionSponsorData, isLoadingTransmissionSponsor])

  useEffect(() => {
    if (!isLoadingTransmissionTable && transmissionTableData) {
      const { wpTransmissions } = transmissionTableData;
      if (wpTransmissions?.nodes && wpTransmissions.nodes.length > 0) {
        setNodes(wpTransmissions?.nodes);
      }
      setTotalTransmissions(wpTransmissions?.paginationInfo?.totalElements ?? 0);
    }
  }, [transmissionTableData, isLoadingTransmissionTable]);

  const updateDateFormat = (date: Date) => {
    const now = new Date(date);
    let hour = now.getHours();
    let minutes: string = now.getMinutes().toString();
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
      const now = new Date(delivered).toLocaleDateString();
      columnVal = `${now} ${currentTime}`;
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

  const renderLegendText = (value: string, entry: any, index: number) => (
    <ButtonLink
      onMouseOver={() => onMouseOver(entry, index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => {

      }}
    >
      <Text style={{
        fontSize: ThemeStore.userTheme.fontSizes.small,
        fontWeight: index === activeIndex ? 'bold' : 'normal',
        color: index === activeIndex ? chroma(entry.color).darken().saturate(2).hex() : entry.color,
      }}
      >
        {value} ({entry.payload.value})
      </Text>
    </ButtonLink>
  );

  const renderActiveShape = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill,
    } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={chroma(fill).darken().saturate(2).hex()}
      />
    );
  };

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
        <PieChart width={500} height={200}>
          <Pie
            data={transmissionsVendor}
            color="#000000"
            dataKey="totalCount"
            nameKey="totalCount"
            cx="17%"
            cy="40%"
            outerRadius={80}
            fill="#8884d8"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
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
              marginTop: '35px',
              fontSize: '12px',
              maxWidth: '150px',
              marginLeft: '25px',
              paddingBottom: '8px',
              width: '100%',
              overflow: 'visible',
              whiteSpace: 'nowrap',
            }}
            formatter={renderLegendText}
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
    <PanelHeader id="__Visualization_PanelHeader">
      <Stack horizontal styles={{ root: { height: 44 } }}>
        <PanelTitle id="__Visualization_Panel_Title" variant="bold" size="large">
          {`${shortMonths[currentMonth]} ${currentYear} ${typeTransmissions === 'sponsor' ? 'Transmissions for' : 'sent to'} ${orgName}`} ({totalTransmissions})
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
