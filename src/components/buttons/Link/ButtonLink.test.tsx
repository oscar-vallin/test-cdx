import { shallowWithTheme } from 'src/utils/testUtils';
import { Link } from './ButtonLink';

const defaultProps = {
  id: '__Link_Id',
  onClick: jest.fn(),
  // children: '',
  href: '#',
  target: '_blank',
  rel: 'noopener',
};

describe('Link', () => {
  const mockFn = jest.fn();
  const tree = shallowWithTheme(
    <Link {...defaultProps} children={'Testing ButtonLink'} onClick={mockFn} href="http://testlink.com" />
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
      <Link {...defaultProps} onClick={mockFn} children={<div className="children" />} href="http://testlink.com" />
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });

  it('Should have a href prop', () => {
    expect(tree.children().props().href).toEqual('http://testlink.com');
  });

  it('Should have a traget blank prop', () => {
    expect(tree.children().props().target).toEqual('_blank');
  });

  it('Test styled Button component', () => {
    const testTemp = shallowWithTheme(
      <Link {...defaultProps} onClick={mockFn} href="http://testlink.com">
        Testing ButtonLink
      </Link>
    ).dive();
    expect(testTemp).toMatchSnapshot();
  });
});
