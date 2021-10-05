import { shallow } from 'enzyme';
import Component from './Separator';

const defaultId = 'SeparatorComponentTest';

const baseProps = {
  id: defaultId,
};

const defaultProps = {
  ...baseProps,
};

describe('Separator Testing Unit...', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual(defaultId);
  });
});
