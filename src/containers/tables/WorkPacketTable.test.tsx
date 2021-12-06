import Component from './WorkPacketTable';
import { mountWithTheme, shallowWithTheme } from '../../utils/testUtils';
import { WorkPacketColumns } from './WorkPacketColumns';
import { SortDirection } from 'src/data/services/graphql';
import TestRenderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { useWorkPacketStatusesLazyQuery } from '../../data/services/graphql';
import { StoreProvider } from 'easy-peasy';
import store from '../../store/index';
import { ApolloContextProvider } from '../../contexts/ApolloContext';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/archives?endDate=2021-11-28&filter=&orgSid=280&startDate=2013-12-26',
  }),
}));

const defaultProps = {
  id: '',
  cols: [
    WorkPacketColumns.TIMESTAMP,
    WorkPacketColumns.VENDOR,
    WorkPacketColumns.PLAN_SPONSOR,
    WorkPacketColumns.CLIENT_FILE,
    WorkPacketColumns.VENDOR_FILE,
  ],
  lazyQuery: null,
  getItems: [] as any,
  searchTextPlaceholder: 'Extract Name, Status, Vendor, etc.',
  defaultSort: [
    {
      property: 'timestamp',
      direction: SortDirection.Desc,
      nullHandling: null,
      ignoreCase: true,
    },
  ],
  onItemsListChange: () => {},
};

const mocks: any[] = [
  {
    request: {
      query: useWorkPacketStatusesLazyQuery,
      variables: {
        orgSid: '-1',
        searchText: '',
        dateRange: { rangeStart: new Date().toDateString, rangeEnd: new Date().toDateString },
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
          sort: [
            {
              property: 'timestamp',
              direction: 'DESC',
              nullHandling: 'NULLS_FIRST',
              ignoreCase: true,
            },
          ],
        },
      },
    },
    result: {
      data: {},
    },
  },
];

describe('Work Packet Table Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);

  // it('renders without error', () => {
  //   const component = TestRenderer.create(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Component {...defaultProps} lazyQuery={} />
  //     </MockedProvider>
  //   );

  //   const tree = component.toJSON();
  //   expect(tree.children).toContain('Loading data');
  // });

  // it('bbbbb', () => {
  //   const component = mountWithTheme(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Component {...defaultProps} id="TableArchive"></Component>
  //     </MockedProvider>
  //   );

  //   // const tree = component.toJSON();
  //   // expect(component).toContain('Loading data');
  //   const searchId = component.find('#TableArchive_TableWrap');
  //   expect(searchId.length).toBe(1);
  //   expect(toJSON(component)).toMatchSnapshot();
  // });

  // it('ccccc', () => {
  //   const component = shallowWithTheme(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Component {...defaultProps} lazyQuery={useWorkPacketStatusesLazyQuery} />
  //     </MockedProvider>
  //   );

  //   const searchId = component.find('#__spanError');
  //   expect(searchId.length).toBe(1);
  //   expect(toJSON(component)).toMatchSnapshot();
  // });

  // it('ddddd', () => {
  //   const component = shallowWithTheme(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Component {...defaultProps} lazyQuery={useWorkPacketStatusesLazyQuery} />
  //     </MockedProvider>
  //   );

  //   const searchId = component.find('#__StyledSpacingId');
  //   expect(searchId.length).toBe(1);
  //   expect(toJSON(component)).toMatchSnapshot();
  // });

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });

  // it('Should find Id TableArchive_TableWrap', () => {
  //   const wrapper = mountWithTheme(
  //     <StoreProvider store={store}>
  //       <ApolloContextProvider>
  //         <Component {...defaultProps} id="TableArchive"></Component>
  //       </ApolloContextProvider>
  //     </StoreProvider>
  //   );
  //   const searchId = wrapper.find('#TableArchive_TableWrap');
  //   expect(searchId.length).toBe(1);
  // });
});
