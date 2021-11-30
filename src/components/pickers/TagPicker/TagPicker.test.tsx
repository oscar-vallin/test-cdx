import { shallow } from 'enzyme';
import { CDXTagPicker as Component } from './TagPicker';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = { value: [], options: [], onChange: (param) => null, apiQuery: (param) => null, debounce: 500 };

describe('TagPicker unit test', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should find input with Id __CreateAccessSpecializationPanelId', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} apiQuery={jest.fn()} />);
    const input = wrapper.find('input[id="__CreateAccessSpecializationPanelId"]').first();
    expect(input).toMatchSnapshot();
  });
});
