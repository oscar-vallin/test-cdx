import { shallow } from 'enzyme';
import { HighlightCounter } from './HighlightCounter';

const baseProps = {
  id: 'UnitTesting_HighlightCounter',
  children: null,
  type: 0,
};

const defaultProps = {
  ...baseProps,
  href: '#',
};

const theme = {
  radius: { large: '10px' },
  fontWeights: { normal: 400 },
  colors: {
    themePrimary: '#fff',
    warning: 'red',
    custom: { error: '#000  ' },
  },
};

describe('Highlight Counter Testing Unit...', () => {
  const tree = shallow(
    <HighlightCounter {...defaultProps} theme={theme}>
      1
    </HighlightCounter>
  );

  it('Should be defined', () => {
    expect(HighlightCounter).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual('UnitTesting_HighlightCounter');
    expect(tree.props().type).toEqual(0);
    expect(tree.children().text()).not.toBeNull();
  });

  it('Should have a children when it is passed', () => {
    const defaultTree = shallow(<HighlightCounter {...defaultProps}>1</HighlightCounter>);
    expect(defaultTree.children().text()).toEqual('1');
  });

  it('Default props values, Should have a props', () => {
    const baseTree = shallow(<HighlightCounter {...defaultProps} theme={theme}></HighlightCounter>);
    expect(baseTree.props().id).not.toBeNaN();
    expect(baseTree.props().type).toEqual(0);
    expect(baseTree.children().text()).not.toBeNull();
  });

  it('Test styled Highlight Counter component', () => {
    const wrapper = shallow(<HighlightCounter {...defaultProps} theme={theme} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('Test styled Highlight Counter component variants', () => {
    const wrapper = shallow(
      <HighlightCounter {...defaultProps} theme={theme} type={1}>
        1
      </HighlightCounter>
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('Test styled Highlight Counter type null', () => {
    const wrapper = shallow(
      <HighlightCounter {...defaultProps} theme={theme} type={null}>
        1
      </HighlightCounter>
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
