import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('Button', () => {
  const mockFn = jest.fn();

  it('Should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('Should render correctly', () => {
    const tree = shallow(<Button onClick={mockFn}>Testing Button</Button>);
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    const tree = shallow(<Button onClick={mockFn}>Testing Button</Button>);
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
