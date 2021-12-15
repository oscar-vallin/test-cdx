import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
//
import { InputText as Component } from './index';
import { mountWithTheme } from 'src/utils/testUtils';

const placeholderText = 'This is a placeholder';

const defaultProps = {
  id: 'InputText',
  type: 'text',
  disabled: false,
  onChange: (e: React.FormEvent<HTMLInputElement>) => {
    return e?.currentTarget?.value ?? '';
  },
  autofocus: true,
  errorMessage: null,
  onKeyDown: null,
  onKeyEnter: null,
  value: '',
};

const defaultTestProps = {
  ...defaultProps,
  info: jest.fn(),
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic Input Component', () => {
  it('Should renders InputText Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders InputText with placeholder', () => {
    const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('placeholder')).toEqual(placeholderText);
  });

  it('Should renders InputText with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('id')).toEqual(defaultProps.id);
    expect(wrapper.prop('type')).toEqual(defaultProps.type);
    expect(wrapper.prop('errorMessage')).toEqual(defaultProps.errorMessage);
    expect(wrapper.prop('value')).toEqual(defaultProps.value);
    expect(wrapper.prop('disabled')).not.toBeTruthy();
    expect(wrapper.prop('autofocus')).toBeTruthy();
    expect(wrapper.prop('placeholder')).toEqual(placeholderText);
  });

  it('@Testing: Render Input', () => {
    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  it('@Testing: Render by Role', () => {
    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('@Testing: Input Text', () => {
    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { target: { value: 'searchString' } });
    expect(input).toHaveValue('searchString');
  });

  it('@Testing: Check call function when key press = Enter', () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    render(
      <Component
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
      <Component
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

    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Should send the property info to the component', () => {
    const mockFn = jest.fn();
    const tree = mountWithTheme(<Component {...defaultTestProps} info="Tooltip info"></Component>);
    expect(tree).toMatchSnapshot();
  });
});
