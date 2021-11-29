import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { CDXTagPicker as Component } from './TagPicker';

const defaultProps = {
  label: 'Label',
  disabled: false,
  debounce: 500,
  pickerProps: {} as any,
  onBlur: () => null,
  onFocus: () => null,
  required: false,
  id: '__TestTagPicker',
  apiQuery: () => null,
  options: [],
  value: [],
  onChange: () => null,
};

describe('TagPicker Test...', () => {
  const themedComponent = shallowWithTheme(<Component {...defaultProps} />);
  const themedMount = mountWithTheme(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(themedComponent).toBeDefined();
    expect(themedMount).toBeDefined();
  });

  it('Tag Picker, Should be defined', () => {
    expect(themedComponent).toMatchSnapshot();
  });
});
