import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { HeaderTable, StyledMenuButton } from './TableHeader.styles';

import { TableHeader as Component } from './index';

const defaultProps = {
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

const theme = {
  colors: 'black',
};

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 1,
  }),
}));

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Table Header Component', () => {
  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    const tree = shallow(<Component {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('Should render children if type is "dashboard"', () => {
    const tree = shallow(<Component {...defaultProps} />);
    const header = tree.find(HeaderTable);
    expect(header.prop('id')).toEqual('__TableHeader-HeaderTable_dashboard');
  });

  it('Should render null if type is different "dashboard"', () => {
    const tree = shallow(<Component {...defaultProps} />);
    expect(tree).toEqual({});
  });

  it('Should render a Sort button with icon prop', () => {
    const onSortFunction = jest.fn();
    const container = shallow(
      <StyledMenuButton icon="sort" onClick={onSortFunction} theme={theme}>
        Test
      </StyledMenuButton>
    );
    expect(container.prop('icon')).toEqual('sort');
  });

  it('Should call function when click on Sort button', () => {
    const onSortFunction = jest.fn();
    const container = shallow(
      <StyledMenuButton icon="sort" onClick={onSortFunction} theme={theme}>
        TextButton
      </StyledMenuButton>
    );
    container.simulate('click');
    expect(onSortFunction).toHaveBeenCalled();
  });

  it('Should render a Option button with icon prop', () => {
    const onOptionFunction = jest.fn();
    const container = shallow(
      <StyledMenuButton icon="eye" onClick={onOptionFunction} theme={theme}>
        TextButton
      </StyledMenuButton>
    );
    expect(container.prop('icon')).toEqual('eye');
  });

  it('Should call function when click on Option button', () => {
    const onOptionFunction = jest.fn();
    const container = shallow(
      <StyledMenuButton icon="eye" onClick={onOptionFunction} theme={theme}>
        TextButton
      </StyledMenuButton>
    );
    container.simulate('click');
    expect(onOptionFunction).toHaveBeenCalled();
  });
});
