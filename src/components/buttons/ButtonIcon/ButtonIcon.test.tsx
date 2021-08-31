import React from 'react';
import { shallow } from 'enzyme';
import { ButtonIcon } from './ButtonIcon.js';

const defaultProps = {
  size: '10',
};

describe('ButtonIcon', () => {
  const mockFn = jest.fn();
  const tree = shallow(
    <ButtonIcon {...defaultProps} icon="edit" onClick={mockFn}>
      Button Contextual
    </ButtonIcon>
  );

  it('Should be defined', () => {
    expect(ButtonIcon).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have a children with the icon prop', () => {
    expect(tree.children().props().iconName).toEqual('edit');
  });
});
