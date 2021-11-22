import { shallow } from 'enzyme';
import { CDXLabel as Component } from './Label';

const defaultProps = { text: 'Label Text', info: 'Info Tooltip', children: null };

describe('Label Testing...', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should renders children', () => {
    expect(tree.contains('Label Text')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Component>
        <p className="children">Test</p>
      </Component>
    );
    expect(wrapper.contains(<p className="children">Test</p>)).toEqual(true);
  });
});
