import { CDXTagPicker as Component } from 'src/components/inputs/TagPicker/TagPicker';
import { mountWithTheme } from 'src/utils/testUtils';
import { UiField } from 'src/data/services/graphql';

const defaultProps = { value: [], options: [], onChange: jest.fn(), apiQuery: jest.fn(), debounce: 500 };

describe('TagPicker unit test', () => {
  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should find label when parameter is sent', () => {
    const field: UiField = {
      required: false,
      visible: true,
      label: 'Tag Picker Label',
    };
    const wrapper = mountWithTheme(<Component {...defaultProps} uiField={field} />);
    const input = wrapper.find('#__TagPickerLabel').hostNodes();
    expect(input).toHaveLength(1);
    expect(input.text()).toEqual('Tag Picker Label');
  });

  it('Should find input with Id __CreateAccessSpecializationPanelId', () => {
    const wrapper = mountWithTheme(
      <Component {...defaultProps} id="__CreateAccessSpecializationPanelId" doSearch={jest.fn()} />
    );
    const input = wrapper.find('#__CreateAccessSpecializationPanelId').first();

    expect(input.length).toBe(1);
  });

  it('Should call onBlur function when blur event', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(<Component value={[]} doSearch={jest.fn()} onBlur={mockFn} />);
    wrapper.find('input').hostNodes().simulate('blur');
    expect(mockFn).toBeCalled();
  });

  it('Should call onFocus function when focus event', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(<Component value={[]} doSearch={jest.fn()} onFocus={mockFn} />);
    wrapper.find('input').hostNodes().simulate('focus');
    expect(mockFn).toBeCalled();
  });

  it('Should find input with Id __CreateAccessSpecializationPanelId', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} id="__CreateAccessSpecializationPanelId" />);
    const input = wrapper.find('#__CreateAccessSpecializationPanelId').first();
    expect(input.length).toBe(1);
    expect(input.prop('id')).toEqual('__CreateAccessSpecializationPanelId');
  });

  it('Should render suggestion when type the name partially', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(
      <Component
        id="__CreateAccessSpecializationPanelId"
        debounce={0}
        value={[]}
        doSearch={mockFn}
        options={[{ key: 'greeting', name: 'Hello' }]}
      />
    );
    const input = wrapper.find('input').hostNodes();
    expect(input).toHaveLength(1);
    input.simulate('change', { target: { value: 'He' } });
    setTimeout(() => {
      expect(mockFn).toBeCalled();
    }, 1000);
  });
});
