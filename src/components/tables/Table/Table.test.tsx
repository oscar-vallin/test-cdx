import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Table as Component } from './index.js';
import { TableHeader } from '../TableHeader/index.js';

const defaultProps = {
  items: [],
  columns: [
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

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic Table Component', () => {
  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render table header when structure is type dashboard', () => {
    const tree = shallow(<TableHeader {...defaultHeaderProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('Should render table header when structure is type dashboard', () => {
    const tree = shallow(<TableHeader {...defaultHeaderProps} />);
    expect(tree.prop('id')).toEqual('HeaderTable_dashboard');
  });

  it('Should render table header correctly', () => {
    const tree = shallow(
      <Component
        {...defaultProps}
        structure={{
          header: {
            type: 'other',
          },
        }}
      />
    );
    expect(tree.prop('id')).toEqual('Table_Detailed');
  });

  it('Should render dashboard list item with props', () => {
    const tree = shallow(<Component {...defaultProps} />);
    const list = tree.find(DetailsList);

    expect(list.prop('className')).toEqual('root-40');
    expect(list.prop('id')).toEqual('TableDetailedList');
    expect(list.prop('selectionMode')).toEqual(SelectionMode.none);
    expect(list.prop('layoutMode')).toEqual(DetailsListLayoutMode.justified);
    expect(list.prop('setKey')).toEqual('none');
    expect(list.prop('isHeaderVisible')).toBeTruthy();
    expect(typeof list.prop('onRenderDetailsHeader')).toBe('function');
    expect(typeof list.prop('onRenderItemColumn')).toBe('function');
  });

  it('Should render no dashboard list item with props', () => {
    const tree = shallow(
      <Component
        {...defaultProps}
        structure={{
          header: {
            type: 'other',
          },
        }}
      />
    );
    const list = tree.find(DetailsList);
    expect(list.prop('className')).toEqual('root-40');
    expect(list.prop('id')).toEqual('TableDetailedList');
    expect(list.prop('selectionMode')).toEqual(SelectionMode.none);
    expect(list.prop('layoutMode')).toEqual(DetailsListLayoutMode.justified);
    expect(list.prop('setKey')).toEqual('none');
    expect(list.prop('isHeaderVisible')).toBeTruthy();
    expect(list.prop('onRenderDetailsHeader')).toEqual(null);
    expect(typeof list.prop('onRenderDetailsHeader')).not.toBe('function');
    expect(typeof list.prop('onRenderItemColumn')).toBe('function');
  });

  it('Should has items with props', () => {
    const tree = shallow(<Component {...defaultProps} />);
    const list = tree.find(DetailsList);
    expect(list.prop('items')).toEqual([]);
  });
});
