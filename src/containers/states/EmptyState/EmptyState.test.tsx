import { shallow } from 'enzyme';
import EmptyState from './EmptyState';

const defaultProps = { id: 'ImageId', filled: true, title: '', image: 'Alt Img', description: '' };

describe('Image', () => {
  const tree = shallow(<EmptyState {...defaultProps} />);

  it('Should be defined', () => {
    expect(EmptyState).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(EmptyState).toMatchSnapshot();
  });
});
