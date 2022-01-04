import React  from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
//
import { InputText, UIInputText } from './index';
import { mountWithTheme } from 'src/utils/testUtils';
import { UiStringField } from "../../../data/services/graphql";
import { UIInputTextReadOnly } from "./InputText";

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
  info: 'A Name that isn\'t your name',

  errMsg: 'This field is Required',
  min: 0,
  max: 60
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<InputText {...defaultProps} placeholder={placeholderText} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic Input Component', () => {
  it('Should renders InputText Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InputText {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
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
    render(<InputText {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  it('@Testing: Render by Role', () => {
    render(<InputText {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('@Testing: Input Text', () => {
    render(<InputText {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { target: { value: 'searchString' } });
    expect(input).toHaveValue('searchString');
  });

  it('@Testing: Check call function when key press = Enter', () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    render(
      <InputText
        {...defaultProps}
        placeholder={placeholderText}
        onKeyDown={(key) => mockFn(key)}
        onKeyEnter={mockFn2}
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(mockFn2).toHaveBeenCalled();
  });

  it('@Testing: Check call function when key press', () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    render(
      <InputText
        {...defaultProps}
        placeholder={placeholderText}
        onKeyDown={(key) => mockFn(key)}
        onKeyEnter={mockFn2}
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'K' });
    expect(mockFn).toHaveBeenCalled();
  });

  it('@Testing: Check call function when key press', () => {
    const mockFn = jest.fn();

    render(<InputText {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Should send the property info to the component', () => {
    const tree = mountWithTheme(<InputText {...defaultTestProps} info="Tooltip info"></InputText>);
    expect(tree).toMatchSnapshot();
  });
  
  it('UIInput Text Rendering', () => {
    const wrapper = shallow(
      <UIInputText uiStringField={nickName} value='Jimbo'/>
    )

    expect(wrapper.find('InputText')).toHaveLength(1);
    expect(wrapper.find('InputText').get(0).props.autofocus).toEqual(false);
    expect(wrapper.find('InputText').get(0).props.value).toEqual('Jimbo');
    expect(wrapper.find('InputText').get(0).props.type).toEqual('text');
    expect(wrapper.find('InputText').get(0).props.info).toEqual('A Name that isn\'t your name');
    expect(wrapper.find('InputText').get(0).props.required).toEqual(true);
    expect(wrapper.find('InputText').get(0).props.errorMessage).toEqual( 'This field is Required');
    expect(wrapper.find('InputText').get(0).props.minLength).toEqual(0);
    expect(wrapper.find('InputText').get(0).props.maxLength).toEqual(60);
  });

  it('Test OnChange', () => {
    let update: string = '';
    const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      update = newValue ?? '';
    };

    const wrapper = mountWithTheme(
      <UIInputText uiStringField={nickName} value='RZA' onChange={onChange}/>
    )

    expect(wrapper.find('input')).toHaveLength(1);
    wrapper.find('input').simulate('change', {target: { value: 'Skylar'}})

    expect(update).toEqual('Skylar');
  });

  it('Test Read Only Field', () => {
    const roNickName: UiStringField = {
      ...nickName,
      value: "Kerman",
      readOnly: true
    };

    const wrapper = shallow(
      <UIInputTextReadOnly uiStringField={roNickName}/>
    )

    expect(wrapper.find('UIFormLabel')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('InputText')).toHaveLength(0);
    expect(wrapper.find('UIInputTextReadOnly')).toHaveLength(0);
  });

  it('Automatic Read Only rendering form UI Field', () => {
    const roNickName: UiStringField = {
      ...nickName,
      value: "Kerman",
      readOnly: true
    };

    const wrapper = shallow(
      <UIInputText uiStringField={roNickName} value='Jimbo'/>
    )

    expect(wrapper.find('InputText')).toHaveLength(0);
    expect(wrapper.find('UIInputTextReadOnly')).toHaveLength(1);
  })
});
