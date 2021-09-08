import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Table as Component } from './index.js';

const defaultProps = {
  items: [],
  columns: [],
  structure: {},
  onOption: () => null,
  groups: [],
  searchInput: '',
  date: 'today',
  onItemsListChange: () => null,
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic TableRow Component', () => {
  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    const tree = shallow(<Component {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });
});
