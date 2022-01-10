import { shallow, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Table as Component } from './index';
import { TableHeader } from '../TableHeader';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';
import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/file-status?orgSid=1',
  }),
}));

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 1,
    setOrgSid: jest.fn()
  })
}));


const items = [
  [
    {
      child: undefined,
      columnId: 'datetime',
      id: 'datetime',
      sublabel: undefined,
      text: '11/04/2020 08:12 AM',
      value: '11/04/2020 08:12 AM',
    },
  ],
  [{ child: undefined, columnId: 'planSponsor', id: 'planSponsor', sublabel: undefined, text: 'PZZA', value: 'PZZA' }],
  [{ child: undefined, columnId: 'vendorId', id: 'vendorId', sublabel: undefined, text: 'Disc', value: 'Disc' }],
  [{ child: undefined, columnId: 'specId', id: 'specId', sublabel: undefined, text: 'DiscSpec', value: 'DiscSpec' }],
  [
    {
      child: undefined,
      columnId: 'implementation',
      id: 'implementation',
      sublabel: undefined,
      text: 'DiscImplementation',
      value: 'DiscImplementation',
    },
  ],
  [
    {
      child: undefined,
      columnId: 'inboundFilename',
      id: 'inboundFilename',
      sublabel: undefined,
      text: 'K2UDEMO-MetLife-TEST-Warnings.xml',
      value: 'K2UDEMO-MetLife-TEST-Warnings.xml',
    },
  ],
  [
    {
      child: undefined,
      columnId: 'outboundFilename',
      id: 'outboundFilename',
      sublabel: undefined,
      text: 'K2UDEMO-MetLife-12282020085407.txt',
      value: 'K2UDEMO-MetLife-12282020085407.txt',
    },
  ],
  [
    {
      child: undefined,
      columnId: 'outboundFilesize',
      id: 'outboundFilesize',
      sublabel: undefined,
      text: 45919,
      value: 45919,
    },
  ],
  [
    {
      child: undefined,
      columnId: 'billingCount',
      id: 'billingCount',
      sublabel: undefined,
      text: 89,
      value: 89,
    },
  ],
  [
    {
      child: undefined,
      columnId: 'totalRecords',
      id: 'totalRecords',
      sublabel: undefined,
      text: 132,
      value: 132,
    },
  ],
  [
    {
      child: undefined,
      columnId: 'extractType',
      id: 'extractType',
      sublabel: undefined,
      text: 'Enrollment',
      value: 'Enrollment',
    },
  ],
  [
    {
      child: undefined,
      columnId: 'extractVersion',
      id: 'extractVersion',
      sublabel: undefined,
      text: '1.0.0.2020092018',
      value: '1.0.0.2020092018',
    },
  ],
];

const columns = [
  { key: 'datetime', label: 'Delivered On', style: 'text' },
  { key: 'planSponsor', label: 'Plan Sponsor', style: 'text' },
  { key: 'vendorId', label: 'Vendor', style: 'text' },
  { key: 'specId', label: 'Spec', style: 'text' },
  { key: 'implementation', label: 'Implementation', style: 'text' },
  { key: 'inboundFilename', label: 'Client File', style: 'link' },
  { key: 'outboundFilename', label: 'Vendor File', style: 'link' },
  { key: 'outboundFilesize', label: 'Outbound File Size', style: 'text' },
  { key: 'billingCount', label: 'Billing Unit Count', style: 'text' },
  { key: 'totalRecords', label: 'Total Records', style: 'text' },
  { key: 'extractType', label: 'Feed', style: 'text' },
  { key: 'extractVersion', label: 'Version', style: 'text' },
];

const defaultProps = {
  id: 'default',
  items: [
    [
      {
        id: 'vendor',
        value: 'firstName',
        columnId: 'vendor',
        text: 'file-status/filter/firstName*today',
        sublabel: 'firstSecondaryDescr',
        child: {
          id: 'specs',
          value: 'firstSecondaryDescr',
          columnId: 'specs',
          text: 'firstSecondaryDescr',
          sublabel: '',
          child: null,
        },
      },
      {
        id: 'total',
        value: '1/1',
        columnId: '1',
        text: '1/1',
        sublabel: '',
        child: null,
      },
    ],
    [
      {
        id: 'vendor',
        value: 'secondName',
        columnId: 'vendor',
        text: 'file-status/filter/secondName*today',
        sublabel: 'thirdSecondaryDescr',
        child: {
          id: 'specs',
          value: 'thirdSecondaryDescr',
          columnId: 'specs',
          text: 'thirdSecondaryDescr',
          sublabel: '',
          child: null,
        },
      },
      {
        id: 'total',
        value: '2/2',
        columnId: '2',
        text: '2/2',
        sublabel: '',
        child: null,
      },
    ],
    [
      {
        id: 'vendor',
        value: 'thridName',
        columnId: 'vendor',
        text: 'file-status/filter/thridName*today',
        sublabel: 'thirdSecondaryDescr',
        child: {
          id: 'specs',
          value: 'thirdSecondaryDescr',
          columnId: 'specs',
          text: 'thirdSecondaryDescr',
          sublabel: '',
          child: null,
        },
      },
      {
        id: 'total',
        value: '3/3',
        columnId: '3',
        text: '3/3',
        sublabel: '',
        child: null,
      },
    ],
  ],
  columns: [
    {
      key: 'vendor',
      label: null,
      id: 'vendor',
      style: 'vendor',
      child: { key: 'specs', label: 'Received On', id: 'secondaryDescr', style: 'text' },
    },
    { key: 'total', label: 'Total', id: 'total', style: 'total' },
  ],
  structure: {
    header: {
      type: 'dashboard',
    },
  },
  onOption: () => null,
  groups: [],
  searchInput: '',
  date: 'today',
  onItemsListChange: () => null,
  loading: false,
  title: '',
  emptyMessage: 'No data',
};

const defaultHeaderProps = {
  id: '__TableHeader',
  header: {
    type: 'dashboard',
    buttons: true,
  },
  sortLabel: 'sortLabel',
  onSort: () => null,
  onOption: () => null,
  date: 'today',
};

test('Matches Snapshot - Table', () => {
  const wrapper = shallow(
    <StoreProvider store={store}>
      <Component {...defaultProps} />
    </StoreProvider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic Table Component', () => {
  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render table header Rendered with default props', () => {
    const tree = shallow(<TableHeader {...defaultHeaderProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('Should render table header when structure is type dashboard', () => {
    const tree = shallow(<TableHeader {...defaultHeaderProps} />);
    expect(tree.prop('id')).toEqual('__TableHeader-HeaderTable_dashboard');
  });

  it('Should render table correctly', () => {
    const tree = render(
      <StoreProvider store={store}>
        <Component
          {...defaultProps}
          structure={{
            header: {
              type: 'other',
            },
          }}
        />
      </StoreProvider>
    );
    expect(tree.prop('id')).toBeUndefined();
  });

  // it('Should render dashboard list item with props', () => {
  //   const tree = shallow(<Component {...defaultProps} />);
  //   const list = tree.find(DetailsList);

  //   expect(list.prop('className')).toEqual('root-109');
  //   expect(list.prop('id')).toEqual('TableDetailedList');
  //   expect(list.prop('selectionMode')).toEqual(SelectionMode.none);
  //   expect(list.prop('layoutMode')).toEqual(DetailsListLayoutMode.justified);
  //   expect(list.prop('setKey')).toEqual('none');
  //   expect(list.prop('isHeaderVisible')).toBeTruthy();
  //   expect(typeof list.prop('onRenderDetailsHeader')).toBe('function');
  //   expect(typeof list.prop('onRenderItemColumn')).toBe('function');
  // });
  // it('Should render no dashboard list item with props', () => {
  //   const tree = shallow(
  //     <Component
  //       {...defaultProps}
  //       structure={{
  //         header: {
  //           type: 'other',
  //         },
  //       }}
  //     />
  //   );
  //   const list = tree.find(DetailsList);
  //   expect(list.prop('className')).toEqual('root-109');
  //   expect(list.prop('id')).toEqual('TableDetailedList');
  //   expect(list.prop('selectionMode')).toEqual(SelectionMode.none);
  //   expect(list.prop('layoutMode')).toEqual(DetailsListLayoutMode.justified);
  //   expect(list.prop('setKey')).toEqual('none');
  //   expect(list.prop('isHeaderVisible')).toBeTruthy();
  //   expect(list.prop('onRenderDetailsHeader')).toEqual(null);
  //   expect(typeof list.prop('onRenderDetailsHeader')).not.toBe('function');
  //   expect(typeof list.prop('onRenderItemColumn')).toBe('function');
  // });

  it('Should has items with props', () => {
    const tree = shallowWithTheme(<Component {...defaultProps} />);
    const list = tree.children();
    expect(list.prop('items')).toEqual(defaultProps.items);
  });

  it('Should find in the component the Id header', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component {...defaultProps} />
      </StoreProvider>
    );
    const searchId = wrapper.find('#default_header');
    expect(searchId.length).toBe(1);
  });

  it('Should render the component sending the property structure, loading and items', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component
          {...defaultProps}
          structure={{
            header: {
              type: 'other',
            },
          }}
          loading={false}
          items={[]}
        />
      </StoreProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the component sending the property items empty', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component {...defaultProps} items={[]} />
      </StoreProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should simulate clicking the button with Id __SortButton', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component
          {...defaultProps}
          structure={{ header: { type: 'dashboard', buttons: ['Sort', 'Specs'], title: 'title' } }}
        />
      </StoreProvider>
    );
    const buttonSimulate = wrapper.find('button[id="__SortButton"]').first();
    buttonSimulate.simulate('click');
    expect(buttonSimulate.length).toBe(1);
  });

  it('Should simulate clicking the button with Id __EyeButton', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component
          {...defaultProps}
          structure={{ header: { type: 'dashboard', buttons: ['Sort', 'Specs'], title: 'title' } }}
        />
      </StoreProvider>
    );
    const buttonSimulate = wrapper.find('button[id="__EyeButton"]').first();
    buttonSimulate.simulate('click');
    expect(buttonSimulate.length).toBe(1);
  });

  it('Should render the component sending the property structure, columns and items', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component {...defaultProps} items={items} columns={columns} structure={{ header: { type: 'file_status' } }} />
      </StoreProvider>
    );
    const searchId = wrapper.find('#Delivered__On').first();
    expect(searchId.length).toBe(1);
  });
});
