import { shallow } from 'enzyme';
import { Text as Component } from './index.js';

const defaultProps = { left: 'star', right: 'end', top: 'center', bottom: 'center' };

describe('Text', () => {
  const tree = shallow(
    <Component {...defaultProps} variant="normal">
      Text test
    </Component>
  );

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should renders children', () => {
    expect(tree.contains('Text test')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Component {...defaultProps} variant="normal">
        <p className="children">Test</p>
      </Component>
    );
    expect(wrapper.contains(<p className="children">Test</p>)).toEqual(true);
  });

  it('Should have varian property', () => {
    expect(tree.props().variant).toEqual('normal');
  });

  it('Should have left property', () => {
    expect(tree.props().left).toEqual('star');
  });

  it('Should have rigth property', () => {
    expect(tree.props().right).toEqual('end');
  });

  it('Should have top property', () => {
    expect(tree.props().top).toEqual('center');
  });

  it('Should have bottom property', () => {
    expect(tree.props().bottom).toEqual('center');
  });
});
