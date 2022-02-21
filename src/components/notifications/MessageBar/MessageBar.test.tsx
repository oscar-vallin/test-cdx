import { shallow } from 'enzyme';
import Component from './MessageBar';

const defaultId = 'MessageBarComponentTest';
const defaultChildren = 'Children Text';
const defaultContent = 'Content';
const defaultType = 'error';
const defaultTypeValue = 1;

const baseProps = {
  id: defaultId,
  content: defaultContent,
  actions: null,
};

const defaultProps = {
  ...baseProps,
  type: defaultType,
  multiline: true,
  truncated: true,
};

describe('MessageBar Testing Unit...', () => {
  const tree = shallow(<Component {...defaultProps}>{defaultChildren}</Component>);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual(defaultId);
    expect(tree.props().actions).toBeNull();
    expect(tree.props().messageBarType).toEqual(defaultTypeValue);
    expect(tree.props().isMultiline).toBeTruthy();
    expect(tree.props().truncated).toBeTruthy();
  });

  it('Should have a children when it is passed', () => {
    const childrenTree = shallow(
      <Component {...defaultProps} content={undefined}>
        {defaultChildren}
      </Component>
    );

    expect(childrenTree.children().first().text()).toEqual(defaultChildren);
    expect(tree.children().first().text()).toEqual(defaultContent);
  });

  it('Default props values, Should have a props', () => {
    const baseTree = shallow(<Component {...baseProps}>{defaultChildren}</Component>);
    expect(baseTree.props().id).toEqual(defaultId);
    expect(baseTree.props().actions).toBeNull();
    expect(baseTree.props().messageBarType).toEqual(0);
    expect(baseTree.props().isMultiline).toBeFalsy();
    expect(baseTree.props().truncated).toBeFalsy();
  });
});
