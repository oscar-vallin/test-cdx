import React from 'react';
import { shallow } from 'enzyme';
import { ButtonContextual } from './ButtonContextual.js';

const items = [
  {
    key: 'ProfileMenu_UserSettings',
    text: 'Settings',
    onClick: () => null,
  },
  { key: 'ProfileMenu_Logout', text: 'Logout', onClick: () => null },
];

describe('ButtonContextual', () => {
  const tree = shallow(<ButtonContextual items={items}>Button Contextual</ButtonContextual>);

  it('Should be defined', () => {
    expect(ButtonContextual).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have items', () => {
    expect(tree.props().items).toEqual(items);
  });

  it('Should renders children', () => {
    expect(tree.contains('Button Contextual')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <ButtonContextual>
        <div className="children" />
      </ButtonContextual>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
