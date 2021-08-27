import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
//
import { InputText as Component } from './index.js';

const placeholderText = 'This is a placeholder';

const defaultProps = {
  id: 'InputText',
  type: 'text',
  disabled: false,
  onChange: (e: React.FormEvent<HTMLInputElement>) => e.currentTarget.value,
  autofocus: true,
  errorMessage: null,
  onKeyDown: null,
  onKeyEnter: null,
  value: '',
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
});
