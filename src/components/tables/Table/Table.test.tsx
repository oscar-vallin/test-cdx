import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Table as Component } from './index';
import { TableHeader } from '../TableHeader';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from 'src/utils/testUtils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/file-status?orgSid=1',
  }),
}));

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 1,
  }),
}));

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
  titleRedirectPage: 'file-status',
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
    const tree = renderWithTheme(
      <StoreProvider store={store}>
        <Component {...defaultProps} />
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
        <Component {...defaultProps} loading={false} items={[]} />
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
        <Component {...defaultProps} sortButtons={['Sort', 'Specs']} />
      </StoreProvider>
    );
    const buttonSimulate = wrapper.find('button[id="__SortButton"]').first();
    buttonSimulate.simulate('click');
    expect(buttonSimulate.length).toBe(1);
  });

  it('Should simulate clicking the button with Id __EyeButton', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Component {...defaultProps} sortButtons={['Sort', 'Specs']} />
      </StoreProvider>
    );
    const buttonSimulate = wrapper.find('button[id="__EyeButton"]').first();
    buttonSimulate.simulate('click');
    expect(buttonSimulate.length).toBe(1);
  });
});
