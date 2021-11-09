import { mount, render, shallow } from 'enzyme';
import { CDXBreadcrumb } from './Breadcrumb';

const baseProps = {
  id: 'Breadcrumb_UnitTest',
};

const defaultProps = {
  ...baseProps,
  items: [{ ID: 'test', TITLE: 'Test', URL: '', MAIN_MENU: true, API_ID: '' }],
  onClick: () => {},
};

describe('Breadcrumb Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = render(<CDXBreadcrumb {...defaultProps} />);
  const [{ TITLE }] = defaultProps.items;

  it('Should be defined', () => {
    expect(CDXBreadcrumb).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the default dashboard button', () => {
    const text = tree.find('.ms-TooltipHost').first().text();

    expect(text).toEqual('CDX Dashboard');
  });

  it('Should render the breadcrumb buttons', () => {
    const text = tree.find('.ms-TooltipHost').last().text();

    expect(text).toEqual(TITLE);
  });

  it('Should trigger the onClick callback', () => {
    const wrapper = mount(<CDXBreadcrumb {...defaultProps} onClick={mockFn} />);

    wrapper.find('.ms-Breadcrumb-itemLink').last().simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('Breadcrumb Default Props', () => {
    const wrapper = shallow(<CDXBreadcrumb {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Breadcrumb Variants', () => {
    const wrapper = shallow(<CDXBreadcrumb {...defaultProps} onClick={undefined} />);
    expect(wrapper).toMatchSnapshot();
  });
});
