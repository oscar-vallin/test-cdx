import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('Button Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = shallow(<Button onClick={mockFn}>Testing Button</Button>);

  it('Should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    // const tree = shallow(<Button onClick={mockFn}>Testing Button</Button>);
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
