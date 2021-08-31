import React from 'react';
import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { DayOfWeek } from 'office-ui-fabric-react/lib-commonjs/DatePicker';
import { fireEvent, render, screen } from '@testing-library/react';
import { addDays, addMonths, addYears } from '@fluentui/date-time-utilities';
import { getHours } from 'date-fns';
import { DateSelector as Component } from './DateSelector.js';

const today = new Date();
const yesterday = addDays(today, -1);
const hour = getHours(new Date());
const firstDayOfWeek = DayOfWeek.Sunday;
const minDate = addMonths(today, -2);
const maxDate = addYears(today, 1);

const placeholderText = 'This is a placeholder';

const defaultProps = {
  id: 'InputDate',
  Label: 'date',
  value: hour < 9 ? yesterday : today,
  required: false,
  onChange: (e: React.FormEvent<HTMLInputElement>) => {
    return e?.currentTarget?.value ?? '';
  },
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic InputDate Component', () => {
  it('Should renders InputDate Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders InputDate with placeholder', () => {
    const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('placeholder')).toEqual(placeholderText);
  });

  it('Should renders InputDate with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('value')).toEqual(defaultProps.value);
    expect(wrapper.prop('required')).toBeFalsy();
    expect(wrapper.prop('placeholder')).toEqual(placeholderText);
  });

  it('Should have the first day of the week as parameter', () => {
    const wrapper = shallow(<Component {...defaultProps} placeholder={placeholderText} />);
    expect(wrapper.prop('firstDayOfWeek')).toEqual(firstDayOfWeek);
  });

  it('@Testing: Render Input', () => {
    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  it('@Testing: Render by Role', () => {
    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
  });

  it('@Testing: Input Text', () => {
    render(<Component {...defaultProps} placeholder={placeholderText} />);
    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    expect(input).toHaveValue(today.toDateString());
  });
});
