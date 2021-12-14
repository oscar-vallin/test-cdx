import { shallow } from 'enzyme';
import { FormLabel as Component } from './FormLabel';

const defaultProps = { label: 'Label Text', info: 'Info Tooltip' };

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
});
