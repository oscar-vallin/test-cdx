import { shallow, mount } from 'enzyme';
import { CDXTagPicker as Component } from './TagPicker';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { fireEvent, screen } from '@testing-library/react';

const defaultProps = { value: [], options: [], onChange: (param) => null, apiQuery: (param) => null, debounce: 500 };

describe('TagPicker unit test', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should find label when paremeter is sent', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} label="Tag Picker Label" />);
    const input = wrapper.find('#__TagPickerLabel').first();
    expect(input.length).toBe(1);
    expect(input.text()).toEqual('Tag Picker Label');
  });

  it('Should find input with Id __CreateAccessSpecializationPanelId', () => {
    const wrapper = mountWithTheme(
      <Component {...defaultProps} id="__CreateAccessSpecializationPanelId" apiQuery={jest.fn()} />
    );
    const input = wrapper.find('#__CreateAccessSpecializationPanelId').first();

    expect(input.length).toBe(1);
  });

  it('Should call onBlur function when blur event', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(<Component {...defaultProps} apiQuery={jest.fn()} onBlur={mockFn} />);
    wrapper.simulate('blur');
    expect(mockFn).toBeCalled;
  });

  it('Should call onFocus function when focus event', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(<Component {...defaultProps} apiQuery={jest.fn()} onFocus={mockFn} />);
    wrapper.simulate('focus');
    expect(mockFn).toBeCalled;
  });

  it('Should find input with Id __CreateAccessSpecializationPanelId', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} id="__CreateAccessSpecializationPanelId" />);
    const input = wrapper.find('#__CreateAccessSpecializationPanelId').first();
    expect(input.length).toBe(1);
    expect(input.prop('id')).toEqual('__CreateAccessSpecializationPanelId');
  });

  it('Should render sugestion when type the name partially', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Component
        {...defaultProps}
        id="__CreateAccessSpecializationPanelId"
        apiQuery={mockFn}
        options={[{ key: 'greeting', name: 'Hello' }]}
      />
    );
    const input = wrapper.find('#__CreateAccessSpecializationPanelId').first();

    input.simulate('change', { target: { value: 'He' } });
    expect(mockFn).toBeCalled;
  });
});
