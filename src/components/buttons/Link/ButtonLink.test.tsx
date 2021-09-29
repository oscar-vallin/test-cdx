import { shallow } from 'enzyme';
import { Link } from './ButtonLink.js';

const theme = {
  colors: { themePrimary: '#fff', custom: { error: '#000  ' } },
  fontStyles: {
    link: `normal ${400} ${10}/${1} ${'Segoe UI'}, ${'Source Sans Pro'}, sans-serif`,
  },
};

describe('Link', () => {
  const mockFn = jest.fn();
  const tree = shallow(
    <Link onClick={mockFn} href="http://testlink.com">
      Testing ButtonLink
    </Link>
  );

  it('Should be defined', () => {
    expect(Link).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should renders children', () => {
    expect(tree.contains('Testing ButtonLink')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Link onClick={mockFn} href="http://testlink.com">
        <div className="children" />
      </Link>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });

  it('Should have a href prop', () => {
    expect(tree.props().href).toEqual('http://testlink.com');
  });

  it('Should have a traget blank prop', () => {
    expect(tree.props().target).toEqual('_blank');
  });

  it('Test styled Button component', () => {
    const testTemp = shallow(
      <Link onClick={mockFn} href="http://testlink.com" theme={theme}>
        Testing ButtonLink
      </Link>
    ).dive();
    expect(testTemp).toMatchSnapshot();
  });
});
