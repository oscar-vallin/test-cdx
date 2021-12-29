import { shallow } from 'enzyme';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from 'src/utils/testUtils';
import { FormLabel as Component } from './FormLabel';

const defaultProps = { label: 'Label Text', info: 'Info Tooltip' };

const theme = {
  colors: {
    red: '#fff',
  },
};

describe('Label Testing...', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should renders children', () => {
    expect(tree.contains('Label Text')).toEqual(true);
  });

  it('Should render the Required styles', () => {
    const wrapped = renderWithTheme(<Component {...defaultProps} id="withRequiredField" required />);
    expect(wrapped.find('Required')).toBeDefined();
  });
});
