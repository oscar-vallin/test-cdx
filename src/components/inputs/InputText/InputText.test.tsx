import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InputText, UIInputText } from './index';
import { mountWithTheme } from 'src/utils/testUtils';
import { UiStringField } from 'src/data/services/graphql';
import { UIInputTextReadOnly } from './InputText';

const placeholderText = 'This is a placeholder';

const defaultProps = {
  id: 'InputText',
  type: 'text',
  disabled: false,
  onChange: undefined,
  autofocus: true,
  errorMessage: undefined,
  onKeyDown: null,
  onKeyEnter: null,
  value: '',
};

const defaultTestProps = {
  ...defaultProps,
  info: jest.fn(),
};

const nickName: UiStringField = {
  label: 'Nick Name',
  value: '',
  required: true,
  visible: true,
  info: "A Name that isn't your name",

  errMsg: 'This field is Required',
  min: 0,
  max: 60,
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<InputText {...defaultProps} placeholder={placeholderText} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic Input Component', () => {
  it('Should renders InputText Component', () => {
    const wrapper = mountWithTheme(<InputText {...defaultProps} />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('Should renders InputText with placeholder', () => {
    const wrapper = shallow(<InputText {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('placeholder')).toEqual(placeholderText);
  });

  it('Should renders InputText with Props', () => {
    const wrapper = shallow(<InputText {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('id')).toEqual(defaultProps.id);
    expect(wrapper.prop('type')).toEqual(defaultProps.type);
    expect(wrapper.prop('errorMessage')).toEqual(defaultProps.errorMessage);
    expect(wrapper.prop('value')).toEqual(defaultProps.value);
    expect(wrapper.prop('disabled')).not.toBeTruthy();
    expect(wrapper.prop('autofocus')).toBeTruthy();
    expect(wrapper.prop('placeholder')).toEqual(placeholderText);
  });

  it('@Testing: Render Input', () => {
    const wrapper = mountWithTheme(<InputText {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.html().indexOf(placeholderText)).toBeGreaterThan(-1);
  });

  it('@Testing: Render by Role', () => {
    const wrapper = mountWithTheme(<InputText {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.html().indexOf('type="text"')).toBeGreaterThan(-1);
  });

  it('@Testing: Input Text', () => {
    let updatedValue = '';
    const onChange = (e, newValue) => {
      updatedValue = newValue;
    };

    const wrapper = mountWithTheme(<InputText {...defaultProps} onChange={onChange} />);
    expect(wrapper.find('input')).toHaveLength(1);
    wrapper.find('input').simulate('change', { target: { value: 'searchString' } });
    expect(updatedValue).toEqual('searchString');
  });

  it('@Testing: Check call function when key press = Enter', () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = mountWithTheme(
      <InputText
        {...defaultProps}
        placeholder={placeholderText}
        onKeyDown={(key) => mockFn(key)}
        onKeyEnter={mockFn2}
      />
    );
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });

    expect(mockFn2).toHaveBeenCalled();
  });

  it('@Testing: Check call function when key press', () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = mountWithTheme(
      <InputText
        {...defaultProps}
        placeholder={placeholderText}
        onKeyDown={(key) => mockFn(key)}
        onKeyEnter={mockFn2}
      />
    );
    wrapper.find('input').simulate('keyDown', { key: 'K' });

    expect(mockFn).toHaveBeenCalled();
  });

  it('@Testing: Check call function when key press', () => {
    const mockFn = jest.fn();

    const wrapper = mountWithTheme(<InputText {...defaultProps} placeholder={placeholderText} />);

    wrapper.find('input').simulate('keyDown');

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Should send the property info to the component', () => {
    const tree = mountWithTheme(<InputText {...defaultTestProps} info="Tooltip info" />);
    expect(tree).toMatchSnapshot();
  });

  it('UIInput Text Rendering', () => {
    const wrapper = shallow(<UIInputText id="nickname" uiField={nickName} value="Jimbo" />);

    expect(wrapper.find('InputText')).toHaveLength(1);
    expect(wrapper.find('InputText').get(0).props.autofocus).toEqual(false);
    expect(wrapper.find('InputText').get(0).props.value).toEqual('Jimbo');
    expect(wrapper.find('InputText').get(0).props.type).toEqual('text');
    expect(wrapper.find('InputText').get(0).props.info).toEqual("A Name that isn't your name");
    expect(wrapper.find('InputText').get(0).props.required).toEqual(true);
    expect(wrapper.find('InputText').get(0).props.errorMessage).toEqual('This field is Required');
    expect(wrapper.find('InputText').get(0).props.minLength).toEqual(0);
    expect(wrapper.find('InputText').get(0).props.maxLength).toEqual(60);
  });

  it('Test OnChange', () => {
    let update: string = '';
    const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      update = newValue ?? '';
    };

    const wrapper = mountWithTheme(<UIInputText id="foo" uiField={nickName} value="RZA" onChange={onChange} />);

    expect(wrapper.find('input')).toHaveLength(1);
    wrapper.find('input').simulate('change', { target: { value: 'Skylar' } });

    expect(update).toEqual('Skylar');
  });

  it('Test Read Only Field', () => {
    const roNickName: UiStringField = {
      ...nickName,
      value: 'Kerman',
      readOnly: true,
    };

    const wrapper = shallow(<UIInputTextReadOnly id="foo" uiField={roNickName} />);

    expect(wrapper.find('UIFormLabel')).toHaveLength(1);
    expect(wrapper.contains('Kerman')).toEqual(true);
    expect(wrapper.find('InputText')).toHaveLength(0);
    expect(wrapper.find('UIInputTextReadOnly')).toHaveLength(0);
  });

  it('Read Only Password Field', () => {
    const roNickName: UiStringField = {
      ...nickName,
      value: 'Kerman',
      readOnly: true,
    };

    const wrapper = shallow(<UIInputTextReadOnly id="foo" type="password" uiField={roNickName} />);

    expect(wrapper.find('UIFormLabel')).toHaveLength(1);
    expect(wrapper.contains('Kerman')).toEqual(false);
    expect(wrapper.contains('********')).toEqual(true);
    expect(wrapper.find('InputText')).toHaveLength(0);
    expect(wrapper.find('UIInputTextReadOnly')).toHaveLength(0);
  });

  it('Automatic Read Only rendering form UI Field', () => {
    const roNickName: UiStringField = {
      ...nickName,
      value: 'Kerman',
      readOnly: true,
    };

    const wrapper = shallow(<UIInputText id="foo" uiField={roNickName} value="Jimbo" />);

    expect(wrapper.find('InputText')).toHaveLength(0);
    expect(wrapper.find('UIInputTextReadOnly')).toHaveLength(1);
  });

  it('Hidden UI Field', () => {
    const hiddenField: UiStringField = {
      ...nickName,
      visible: false,
    };

    const wrapper = mountWithTheme(<UIInputText id="_Hidden" uiField={hiddenField} />);

    expect(wrapper.html()).toEqual('');
  });
});
