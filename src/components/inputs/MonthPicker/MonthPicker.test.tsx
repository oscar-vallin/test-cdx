import toJSON from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import { DayOfWeek } from 'office-ui-fabric-react/lib-commonjs/DatePicker';
import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar, DateRangeType } from 'office-ui-fabric-react/lib-commonjs/Calendar';
import { MonthPicker as Component } from './index';
import { Container } from './MonthPicker.styles';
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { mountWithTheme } from 'src/utils/testUtils';

const baseProps = {
  onSelect: () => null,
  show: true,
};

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

const theme = {
  colors: {
    themePrimary: '#fff',
  },
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} theme={theme} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic MonthPicker Component', () => {
  it('Should renders MonthPicker with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('open')).toBeFalsy();
    expect(wrapper.prop('showDates')).toBeFalsy();
    expect(wrapper.prop('isMonthPickerVisible')).toBeFalsy();
    expect(wrapper.children().at(0).prop('showGoToToday')).toBeTruthy();
    expect(wrapper.children().at(0).prop('showWeekNumbers')).toBeFalsy();
    expect(wrapper.children().at(0).prop('firstDayOfWeek')).toBeTruthy();
  });

  it('Test styled Container component', () => {
    const baseTree = shallow(
      <Container {...defaultProps} theme={theme}>
        <div></div>
      </Container>
    );
    expect(baseTree).toMatchSnapshot();
  });

  it('Test styled MonthPicker component', () => {
    const wrapper = shallow(<Component {...defaultProps} theme={theme} restrictedDates={[new Date()]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Test default props MonthPicker component', () => {
    const wrapper = shallow(<Component {...baseProps} theme={theme} restrictedDates={[new Date()]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Match Snapshot sending showDates property', () => {
    const wrapper = shallow(<Component {...defaultProps} showDates />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Match Snapshot sending minDate property', () => {
    const wrapper = shallow(<Component {...defaultProps} minDate={new Date()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Press button of today in the MonthPicker and calls onSelect', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(<Component {...defaultProps} onSelect={mockFn} />);
    const today = wrapper.find('.ms-DatePicker-day--today');
    today.simulate('click');
    expect(today.length).toBe(1);
    expect(mockFn).toBeCalled();
  });

  it('Test press the Previous button in the MonthPicker', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    const goBackButton = wrapper.find('button[data-testid="__PrevioustBtn"]');
    goBackButton.simulate('click');
    expect(goBackButton.length).toBe(1);
  });

  it('Test press the Next button in the MonthPicker', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    const goNextButton = wrapper.find('button[data-testid="__NextBtn"]');
    goNextButton.simulate('click');
    expect(goNextButton.length).toBe(1);
  });
});
