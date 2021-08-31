import React from 'react';
import { shallow } from 'enzyme';
import { ButtonAction } from './ButtonAction.js';

const defaultProps = {
  icon: 'edit',
  onClick: () => null,
};

describe('ButtonAction', () => {
  const mockFn = jest.fn();
  const tree = shallow(
    <ButtonAction {...defaultProps} onClick={mockFn} iconProps="edit">
      Testing ButtonAction
    </ButtonAction>
  );

  it('Should be defined', () => {
    expect(ButtonAction).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have an icon', () => {
    expect(tree.props().iconProps).toEqual('edit');
  });

  it('Should renders children', () => {
    expect(tree.contains('Testing ButtonAction')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <ButtonAction {...defaultProps}>
        <div className="children" />
      </ButtonAction>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});