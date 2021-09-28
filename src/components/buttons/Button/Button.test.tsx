import { shallow } from 'enzyme';
import { Button } from './Button.js';

const defaultProps = {
  id: '__Button',
  text: 'Button Text',
  children: null,
  variant: 'secondary',
  disabled: false,
  onClick: jest.fn(),
};

const theme = {
  colors: { themePrimary: '#fff', custom: { error: '#000  ' } },
};

describe('Button Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = shallow(<Button {...defaultProps} onClick={mockFn}></Button>);

  it('Should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual('__Button');
    expect(tree.props().variant).toEqual('secondary');
    expect(tree.props().disabled).toBeFalsy();
  });

  it('Should have a children with only text when text is passed', () => {
    expect(tree.text()).toEqual('Button Text');
  });

  it('Should have a children when it is passed', () => {
    const tree = shallow(<Button {...defaultProps} text={null} children={<p>Text Children</p>}></Button>);
    expect(tree.children().text()).toEqual('Text Children');
  });

  it("Can't click when button is disabled", () => {
    const tree = shallow(<Button {...defaultProps} theme={theme} disabled={true}></Button>);
    tree.simulate('click');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Test styled Button component', () => {
    const wrapper = shallow(<Button {...defaultProps} theme={theme} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
