import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TableRow as Component } from './index.js';
import { StyledTableRow } from './TableRow.styles.js';

const defaultProps = {
  id: '__TableRow',
  props: {
    itemIndex: 2,
  },
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

  it('Should render children if props exist', () => {
    const tree = shallow(<Component {...defaultProps} />);
    const header = tree.find(StyledTableRow);
    expect(header.prop('props')).toEqual({ itemIndex: 2 });
  });

  it('Should not render children if props does not exist', () => {
    const tree = shallow(<Component {...defaultProps} props={null} />);
    const header = tree.find(StyledTableRow);
    expect(header.prop('props')).toEqual(null);
  });
});
