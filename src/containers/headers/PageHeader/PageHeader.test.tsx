import { shallow } from 'enzyme';
import { PageHeader as Component } from './PageHeader';

const defaultProps = { id: '', spacing: 'primary', children: '' };

describe('Image', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });
});
