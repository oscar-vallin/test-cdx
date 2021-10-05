import { shallow } from 'enzyme';
import Component from './Modal.js';

const defaultChildren = 'ChildrenText';
const defaultTitle = 'Title';
const defaultSubTitle = 'SubTitle';
const defaultId = 'ModalComponentTest';

const baseProps = {
  id: defaultId,
  footer: null,
  children: null,
};

const defaultProps = {
  ...baseProps,
  title: defaultTitle,
  subText: defaultSubTitle,
  hidden: false,
  isBlocking: false,
  onDismiss: jest.fn(),
  footer: 'Footer Text',
};

const theme = {
  colors: { themePrimary: '#fff', custom: { error: '#000  ' } },
};

describe('Modal Testing Unit...', () => {
  const tree = shallow(<Component {...defaultProps}>{defaultChildren}</Component>);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual(defaultId);
    expect(tree.props().dialogContentProps.title).toEqual(defaultTitle);
    expect(tree.props().dialogContentProps.subText).toEqual(defaultSubTitle);
    expect(tree.props().hidden).toBeFalsy();
    expect(tree.props().isblocking).toBeFalsy();
  });

  it('Should have a children when it is passed', () => {
    expect(tree.children().first().text()).toEqual(defaultChildren);
  });

  it('Test styled Button component', () => {
    const wrapper = shallow(<Component {...defaultProps} theme={theme} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('Default props values, Should have a props', () => {
    const baseTree = shallow(<Component {...baseProps}></Component>);
    expect(baseTree.props().id).toEqual('ModalComponentTest');
    expect(baseTree.props().dialogContentProps.title).toBeUndefined();
    expect(baseTree.props().dialogContentProps.subText).toBeUndefined();
    expect(baseTree.props().hidden).toBeTruthy();
    expect(baseTree.props().modalProps.isBlocking).toBeTruthy();
  });
});
