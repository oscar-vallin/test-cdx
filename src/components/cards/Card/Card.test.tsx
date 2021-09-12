import { shallow } from 'enzyme';
import { Card as Component } from './index.js';

describe('Card', () => {
  const mockFn = jest.fn();
  const tree = shallow(<Component onClick={mockFn}>Card Section</Component>);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have a horizontal property', () => {
    expect(tree.props().horizontal).toEqual(true);
  });

  it('Should have a default variant property', () => {
    expect(tree.props().variant).toEqual('normal');
  });

  it('Should have a default elevation property', () => {
    expect(tree.props().elevation).toEqual('normal');
  });

  it('Should have a default spacing property', () => {
    expect(tree.props().spacing).toEqual('normal');
  });

  it('Should renders children', () => {
    expect(tree.contains('Card Section')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Component>
        <div className="children" />
      </Component>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
