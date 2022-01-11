import React from 'react';
import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { DayOfWeek } from '@fluentui/react';
import { render, screen } from '@testing-library/react';
import { DateSelector as Component } from './DateSelector';

const firstDayOfWeek = DayOfWeek.Sunday;

const defaultProps = {
  id: 'InputDate',
  Label: 'date',
  required: false,
  onChange: (e: React.FormEvent<HTMLInputElement>) => {
    return e?.currentTarget?.value ?? '';
  },
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic InputDate Component', () => {
  it('Should renders InputDate Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders InputDate with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('required')).toBeFalsy();
    expect(wrapper.prop('allowTextInput')).toBeTruthy();
  });

  it('Should have the first day of the week as parameter', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('firstDayOfWeek')).toEqual(firstDayOfWeek);
  });

  it('@Testing: Render by Role', () => {
    render(<Component {...defaultProps} />);
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
  });
});
