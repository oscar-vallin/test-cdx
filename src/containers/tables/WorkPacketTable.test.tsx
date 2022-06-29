import { WorkPacketTable } from './WorkPacketTable';
import { mountWithTheme } from 'src/utils/testUtils';
import { WorkPacketColumn } from './WorkPacketColumns';
import { WorkPacketCommandType, WorkPacketStatus, WorkStatus, WorkStep } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import { ROUTES_ID } from 'src/data/constants/RouteConstants';
import { endOfToday, startOfYesterday } from 'date-fns';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/archives?endDate=2021-11-28&filter=&orgSid=280&startDate=2013-12-26',
  }),
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

const tableFilters = (includeToday: boolean): TableFiltersType => {
  const sDate = includeToday ? startOfYesterday() : new Date(2020, 10, 13);
  const eDate = includeToday ? endOfToday() : new Date(2020, 10, 14);

  return {
    startDate: { value: sDate, setValue: jest.fn(), onChange: jest.fn() },
    endDate: { value: eDate, setValue: jest.fn(), onChange: jest.fn() },
    searchText: {
      value: '',
      label: '',
      delayedValue: '',
      type: 'text',
      placeholder: '',
      setValue: jest.fn(),
      onChange: jest.fn(),
    },
    pagingParams: {},
    setPagingParams: jest.fn(),
  };
};

let lazyQueryCalled = false;
const data = {
  wpProcessErrors: {
    listPageInfo: {
      pageHeaderLabel: 'ABC File Status',
      secondaryHeaderLabel: 'ABC Archives',
    },
    paginationInfo: {
      totalPages: 2,
      totalElements: 120,
      pageNumber: 0,
      pageSize: 100,
    },
  },
};
const emptyData = {
  wpProcessErrors: {
    paginationInfo: {
      totalPages: 0,
      totalElements: 0,
      pageNumber: 0,
      pageSize: 100,
    },
  },
  listPageInfo: {
    pageHeaderLabel: 'ABC File Status',
    secondaryHeaderLabel: 'ABC Archives',
  },
};
const loading = false;
const mockGraphQLLazy = () => [
  () => {
    lazyQueryCalled = true;
  },
  {
    data,
    loading,
    error: undefined,
  },
];

const mockEmptyGraphQLLazy = () => [
  () => {
    lazyQueryCalled = true;
  },
  {
    data: emptyData,
    loading,
    error: undefined,
  },
];

const generateData = () => {
  const data: WorkPacketStatus[] = [];
  for (let i = 0; i < 120; i++) {
    data.push({
      inboundFilename: 'ABC-DEF-PROD.zip',
      orgSid: '22',
      orgId: 'ABC',
      packetStatus: WorkStatus.Complete,
      step: WorkStep.TransmitFile,
      stepStatus: WorkStatus.Complete,
      vendorSid: '55',
      vendorId: 'DEF',
      workOrderId: `2020-11-22-work111${i}`,
      vendorFilename: 'outbound.zip',
      timestamp: '2020-11-22T13:55:23.000',
      commands: [
        {
          commandType: WorkPacketCommandType.ViewDetails,
          label: 'View',
        },
        {
          commandType: WorkPacketCommandType.DownloadFile,
          label: 'Download',
        },
      ],
    });
  }
  return data;
};

const onLoading = jest.fn();
const onItemsListChange = jest.fn();
const setContextualTitle = jest.fn();
const defaultProps = {
  id: '',
  cols: [
    WorkPacketColumn.TIMESTAMP,
    WorkPacketColumn.VENDOR,
    WorkPacketColumn.PLAN_SPONSOR,
    WorkPacketColumn.CLIENT_FILE,
    WorkPacketColumn.VENDOR_FILE,
  ],
  lazyQuery: mockGraphQLLazy,
  getItems: generateData,
  searchTextPlaceholder: 'Extract Name, Status, Vendor, etc.',
  routeId: ROUTES_ID.FILE_STATUS,
  setContextualTitle,
  onLoading,
  onItemsListChange,
  tableFilters: tableFilters(true),
};

const emptyTableProps = {
  ...defaultProps,
  getItems: () => [],
  lazyQuery: mockEmptyGraphQLLazy,
};

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 1,
  }),
}));

jest.mock('src/utils/ErrorHandler', () => ({
  ErrorHandler: () => {
    return () => {
      // do nothing ;
    };
  },
}));

describe('Work Packet Table Container Testing Unit...', () => {
  it('Table is rendered', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <WorkPacketTable {...defaultProps} />
      </StoreProvider>
    );

    expect(lazyQueryCalled).toEqual(true);
    expect(onLoading).toBeCalled();
    expect(onItemsListChange).toBeCalled();
    expect(setContextualTitle).toBeCalled();
    expect(wrapper.find('TableFilters')).toHaveLength(1);
    expect(wrapper.find('ScrollableTable')).toHaveLength(1);
    expect(wrapper.find('Paginator')).toHaveLength(1);
    expect(wrapper.find('span[id="__Paginator_PagingInfo-Text"]')).toHaveLength(1);

    // There should be 5 columns rendered
    expect(wrapper.find('.ms-DetailsHeader-cellTitle')).toHaveLength(5);
    // Timestamp should be sorted by default
    expect(wrapper.find('.ms-DetailsHeader-cellTitle').at(0).find('FontIcon[iconName="SortDown"]')).toHaveLength(1);
    // Click Timestamp column to sort ascending
    wrapper.find('.ms-DetailsHeader-cellTitle').at(0).simulate('click');
    expect(wrapper.find('.ms-DetailsHeader-cellTitle').at(0).find('FontIcon[iconName="SortUp"]')).toHaveLength(1);
    // Now sort a different column
    wrapper.find('.ms-DetailsHeader-cellTitle').at(1).simulate('click');
    expect(wrapper.find('.ms-DetailsHeader-cellTitle').at(1).find('FontIcon[iconName="SortUp"]')).toHaveLength(1);
    expect(wrapper.find('.ms-DetailsHeader-cellTitle').at(0).find('FontIcon')).toHaveLength(0);

    // Click on a details link
    expect(wrapper.find('div.ms-DetailsRow-cell')).toHaveLength(50);
    wrapper.find('div.ms-DetailsRow-cell button').at(0).simulate('click');

    // Change pages
    const nextButton = wrapper.find('button[id="__Paginator_Next"]');
    expect(nextButton).toHaveLength(1);
    nextButton.simulate('click');
    // Table Filters should change
  });

  it('Empty Polling Table', () => {
    const startPolling = jest.fn();
    const stopPolling = jest.fn();
    const pollingQuery = () => ({
      startPolling,
      stopPolling,
      data: {
        workPacketStatusPoll: 0,
      },
      loading,
      error: undefined,
    });

    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <WorkPacketTable {...emptyTableProps} pollingQuery={pollingQuery} />
      </StoreProvider>
    );

    expect(lazyQueryCalled).toEqual(true);
    expect(wrapper.find('TableFilters')).toHaveLength(1);
    expect(wrapper.find('ScrollableTable')).toHaveLength(1);
    expect(wrapper.find('EmptyState')).toHaveLength(1);
    expect(wrapper.find('span[id="__Paginator_PagingInfo-Text"]')).toHaveLength(0);
    expect(startPolling).toBeCalled();
    expect(stopPolling).toHaveBeenCalledTimes(0);
  });

  it('No Polling Outside of Today', () => {
    const startPolling = jest.fn();
    const stopPolling = jest.fn();
    const pollingQuery = () => ({
      startPolling,
      stopPolling,
      data: {
        workPacketStatusPoll: 0,
      },
      loading,
      error: undefined,
    });

    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <WorkPacketTable {...emptyTableProps} pollingQuery={pollingQuery} tableFilters={tableFilters(false)} />
      </StoreProvider>
    );

    expect(lazyQueryCalled).toEqual(true);
    expect(wrapper.find('TableFilters')).toHaveLength(1);
    expect(wrapper.find('ScrollableTable')).toHaveLength(1);
    expect(wrapper.find('EmptyState')).toHaveLength(1);
    expect(wrapper.find('span[id="__Paginator_PagingInfo-Text"]')).toHaveLength(0);
    expect(startPolling).toHaveBeenCalledTimes(0);
    expect(stopPolling).toHaveBeenCalledTimes(1);
  });
});
