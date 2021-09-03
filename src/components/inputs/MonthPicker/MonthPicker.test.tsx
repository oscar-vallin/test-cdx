import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { DayOfWeek } from 'office-ui-fabric-react/lib-commonjs/DatePicker';
import { DateRangeType } from 'office-ui-fabric-react/lib-commonjs/Calendar';
import { MonthPicker as Component } from './index.js';

const defaultProps = {
  open: false,
  onSelect: () => null,
  showDates: false,
  isMonthPickerVisible: true,
  dateRangeType: DateRangeType.Month,
  autoNavigateOnSelection: true,
  showGoToToday: true,
  showNavigateButtons: true,
  highlightCurrentMonth: true,
  highlightSelectedMonth: true,
  isDayPickerVisible: false,
  showMonthPickerAsOverlay: true,
  showWeekNumbers: false,
  firstDayOfWeek: DayOfWeek.Monday,
  show: true,
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic MonthPicker Component', () => {
  it('Should renders MonthPicker with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('open')).toBeFalsy();
    expect(wrapper.prop('showDates')).toBeFalsy();
    expect(wrapper.prop('isMonthPickerVisible')).toBeFalsy();
    expect(wrapper.children().prop('showGoToToday')).toBeTruthy();
    expect(wrapper.children().prop('showWeekNumbers')).toBeFalsy();
    expect(wrapper.children().prop('firstDayOfWeek')).toBeTruthy();
  });
});
