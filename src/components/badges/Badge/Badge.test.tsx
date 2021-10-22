import { CDXBadge } from './Badge';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  id: '',
  label: '',
  pill: false,
  variant: 'info',
};

describe('Badge Testing Unit...', () => {
  const tree = mountWithTheme(<CDXBadge {...defaultProps}>Content</CDXBadge>);

  it('Should be defined', () => {
    expect(CDXBadge).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property if provided', () => {
    const wrapper = mountWithTheme(
      <CDXBadge {...defaultProps} label="Test">
        Content
      </CDXBadge>
    );

    expect(wrapper.find('span').props().children).toEqual('Test');
  });

  it('Should render its children if no label is provided', () => {
    expect(tree.find('span').props().children).toEqual('Content');
  });
});
