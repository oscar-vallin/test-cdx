import { shallow } from 'enzyme';
import CDXMultiselect from './Multiselect';

const defaultProps = { value: [], options: [], onChange: () => null };

describe('Image', () => {
  const tree = shallow(<CDXMultiselect {...defaultProps} />);

  it('Should be defined', () => {
    expect(CDXMultiselect).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(CDXMultiselect).toMatchSnapshot();
  });
});
