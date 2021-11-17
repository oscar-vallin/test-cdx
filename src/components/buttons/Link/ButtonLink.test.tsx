import { shallow } from 'enzyme';
import { shallowWithTheme } from 'src/utils/testUtils';
import { Link } from './ButtonLink';

const defaultProps = {
  id: '__Link_Id',
  onClick: jest.fn(),
  href: '#',
  target: '_blank',
  rel: 'noopener',
};

describe('Link', () => {
  const mockFn = jest.fn();
  const tree = shallowWithTheme(
    <Link {...defaultProps} children={'Testing ButtonLink'} onClick={mockFn} href="https://testlink.com" />
  );

  it('Should be defined', () => {
    expect(Link).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.children().simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should renders children', () => {
    expect(tree.children().contains('Testing ButtonLink')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallowWithTheme(
      <Link {...defaultProps} onClick={mockFn} children={<div className="children" />} href="https://testlink.com" />
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });

  it('Should have a href prop', () => {
    expect(tree.children().props().href).toEqual('https://testlink.com');
  });

  it('Should have a target blank prop', () => {
    expect(tree.children().props().target).toEqual('_blank');
  });

  it('Should have a target blank prop', () => {
    expect(tree.children().props().target).toEqual('_blank');
  });

  it('Default props values, Should have a props', () => {
    const defaultTree = shallowWithTheme(<Link id={'__Link'}>Link Text</Link>);
    expect(defaultTree).toMatchSnapshot();

    expect(defaultTree.children().props().id).toEqual('__Link');
    expect(defaultTree.children().props().target).toEqual('_blank');
    expect(defaultTree.children().props().rel).toEqual('noopener');
    expect(defaultTree.children().children().text()).toEqual('Link Text');
    defaultTree.children().simulate('click');
  });
});
