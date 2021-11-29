import { shallow } from 'enzyme';
import EmptyState from './EmptyState';

const defaultProps = { id: 'ImageId', filled: true, title: '', image: 'Alt Img', description: '' };

describe('Empty State Testing Unit...', () => {
  const tree = shallow(<EmptyState {...defaultProps} />);

  it('Should be defined', () => {
    expect(tree).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
